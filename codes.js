const codesPanel = document.querySelector("[data-codes-panel]");

if (codesPanel) {
  const locale = window.kingshotLocale || "en";
  const t = window.kingshotI18n?.t;
  const data = window.kingshotSiteData;
  const copiedStatus = codesPanel.querySelector("#copied-status");
  const checkedValue = codesPanel.querySelector("#codes-checked-value");
  const confirmedCount = codesPanel.querySelector("#codes-confirmed-count");
  const retestCount = codesPanel.querySelector("#codes-retest-count");
  const snapshotDate = codesPanel.querySelector("#codes-snapshot-date");
  const heroTags = Array.from(codesPanel.querySelectorAll(".codes-hero-tag"));
  const visualKicker = codesPanel.querySelector(".codes-visual-kicker");
  const visualTitle = codesPanel.querySelector(".codes-visual-title");
  const visualBody = codesPanel.querySelector(".codes-visual-body");
  const checkedStorageKey = "kingshot-codes-last-check";

  const strings = {
    en: {
      copied: "Copied {code}",
      copyFailed: "Copy failed for {code}",
      manualCopy: "Clipboard blocked. Select and copy {code} manually.",
      savedCheck: "Saved your last code check time",
      notChecked: "Not checked yet",
      unavailable: "Storage unavailable",
      openRedeem: "Open redeem page",
      openSource: "Open code tracker",
      activeTitle: "Official active code board",
      activeBody:
        "Put the safest confirmed code first, then separate tracker entries that still need a real retest. That clarity keeps repeat visitors trusting the page.",
      activeKicker: "Use this first",
      archiveTitle: "Useful expired archive",
      archiveBody:
        "Expired codes still matter because they prevent wasted attempts and show how official campaign naming patterns usually work.",
      stepsTitle: "How to redeem and find Player ID",
      stepsBody:
        "The official redeem flow is simple, but players still forget where to find Player ID or which page to use.",
      notesTitle: "How to catch new codes faster",
      notesBody:
        "Check the official codes page first, then watch the official Facebook page during campaigns, updates, and milestone posts. That is usually where the next real code appears earliest.",
      metaLiveLabel: "Confirmed live",
      metaRetestLabel: "Retest first",
      metaSnapshotLabel: "Snapshot",
      activeStatusVerified: "Confirmed live",
      activeStatusRetest: "Retest first",
      activeStatusStale: "Tracker flag looks stale",
      officialSource: "Open tracker list",
      reliabilityTitle: "How this board is separated",
      reliabilityBody:
        "One code is clearly the safest first try. The rest appear in the current tracker snapshot, but they should be retested before being treated as fully confirmed.",
      watchlistBadge: "Needs retest",
      heroTags: ["Active codes", "Expired archive", "Redeem steps", "Source watch"],
      visualKicker: "Code guide",
      visualTitle: "Tracked code status, expired archive, and direct redeem access",
      visualBody:
        "Check the safest current entries first, keep expired campaign codes separate, and use the redeem path without leaving the page flow."
    },
    "zh-CN": {
      copied: "已复制 {code}",
      copyFailed: "复制 {code} 失败",
      manualCopy: "剪贴板受限，请手动复制 {code}",
      savedCheck: "已保存你的检查时间",
      notChecked: "还没检查过",
      unavailable: "本地存储不可用",
      openRedeem: "打开兑换页",
      openSource: "打开码库追踪页",
      activeTitle: "官方兑换码主看板",
      activeBody:
        "把当前最稳的可用码放最前，再把追踪页仍显示活跃但需要复测的码单独分层，这样玩家才会信任这页。",
      activeKicker: "先看这里",
      archiveTitle: "有用的失效归档",
      archiveBody:
        "失效码不是废内容。它能减少玩家反复试错，也能帮助判断官方常见的活动命名模式。",
      stepsTitle: "怎么兑换 + 怎么找 Player ID",
      stepsBody:
        "官方兑换流程并不复杂，但大量玩家会卡在 Player ID 不知道在哪、或者不知道该去哪个页面兑换。",
      notesTitle: "怎样更快发现新兑换码",
      notesBody:
        "先查 Kingshot.net 官方页，再盯官方 Facebook 的活动、维护和里程碑发帖。真正的新码，通常最早就从这两处冒出来。",
      metaLiveLabel: "确认可用",
      metaRetestLabel: "建议复测",
      metaSnapshotLabel: "快照日期",
      activeStatusVerified: "确认可用",
      activeStatusRetest: "追踪页显示活跃，先复测",
      activeStatusStale: "追踪页疑似残留标记",
      officialSource: "打开追踪列表",
      reliabilityTitle: "这个榜单怎么分层",
      reliabilityBody:
        "目前只有长期码可以放心放在最前。其余码虽然出现在当前追踪快照里，但更适合作为观察名单，先复测再对外写死为可用。",
      watchlistBadge: "先复测",
      heroTags: ["活跃兑换码", "失效归档", "兑换步骤", "来源观察"],
      visualKicker: "兑换码专题",
      visualTitle: "追踪码状态、失效归档与直达兑换入口",
      visualBody:
        "优先查看当前最稳的可用码，把过期活动码单独归档，并保留兑换路径，方便快速完成领取。"
    },
    "zh-TW": {
      copied: "已複製 {code}",
      copyFailed: "複製 {code} 失敗",
      manualCopy: "剪貼簿受限，請手動複製 {code}",
      savedCheck: "已儲存你的檢查時間",
      notChecked: "還沒檢查過",
      unavailable: "本地儲存不可用",
      openRedeem: "打開兌換頁",
      openSource: "打開碼庫追蹤頁",
      activeTitle: "官方兌換碼主看板",
      activeBody:
        "把目前最穩的可用碼放最前，再把追蹤頁仍顯示活躍但需要複測的碼單獨分層，這樣使用者才會信任這頁。",
      activeKicker: "先看這裡",
      archiveTitle: "有用的失效歸檔",
      archiveBody:
        "失效碼不是廢內容。它能減少玩家反覆試錯，也能幫助判斷官方常見的活動命名模式。",
      stepsTitle: "怎麼兌換 + 怎麼找 Player ID",
      stepsBody:
        "官方兌換流程不複雜，但很多玩家會卡在 Player ID 不知道在哪，或是不知道該去哪個頁面兌換。",
      notesTitle: "怎樣更快找到新兌換碼",
      notesBody:
        "先查 Kingshot.net 官方頁，再盯官方 Facebook 的活動、維護和里程碑發帖。真正的新碼，通常最早就從這兩處冒出來。",
      metaLiveLabel: "確認可用",
      metaRetestLabel: "建議複測",
      metaSnapshotLabel: "快照日期",
      activeStatusVerified: "確認可用",
      activeStatusRetest: "追蹤頁顯示活躍，先複測",
      activeStatusStale: "追蹤頁疑似殘留標記",
      officialSource: "打開追蹤列表",
      reliabilityTitle: "這個榜單怎麼分層",
      reliabilityBody:
        "目前只有長期碼可以放心放在最前。其餘碼雖然出現在目前追蹤快照裡，但更適合作為觀察名單，先複測再對外寫死為可用。",
      watchlistBadge: "先複測",
      heroTags: ["活躍兌換碼", "失效歸檔", "兌換步驟", "來源觀察"],
      visualKicker: "兌換碼專題",
      visualTitle: "追蹤碼狀態、失效歸檔與直達兌換入口",
      visualBody:
        "優先查看目前最穩的可用碼，把過期活動碼單獨歸檔，並保留兌換路徑，方便快速完成領取。"
    }
  };

  const i18n = strings[locale] || strings.en;
  const localizedSteps = {
    en: data?.redeemGuide?.playerIdSteps || [],
    "zh-CN": [
      "打开 Kingshot 游戏。",
      "点击左上角头像进入个人资料。",
      "在角色名下方找到 Player ID。",
      "打开官方兑换页面并粘贴 Player ID。",
      "输入礼包码后回到游戏邮件领取奖励。"
    ],
    "zh-TW": [
      "打開 Kingshot 遊戲。",
      "點擊左上角頭像進入個人資料。",
      "在角色名下方找到 Player ID。",
      "打開官方兌換頁面並貼上 Player ID。",
      "輸入禮包碼後回到遊戲郵件領取獎勵。"
    ]
  };
  const localizedNotes = {
    en: data?.redeemGuide?.notes || [],
    "zh-CN": [
      "每个兑换码通常只能对同一账号使用一次。",
      "短时效礼包码经常会在活动期间突然失效。",
      "如果官方活跃列表不再显示该码，就应尽快移入失效归档。"
    ],
    "zh-TW": [
      "每個兌換碼通常只能對同一帳號使用一次。",
      "短時效禮包碼常會在活動期間突然失效。",
      "如果官方活躍列表不再顯示該碼，就應盡快移入失效歸檔。"
    ]
  };

  const uiText = (key, fallback) => {
    if (typeof t === "function") {
      const value = t(key);
      if (typeof value === "string") {
        return value;
      }
    }
    return fallback;
  };

  const fallbackLocale = locale === "zh-CN" ? "zh-CN" : locale === "zh-TW" ? "zh-TW" : "en";
  const manualStrings = {
    copyCode: fallbackLocale === "zh-CN" ? "复制兑换码" : fallbackLocale === "zh-TW" ? "複製兌換碼" : "Copy code",
    expired: fallbackLocale === "zh-CN" ? "已失效" : fallbackLocale === "zh-TW" ? "已失效" : "Expired",
    midAdTitle: fallbackLocale === "zh-CN" ? "赞助内容" : fallbackLocale === "zh-TW" ? "贊助內容" : "Sponsored"
  };

  const setStatus = (message) => {
    if (copiedStatus) {
      copiedStatus.textContent = message;
    }
  };

  const saveCheckTime = () => {
    try {
      const stamp = new Date().toLocaleString();
      window.localStorage.setItem(checkedStorageKey, stamp);
      if (checkedValue) {
        checkedValue.textContent = stamp;
      }
    } catch {
      if (checkedValue) {
        checkedValue.textContent = i18n.unavailable;
      }
    }
  };

  try {
    const saved = window.localStorage.getItem(checkedStorageKey);
    if (checkedValue) {
      checkedValue.textContent = saved || uiText("codes.notChecked", i18n.notChecked);
    }
  } catch {
    if (checkedValue) {
      checkedValue.textContent = i18n.unavailable;
    }
  }

  codesPanel.querySelector("#mark-codes-checked")?.addEventListener("click", () => {
    saveCheckTime();
    setStatus(i18n.savedCheck);
  });

  const fallbackCopy = (code) => {
    const helper = document.createElement("textarea");
    helper.value = code;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    helper.setSelectionRange(0, helper.value.length);

    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }

    document.body.removeChild(helper);
    return ok;
  };

  const copyCode = async (code) => {
    if (!code) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        setStatus(i18n.copied.replace("{code}", code));
        return;
      }
    } catch {
      // fall through to manual fallback
    }

    if (fallbackCopy(code)) {
      setStatus(i18n.copied.replace("{code}", code));
    } else {
      setStatus(i18n.manualCopy.replace("{code}", code));
    }
  };

  const resolveField = (entry, base) => {
    if (locale === "zh-CN" && entry[`${base}Zh`]) {
      return entry[`${base}Zh`];
    }
    if (locale === "zh-TW" && entry[`${base}Tw`]) {
      return entry[`${base}Tw`];
    }
    return entry[base];
  };

  const renderPattern = (pattern) => {
    if (typeof pattern === "string") {
      return pattern;
    }
    if (locale === "zh-CN" && pattern.zh) {
      return pattern.zh;
    }
    if (locale === "zh-TW" && pattern.tw) {
      return pattern.tw;
    }
    return pattern.en || "";
  };

  const renderStatusLabel = (entry) => {
    if (entry.confidence === "verified") {
      return i18n.activeStatusVerified;
    }
    if (entry.confidence === "stale") {
      return i18n.activeStatusStale;
    }
    return i18n.activeStatusRetest;
  };

  if (!data) {
    setStatus(uiText("codes.helper", i18n.unavailable));
  } else {
    const intro = codesPanel.querySelector(".codes-intro-card");
    if (intro) {
      const paragraph = intro.querySelector("p:last-child");
      if (paragraph) {
        paragraph.textContent = uiText("codes.introBody", i18n.activeBody);
      }
    }

    heroTags.forEach((tag, index) => {
      if (i18n.heroTags[index]) {
        tag.textContent = i18n.heroTags[index];
      }
    });

    if (visualKicker) {
      visualKicker.textContent = i18n.visualKicker;
    }
    if (visualTitle) {
      visualTitle.textContent = i18n.visualTitle;
    }
    if (visualBody) {
      visualBody.textContent = i18n.visualBody;
    }

    if (confirmedCount) {
      confirmedCount.textContent = String(data.codes.reliableCount || 0);
    }
    if (retestCount) {
      retestCount.textContent = String(data.codes.retestCount || 0);
    }
    if (snapshotDate) {
      snapshotDate.textContent = data.codes.snapshotDate || "--";
    }

    const split = codesPanel.querySelector(".codes-primary-split");
    if (split) {
      const steps = localizedSteps[locale] || localizedSteps.en;
      const notes = localizedNotes[locale] || localizedNotes.en;
      split.innerHTML = `
        <article class="code-live-column">
          <div class="section-head compact-section-head">
            <div>
              <p class="section-kicker">${i18n.activeKicker}</p>
              <h2>${i18n.activeTitle}</h2>
            </div>
            <a class="text-link" href="${data.officialLinks.codes}" target="_blank" rel="noreferrer">${i18n.officialSource}</a>
          </div>
          <p>${i18n.activeBody}</p>
          <div class="codes-reliability-banner">
            <strong>${i18n.reliabilityTitle}</strong>
            <p>${i18n.reliabilityBody}</p>
          </div>
          <div class="code-list">
            ${data.codes.active
              .map((entry) => {
                const type = resolveField(entry, "type");
                const note = resolveField(entry, "note");
                const expires = resolveField(entry, "expires");
                const status = renderStatusLabel(entry);
                const statusClass = entry.confidence === "verified" ? "live" : entry.confidence === "stale" ? "stale" : "watch";

                return `
                  <div class="code-card ${statusClass === "live" ? "code-card-live" : "code-card-watch"}">
                    <div class="code-card-topline">
                      <span class="code-state ${statusClass}">${type}</span>
                      <span class="code-confidence-pill">${status}</span>
                    </div>
                    <strong>${entry.code}</strong>
                    <p>${note}</p>
                    <p class="code-meta-line">${expires}</p>
                    <div class="code-actions-row">
                      <button class="button button-secondary code-copy-button" type="button" data-copy-code="${entry.code}">${uiText("codes.codes.0.copy", manualStrings.copyCode)}</button>
                      <a class="button button-primary code-link-button" href="${data.officialLinks.redeem}" target="_blank" rel="noreferrer">${i18n.openRedeem}</a>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </article>

        <article class="redeem-guide-card">
          <h2>${i18n.stepsTitle}</h2>
          <p>${i18n.stepsBody}</p>
          <ol class="codes-step-list">
            ${steps.map((step) => `<li>${step}</li>`).join("")}
          </ol>
          <div class="codes-link-stack">
            <a class="button button-primary" href="${data.officialLinks.redeem}" target="_blank" rel="noreferrer">${i18n.openRedeem}</a>
            <a class="button button-secondary" href="${data.officialLinks.codes}" target="_blank" rel="noreferrer">${i18n.openSource}</a>
          </div>
          <div class="codes-note-list">
            ${notes.map((note) => `<p class="live-note">${note}</p>`).join("")}
          </div>
        </article>
      `;
    }

    const archiveArticle = codesPanel.querySelector(".codes-archive-section");
    if (archiveArticle) {
      archiveArticle.innerHTML = `
        <div class="section-head compact-section-head">
          <div>
            <p class="section-kicker">${uiText("codes.expired", manualStrings.expired)}</p>
            <h2>${i18n.archiveTitle}</h2>
          </div>
          <span class="archive-count-pill">${String(data.codes.archive.length || 0)}</span>
        </div>
        <p>${i18n.archiveBody}</p>
        <div class="archive-grid">
          ${data.codes.archive
            .map((entry) => `
              <div class="code-card expired">
                <span class="code-state dead">${resolveField(entry, "label")}</span>
                <strong>${entry.code}</strong>
                <p>${resolveField(entry, "note")}</p>
              </div>
            `)
            .join("")}
        </div>
      `;
    }

    const noteCard = codesPanel.querySelector(".codes-patterns-note");
    if (noteCard) {
      noteCard.innerHTML = `
        <h2>${i18n.notesTitle}</h2>
        <p>${i18n.notesBody}</p>
        <div class="pattern-grid">
          ${data.codes.patterns.map((pattern) => `<article class="pattern-card"><p>${renderPattern(pattern)}</p></article>`).join("")}
        </div>
      `;
    }

    const adSlot = codesPanel.querySelector(".codes-mid-ad .ad-slot-inner");
    if (adSlot) {
      const adTitle = adSlot.querySelector("strong");
      const adBody = adSlot.querySelector("p");
      if (adTitle) {
        adTitle.textContent =
          manualStrings.midAdTitle;
      }
      if (adBody) {
        adBody.textContent =
          locale === "en"
            ? "Sponsored placement is kept after the usable code board so the main player task stays first."
            : locale === "zh-CN"
              ? "赞助内容放在主码板之后，优先保证玩家先完成兑换码检查。"
              : "贊助內容放在主碼板之後，優先保證玩家先完成兌換碼檢查。";
      }
    }
  }

  codesPanel.querySelectorAll("[data-copy-code]").forEach((button) => {
    button.addEventListener("click", () => {
      copyCode(button.dataset.copyCode || "");
    });
  });
}
