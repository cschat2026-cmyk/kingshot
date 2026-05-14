const eventDecisionRoot = document.querySelector("[data-event-decision]");
const heroDecisionRoot = document.querySelector("[data-hero-decision]");

const locale = window.kingshotLocale || "en";

const decisionStrings = {
  en: {
    saved: "Saved locally",
    failed: "Save failed",
    unavailable: "Storage unavailable",
    eventVerdicts: {
      hold: {
        title: "Hold resources",
        body: "This looks like a low-leverage window. Save gems, speedups, or pulls for a stronger overlap between rewards and roster value."
      },
      selective: {
        title: "Spend selectively",
        body: "There is some value here, but only if the spend fixes a real march weakness or pushes an event tier you actually care about."
      },
      go: {
        title: "Good spend window",
        body: "This is one of the cleaner times to spend because event rewards, roster need, and account direction are lining up together."
      }
    },
    heroVerdicts: {
      skip: {
        title: "Probably skip",
        body: "This hero does not look important enough for your current account stage or event value. Save premium resources."
      },
      situational: {
        title: "Only pull with a clear reason",
        body: "There is some value here, but the banner is not strong enough for blind spending. Pull only if it fixes a real lineup gap."
      },
      chase: {
        title: "Worth serious consideration",
        body: "This hero can justify spending when your main march, event score, and account stage all line up."
      }
    }
  },
  "zh-CN": {
    saved: "已保存在本地",
    failed: "保存失败",
    unavailable: "本地存储不可用",
    eventVerdicts: {
      hold: {
        title: "继续囤资源",
        body: "这更像是低杠杆窗口。把钻石、加速或抽卡资源留给奖励和阵容价值更重合的时机。"
      },
      selective: {
        title: "有选择地花",
        body: "这轮不是完全没价值，但前提是它能补主力队缺口，或者帮你稳定打进想要的活动层级。"
      },
      go: {
        title: "这是较好的花费窗口",
        body: "这类时机通常更值得出手，因为奖励、阵容需求和账号方向是对齐的。"
      }
    },
    heroVerdicts: {
      skip: {
        title: "大概率该跳过",
        body: "以你当前账号阶段和活动价值来看，这个英雄还不够值得你交高级资源。"
      },
      situational: {
        title: "只有明确理由才考虑抽",
        body: "这轮有一些价值，但不适合盲抽。只有它能补真实阵容缺口时才值得碰。"
      },
      chase: {
        title: "值得认真考虑",
        body: "如果主力队、活动得分和账号阶段都对得上，这个英雄就有追的理由。"
      }
    }
  },
  "zh-TW": {
    saved: "已保存在本地",
    failed: "儲存失敗",
    unavailable: "本地儲存不可用",
    eventVerdicts: {
      hold: {
        title: "繼續囤資源",
        body: "這更像是低槓桿窗口。把鑽石、加速或抽卡資源留給獎勵和陣容價值更重合的時機。"
      },
      selective: {
        title: "有選擇地花",
        body: "這輪不是完全沒價值，但前提是它能補主力隊缺口，或幫你穩定打進想要的活動層級。"
      },
      go: {
        title: "這是較好的花費窗口",
        body: "這類時機通常更值得出手，因為獎勵、陣容需求和帳號方向是對齊的。"
      }
    },
    heroVerdicts: {
      skip: {
        title: "大概率該跳過",
        body: "以你目前帳號階段和活動價值來看，這個英雄還不夠值得你交高級資源。"
      },
      situational: {
        title: "只有明確理由才考慮抽",
        body: "這輪有一些價值，但不適合盲抽。只有它能補真實陣容缺口時才值得碰。"
      },
      chase: {
        title: "值得認真考慮",
        body: "如果主力隊、活動得分和帳號階段都對得上，這個英雄就有追的理由。"
      }
    }
  }
};

const decisionText = decisionStrings[locale] || decisionStrings.en;

const setStatus = (node, message) => {
  if (node) {
    node.textContent = message;
  }
};

