const livePanel = document.querySelector("[data-live-panel]");

if (livePanel) {
  const locale = window.kingshotLocale || "en";
  const region = window.kingshotRegion || "global";
  const i18n = window.kingshotI18n;
  const resetValue = livePanel.querySelector("#reset-value");
  const updatedValue = livePanel.querySelector("#updated-value");
  const updatedBadge = livePanel.querySelector("#updated-badge");
  const marketValue = livePanel.querySelector("#market-value");
  const marketRegion = livePanel.querySelector("#market-region");
  const scopeTitle = livePanel.querySelector("#scope-title");
  const scopeBody = livePanel.querySelector("#scope-body");
  const refreshKicker = livePanel.querySelector("#refresh-kicker");
  const refreshTitle = livePanel.querySelector("#refresh-title");
  const refreshStatus = livePanel.querySelector("#refresh-status");
  const refreshButton = livePanel.querySelector("#refresh-feed");
  const refreshLogLink = livePanel.querySelector("#refresh-log-link");
  const focusList = livePanel.querySelector("#focus-list");
  const updatesList = livePanel.querySelector("#updates-list");
  const notesList = livePanel.querySelector("#notes-list");
  const pipelineList = livePanel.querySelector("#pipeline-list");
  const memoField = livePanel.querySelector("#memo-field");
  const memoStatus = livePanel.querySelector("#memo-status");
  const decisionCards = Array.from(livePanel.querySelectorAll(".today-decision-card"));
  const showcaseKicker = livePanel.parentElement?.querySelector(".today-showcase-kicker");
  const showcaseTitle = livePanel.parentElement?.querySelector(".today-showcase-title");
  const showcaseBody = livePanel.parentElement?.querySelector(".today-showcase-body");
  const showcaseTags = Array.from(livePanel.parentElement?.querySelectorAll(".today-showcase-tag") || []);
  const sourceKicker = livePanel.querySelector(".today-source-kicker");
  const sourceTitle = livePanel.querySelector(".today-source-title");
  const sourceLabels = Array.from(livePanel.querySelectorAll(".today-source-label"));
  const sourceBodies = Array.from(livePanel.querySelectorAll(".today-source-body"));
  const memoStorageKey = `kingshot-central-memo-${region}`;
  const refreshIntervalMs = 10 * 60 * 1000;

  let liveFeed = {};
  let refreshTimer;
  let lastBrowserRefresh;

  const strings = {
    en: {
      loading: "Refreshing...",
      refreshed: "Feed refreshed just now",
      failedRefresh: "Could not refresh live feed. Showing the last available data.",
      refreshKicker: "Live refresh",
      refreshTitle: "Updates load when this page opens",
      refreshButton: "Refresh now",
      refreshLog: "View update log",
      refreshWaiting: "Opening the latest tracked feed...",
      nextRefresh: "Auto-refreshes every 10 minutes while this page stays open.",
      saved: "Saved locally",
      failed: "Save failed",
      manualUpdate: "Manual update needed",
      manualSource: "Manual source",
      scopeFallback: "Global official watch"
    },
    "zh-CN": {
      loading: "刷新中...",
      refreshed: "刚刚已刷新资讯",
      failedRefresh: "无法刷新实时 feed，正在显示最后可用数据。",
      refreshKicker: "实时刷新",
      refreshTitle: "页面打开时会自动拉取最新资讯",
      refreshButton: "立即刷新",
      refreshLog: "查看更新日志",
      refreshWaiting: "正在读取最新追踪 feed...",
      nextRefresh: "页面保持打开时，每 10 分钟会自动刷新一次。",
      saved: "已保存在本地",
      failed: "保存失败",
      manualUpdate: "需要手动更新",
      manualSource: "手动来源",
      scopeFallback: "全球官方观察流"
    },
    "zh-TW": {
      loading: "刷新中...",
      refreshed: "剛剛已刷新資訊",
      failedRefresh: "無法刷新即時 feed，正在顯示最後可用資料。",
      refreshKicker: "即時刷新",
      refreshTitle: "頁面打開時會自動拉取最新資訊",
      refreshButton: "立即刷新",
      refreshLog: "查看更新日誌",
      refreshWaiting: "正在讀取最新追蹤 feed...",
      nextRefresh: "頁面保持打開時，每 10 分鐘會自動刷新一次。",
      saved: "已保存在本地",
      failed: "儲存失敗",
      manualUpdate: "需要手動更新",
      manualSource: "手動來源",
      scopeFallback: "全球官方觀察流"
    }
  };

  const copy = strings[locale] || strings.en;

  const t = (key, fallback = "") => {
    if (i18n?.t) {
      const value = i18n.t(key);
      if (typeof value === "string") {
        return value;
      }
    }
    return fallback;
  };

  const formatBrowserRefresh = () => {
    if (!lastBrowserRefresh) {
      return copy.refreshWaiting;
    }

    const time = lastBrowserRefresh.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    return `${copy.refreshed} (${time}). ${copy.nextRefresh}`;
  };

  const setRefreshStatus = (message, state = "") => {
    if (refreshStatus) {
      refreshStatus.textContent = message;
    }

    livePanel.dataset.refreshState = state;
  };

  const formatResetCountdown = (resetHourUtc) => {
    const now = new Date();
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const nextReset = new Date(utcNow);
    nextReset.setUTCHours(resetHourUtc, 0, 0, 0);

    if (utcNow >= nextReset) {
      nextReset.setUTCDate(nextReset.getUTCDate() + 1);
    }

    const diffMs = nextReset.getTime() - utcNow.getTime();
    const totalMinutes = Math.max(0, Math.floor(diffMs / 60000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const renderList = (items, container, renderer) => {
    if (!container) {
      return;
    }

    container.innerHTML = "";
    items.forEach((item) => {
      container.appendChild(renderer(item));
    });
  };

  const createFocusItem = (item) => {
    const wrapper = document.createElement("article");
    wrapper.className = "live-card";
    wrapper.innerHTML = `<strong>${item.title}</strong><p>${item.detail}</p>`;
    return wrapper;
  };

  const createUpdateItem = (item) => {
    const wrapper = document.createElement("article");
    wrapper.className = "update-row";
    wrapper.innerHTML = `
      <time>${item.date}</time>
      <div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <a class="text-link" href="${item.source_url}" target="_blank" rel="noreferrer">${item.source_label}</a>
      </div>
    `;
    return wrapper;
  };

  const createNoteItem = (text) => {
    const wrapper = document.createElement("article");
    wrapper.className = "live-note";
    wrapper.textContent = text;
    return wrapper;
  };

  const loadMemo = () => {
    try {
      return window.localStorage.getItem(memoStorageKey) || "";
    } catch {
      return "";
    }
  };

  const saveMemo = (value) => {
    try {
      window.localStorage.setItem(memoStorageKey, value);
      if (memoStatus) {
        memoStatus.textContent = copy.saved;
      }
    } catch {
      if (memoStatus) {
        memoStatus.textContent = copy.failed;
      }
    }
  };

  const getRegionFeed = () => {
    const regions = liveFeed.regions || {};
    return regions[region] || regions.global || {};
  };

  const pipelineNotes = locale === "zh-CN"
    ? [
        "先确认今天有没有新兑换码或维护公告。",
        "如果明天可能是计分窗口，今晚先别把加速和钻石烧掉。",
        "给自己留一条最重要的建筑、英雄或联盟提醒。"
      ]
    : locale === "zh-TW"
      ? [
          "先確認今天有沒有新兌換碼或維護公告。",
          "如果明天可能是計分窗口，今晚先別把加速和鑽石燒掉。",
          "給自己留一條最重要的建築、英雄或聯盟提醒。"
        ]
      : [
          "Check whether a new code or maintenance note appeared today.",
          "If tomorrow could be a score window, stop burning gems and speedups tonight.",
          "Leave one short reminder for your next building, hero, or alliance priority."
        ];

  const decisionCopy = locale === "zh-CN"
      ? [
          {
            kicker: "资源时机",
            title: "今日资源使用建议",
            body: "如果没有明确的强力英雄窗口或计分窗口，更稳妥的默认动作仍然是先囤钻、囤加速，避免在 reset 前把高价值资源交在错误时间。"
          },
          {
            kicker: "今日检查",
            title: "兑换码与维护动态",
            body: "建议先看官方社媒，再确认兑换码页是否有变动，因为这两层最容易直接影响当天可领内容与日常安排。"
          }
        ]
    : locale === "zh-TW"
        ? [
          {
            kicker: "資源時機",
            title: "今日資源使用建議",
            body: "如果沒有明確的強力英雄窗口或計分窗口，更穩妥的預設動作仍然是先囤鑽、囤加速，避免在 reset 前把高價值資源交在錯誤時間。"
          },
          {
            kicker: "今日檢查",
            title: "兌換碼與維護動態",
            body: "最高頻的回訪動作依舊是先看官方社群，再確認兌換碼頁有沒有變化，因為這兩層最容易直接影響當天收益。"
          }
        ]
      : [
          {
            kicker: "Resource timing",
            title: "Today's resource use",
            body: "If there is no clear hero or scoring window in sight, the safer default is still to hold gems and speedups instead of leaking value before reset."
          },
          {
            kicker: "Daily check",
            title: "Codes and maintenance watch",
            body: "The strongest repeat-open loop is still official social first, then the code board, because those two surfaces can change today's value immediately."
          }
        ];

  const showcaseCopy = locale === "zh-CN"
    ? {
        kicker: "每日资讯台",
        title: "把重置、官方动态和今日重点放在同一页。",
        body:
          "集中查看重置时间、地区观察、兑换码动态和本地备忘，适合做成每天反复打开的资讯与工具页。",
        tags: ["重置倒计时", "地区观察", "兑换码状态", "本地备忘"]
      }
    : locale === "zh-TW"
      ? {
          kicker: "每日資訊台",
          title: "把重置、官方動態與今日重點放在同一頁。",
          body:
            "集中查看重置時間、地區觀察、兌換碼動態與本地備忘，適合做成每天反覆打開的資訊與工具頁。",
          tags: ["重置倒數", "地區觀察", "兌換碼狀態", "本地備忘"]
        }
      : {
          kicker: "Daily desk",
          title: "Reset, official updates, and today's priority in one page.",
          body:
            "Use this page for reset timing, region-aware update checks, the latest code follow-up, and a saved local note for the next event window.",
          tags: ["Reset countdown", "Region watch", "Code status", "Local memo"]
        };

  const sourceCopy = locale === "zh-CN"
    ? {
        kicker: "官方渠道",
        title: "每日资讯页的主要观察来源",
        labels: ["最快社媒层", "版本说明", "兑换码板"],
        bodies: [
          "维护说明、里程碑发帖和最快冒出来的新礼包码，通常还是先从这里出现。",
          "当社媒安静时，商店版本说明仍然可能透露更新字样、版本变化和功能动向。",
          "回到兑换码页查看最新活跃条目、复测名单和官方兑换路径。"
        ]
      }
    : locale === "zh-TW"
      ? {
          kicker: "官方渠道",
          title: "每日資訊頁的主要觀察來源",
          labels: ["最快社群層", "版本說明", "兌換碼板"],
          bodies: [
            "維護說明、里程碑發帖與最快冒出來的新禮包碼，通常還是先從這裡出現。",
            "當社群安靜時，商店版本說明仍然可能透露更新字樣、版本變化與功能動向。",
            "回到兌換碼頁查看最新活躍條目、複測名單與官方兌換路徑。"
          ]
        }
      : {
          kicker: "Official channels",
          title: "Main sources for the daily desk",
          labels: ["Fastest social layer", "Patch wording", "Codes board"],
          bodies: [
            "Maintenance notes, milestone posts, and the fastest visible gift-code drops.",
            "Patch wording, version changes, and feature references when social posts go quiet.",
            "Jump back to the codes page for the latest active entries, retest queue, and direct redeem flow."
          ]
        };

  const applyLiveFeed = () => {
    const regionFeed = getRegionFeed();
    const regionName = t(`shared.regions.${region}`, liveFeed.market_label?.[region] || region);
    const updatedDisplay = liveFeed.updated_display?.[region] || liveFeed.updated_display?.global || copy.manualUpdate;
    const updatedStatus = liveFeed.updated_status?.[region] || liveFeed.updated_status?.global || copy.manualSource;
    const marketLabel = liveFeed.market_label?.[region] || regionName;
    const scopeText = regionFeed.scope || copy.scopeFallback;

    if (memoField) {
      memoField.value = loadMemo();
    }

    if (memoStatus) {
      memoStatus.textContent = t("today.memoStatus", copy.saved);
    }

    if (resetValue) {
      resetValue.textContent = formatResetCountdown(Number(liveFeed.server_reset_utc_hour || 0));
    }

    if (updatedValue) {
      updatedValue.textContent = updatedDisplay;
    }

    if (updatedBadge) {
      updatedBadge.textContent = updatedStatus;
    }

    if (marketValue) {
      marketValue.textContent = marketLabel;
    }

    if (marketRegion) {
      marketRegion.textContent = regionName;
    }

    if (scopeTitle) {
      scopeTitle.textContent = regionName;
    }

    if (scopeBody) {
      scopeBody.textContent = scopeText;
    }

    if (showcaseKicker) {
      showcaseKicker.textContent = showcaseCopy.kicker;
    }
    if (showcaseTitle) {
      showcaseTitle.textContent = showcaseCopy.title;
    }
    if (showcaseBody) {
      showcaseBody.textContent = showcaseCopy.body;
    }
    showcaseTags.forEach((tag, index) => {
      if (showcaseCopy.tags[index]) {
        tag.textContent = showcaseCopy.tags[index];
      }
    });

    if (sourceKicker) {
      sourceKicker.textContent = sourceCopy.kicker;
    }
    if (sourceTitle) {
      sourceTitle.textContent = sourceCopy.title;
    }
    sourceLabels.forEach((label, index) => {
      if (sourceCopy.labels[index]) {
        label.textContent = sourceCopy.labels[index];
      }
    });
    sourceBodies.forEach((body, index) => {
      if (sourceCopy.bodies[index]) {
        body.textContent = sourceCopy.bodies[index];
      }
    });

    decisionCards.forEach((card, index) => {
      const content = decisionCopy[index];
      if (!content) {
        return;
      }
      const kicker = card.querySelector(".section-kicker");
      const title = card.querySelector("h2");
      const body = card.querySelector("p:last-child");

      if (kicker) {
        kicker.textContent = content.kicker;
      }
      if (title) {
        title.textContent = content.title;
      }
      if (body) {
        body.textContent = content.body;
      }
    });

    renderList(regionFeed.focus_items || liveFeed.focus_items || [], focusList, createFocusItem);
    renderList(regionFeed.official_updates || liveFeed.official_updates || [], updatesList, createUpdateItem);
    renderList(regionFeed.practical_notes || liveFeed.practical_notes || [], notesList, createNoteItem);
    renderList(Array.isArray(pipelineNotes) ? pipelineNotes : [], pipelineList, createNoteItem);
  };

  const applyRefreshCopy = () => {
    if (refreshKicker) {
      refreshKicker.textContent = copy.refreshKicker;
    }
    if (refreshTitle) {
      refreshTitle.textContent = copy.refreshTitle;
    }
    if (refreshButton) {
      refreshButton.textContent = copy.refreshButton;
    }
    if (refreshLogLink) {
      refreshLogLink.textContent = copy.refreshLog;
    }
    setRefreshStatus(copy.refreshWaiting, "loading");
  };

  memoField?.addEventListener("input", () => {
    saveMemo(memoField.value);
  });

  const refreshFeed = async (isManual = false) => {
    setRefreshStatus(copy.loading, "loading");
    if (refreshButton) {
      refreshButton.disabled = true;
    }

    try {
      const response = await fetch(`../data/live-feed.json?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`live-feed ${response.status}`);
      }
      liveFeed = await response.json();
      lastBrowserRefresh = new Date();
      applyLiveFeed();
      setRefreshStatus(formatBrowserRefresh(), "ok");
    } catch {
      if (!Object.keys(liveFeed).length) {
        liveFeed = {};
        applyLiveFeed();
      }
      setRefreshStatus(copy.failedRefresh, "error");
    } finally {
      if (refreshButton) {
        refreshButton.disabled = false;
      }
    }
  };

  const bootstrap = async () => {
    applyRefreshCopy();
    await refreshFeed(false);
    window.clearInterval(refreshTimer);
    refreshTimer = window.setInterval(() => {
      refreshFeed(false);
    }, refreshIntervalMs);
  };

  refreshButton?.addEventListener("click", () => {
    refreshFeed(true);
  });

  bootstrap();
}