const fallbackText = {
  event: {
    en: {
      kicker: "Spend decision helper",
      title: "Check whether this is a real spend window",
      labels: [
        "How good is the current event reward window?",
        "How badly does your main march need this spend?",
        "How healthy is your reserve after spending?"
      ],
      options: [
        ["Low value", "Medium value", "High value"],
        ["Mostly cosmetic", "Useful upgrade", "Real missing piece"],
        ["Leaves me dry", "Still manageable", "Still comfortable"]
      ]
    },
    "zh-CN": {
      kicker: "花不花判断器",
      title: "先判断这是不是一个值得交资源的窗口",
      labels: ["当前活动奖励窗口价值如何？", "你的主力队有多需要这次花费？", "花完以后资源余量健康吗？"],
      options: [
        ["低价值", "中等价值", "高价值"],
        ["主要是外观冲动", "算是有用提升", "是真缺这块"],
        ["会被抽干", "还能接受", "仍然舒服"]
      ]
    },
    "zh-TW": {
      kicker: "花不花判斷器",
      title: "先判斷這是不是一個值得交資源的窗口",
      labels: ["目前活動獎勵窗口價值如何？", "你的主力隊有多需要這次花費？", "花完以後資源餘量健康嗎？"],
      options: [
        ["低價值", "中等價值", "高價值"],
        ["主要是外觀衝動", "算是有用提升", "是真缺這塊"],
        ["會被抽乾", "還能接受", "仍然舒服"]
      ]
    }
  },
  hero: {
    en: {
      kicker: "Pull decision helper",
      title: "Check whether this hero is actually worth chasing",
      labels: [
        "How mature is your account right now?",
        "How strong is this hero for your real lineup need?",
        "How good is the event around this banner?"
      ],
      options: [
        ["Early account", "Mid account", "Mature account with clear main march"],
        ["Looks nice but not needed", "Useful upgrade", "Fixes a real weakness"],
        ["Weak value window", "Acceptable window", "Strong event overlap"]
      ]
    },
    "zh-CN": {
      kicker: "抽不抽判断器",
      title: "先判断这轮英雄到底值不值得追",
      labels: ["你现在的账号阶段成熟度如何？", "这个英雄对你真实阵容需求有多强？", "围绕这个池子的活动窗口质量如何？"],
      options: [
        ["前期账号", "中期账号", "主力队已经明确的成熟账号"],
        ["看起来不错但并不缺", "算是有用提升", "能补真实缺口"],
        ["弱窗口", "一般窗口", "强叠加窗口"]
      ]
    },
    "zh-TW": {
      kicker: "抽不抽判斷器",
      title: "先判斷這輪英雄到底值不值得追",
      labels: ["你現在的帳號階段成熟度如何？", "這個英雄對你真實陣容需求有多強？", "圍繞這個池子的活動窗口品質如何？"],
      options: [
        ["前期帳號", "中期帳號", "主力隊已經明確的成熟帳號"],
        ["看起來不錯但並不缺", "算是有用提升", "能補真實缺口"],
        ["弱窗口", "一般窗口", "強疊加窗口"]
      ]
    }
  }
};

const applySelectLabels = (root, config, ids) => {
  if (!root || !config) {
    return;
  }

  const kicker = root.querySelector(".section-kicker");
  const title = root.querySelector(".planner-result") ? root.querySelector("h2") : null;
  if (kicker) {
    kicker.textContent = config.kicker;
  }
  if (title && title.id !== ids.resultTitle) {
    title.textContent = config.title;
  }

  ids.labels.forEach((id, index) => {
    const label = root.querySelector(`label[for="${id}"]`);
    if (label) {
      label.textContent = config.labels[index];
    }
    const select = root.querySelector(`#${id}`);
    if (select && Array.isArray(config.options[index])) {
      Array.from(select.options).forEach((option, optionIndex) => {
        if (config.options[index][optionIndex]) {
          option.textContent = config.options[index][optionIndex];
        }
      });
    }
  });
};

if (eventDecisionRoot) {
  const storageKey = "kingshot-event-decision";
  const inputs = {
    event: eventDecisionRoot.querySelector("#event-value"),
    lineup: eventDecisionRoot.querySelector("#lineup-need"),
    reserve: eventDecisionRoot.querySelector("#reserve-level")
  };
  const title = eventDecisionRoot.querySelector("#event-decision-title");
  const body = eventDecisionRoot.querySelector("#event-decision-body");
  const note = eventDecisionRoot.querySelector("#event-decision-note");
  const status = eventDecisionRoot.querySelector("#event-decision-status");

  applySelectLabels(eventDecisionRoot, fallbackText.event[locale] || fallbackText.event.en, {
    labels: ["event-value", "lineup-need", "reserve-level"],
    resultTitle: "event-decision-title"
  });

  const renderEventDecision = () => {
    const eventValue = Number(inputs.event?.value || 0);
    const lineupNeed = Number(inputs.lineup?.value || 0);
    const reserveLevel = Number(inputs.reserve?.value || 0);
    const score = eventValue + lineupNeed + reserveLevel;

    let verdict = "hold";
    if (score >= 7) {
      verdict = "go";
    } else if (score >= 4) {
      verdict = "selective";
    }

    title.textContent = decisionText.eventVerdicts[verdict].title;
    body.textContent = decisionText.eventVerdicts[verdict].body;
    note.textContent =
      verdict === "go"
        ? locale === "en"
          ? "You still need discipline: spend only on the part that changes your next real outcome."
          : locale === "zh-CN"
            ? "即使值得花，也要有纪律，只把资源交给真正改变结果的部分。"
            : "即使值得花，也要有紀律，只把資源交給真正改變結果的部分。"
        : verdict === "selective"
          ? locale === "en"
            ? "Use a narrow target: one role, one event tier, one account problem."
            : locale === "zh-CN"
              ? "把目标收窄：只解决一个角色、一个层级、一个账号问题。"
              : "把目標收窄：只解決一個角色、一個層級、一個帳號問題。"
          : locale === "en"
            ? "Waiting is still a decision. Good accounts lose less because they pass more often."
            : locale === "zh-CN"
              ? "继续囤本身也是决策。强账号很多时候不是花得多，而是忍得住。"
              : "繼續囤本身也是決策。強帳號很多時候不是花得多，而是忍得住。";

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          eventValue,
          lineupNeed,
          reserveLevel
        })
      );
      setStatus(status, decisionText.saved);
    } catch {
      setStatus(status, decisionText.failed);
    }
  };

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    if (saved.eventValue && inputs.event) {
      inputs.event.value = String(saved.eventValue);
    }
    if (saved.lineupNeed && inputs.lineup) {
      inputs.lineup.value = String(saved.lineupNeed);
    }
    if (saved.reserveLevel && inputs.reserve) {
      inputs.reserve.value = String(saved.reserveLevel);
    }
  } catch {
    setStatus(status, decisionText.unavailable);
  }

  Object.values(inputs).forEach((input) => {
    input?.addEventListener("change", renderEventDecision);
  });

  renderEventDecision();
}

if (heroDecisionRoot) {
  const storageKey = "kingshot-hero-decision";
  const inputs = {
    stage: heroDecisionRoot.querySelector("#hero-stage"),
    fit: heroDecisionRoot.querySelector("#hero-fit"),
    event: heroDecisionRoot.querySelector("#hero-event-fit")
  };
  const title = heroDecisionRoot.querySelector("#hero-decision-title");
  const body = heroDecisionRoot.querySelector("#hero-decision-body");
  const note = heroDecisionRoot.querySelector("#hero-decision-note");
  const status = heroDecisionRoot.querySelector("#hero-decision-status");

  applySelectLabels(heroDecisionRoot, fallbackText.hero[locale] || fallbackText.hero.en, {
    labels: ["hero-stage", "hero-fit", "hero-event-fit"],
    resultTitle: "hero-decision-title"
  });

  const renderHeroDecision = () => {
    const stage = Number(inputs.stage?.value || 0);
    const fit = Number(inputs.fit?.value || 0);
    const eventFit = Number(inputs.event?.value || 0);
    const score = stage + fit + eventFit;

    let verdict = "skip";
    if (score >= 7) {
      verdict = "chase";
    } else if (score >= 4) {
      verdict = "situational";
    }

    title.textContent = decisionText.heroVerdicts[verdict].title;
    body.textContent = decisionText.heroVerdicts[verdict].body;
    note.textContent =
      verdict === "chase"
        ? locale === "en"
          ? "Best case: the hero improves your current march and lands inside a worthwhile event."
          : locale === "zh-CN"
            ? "最理想的情况，是这个英雄既能强化当前主力队，又正好落在值得出手的活动窗口里。"
            : "最理想的情況，是這個英雄既能強化目前主力隊，又正好落在值得出手的活動窗口裡。"
        : verdict === "situational"
          ? locale === "en"
            ? "Do not pull because the hero looks good. Pull only because the account case is strong."
            : locale === "zh-CN"
              ? "不要因为英雄看起来强就抽，只能因为你的账号理由足够强才抽。"
              : "不要因為英雄看起來強就抽，只能因為你的帳號理由足夠強才抽。"
          : locale === "en"
            ? "Skipping a weak-fit banner is often the biggest upgrade decision available."
            : locale === "zh-CN"
              ? "跳过不契合的池子，很多时候就是最好的成长决策。"
              : "跳過不契合的池子，很多時候就是最好的成長決策。";

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          stage,
          fit,
          eventFit
        })
      );
      setStatus(status, decisionText.saved);
    } catch {
      setStatus(status, decisionText.failed);
    }
  };

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    if (saved.stage && inputs.stage) {
      inputs.stage.value = String(saved.stage);
    }
    if (saved.fit && inputs.fit) {
      inputs.fit.value = String(saved.fit);
    }
    if (saved.eventFit && inputs.event) {
      inputs.event.value = String(saved.eventFit);
    }
  } catch {
    setStatus(status, decisionText.unavailable);
  }

  Object.values(inputs).forEach((input) => {
    input?.addEventListener("change", renderHeroDecision);
  });

  renderHeroDecision();
}
