const toolSearch = document.querySelector("#tool-search");
const chips = Array.from(document.querySelectorAll(".chip"));
const toolCards = Array.from(document.querySelectorAll(".tool-card"));

let activeFilter = "all";

const normalize = (value) => String(value || "").toLowerCase().trim();

const applyFilters = () => {
  const query = normalize(toolSearch?.value || "");

  toolCards.forEach((card) => {
    const tags = normalize(card.dataset.tags || "");
    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
    const matchesQuery = !query || tags.includes(query) || normalize(card.textContent).includes(query);
    card.classList.toggle("hidden", !(matchesFilter && matchesQuery));
  });
};

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter || "all";
    chips.forEach((item) => item.classList.toggle("active", item === chip));
    applyFilters();
  });
});

toolSearch?.addEventListener("input", applyFilters);
applyFilters();

const data = window.kingshotSiteData;

if (!data) {
  throw new Error("Missing Kingshot site data");
}

const locale = window.kingshotLocale || "en";

const localizedSteps = {
  en: data.redeemGuide.playerIdSteps,
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
  en: data.redeemGuide.notes,
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

const copyMap = {
  en: {
    brandTagline: "News. Codes. Builds. Events.",
    statusPill: "Kingshot live desk",
    topLinks: ["Official active codes", "Today in Kingshot", "Hero event windows", "Building route"],
    nav: ["Home", "Codes", "Today", "Heroes", "Events", "Builds"],
    heroEyebrow: "Daily Kingshot desk",
    heroTitle: "Kingshot codes, daily reset, hero timing, and build guides in one portal.",
    heroLead:
      "Check the newest codes, see what changed today, decide whether this is a save day or spend day, and jump straight into the guide that solves your next account bottleneck.",
    heroPrimary: "Open today's watch desk",
    heroSecondary: "Open active codes",
    heroTags: ["Codes", "Reset timer", "Hero events", "Build planner"],
    heroStoryKicker: "Top story",
    heroStoryTitle: `Version ${data.appMeta.currentVersion} still confirms Kingshot is in active live-ops rotation`,
    heroStoryBody:
      "The April 27, 2026 App Store update added Master System and March Skin wording, which keeps patch-watch and progression coverage relevant.",
    heroStoryLink: "Read today's watch",
    heroMetrics: [
      { value: String(data.codes.activeCount), label: "Active official codes" },
      { value: data.appMeta.currentVersion, label: "Current version" },
      { value: data.appMeta.rating, label: "Store rating" }
    ],
    visualKicker: "Game visuals",
    visualTitle: "Recognizable screenshots first, utility second, filler never",
    visualBody:
      "Make Kingshot recognizable at a glance, then move straight into codes, event timing, and progression pages.",
    ticker: [
      `${data.codes.activeCount} official codes are currently marked active`,
      `App Store version ${data.appMeta.currentVersion} dated ${data.appMeta.currentVersionDate} remains the newest live signal`,
      "Player ID redeem flow is documented in the codes guide"
    ],
    topNewsHeading: {
      kicker: "Latest watch",
      title: "Latest checks worth opening first",
      link: "View all on today's page"
    },
    topNews: [
      {
        date: "2026-05-13",
        label: "Codes",
        title: `${data.codes.activeCount} tracked code entries still justify a pre-reset check`,
        body: "If a player opens only one page today, the code board still delivers the fastest direct value. It keeps the safest first try above the retest list.",
        href: "./guides/codes.html",
        cta: "Open code board"
      },
      {
        date: data.appMeta.currentVersionDate,
        label: "Patch",
        title: `Version ${data.appMeta.currentVersion} remains the newest public store signal`,
        body: "Store notes are still the cleanest public patch signal when social channels are quiet, especially for older live-service titles.",
        href: "./guides/today.html",
        cta: "Read patch watch"
      },
      {
        date: "2026-05-13",
        label: "Events",
        title: "Hold today or spend today? This remains the highest-value repeat question",
        body: "Open the event page when you need a fast answer on premium resource timing, not a wall of generic event explanation.",
        href: "./guides/event-core.html",
        cta: "Open event guide"
      }
    ],
    guidesHeading: {
      kicker: "Popular guides",
      title: "Pages with the strongest repeat-open intent",
      link: "Browse guide library"
    },
    features: [
      {
        type: "Codes",
        title: "Tracked code board with direct copy and redeem actions",
        body: "Players need one fast page with usable codes first, watchlist entries second, and expired codes kept out of the way.",
        href: "./guides/codes.html",
        cta: "Read codes guide"
      },
      {
        type: "Heroes",
        title: "Hero priorities by account stage and event value",
        body: "Use the pull helper to decide whether a banner fixes a real lineup need or is better skipped.",
        href: "./guides/hero-meta.html",
        cta: "Read hero guide"
      },
      {
        type: "Buildings",
        title: "Find the next real building gate instead of upgrading blind",
        body: "Open the building planner to see which prerequisite chain actually blocks the next furnace or Town Center jump.",
        href: "./guides/building-planner.html",
        cta: "Open building page"
      }
    ],
    updatesHeading: {
      kicker: "Update desk",
      title: "What matters most right now"
    },
    updates: [
      {
        date: "Today",
        title: "First question: did a new code land today?",
        body: "Short-duration codes remain the fastest direct value. This check belongs above almost every other homepage action."
      },
      {
        date: "Focus",
        title: "Second question: is this a save day or a spend day?",
        body: "As strategy games age, users care less about broad basics and more about not burning premium resources in the wrong window."
      },
      {
        date: "Route",
        title: "Third question: what actually blocks the next upgrade?",
        body: "If the site cannot answer the next real bottleneck fast, players will go back to spreadsheets, Reddit, and Discord."
      }
    ],
    spotlightHeading: {
      kicker: "Must-read topics",
      title: "Featured strategy topics"
    },
    spotlightItems: [
      {
        label: "New players",
        title: "Beginner growth blueprint",
        body: "A strong catch-up page for new and returning accounts that need a clean first-week route.",
        href: "./guides/beginner-growth.html",
        cta: "Read guide"
      },
      {
        label: "Events",
        title: "Event rhythm and prep windows",
        body: "Use this page to line up score windows, save bursts, and weekly prep instead of wasting resources early.",
        href: "./guides/event-rhythm.html",
        cta: "Open rhythm guide"
      },
      {
        label: "Alliance",
        title: "Alliance ops checklist",
        body: "A saved daily checklist for officers and active members who need one practical routine page.",
        href: "./guides/alliance-ops.html",
        cta: "Use checklist"
      }
    ],
    visualBriefingHeading: {
      kicker: "Featured",
      title: "Game screenshots and key guide entries"
    },
    visualBriefingItems: [
      {
        kicker: "Codes",
        title: "Tracked codes, copy buttons, and expired archive",
        body: "Open the code board for the current safest code, retest candidates, expired history, and the redeem path.",
        image: data.assets.screenshots[0],
        href: "./guides/codes.html",
        cta: "Open code board"
      },
      {
        kicker: "Today",
        title: "Daily reset, region watch, and memo tools",
        body: "Open the daily desk for reset timing, official source links, code follow-up, and a saved local reminder.",
        image: data.assets.screenshots[3],
        href: "./guides/today.html",
        cta: "Open Today"
      },
      {
        kicker: "Progression",
        title: "Building routes, event timing, and hero planning",
        body: "Use these core pages to check upgrade order, event windows, and banner value before spending resources.",
        image: data.assets.screenshots[2],
        href: "./guides/building-planner.html",
        cta: "Open planner"
      }
    ],
    playerNeedsHeading: {
      kicker: "Core guides",
      title: "Priority topics to keep updated"
    },
    playerNeeds: [
      {
        label: "Events",
        title: "Spend-day and save-day planning",
        body: "Keep event windows, gem timing, and burst-resource guidance updated around the current hero cycle."
      },
      {
        label: "Codes",
        title: "Limited-time code checks",
        body: "Refresh active and expired code status whenever the official list or social posts change."
      },
      {
        label: "Buildings",
        title: "Furnace and Town Center bottlenecks",
        body: "Highlight the next prerequisite chain, key support buildings, and common queue traps."
      },
      {
        label: "Heroes",
        title: "Pull value by role and account stage",
        body: "Summarize which banners matter most, who benefits, and when waiting still makes more sense."
      }
    ],
    sourceWatchHeading: {
      kicker: "Official channels",
      title: "Main sources for updates and code checks"
    },
    sourceWatch: [
      {
        label: "Social",
        title: "Kingshot Official Facebook",
        body: "Monitor maintenance notices, milestone posts, and visible gift-code drops from the main public social feed.",
        href: data.officialLinks.facebook,
        cta: "Open Facebook"
      },
      {
        label: "Store page",
        title: "Kingshot App Store listing",
        body: "Watch version wording and feature notes for patch-style changes when social posts are quiet.",
        href: data.officialLinks.appStore,
        cta: "Open App Store"
      },
      {
        label: "Redeem",
        title: "Kingshot.net code tracker and redeem page",
        body: "Use this as a tracked code source and quick redeem path, but keep high-risk entries marked for retest until confirmed in game.",
        href: data.officialLinks.codes,
        cta: "Open code tracker"
      }
    ],
    databaseHeading: {
      kicker: "Most opened pages",
      title: "High-frequency entry points"
    },
    newsroomItems: [
      {
        kicker: "Reset habit",
        title: "Today in Kingshot",
        body: "Best for players who open one page daily to decide whether to check codes, hold resources, or prep tomorrow.",
        href: "./guides/today.html",
        cta: "Open today page"
      },
      {
        kicker: "Highest demand",
        title: "Active codes and redeem steps",
        body: "Still the clearest high-intent page because it solves the first task many returning players have.",
        href: "./guides/codes.html",
        cta: "Open codes"
      },
      {
        kicker: "Old-player problem",
        title: "Hero timing and gem discipline",
        body: "When a game ages, players usually stop asking what heroes do and start asking whether a banner is worth touching at all.",
        href: "./guides/event-core.html",
        cta: "Read event timing"
      }
    ],
    codesPanel: {
      kicker: "Code quick board",
      title: "The current active list worth checking first",
      body: "This mini board belongs on the homepage because code checks are one of the strongest repeat-open actions in the game.",
      cta: "Open full codes page",
      copy: "Copy",
      redeem: "Redeem",
      tracker: "Tracker",
      safeLabel: "Best first try",
      watchLabel: "Retest"
    },
    roadmapHeading: {
      kicker: "Redeem steps",
      title: "How players find Player ID and claim codes"
    },
    promoCodes: {
      kicker: "Codes",
      title: "Tracked code board",
      body: "Current safest code, retest candidates, expired archive, and redeem steps in one page.",
      cta: "Open codes"
    },
    promoToday: {
      kicker: "Today",
      title: "Daily reset and update watch",
      body: "One page for reset timing, region watch, code follow-up, and account reminders.",
      cta: "Open daily desk"
    },
    promoNews: {
      kicker: "Events",
      title: "Hall of Heroes and Hero Roulette timing",
      body: "Track hero-event windows, gem timing, and the best resource-saving opportunities.",
      cta: "Open event timing"
    },
    toolHub: {
      kicker: "Tool hub",
      title: "Find the exact page you need in seconds",
      placeholder: "Search guides, tools, and reference pages",
      chips: ["All", "Calculators", "Guides", "Alliance", "Reference"]
    },
    toolCards: [
      { type: "Daily desk", title: "Today in Kingshot", body: "Reset countdown, official watch feed, current focus, and a saved local memo.", cta: "Open page" },
      { type: "Reference", title: "Latest Codes Archive", body: "Tracked live codes, retest entries, expired history, and fast copy buttons.", cta: "Open page" },
      { type: "Hero guide", title: "Hero Meta and Priorities", body: "What to pull, what to skip, and how to think by generation and role.", cta: "Open page" },
      { type: "Event guide", title: "Hall of Heroes and Hero Roulette", body: "Weekly windows, gem logic, and which events deserve saved resources.", cta: "Open page" },
      { type: "Building guide", title: "Building Planner", body: "Town Center chain, military supports, and the upgrade order that matters most.", cta: "Open page" },
      { type: "Starter guide", title: "Beginner Growth Blueprint", body: "What to rush, what to save, and how to avoid wasting early resources.", cta: "Open page" }
    ],
    mobileDock: ["Home", "Today", "Codes", "Heroes", "Events"]
  },
  "zh-CN": {
    brandTagline: "资讯. 兑换码. 活动. 建筑.",
    statusPill: "Kingshot 实用攻略门户",
    topLinks: ["官方活跃兑换码", "今日 Kingshot", "英雄活动窗口", "建筑路线"],
    nav: ["首页", "兑换码", "今日", "英雄", "活动", "建筑"],
    heroEyebrow: "每日必开资讯台",
    heroTitle: "把 Kingshot 玩家每天最常打开的兑换码、重置、活动和养成攻略集中到一个首页。",
    heroLead:
      "先看兑换码有没有更新，再看今天该囤还是该花，然后直接跳进建筑、英雄或活动攻略解决当前卡点。",
    heroPrimary: "打开今日资讯台",
    heroSecondary: "打开活跃兑换码",
    heroTags: ["兑换码", "重置", "英雄活动", "建筑规划"],
    heroStoryKicker: "头条更新",
    heroStoryTitle: `版本 ${data.appMeta.currentVersion} 仍说明 Kingshot 处于持续运营节奏`,
    heroStoryBody:
      "App Store 在 2026 年 4 月 27 日更新到 1.10.7，并提到 Master System 与 March Skin 变化，这类公开版本信号仍值得持续追踪。",
    heroStoryLink: "查看今日观察",
    heroMetrics: [
      { value: String(data.codes.activeCount), label: "官方活跃码" },
      { value: data.appMeta.currentVersion, label: "当前版本" },
      { value: data.appMeta.rating, label: "商店评分" }
    ],
    visualKicker: "游戏实图",
    visualTitle: "先给真实游戏画面，再给玩家最有用的入口",
    visualBody:
      "用户应该先一眼认出这就是自己在玩的 Kingshot，然后立刻看到兑换码、活动判断和养成攻略。",
    ticker: [
      `当前官方活跃兑换码为 ${data.codes.activeCount} 个`,
      `最新公开版本信号仍是 ${data.appMeta.currentVersionDate} 的 ${data.appMeta.currentVersion}`,
      "兑换步骤与 Player ID 获取方式已整理进兑换码页"
    ],
    topNewsHeading: {
      kicker: "最新快讯",
      title: "玩家今天最该先看到的重点",
      link: "去今日资讯台看完整观察"
    },
    topNews: [
      {
        date: "2026-05-13",
        label: "兑换码",
        title: `当前仍有 ${data.codes.activeCount} 个追踪中的礼包码值得在重置前检查`,
        body: "如果玩家今天只打开一个页面，这个页面大概率还是兑换码板，因为它最容易直接影响当天收益。",
        href: "./guides/codes.html",
        cta: "打开兑换码板"
      },
      {
        date: data.appMeta.currentVersionDate,
        label: "版本",
        title: `版本 ${data.appMeta.currentVersion} 仍是现在最清晰的公开版本信号`,
        body: "对于这类已经有年龄的游戏，商店文字变化仍是判断内容周期有没有继续推进的重要依据。",
        href: "./guides/today.html",
        cta: "查看版本观察"
      },
      {
        date: "2026-05-13",
        label: "活动",
        title: "老玩家最常回来看的一句话：今天该囤还是该花？",
        body: "成熟玩家更在意资源窗口，而不是活动背景介绍，所以活动页必须先回答这个问题。",
        href: "./guides/event-core.html",
        cta: "打开活动攻略"
      }
    ],
    guidesHeading: {
      kicker: "热门攻略",
      title: "本周最容易形成回访的页面",
      link: "查看全部攻略"
    },
    features: [
      {
        type: "兑换码",
        title: "让玩家先来这里看兑换码，而不是回社媒翻帖",
        body: "一页把可用码、观察名单、失效码、复制按钮和兑换入口做好，才有资格成为固定入口。",
        href: "./guides/codes.html",
        cta: "阅读兑换码页"
      },
      {
        type: "英雄",
        title: "按账号阶段判断英雄价值，而不是只看表面强度",
        body: "现在已经补了判断器，让玩家直接看这轮英雄值不值得追，而不是只看泛泛强弱榜。",
        href: "./guides/hero-meta.html",
        cta: "阅读英雄攻略"
      },
      {
        type: "建筑",
        title: "下一层真正卡你的建筑是什么",
        body: "真正能留住玩家的建筑页，是直接告诉他下一层前置链和当前卡点，而不是叫他平均升级。",
        href: "./guides/building-planner.html",
        cta: "打开建筑页"
      }
    ],
    updatesHeading: {
      kicker: "今日重点",
      title: "玩家现在最该先确认的事"
    },
    updates: [
      {
        date: "现在",
        title: "第一件事：今天有没有新码",
        body: "短时效兑换码属于典型损失厌恶型内容，所以这一步应该永远排在前面。"
      },
      {
        date: "资源",
        title: "第二件事：今天到底该不该交资源",
        body: "成熟玩家真正想知道的是现在该花还是继续囤，不是活动背景介绍。"
      },
      {
        date: "养成",
        title: "第三件事：下一层真实卡点是什么",
        body: "如果站点不能快速回答这个问题，玩家最后还是会回到表格、群聊和外部计算器。"
      }
    ],
    spotlightHeading: {
      kicker: "必看专题",
      title: "重点策略专题"
    },
    spotlightItems: [
      {
        label: "新手",
        title: "新手成长蓝图",
        body: "整理开服阶段的建筑、资源和英雄优先级，适合新号快速查阅。",
        href: "./guides/beginner-growth.html",
        cta: "阅读攻略"
      },
      {
        label: "活动",
        title: "活动节奏与准备窗口",
        body: "这类内容最容易做出长线黏性，因为玩家会反复回来确认自己有没有踩错窗口。",
        href: "./guides/event-rhythm.html",
        cta: "打开节奏攻略"
      },
      {
        label: "联盟",
        title: "联盟日常清单",
        body: "给管理和活跃成员使用的日常任务清单与本地保存工具。",
        href: "./guides/alliance-ops.html",
        cta: "使用清单"
      }
    ],
    visualBriefingHeading: {
      kicker: "精选内容",
      title: "游戏截图与重点攻略入口"
    },
    visualBriefingItems: [
      {
        kicker: "兑换码",
        title: "追踪中的兑换码、观察名单与失效归档",
        body: "集中查看当前最稳的可用码、需要复测的条目，以及兑换入口直达路径。",
        image: data.assets.screenshots[0],
        href: "./guides/codes.html",
        cta: "打开兑换码板"
      },
      {
        kicker: "今日",
        title: "每日重置、地区观察与备忘工具",
        body: "打开今日页，快速查看重置时间、官方来源入口以及本地保存提醒。",
        image: data.assets.screenshots[3],
        href: "./guides/today.html",
        cta: "打开今日页"
      },
      {
        kicker: "养成",
        title: "建筑路线、活动时机与英雄规划",
        body: "围绕升级顺序、活动窗口和抽卡价值来整理高频养成攻略。",
        image: data.assets.screenshots[2],
        href: "./guides/building-planner.html",
        cta: "打开建筑规划"
      }
    ],
    playerNeedsHeading: {
      kicker: "核心攻略",
      title: "优先维护的重点主题"
    },
    playerNeeds: [
      {
        label: "活动",
        title: "花资源日与囤资源日判断",
        body: "持续更新当前英雄周期里的活动窗口、钻石时机和爆发资源使用建议。"
      },
      {
        label: "兑换码",
        title: "短时效礼包码检查",
        body: "当官方列表或社媒发帖更新时，及时同步活跃码和失效码状态。"
      },
      {
        label: "建筑",
        title: "炉子与主城前置卡点",
        body: "突出下一层前置链、关键支撑建筑，以及常见的建筑队列误区。"
      },
      {
        label: "英雄",
        title: "按角色与阶段看抽卡价值",
        body: "整理哪些卡池值得碰、适合什么账号阶段，以及哪些情况更适合继续等。"
      }
    ],
    sourceWatchHeading: {
      kicker: "官方渠道",
      title: "更新与兑换码检查的主要来源"
    },
    sourceWatch: [
      {
        label: "社媒",
        title: "Kingshot 官方 Facebook",
        body: "关注维护公告、里程碑发帖和公开可见的新礼包码动态。",
        href: data.officialLinks.facebook,
        cta: "打开 Facebook"
      },
      {
        label: "商店页",
        title: "Kingshot App Store 页面",
        body: "当社媒安静时，从商店版本说明补看更新字样、功能变化和修复说明。",
        href: data.officialLinks.appStore,
        cta: "打开 App Store"
      },
      {
        label: "兑换入口",
        title: "Kingshot.net 码库与兑换页",
        body: "把它作为码库追踪面和兑换入口使用，但对高风险条目保留复测标记。",
        href: data.officialLinks.codes,
        cta: "打开码库追踪页"
      }
    ],
    databaseHeading: {
      kicker: "高频入口",
      title: "玩家最常重新打开的页面"
    },
    newsroomItems: [
      {
        kicker: "每日动作",
        title: "Today in Kingshot",
        body: "最适合每天打开一次，快速判断今天该先看码、先囤资源，还是先记下明天的活动提醒。",
        href: "./guides/today.html",
        cta: "打开今日页"
      },
      {
        kicker: "最高需求",
        title: "活跃兑换码与兑换步骤",
        body: "这是最容易形成重复访问的一类内容，因为它解决的是最直接的损失厌恶。",
        href: "./guides/codes.html",
        cta: "打开兑换码"
      },
      {
        kicker: "老玩家问题",
        title: "英雄窗口与宝石纪律",
        body: "账号差距很多时候不是因为抽得少，而是因为在错误窗口交了高级资源。",
        href: "./guides/event-core.html",
        cta: "阅读活动时机"
      }
    ],
    codesPanel: {
      kicker: "兑换码快板",
      title: "玩家现在最该先检查的活跃列表",
      body: "这些条目来自当前码库追踪数据，适合放在首页显眼位置方便快速复制和跳转。",
      cta: "打开完整兑换码页",
      copy: "复制",
      redeem: "兑换",
      tracker: "码库",
      safeLabel: "优先尝试",
      watchLabel: "先复测"
    },
    roadmapHeading: {
      kicker: "兑换步骤",
      title: "怎么领码，怎么找 Player ID"
    },
    promoCodes: {
      kicker: "兑换码",
      title: "兑换码总览",
      body: "可用码、观察名单、失效归档、复制按钮和直接兑换步骤都放在一起。",
      cta: "打开兑换码页"
    },
    promoToday: {
      kicker: "今日",
      title: "每日重置与版本观察",
      body: "把重置时间、地区观察和账号提醒集中在一个适合反复打开的页面。",
      cta: "打开今日资讯台"
    },
    promoNews: {
      kicker: "活动",
      title: "Hall of Heroes 与 Hero Roulette 时机",
      body: "围绕英雄活动窗口、囤钻节奏与资源释放时机来整理重点内容。",
      cta: "打开活动时机"
    },
    toolHub: {
      kicker: "页面入口",
      title: "几秒内找到你现在最需要的页面",
      placeholder: "搜索攻略、工具和资料页",
      chips: ["全部", "计算", "攻略", "联盟", "资料"]
    },
    toolCards: [
      { type: "每日入口", title: "Today in Kingshot", body: "重置倒计时、官方观察流、当前重点和本地备忘都放在一页。", cta: "打开页面" },
      { type: "资料页", title: "最新兑换码归档", body: "活跃码、失效码、备注和快速复制按钮都集中在同一页。", cta: "打开页面" },
      { type: "英雄攻略", title: "英雄优先级与抽卡思路", body: "告诉玩家该抽什么、该跳过什么，以及不同阶段怎么判断。", cta: "打开页面" },
      { type: "活动攻略", title: "Hall of Heroes 与 Hero Roulette", body: "围绕周活动窗口、宝石逻辑和囤资源时机来做判断。", cta: "打开页面" },
      { type: "建筑攻略", title: "建筑规划器", body: "主城链、兵营支撑和真正影响进度的升级顺序都在这里。", cta: "打开页面" },
      { type: "新手攻略", title: "新手成长蓝图", body: "告诉玩家前期该冲什么、该省什么，避免早期资源浪费。", cta: "打开页面" }
    ],
    mobileDock: ["首页", "今日", "兑换码", "英雄", "活动"]
  },
  "zh-TW": {
    brandTagline: "資訊. 兌換碼. 活動. 建築.",
    statusPill: "Kingshot 實用攻略門戶",
    topLinks: ["官方活躍兌換碼", "今日 Kingshot", "英雄活動窗口", "建築路線"],
    nav: ["首頁", "兌換碼", "今日", "英雄", "活動", "建築"],
    heroEyebrow: "每日必開資訊台",
    heroTitle: "把 Kingshot 玩家每天最常打開的兌換碼、重置、活動與養成攻略集中到同一個首頁。",
    heroLead:
      "先看兌換碼有沒有更新，再看今天該囤還是該花，然後直接跳進建築、英雄或活動攻略處理目前卡點。",
    heroPrimary: "打開今日資訊台",
    heroSecondary: "打開活躍兌換碼",
    heroTags: ["兌換碼", "重置", "英雄活動", "建築規劃"],
    heroStoryKicker: "頭條更新",
    heroStoryTitle: `版本 ${data.appMeta.currentVersion} 仍說明 Kingshot 處於持續營運節奏`,
    heroStoryBody:
      "App Store 在 2026 年 4 月 27 日更新到 1.10.7，並提到 Master System 與 March Skin 變化，這類公開版本訊號仍值得持續追蹤。",
    heroStoryLink: "查看今日觀察",
    heroMetrics: [
      { value: String(data.codes.activeCount), label: "官方活躍碼" },
      { value: data.appMeta.currentVersion, label: "目前版本" },
      { value: data.appMeta.rating, label: "商店評分" }
    ],
    visualKicker: "遊戲實圖",
    visualTitle: "先給真實遊戲畫面，再給玩家最有用的入口",
    visualBody:
      "使用者應該先一眼認出這就是自己在玩的 Kingshot，然後立刻看到兌換碼、活動判斷和養成攻略。",
    ticker: [
      `目前官方活躍兌換碼為 ${data.codes.activeCount} 個`,
      `最新公開版本訊號仍是 ${data.appMeta.currentVersionDate} 的 ${data.appMeta.currentVersion}`,
      "兌換步驟與 Player ID 取得方式已整理進兌換碼頁"
    ],
    topNewsHeading: {
      kicker: "最新快訊",
      title: "玩家今天最該先看到的重點",
      link: "去今日資訊台看完整觀察"
    },
    topNews: [
      {
        date: "2026-05-13",
        label: "兌換碼",
        title: `目前仍有 ${data.codes.activeCount} 個追蹤中的兌換碼值得在重置前檢查`,
        body: "如果玩家今天只打開一個頁面，這個頁面大概率還是兌換碼板，因為它最容易直接影響當天收益。",
        href: "./guides/codes.html",
        cta: "打開兌換碼板"
      },
      {
        date: data.appMeta.currentVersionDate,
        label: "版本",
        title: `版本 ${data.appMeta.currentVersion} 仍是現在最清晰的公開版本訊號`,
        body: "對這類已經有年齡的遊戲來說，商店文字變化仍是判斷內容周期有沒有繼續推進的重要依據。",
        href: "./guides/today.html",
        cta: "查看版本觀察"
      },
      {
        date: "2026-05-13",
        label: "活動",
        title: "老玩家最常回來看的一句話：今天該囤還是該花？",
        body: "成熟玩家更在意資源窗口，而不是活動背景介紹，所以活動頁必須先回答這個問題。",
        href: "./guides/event-core.html",
        cta: "打開活動攻略"
      }
    ],
    guidesHeading: {
      kicker: "熱門攻略",
      title: "本週最容易形成回訪的頁面",
      link: "查看全部攻略"
    },
    features: [
      {
        type: "兌換碼",
        title: "讓玩家先來這裡看兌換碼，而不是回社媒翻帖",
        body: "一頁把可用碼、觀察名單、失效碼、複製按鈕和兌換入口做好，才有資格成為固定入口。",
        href: "./guides/codes.html",
        cta: "閱讀兌換碼頁"
      },
      {
        type: "英雄",
        title: "按帳號階段判斷英雄價值，而不是只看表面強度",
        body: "現在已經補了判斷器，讓玩家直接看這輪英雄值不值得追，而不是只看泛泛強弱榜。",
        href: "./guides/hero-meta.html",
        cta: "閱讀英雄攻略"
      },
      {
        type: "建築",
        title: "下一層真正卡你的建築是什麼",
        body: "真正能留住玩家的建築頁，是告訴他下一個真實門檻，而不是叫他平均升級。",
        href: "./guides/building-planner.html",
        cta: "打開建築頁"
      }
    ],
    updatesHeading: {
      kicker: "今日重點",
      title: "玩家現在最該先確認的事"
    },
    updates: [
      {
        date: "現在",
        title: "第一件事：今天有沒有新碼",
        body: "短時效兌換碼屬於典型損失厭惡型內容，所以這一步應該永遠排在前面。"
      },
      {
        date: "資源",
        title: "第二件事：今天到底該不該交資源",
        body: "成熟玩家真正想知道的是現在該花還是繼續囤，不是活動背景介紹。"
      },
      {
        date: "養成",
        title: "第三件事：下一層真實卡點是什麼",
        body: "如果站點不能快速回答這個問題，玩家最後還是會回到表格、群聊和外部計算器。"
      }
    ],
    spotlightHeading: {
      kicker: "必看專題",
      title: "真正能解決 Kingshot 玩家痛點的頁面"
    },
    spotlightItems: [
      {
        label: "新手",
        title: "新手成長藍圖",
        body: "新手頁仍然有價值，但它已經不是老玩家最強的回訪原因。",
        href: "./guides/beginner-growth.html",
        cta: "閱讀攻略"
      },
      {
        label: "活動",
        title: "活動節奏與準備窗口",
        body: "這類內容最容易做出長線黏性，因為玩家會反覆回來確認自己有沒有踩錯窗口。",
        href: "./guides/event-rhythm.html",
        cta: "打開節奏攻略"
      },
      {
        label: "聯盟",
        title: "聯盟日常清單",
        body: "對管理和活躍使用者來說，能保存狀態的輕工具，比空文章更有回訪價值。",
        href: "./guides/alliance-ops.html",
        cta: "使用清單"
      }
    ],
    visualBriefingHeading: {
      kicker: "視覺專題帶",
      title: "先一眼認出這是遊戲站，再立刻找到自己要解決的問題"
    },
    visualBriefingItems: [
      {
        kicker: "先看兌換碼",
        title: "最強的回訪動作仍然是：重置前有沒有新碼",
        body: "對這類策略手遊來說，兌換碼頁仍然是最穩定的高頻入口，也是最容易建立信任的第一層內容。",
        image: data.assets.screenshots[0],
        href: "./guides/codes.html",
        cta: "打開兌換碼板"
      },
      {
        kicker: "每日重置",
        title: "每天回訪，通常不是為了看文章，而是為了快速判斷今天該做什麼",
        body: "好的 Today 頁面應該讓玩家一分鐘內看完重置、官方動態與明天可能的資源窗口。",
        image: data.assets.screenshots[3],
        href: "./guides/today.html",
        cta: "打開今日頁"
      },
      {
        kicker: "養成卡點",
        title: "建築卡點與英雄時機，才是老玩家真正常查的價值點",
        body: "遊戲變老之後，使用者更在意的是少浪費鑽石、少浪費建築天數，而不是看泛泛的新手說明。",
        image: data.assets.screenshots[2],
        href: "./guides/building-planner.html",
        cta: "打開建築規劃"
      }
    ],
    playerNeedsHeading: {
      kicker: "真實需求",
      title: "這個站最該先解決的高意圖問題"
    },
    playerNeeds: [
      {
        label: "花還是囤",
        title: "今天到底該不該交資源？",
        body: "玩家最想快速知道的是鑽石、加速與抽卡資源今天該不該繼續留著等更強窗口。"
      },
      {
        label: "碼有沒有變",
        title: "是不是剛出了一個短時效兌換碼？",
        body: "漏掉禮包碼會立刻產生損失感，所以這類頁面天然更容易形成重複訪問。"
      },
      {
        label: "建築效率",
        title: "下一層真正卡我的建築是什麼？",
        body: "真正有用的站會幫玩家避免把幾天隊列浪費在並不影響主進度的邊角建築上。"
      },
      {
        label: "英雄紀律",
        title: "這一輪英雄真的值得碰嗎？",
        body: "很多長期帳號差距，不是因為抽得少，而是因為在錯誤的時間點交了高級資源。"
      }
    ],
    sourceWatchHeading: {
      kicker: "官方來源",
      title: "首頁最值得優先掛出來的更新與碼庫來源"
    },
    sourceWatch: [
      {
        label: "最快社媒層",
        title: "Kingshot 官方 Facebook",
        body: "維護提醒、里程碑發帖與新禮包碼，通常還是先從這個公開社媒面冒出來。",
        href: data.officialLinks.facebook,
        cta: "打開 Facebook"
      },
      {
        label: "版本說明",
        title: "Kingshot App Store 頁面",
        body: "當官方社群安靜時，商店版本說明仍可能透露新功能、活動字樣與修復變化。",
        href: data.officialLinks.appStore,
        cta: "打開 App Store"
      },
      {
        label: "官方兌換路徑",
        title: "Kingshot.net 碼庫與兌換頁",
        body: "把它作為碼庫追蹤面和兌換入口使用，但對高風險條目保留複測標記。",
        href: data.officialLinks.codes,
        cta: "打開碼庫追蹤頁"
      }
    ],
    databaseHeading: {
      kicker: "高頻入口",
      title: "玩家最常重新打開的頁面"
    },
    newsroomItems: [
      {
        kicker: "每日動作",
        title: "Today in Kingshot",
        body: "最適合每天打開一次，快速判斷今天該先看碼、先囤資源，還是先記下明天的活動提醒。",
        href: "./guides/today.html",
        cta: "打開今日頁"
      },
      {
        kicker: "最高需求",
        title: "活躍兌換碼與兌換步驟",
        body: "這是最容易形成重複訪問的一類內容，因為它解決的是最直接的損失厭惡。",
        href: "./guides/codes.html",
        cta: "打開兌換碼"
      },
      {
        kicker: "老玩家問題",
        title: "英雄窗口與寶石紀律",
        body: "帳號差距很多時候不是因為抽得少，而是因為在錯誤窗口交了高級資源。",
        href: "./guides/event-core.html",
        cta: "閱讀活動時機"
      }
    ],
    codesPanel: {
      kicker: "兌換碼快板",
      title: "玩家現在最該先檢查的活躍列表",
      body: "這些條目來自目前碼庫追蹤資料，必須放在首頁可見位置，方便快速複製和跳轉。",
      cta: "打開完整兌換碼頁",
      copy: "複製",
      redeem: "兌換",
      tracker: "碼庫",
      safeLabel: "優先嘗試",
      watchLabel: "先複測"
    },
    roadmapHeading: {
      kicker: "兌換步驟",
      title: "怎麼領碼，怎麼找 Player ID"
    },
    promoCodes: {
      kicker: "兌換碼",
      title: "官方活躍兌換碼板",
      body: "活躍碼、失效歸檔、複製按鈕和直接兌換步驟都放在一起。",
      cta: "打開兌換碼頁"
    },
    promoToday: {
      kicker: "今日",
      title: "每日重置與版本觀察",
      body: "把重置時間、地區觀察和帳號提醒集中在一個適合反覆打開的頁面。",
      cta: "打開今日資訊台"
    },
    promoNews: {
      kicker: "活動",
      title: "Hall of Heroes 與 Hero Roulette 時機",
      body: "圍繞英雄活動窗口、囤鑽節奏與資源釋放時機來整理重點內容。",
      cta: "打開活動時機"
    },
    toolHub: {
      kicker: "頁面入口",
      title: "幾秒內找到你現在最需要的頁面",
      placeholder: "搜尋攻略、工具和資料頁",
      chips: ["全部", "計算", "攻略", "聯盟", "資料"]
    },
    toolCards: [
      { type: "每日入口", title: "Today in Kingshot", body: "重置倒數、官方觀察流、目前重點和本地備忘都放在同一頁。", cta: "打開頁面" },
      { type: "資料頁", title: "最新兌換碼歸檔", body: "活躍碼、失效碼、備註和快速複製按鈕都集中在同一頁。", cta: "打開頁面" },
      { type: "英雄攻略", title: "英雄優先級與抽卡思路", body: "告訴玩家該抽什麼、該跳過什麼，以及不同階段怎麼判斷。", cta: "打開頁面" },
      { type: "活動攻略", title: "Hall of Heroes 與 Hero Roulette", body: "圍繞週活動窗口、寶石邏輯與囤資源時機來做判斷。", cta: "打開頁面" },
      { type: "建築攻略", title: "建築規劃器", body: "主城鏈、兵營支撐和真正影響進度的升級順序都在這裡。", cta: "打開頁面" },
      { type: "新手攻略", title: "新手成長藍圖", body: "告訴玩家前期該衝什麼、該省什麼，避免早期資源浪費。", cta: "打開頁面" }
    ],
    mobileDock: ["首頁", "今日", "兌換碼", "英雄", "活動"]
  }
};

const deepMerge = (...sources) => {
  const output = {};

  sources.forEach((source) => {
    if (!source || typeof source !== "object") {
      return;
    }

    Object.entries(source).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        output[key] = value;
        return;
      }

      if (value && typeof value === "object") {
        output[key] = deepMerge(output[key] || {}, value);
        return;
      }

      output[key] = value;
    });
  });

  return output;
};

const firstCode = data.codes.active.find((entry) => entry.confidence === "verified")?.code || data.codes.active[0]?.code || "VIP777";

const portalOverrides = {
  en: {
    brandTagline: "Codes. Events. Heroes. Builds.",
    statusPill: "Latest codes and daily watch",
    topLinks: ["Latest codes", "Today desk", "Hero event timing", "Building planner"],
    heroEyebrow: "Latest Kingshot answers",
    heroTitle: "Kingshot codes, reset timing, hero events, and upgrade routes.",
    heroLead:
      "Start with the live code board, check whether today is a hold or spend day, then jump straight to the hero, event, or building page that solves your next bottleneck.",
    heroPrimary: "Open Today in Kingshot",
    heroSecondary: "Open latest codes",
    heroTags: ["Latest codes", "Reset desk", "Hero events", "Building planner"],
    quickAnswers: [
      {
        kicker: "Start here",
        title: `${data.codes.activeCount} tracked code entries are still worth checking before reset`,
        body: `${firstCode} is still the safest first copy. Retest entries stay separated so players do not waste attempts on stale tracker residue.`,
        actions: [
          { href: "./guides/codes.html", label: "Open code board", style: "button-primary" },
          { href: "./guides/today.html", label: "Open today desk", style: "button-secondary" }
        ]
      },
      {
        kicker: "Spend or save",
        title: "No strong window? Keep gems and speedups in reserve",
        body: "Hall of Heroes and Hero Roulette are still the cleanest spend checks for older accounts. If the overlap is weak, holding is usually better."
      },
      {
        kicker: "Main bottleneck",
        title: "Push the next furnace or Town Center chain first",
        body: "Do not spread upgrades evenly. Open the planner and build toward the next real unlock instead of side progress that looks busy but changes nothing."
      }
    ],
    heroStoryKicker: "Patch signal",
    heroStoryTitle: `Version ${data.appMeta.currentVersion} remains the latest public update signal`,
    heroStoryBody:
      "The App Store notes dated April 27, 2026 still reference Master System and March Skin changes, so patch-watch belongs on the homepage.",
    heroStoryLink: "Open today desk",
    visualKicker: "Featured images",
    visualTitle: "Real screenshots first, then the pages players actually open",
    visualBody:
      "Make Kingshot recognizable at a glance, then send players straight into codes, the daily desk, and the practical guides they use most.",
    ticker: [
      `${data.codes.activeCount} tracked code entries remain on the current board`,
      `Version ${data.appMeta.currentVersion} dated ${data.appMeta.currentVersionDate} is still the newest public store signal`,
      "Player ID and redeem steps are already built into the codes page"
    ],
    topNewsHeading: {
      kicker: "Latest checks",
      title: "What active players are checking today",
      link: "View all on Today in Kingshot"
    },
    topNews: [
      {
        date: data.codes.snapshotDate,
        label: "Codes",
        title: `${data.codes.activeCount} tracked code entries are still on the board`,
        body: `${firstCode} remains the best first try. Retest entries stay labeled instead of being mixed into the same trust tier.`,
        href: "./guides/codes.html",
        cta: "Open codes"
      },
      {
        date: data.appMeta.currentVersionDate,
        label: "Patch",
        title: `Version ${data.appMeta.currentVersion} is still the latest public patch trail`,
        body: "When official social posts are quiet, App Store wording is still the cleanest public source for patch clues on Kingshot.",
        href: "./guides/today.html",
        cta: "Open today desk"
      },
      {
        date: data.codes.snapshotDate,
        label: "Events",
        title: "Check the event window before you spend premium resources",
        body: "For mature accounts, the real question is not what the event is called. It is whether the current window is strong enough to justify gems, speedups, or pulls.",
        href: "./guides/event-core.html",
        cta: "Open event timing"
      }
    ],
    guidesHeading: {
      kicker: "Popular guides",
      title: "Most-used guides this week",
      link: "Open the guide library"
    },
    features: [
      {
        type: "Codes",
        title: "Latest redeem codes with copy buttons and direct redeem flow",
        body: "This page works because the safest code is obvious, retest entries are honest, and expired residue stays out of the main list.",
        href: "./guides/codes.html",
        cta: "Open codes guide"
      },
      {
        type: "Heroes",
        title: "Hero pull check based on lineup need and event value",
        body: "Use the pull helper when you need a quick yes, no, or maybe on whether the current banner actually changes your account.",
        href: "./guides/hero-meta.html",
        cta: "Open hero guide"
      },
      {
        type: "Buildings",
        title: "Find the next real building gate instead of upgrading blind",
        body: "Open the planner to see which prerequisite chain actually blocks your next furnace or Town Center push.",
        href: "./guides/building-planner.html",
        cta: "Open building planner"
      }
    ],
    updatesHeading: {
      kicker: "Before reset",
      title: "Three checks that still matter most"
    },
    updates: [
      {
        date: "Codes",
        title: "Check whether a fresh code landed",
        body: "Short-duration code drops are still the fastest direct-value updates on the site."
      },
      {
        date: "Events",
        title: "Decide whether this is a hold day or a spend day",
        body: "Older Kingshot accounts usually gain more from avoiding a bad window than from forcing a mediocre one."
      },
      {
        date: "Build",
        title: "Confirm the next hard building requirement",
        body: "If you cannot name the next true gate, you are more likely to waste queue time on upgrades that do not move the account forward."
      }
    ],
    spotlightHeading: {
      kicker: "Open next",
      title: "Open these guides next"
    },
    spotlightItems: [
      {
        label: "Catch-up",
        title: "Beginner and returner growth route",
        body: "Useful for fresh accounts and older players returning after a break who need a clean route back into efficient progress.",
        href: "./guides/beginner-growth.html",
        cta: "Open growth guide"
      },
      {
        label: "Event prep",
        title: "Weekly event rhythm and save windows",
        body: "Use this page to plan when to hold finishers, when to burst, and which resource buckets deserve protection.",
        href: "./guides/event-rhythm.html",
        cta: "Open event rhythm"
      },
      {
        label: "Alliance",
        title: "Alliance checklist with saved local state",
        body: "A practical routine page for active members and officers who want one place for daily and weekly ops.",
        href: "./guides/alliance-ops.html",
        cta: "Open checklist"
      }
    ],
    visualBriefingHeading: {
      kicker: "Most opened",
      title: "Guide entries players return to most"
    },
    visualBriefingItems: [
      {
        kicker: "Codes",
        title: "Active code board, retest queue, and expired archive",
        body: "The code page keeps the first-try answer clear, separates risky entries, and preserves expired history so users do not waste retries.",
        image: data.assets.screenshots[0],
        href: "./guides/codes.html",
        cta: "Open codes"
      },
      {
        kicker: "Today",
        title: "Reset timer, official watch, and local memo",
        body: "The daily desk bundles reset pressure, patch signals, and one saved note so the next login starts with direction.",
        image: data.assets.screenshots[3],
        href: "./guides/today.html",
        cta: "Open today desk"
      },
      {
        kicker: "Builds",
        title: "Building routes, event timing, and pull discipline",
        body: "This is where users check the next gate, the next spend window, and whether a banner deserves premium resources.",
        image: data.assets.screenshots[2],
        href: "./guides/building-planner.html",
        cta: "Open planner"
      }
    ],
    playerNeedsHeading: {
      kicker: "Player demand",
      title: "What active Kingshot players actually need"
    },
    playerNeeds: [
      {
        label: "Codes",
        title: data.playerTasks[0].title,
        body: data.playerTasks[0].detail
      },
      {
        label: "Spend or save",
        title: data.playerTasks[1].title,
        body: data.playerTasks[1].detail
      },
      {
        label: "Hero window",
        title: data.playerTasks[2].title,
        body: data.playerTasks[2].detail
      },
      {
        label: "Building gate",
        title: data.playerTasks[3].title,
        body: data.playerTasks[3].detail
      }
    ],
    sourceWatchHeading: {
      kicker: "Tracked sources",
      title: "Sources worth checking today"
    },
    sourceWatch: [
      {
        label: "Social",
        title: "Kingshot Official Facebook",
        body: "Best for maintenance posts, milestone notices, and the fastest visible gift-code drops from official social.",
        href: data.officialLinks.facebook,
        cta: "Open Facebook"
      },
      {
        label: "Store",
        title: "Kingshot App Store page",
        body: "Still useful for version wording, feature references, and update notes when public socials go quiet.",
        href: data.officialLinks.appStore,
        cta: "Open App Store"
      },
      {
        label: "Codes",
        title: "Kingshot.net tracker and redeem path",
        body: "Use this as the tracked code surface and redeem route, but keep ambiguous entries marked for retest until they are proven in game.",
        href: data.officialLinks.codes,
        cta: "Open code tracker"
      }
    ],
    databaseHeading: {
      kicker: "Daily-use pages",
      title: "The entry points players reopen most"
    },
    newsroomItems: [
      {
        kicker: "Daily habit",
        title: "Today in Kingshot",
        body: "One page for reset, patch-watch, code follow-up, and a saved note for the next login.",
        href: "./guides/today.html",
        cta: "Open today desk"
      },
      {
        kicker: "Fastest check",
        title: "Latest codes and expired archive",
        body: "Still the cleanest high-intent page because users want a fast answer on what works right now and what is already dead.",
        href: "./guides/codes.html",
        cta: "Open codes"
      },
      {
        kicker: "Most expensive mistake",
        title: "Hero timing and gem discipline",
        body: "Long-term account value is often lost on weak banners and off-cycle gem spending, not on a lack of guides.",
        href: "./guides/event-core.html",
        cta: "Open event timing"
      }
    ],
    codesPanel: {
      kicker: "Code quick board",
      title: "Latest codes to copy first",
      body: "The best first try stays on top. Retest entries stay labeled. Expired residue does not get mixed into the main trust layer.",
      cta: "Open full codes page",
      copy: "Copy",
      redeem: "Redeem",
      tracker: "Tracker",
      safeLabel: "Try first",
      watchLabel: "Retest"
    },
    roadmapHeading: {
      kicker: "Redeem steps",
      title: "Claim rewards in under a minute"
    },
    promoCodes: {
      kicker: "Codes",
      title: "Latest redeem codes",
      body: "Current first-try code, retest entries, expired archive, and official redeem path in one page.",
      cta: "Open codes"
    },
    promoToday: {
      kicker: "Today",
      title: "Reset desk and patch watch",
      body: "Check the reset timer, official surfaces, and one saved memo without jumping between pages.",
      cta: "Open today desk"
    },
    promoNews: {
      kicker: "Events",
      title: "Hall of Heroes and Hero Roulette timing",
      body: "Use the event page to judge windows for gems, pulls, and stored speedups before you commit resources.",
      cta: "Open event timing"
    },
    toolHub: {
      kicker: "Quick access",
      title: "Find your next page fast",
      placeholder: "Search guides, tools, and reference pages",
      chips: ["All", "Calculators", "Guides", "Alliance", "Reference"]
    },
    toolCards: [
      { type: "Daily desk", title: "Today in Kingshot", body: "Reset timer, official watch feed, code follow-up, and a saved local memo.", cta: "Open page" },
      { type: "Reference", title: "Latest codes board", body: "Active entries, retest queue, expired archive, and fast copy actions.", cta: "Open page" },
      { type: "Hero guide", title: "Hero pull and lineup guide", body: "Check whether the current banner fixes a real weakness or is better skipped.", cta: "Open page" },
      { type: "Event guide", title: "Hero event timing", body: "Save-day versus spend-day logic for Hall of Heroes, Hero Roulette, and other premium windows.", cta: "Open page" },
      { type: "Building guide", title: "Building planner", body: "See the next meaningful furnace or Town Center chain instead of upgrading blind.", cta: "Open page" },
      { type: "Starter guide", title: "Growth blueprint", body: "A clean catch-up route for new or returning players who need a practical first plan.", cta: "Open page" }
    ]
  },
  "zh-CN": {
    brandTagline: "兑换码. 活动. 英雄. 建筑.",
    statusPill: "最新兑换码与每日资讯",
    topLinks: ["最新兑换码", "今日资讯台", "英雄活动时机", "建筑规划器"],
    heroEyebrow: "今天先看这些",
    heroTitle: "Kingshot 兑换码、重置时间、英雄活动与建筑路线。",
    heroLead:
      "先查礼包码，再判断今天该囤还是该花，然后直达英雄、活动或建筑页面解决当前最真实的卡点。",
    heroPrimary: "打开 Today in Kingshot",
    heroSecondary: "打开最新兑换码",
    heroTags: ["最新兑换码", "重置资讯台", "英雄活动", "建筑规划"],
    quickAnswers: [
      {
        kicker: "先看这里",
        title: `${data.codes.activeCount} 个追踪条目仍值得在重置前看一眼`,
        body: `${firstCode} 仍是当前最稳的优先尝试。其余需要复测的条目和残留过期码已经分层，不会混在一起误导玩家。`,
        actions: [
          { href: "./guides/codes.html", label: "打开兑换码板", style: "button-primary" },
          { href: "./guides/today.html", label: "打开今日资讯台", style: "button-secondary" }
        ]
      },
      {
        kicker: "资源判断",
        title: "没有强窗口时，今天默认继续囤",
        body: "对于成熟账号来说，把钻石、加速和抽卡资源交在 Hall of Heroes 或 Hero Roulette 之外，往往才是最亏的地方。"
      },
      {
        kicker: "养成卡点",
        title: "先推炉子 / 主城前置，再决定建筑队列",
        body: "不要平均升级。真正有用的建筑页，应该先告诉玩家哪一条前置链正在卡下一个关键门槛。"
      }
    ],
    heroStoryKicker: "版本信号",
    heroStoryTitle: `版本 ${data.appMeta.currentVersion} 仍是现在最新的公开更新线索`,
    heroStoryBody:
      `App Store 在 ${data.appMeta.currentVersionDate} 的版本说明里仍能看到 Master System 与 March Skin 相关变动，首页保留版本观察是有价值的。`,
    heroStoryLink: "打开今日资讯台",
    visualKicker: "精选实图",
    visualTitle: "先让玩家一眼认出游戏，再给他最常用的入口",
    visualBody:
      "把 Kingshot 游戏画面摆在最前，然后把用户直接送进兑换码、今日资讯台和真正高频的养成页面。",
    ticker: [
      `当前仍有 ${data.codes.activeCount} 个追踪条目在首页码板里`,
      `公开版本信号仍停留在 ${data.appMeta.currentVersionDate} 的 ${data.appMeta.currentVersion}`,
      "兑换码页面已经整理了 Player ID 获取方式与官方兑换路径"
    ],
    topNewsHeading: {
      kicker: "今日重点",
      title: "活跃玩家今天最常先查的内容",
      link: "去 Today in Kingshot 看完整观察"
    },
    topNews: [
      {
        date: data.codes.snapshotDate,
        label: "兑换码",
        title: `${data.codes.activeCount} 个追踪条目仍在当前码板上`,
        body: `${firstCode} 仍是最适合优先复制的一条，复测条目不会再和稳定可用条目混成同一层信任。`,
        href: "./guides/codes.html",
        cta: "打开兑换码"
      },
      {
        date: data.appMeta.currentVersionDate,
        label: "版本",
        title: `版本 ${data.appMeta.currentVersion} 仍是目前最清晰的公开更新线索`,
        body: "当官方社媒安静时，App Store 的版本说明仍然是观察 Kingshot 更新节奏最有用的公开面之一。",
        href: "./guides/today.html",
        cta: "打开今日资讯台"
      },
      {
        date: data.codes.snapshotDate,
        label: "活动",
        title: "先看这轮活动值不值得交高级资源",
        body: "老玩家最关心的不是活动名字，而是这轮窗口能不能撑得起钻石、加速和抽卡资源的投入。",
        href: "./guides/event-core.html",
        cta: "打开活动时机"
      }
    ],
    guidesHeading: {
      kicker: "热门攻略",
      title: "本周最常被打开的实用页",
      link: "查看全部攻略"
    },
    features: [
      {
        type: "兑换码",
        title: "最新兑换码、复制按钮与直达兑换路径",
        body: "只有把最稳的可用码、复测名单和失效残留分清楚，兑换码页才会真的形成固定回访。",
        href: "./guides/codes.html",
        cta: "打开兑换码页"
      },
      {
        type: "英雄",
        title: "按阵容缺口和活动价值判断这轮英雄值不值得追",
        body: "用抽卡判断器快速看当前池子是该跳、该谨慎碰，还是值得认真投入。",
        href: "./guides/hero-meta.html",
        cta: "打开英雄攻略"
      },
      {
        type: "建筑",
        title: "找出下一条真正卡进度的建筑链",
        body: "建筑规划器的价值不在于列清单，而在于快速告诉玩家哪条前置链会卡住下一个炉子或主城门槛。",
        href: "./guides/building-planner.html",
        cta: "打开建筑规划"
      }
    ],
    updatesHeading: {
      kicker: "重置前",
      title: "今天仍然最值得先确认的三件事"
    },
    updates: [
      {
        date: "兑换码",
        title: "先看今天有没有新码",
        body: "短时效礼包码仍然是最直接、也最容易带来损失厌恶的一类内容。"
      },
      {
        date: "活动",
        title: "再看今天到底该囤还是该花",
        body: "成熟账号很多时候不是缺资源，而是把资源交在了低价值窗口。"
      },
      {
        date: "建筑",
        title: "最后确认下一个真实建筑门槛",
        body: "如果你说不清下一个硬性前置是什么，施工队列就很容易被边角升级浪费掉。"
      }
    ],
    spotlightHeading: {
      kicker: "接着看",
      title: "接着看这几个高频攻略"
    },
    spotlightItems: [
      {
        label: "回坑 / 新号",
        title: "新手与回坑成长路线",
        body: "适合新账号和回坑老账号快速找回节奏，重新回到高效率成长线。",
        href: "./guides/beginner-growth.html",
        cta: "打开成长蓝图"
      },
      {
        label: "活动准备",
        title: "每周活动节奏与囤资源窗口",
        body: "看哪些资源该继续留，哪些完工动作该压到计分窗口再一起交。 ",
        href: "./guides/event-rhythm.html",
        cta: "打开活动节奏"
      },
      {
        label: "联盟",
        title: "支持本地保存的联盟日常清单",
        body: "给活跃成员和管理用的一页轻工具，适合做成日常复开入口。",
        href: "./guides/alliance-ops.html",
        cta: "打开联盟清单"
      }
    ],
    visualBriefingHeading: {
      kicker: "高频入口",
      title: "玩家最常回来的几个页面"
    },
    visualBriefingItems: [
      {
        kicker: "兑换码",
        title: "活跃码、复测名单与失效归档分层展示",
        body: "兑换码页会把优先尝试、需要复测和已经过期的条目分开，减少玩家重复试错。",
        image: data.assets.screenshots[0],
        href: "./guides/codes.html",
        cta: "打开兑换码"
      },
      {
        kicker: "今日",
        title: "重置倒计时、官方观察与本地备忘",
        body: "今日页把重置压力、版本线索和一条本地备忘放在一起，方便每天回来看一次就做判断。",
        image: data.assets.screenshots[3],
        href: "./guides/today.html",
        cta: "打开今日资讯台"
      },
      {
        kicker: "养成",
        title: "建筑路线、活动时机与抽卡纪律",
        body: "这一组页面负责解决玩家最常见的三个高价值问题：卡哪、等不等、抽不抽。",
        image: data.assets.screenshots[2],
        href: "./guides/building-planner.html",
        cta: "打开规划页"
      }
    ],
    playerNeedsHeading: {
      kicker: "真实需求",
      title: "活跃 Kingshot 玩家真正会找的答案"
    },
    playerNeeds: [
      {
        label: "兑换码",
        title: "重置前有没有新礼包码？",
        body: "短时效礼包码是最容易错过的即时收益，先看码板再去做其他日常。"
      },
      {
        label: "花还是囤",
        title: "今天到底该花资源还是继续囤？",
        body: "成熟账号更怕错窗口乱花资源，先看活动价值再交钻石、抽卡和加速。"
      },
      {
        label: "英雄窗口",
        title: "当前英雄池值不值得追？",
        body: "英雄价值要看阵容缺口、活动叠加和资源余量，不只是看表面强度。"
      },
      {
        label: "建筑门槛",
        title: "下一条真正卡进度的建筑链是什么？",
        body: "玩家反复回来，是为了少浪费几天队列，而不是看泛泛的升级建议。"
      }
    ],
    sourceWatchHeading: {
      kicker: "追踪来源",
      title: "今天最值得盯的几个来源"
    },
    sourceWatch: [
      {
        label: "社媒",
        title: "Kingshot 官方 Facebook",
        body: "维护公告、里程碑发帖和最快冒出来的新礼包码，通常还是先从这里出现。",
        href: data.officialLinks.facebook,
        cta: "打开 Facebook"
      },
      {
        label: "商店",
        title: "Kingshot App Store 页面",
        body: "当官方社媒安静时，App Store 的版本说明仍然可能提前透露功能变化和版本线索。",
        href: data.officialLinks.appStore,
        cta: "打开 App Store"
      },
      {
        label: "码库",
        title: "Kingshot.net 追踪页与兑换路径",
        body: "把它当成码库追踪面和兑换入口使用，但对有争议的条目继续保留复测标记。",
        href: data.officialLinks.codes,
        cta: "打开码库追踪页"
      }
    ],
    databaseHeading: {
      kicker: "日常入口",
      title: "玩家最常重新打开的页面"
    },
    newsroomItems: [
      {
        kicker: "每日习惯",
        title: "Today in Kingshot",
        body: "重置、版本观察、兑换码跟进和一条本地备忘，全都集中在一个每天都能打开的页面。",
        href: "./guides/today.html",
        cta: "打开今日资讯台"
      },
      {
        kicker: "最高需求",
        title: "最新兑换码与失效归档",
        body: "这仍然是最强的高意图入口，因为玩家最先要解决的是现在到底有什么能领、什么已经死了。",
        href: "./guides/codes.html",
        cta: "打开兑换码"
      },
      {
        kicker: "最容易亏资源",
        title: "英雄时机与钻石纪律",
        body: "账号长期价值很多时候不是输在攻略少，而是输在弱池子和非窗口期乱花资源。",
        href: "./guides/event-core.html",
        cta: "打开活动时机"
      }
    ],
    codesPanel: {
      kicker: "首页码板",
      title: "玩家现在最该优先复制的兑换码",
      body: "最稳的优先尝试条目会放在最上面。需要复测的条目保留标签，过期残留不会混进主要信任层。",
      cta: "打开完整兑换码页",
      copy: "复制",
      redeem: "兑换",
      tracker: "追踪页",
      safeLabel: "先试这条",
      watchLabel: "先复测"
    },
    roadmapHeading: {
      kicker: "兑换步骤",
      title: "1 分钟内完成领码"
    },
    promoCodes: {
      kicker: "兑换码",
      title: "最新可用兑换码",
      body: "当前优先码、复测名单、失效归档和官方兑换入口都整理在一起。",
      cta: "打开兑换码"
    },
    promoToday: {
      kicker: "今日",
      title: "重置资讯台与版本观察",
      body: "一页查看重置时间、官方动态和本地提醒，不用来回跳页面。",
      cta: "打开今日资讯台"
    },
    promoNews: {
      kicker: "活动",
      title: "Hall of Heroes 与 Hero Roulette 时机",
      body: "在交出钻石、抽卡和加速前，先来这里判断窗口质量和值不值得跟。",
      cta: "打开活动时机"
    },
    toolHub: {
      kicker: "快速入口",
      title: "快速找到你要看的页面",
      placeholder: "搜索攻略、工具和资料页",
      chips: ["全部", "计算", "攻略", "联盟", "资料"]
    },
    toolCards: [
      { type: "每日资讯台", title: "Today in Kingshot", body: "重置时间、官方观察流、兑换码跟进和本地备忘整合到同一页。", cta: "打开页面" },
      { type: "资料页", title: "最新兑换码板", body: "活跃条目、复测名单、失效归档与快速复制都放在一起。", cta: "打开页面" },
      { type: "英雄攻略", title: "英雄抽卡与阵容判断", body: "快速判断这一轮池子是在补真实缺口，还是更适合继续跳过。", cta: "打开页面" },
      { type: "活动攻略", title: "英雄活动时机", body: "围绕 Hall of Heroes、Hero Roulette 和囤资源窗口来判断今天该花还是该囤。", cta: "打开页面" },
      { type: "建筑攻略", title: "建筑规划器", body: "直接看下一个炉子或主城门槛，不再盲目平均升级。", cta: "打开页面" },
      { type: "成长攻略", title: "成长蓝图", body: "适合新号和回坑账号快速回到高效率成长线。", cta: "打开页面" }
    ]
  },
  "zh-TW": {
    brandTagline: "兌換碼. 活動. 英雄. 建築.",
    statusPill: "最新兌換碼與每日資訊",
    topLinks: ["最新兌換碼", "今日資訊台", "英雄活動時機", "建築規劃器"],
    heroEyebrow: "今天先看這些",
    heroTitle: "Kingshot 兌換碼、重置時間、英雄活動與建築路線。",
    heroLead:
      "先查禮包碼，再判斷今天該囤還是該花，然後直達英雄、活動或建築頁面處理目前最真實的卡點。",
    heroPrimary: "打開 Today in Kingshot",
    heroSecondary: "打開最新兌換碼",
    heroTags: ["最新兌換碼", "重置資訊台", "英雄活動", "建築規劃"],
    quickAnswers: [
      {
        kicker: "先看這裡",
        title: `${data.codes.activeCount} 個追蹤條目仍值得在重置前看一眼`,
        body: `${firstCode} 仍是目前最穩的優先嘗試。其餘需要複測的條目和殘留過期碼已經分層，不會混在一起誤導使用者。`,
        actions: [
          { href: "./guides/codes.html", label: "打開兌換碼板", style: "button-primary" },
          { href: "./guides/today.html", label: "打開今日資訊台", style: "button-secondary" }
        ]
      },
      {
        kicker: "資源判斷",
        title: "沒有強窗口時，今天預設繼續囤",
        body: "對成熟帳號來說，把鑽石、加速和抽卡資源交在 Hall of Heroes 或 Hero Roulette 之外，往往才是最虧的地方。"
      },
      {
        kicker: "養成卡點",
        title: "先推爐子 / 主城前置，再決定建築隊列",
        body: "不要平均升級。真正有用的建築頁，應該先告訴玩家哪一條前置鏈正在卡住下一個關鍵門檻。"
      }
    ],
    heroStoryKicker: "版本訊號",
    heroStoryTitle: `版本 ${data.appMeta.currentVersion} 仍是目前最新的公開更新線索`,
    heroStoryBody:
      `App Store 在 ${data.appMeta.currentVersionDate} 的版本說明裡仍能看到 Master System 與 March Skin 相關變動，首頁保留版本觀察是有價值的。`,
    heroStoryLink: "打開今日資訊台",
    visualKicker: "精選實圖",
    visualTitle: "先讓玩家一眼認出遊戲，再給他最常用的入口",
    visualBody:
      "把 Kingshot 遊戲畫面擺在最前，然後把使用者直接送進兌換碼、今日資訊台和真正高頻的養成頁面。",
    ticker: [
      `目前仍有 ${data.codes.activeCount} 個追蹤條目在首頁碼板裡`,
      `公開版本訊號仍停留在 ${data.appMeta.currentVersionDate} 的 ${data.appMeta.currentVersion}`,
      "兌換碼頁面已經整理了 Player ID 取得方式與官方兌換路徑"
    ],
    topNewsHeading: {
      kicker: "今日重點",
      title: "活躍玩家今天最常先查的內容",
      link: "去 Today in Kingshot 看完整觀察"
    },
    topNews: [
      {
        date: data.codes.snapshotDate,
        label: "兌換碼",
        title: `${data.codes.activeCount} 個追蹤條目仍在目前碼板上`,
        body: `${firstCode} 仍是最適合優先複製的一條，複測條目不會再和穩定可用條目混成同一層信任。`,
        href: "./guides/codes.html",
        cta: "打開兌換碼"
      },
      {
        date: data.appMeta.currentVersionDate,
        label: "版本",
        title: `版本 ${data.appMeta.currentVersion} 仍是目前最清晰的公開更新線索`,
        body: "當官方社群安靜時，App Store 的版本說明仍然是觀察 Kingshot 更新節奏最有用的公開面之一。",
        href: "./guides/today.html",
        cta: "打開今日資訊台"
      },
      {
        date: data.codes.snapshotDate,
        label: "活動",
        title: "先看這輪活動值不值得交高級資源",
        body: "老玩家最關心的不是活動名字，而是這輪窗口能不能撐得起鑽石、加速和抽卡資源的投入。",
        href: "./guides/event-core.html",
        cta: "打開活動時機"
      }
    ],
    guidesHeading: {
      kicker: "熱門攻略",
      title: "本週最常被打開的實用頁",
      link: "查看全部攻略"
    },
    features: [
      {
        type: "兌換碼",
        title: "最新兌換碼、複製按鈕與直達兌換路徑",
        body: "只有把最穩的可用碼、複測名單和失效殘留分清楚，兌換碼頁才會真的形成固定回訪。",
        href: "./guides/codes.html",
        cta: "打開兌換碼頁"
      },
      {
        type: "英雄",
        title: "按陣容缺口和活動價值判斷這輪英雄值不值得追",
        body: "用抽卡判斷器快速看目前池子是該跳、該謹慎碰，還是值得認真投入。",
        href: "./guides/hero-meta.html",
        cta: "打開英雄攻略"
      },
      {
        type: "建築",
        title: "找出下一條真正卡進度的建築鏈",
        body: "建築規劃器的價值不在於列清單，而在於快速告訴玩家哪條前置鏈會卡住下一個爐子或主城門檻。",
        href: "./guides/building-planner.html",
        cta: "打開建築規劃"
      }
    ],
    updatesHeading: {
      kicker: "重置前",
      title: "今天仍然最值得先確認的三件事"
    },
    updates: [
      {
        date: "兌換碼",
        title: "先看今天有沒有新碼",
        body: "短時效禮包碼仍然是最直接、也最容易帶來損失厭惡的一類內容。"
      },
      {
        date: "活動",
        title: "再看今天到底該囤還是該花",
        body: "成熟帳號很多時候不是缺資源，而是把資源交在了低價值窗口。"
      },
      {
        date: "建築",
        title: "最後確認下一個真實建築門檻",
        body: "如果你說不清下一個硬性前置是什麼，施工隊列就很容易被邊角升級浪費掉。"
      }
    ],
    spotlightHeading: {
      kicker: "接著看",
      title: "接著看這幾個高頻攻略"
    },
    spotlightItems: [
      {
        label: "回坑 / 新號",
        title: "新手與回坑成長路線",
        body: "適合新帳號和回坑老帳號快速找回節奏，重新回到高效率成長線。",
        href: "./guides/beginner-growth.html",
        cta: "打開成長藍圖"
      },
      {
        label: "活動準備",
        title: "每週活動節奏與囤資源窗口",
        body: "看哪些資源該繼續留，哪些完工動作該壓到計分窗口再一起交。",
        href: "./guides/event-rhythm.html",
        cta: "打開活動節奏"
      },
      {
        label: "聯盟",
        title: "支援本地儲存的聯盟日常清單",
        body: "給活躍成員和管理用的一頁輕工具，適合做成日常複開入口。",
        href: "./guides/alliance-ops.html",
        cta: "打開聯盟清單"
      }
    ],
    visualBriefingHeading: {
      kicker: "高頻入口",
      title: "玩家最常回來的幾個頁面"
    },
    visualBriefingItems: [
      {
        kicker: "兌換碼",
        title: "活躍碼、複測名單與失效歸檔分層展示",
        body: "兌換碼頁會把優先嘗試、需要複測和已經過期的條目分開，減少玩家重複試錯。",
        image: data.assets.screenshots[0],
        href: "./guides/codes.html",
        cta: "打開兌換碼"
      },
      {
        kicker: "今日",
        title: "重置倒數、官方觀察與本地備忘",
        body: "今日頁把重置壓力、版本線索和一條本地備忘放在一起，方便每天回來看一次就做判斷。",
        image: data.assets.screenshots[3],
        href: "./guides/today.html",
        cta: "打開今日資訊台"
      },
      {
        kicker: "養成",
        title: "建築路線、活動時機與抽卡紀律",
        body: "這一組頁面負責解決玩家最常見的三個高價值問題：卡哪、等不等、抽不抽。",
        image: data.assets.screenshots[2],
        href: "./guides/building-planner.html",
        cta: "打開規劃頁"
      }
    ],
    playerNeedsHeading: {
      kicker: "真實需求",
      title: "活躍 Kingshot 玩家真正會找的答案"
    },
    playerNeeds: [
      {
        label: "兌換碼",
        title: "重置前有沒有新禮包碼？",
        body: "短時效禮包碼是最容易錯過的即時收益，先看碼板再去做其他日常。"
      },
      {
        label: "花還是囤",
        title: "今天到底該花資源還是繼續囤？",
        body: "成熟帳號更怕錯窗口亂花資源，先看活動價值再交鑽石、抽卡和加速。"
      },
      {
        label: "英雄窗口",
        title: "目前英雄池值不值得追？",
        body: "英雄價值要看陣容缺口、活動疊加和資源餘量，不只是看表面強度。"
      },
      {
        label: "建築門檻",
        title: "下一條真正卡進度的建築鏈是什麼？",
        body: "玩家反覆回來，是為了少浪費幾天隊列，而不是看泛泛的升級建議。"
      }
    ],
    sourceWatchHeading: {
      kicker: "追蹤來源",
      title: "今天最值得盯的幾個來源"
    },
    sourceWatch: [
      {
        label: "社群",
        title: "Kingshot 官方 Facebook",
        body: "維護公告、里程碑發帖和最快冒出來的新禮包碼，通常還是先從這裡出現。",
        href: data.officialLinks.facebook,
        cta: "打開 Facebook"
      },
      {
        label: "商店",
        title: "Kingshot App Store 頁面",
        body: "當官方社群安靜時，App Store 的版本說明仍然可能提前透露功能變化和版本線索。",
        href: data.officialLinks.appStore,
        cta: "打開 App Store"
      },
      {
        label: "碼庫",
        title: "Kingshot.net 追蹤頁與兌換路徑",
        body: "把它當成碼庫追蹤面和兌換入口使用，但對有爭議的條目繼續保留複測標記。",
        href: data.officialLinks.codes,
        cta: "打開碼庫追蹤頁"
      }
    ],
    databaseHeading: {
      kicker: "日常入口",
      title: "玩家最常重新打開的頁面"
    },
    newsroomItems: [
      {
        kicker: "每日習慣",
        title: "Today in Kingshot",
        body: "重置、版本觀察、兌換碼跟進和一條本地備忘，全都集中在一個每天都能打開的頁面。",
        href: "./guides/today.html",
        cta: "打開今日資訊台"
      },
      {
        kicker: "最高需求",
        title: "最新兌換碼與失效歸檔",
        body: "這仍然是最強的高意圖入口，因為玩家最先要解決的是現在到底有什麼能領、什麼已經死了。",
        href: "./guides/codes.html",
        cta: "打開兌換碼"
      },
      {
        kicker: "最容易虧資源",
        title: "英雄時機與鑽石紀律",
        body: "帳號長期價值很多時候不是輸在攻略少，而是輸在弱池子和非窗口期亂花資源。",
        href: "./guides/event-core.html",
        cta: "打開活動時機"
      }
    ],
    codesPanel: {
      kicker: "首頁碼板",
      title: "玩家現在最該優先複製的兌換碼",
      body: "最穩的優先嘗試條目會放在最上面。需要複測的條目保留標籤，過期殘留不會混進主要信任層。",
      cta: "打開完整兌換碼頁",
      copy: "複製",
      redeem: "兌換",
      tracker: "追蹤頁",
      safeLabel: "先試這條",
      watchLabel: "先複測"
    },
    roadmapHeading: {
      kicker: "兌換步驟",
      title: "1 分鐘內完成領碼"
    },
    promoCodes: {
      kicker: "兌換碼",
      title: "最新可用兌換碼",
      body: "目前優先碼、複測名單、失效歸檔和官方兌換入口都整理在一起。",
      cta: "打開兌換碼"
    },
    promoToday: {
      kicker: "今日",
      title: "重置資訊台與版本觀察",
      body: "一頁查看重置時間、官方動態和本地提醒，不用來回跳頁面。",
      cta: "打開今日資訊台"
    },
    promoNews: {
      kicker: "活動",
      title: "Hall of Heroes 與 Hero Roulette 時機",
      body: "在交出鑽石、抽卡和加速前，先來這裡判斷窗口品質和值不值得跟。",
      cta: "打開活動時機"
    },
    toolHub: {
      kicker: "快速入口",
      title: "快速找到你要看的頁面",
      placeholder: "搜尋攻略、工具和資料頁",
      chips: ["全部", "計算", "攻略", "聯盟", "資料"]
    },
    toolCards: [
      { type: "每日資訊台", title: "Today in Kingshot", body: "重置時間、官方觀察流、兌換碼跟進和本地備忘整合到同一頁。", cta: "打開頁面" },
      { type: "資料頁", title: "最新兌換碼板", body: "活躍條目、複測名單、失效歸檔與快速複製都放在一起。", cta: "打開頁面" },
      { type: "英雄攻略", title: "英雄抽卡與陣容判斷", body: "快速判斷這一輪池子是在補真實缺口，還是更適合繼續跳過。", cta: "打開頁面" },
      { type: "活動攻略", title: "英雄活動時機", body: "圍繞 Hall of Heroes、Hero Roulette 和囤資源窗口來判斷今天該花還是該囤。", cta: "打開頁面" },
      { type: "建築攻略", title: "建築規劃器", body: "直接看下一個爐子或主城門檻，不再盲目平均升級。", cta: "打開頁面" },
      { type: "成長攻略", title: "成長藍圖", body: "適合新號和回坑帳號快速回到高效率成長線。", cta: "打開頁面" }
    ]
  }
};

const homeToolDefaults = {
  en: {
    heading: { kicker: "Daily tools", title: "Save today's Kingshot plan" },
    checklist: {
      label: "Daily checklist",
      title: "Before reset",
      body: "Track the small tasks that players forget most often before the daily reset.",
      items: ["Check current codes", "Confirm hold or spend", "Refresh key queues", "Write next account gate"],
      reset: "Reset",
      progress: "{checked} of {total} done"
    },
    decision: {
      label: "Spend check",
      title: "Today's resource call",
      options: ["Hold", "Prep", "Spend"],
      results: {
        hold: "Hold gems, pulls, and speedups unless a strong score window is visible.",
        prep: "Prep queues, gathering, and finishers so the next event window starts clean.",
        spend: "Spend only on the part that improves your main march or reaches a meaningful reward tier."
      }
    },
    note: {
      label: "Account note",
      title: "Next gate",
      saved: "Saved locally",
      placeholder: "Example: Furnace 22, save 18h construction speedups, check hero event after reset."
    }
  },
  "zh-CN": {
    heading: { kicker: "每日工具", title: "保存今天的 Kingshot 计划" },
    checklist: {
      label: "每日清单",
      title: "重置前",
      body: "记录最容易忘掉的几个小动作，适合每天打开快速勾一遍。",
      items: ["检查当前兑换码", "确认今天囤还是花", "刷新关键队列", "写下下一个账号卡点"],
      reset: "重置",
      progress: "已完成 {checked} / {total}"
    },
    decision: {
      label: "资源判断",
      title: "今天的资源动作",
      options: ["继续囤", "做准备", "集中花"],
      results: {
        hold: "没有强计分窗口时，默认继续囤钻石、抽卡和加速。",
        prep: "先做队列、采集和前置准备，把完工点留给下一个活动窗口。",
        spend: "只把资源交给能强化主力队或打进关键奖励层级的部分。"
      }
    },
    note: {
      label: "账号备忘",
      title: "下一个卡点",
      saved: "已保存在本地",
      placeholder: "例：炉子 22，保留 18 小时建筑加速，重置后看英雄活动。"
    }
  },
  "zh-TW": {
    heading: { kicker: "每日工具", title: "保存今天的 Kingshot 計畫" },
    checklist: {
      label: "每日清單",
      title: "重置前",
      body: "記錄最容易忘掉的幾個小動作，適合每天打開快速勾一遍。",
      items: ["檢查目前兌換碼", "確認今天囤還是花", "刷新關鍵隊列", "寫下下一個帳號卡點"],
      reset: "重置",
      progress: "已完成 {checked} / {total}"
    },
    decision: {
      label: "資源判斷",
      title: "今天的資源動作",
      options: ["繼續囤", "做準備", "集中花"],
      results: {
        hold: "沒有強計分窗口時，預設繼續囤鑽石、抽卡和加速。",
        prep: "先做隊列、採集和前置準備，把完工點留給下一個活動窗口。",
        spend: "只把資源交給能強化主力隊或打進關鍵獎勵層級的部分。"
      }
    },
    note: {
      label: "帳號備忘",
      title: "下一個卡點",
      saved: "已保存在本地",
      placeholder: "例：爐子 22，保留 18 小時建築加速，重置後看英雄活動。"
    }
  }
};

const copy = deepMerge(copyMap.en, copyMap[locale] || {}, portalOverrides[locale] || {});
copy.homeTools = homeToolDefaults[locale] || homeToolDefaults.en;

const localizedEntryField = (entry, base) => {
  if (locale === "zh-CN" && entry[`${base}Zh`]) {
    return entry[`${base}Zh`];
  }
  if (locale === "zh-TW" && entry[`${base}Tw`]) {
    return entry[`${base}Tw`];
  }
  return entry[base];
};

const copyText = async (value) => {
  if (!value) {
    return false;
  }

  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fall through
  }

  const helper = document.createElement("textarea");
  helper.value = value;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  helper.setSelectionRange(0, helper.value.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(helper);
  return copied;
};

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
};

const renderNav = () => {
  const navLinks = Array.from(document.querySelectorAll(".news-topnav a"));
  copy.nav.forEach((label, index) => {
    if (navLinks[index]) {
      navLinks[index].textContent = label;
    }
  });

  const topLinks = Array.from(document.querySelectorAll(".masthead-links a"));
  copy.topLinks.forEach((label, index) => {
    if (topLinks[index]) {
      topLinks[index].textContent = label;
    }
  });

  const dockLinks = Array.from(document.querySelectorAll(".mobile-dock a"));
  copy.mobileDock.forEach((label, index) => {
    if (dockLinks[index]) {
      dockLinks[index].textContent = label;
    }
  });
};

const renderHero = () => {
  setText(".brand-lockup small", copy.brandTagline);
  setText(".status-pill", copy.statusPill);
  setText(".headline-story .eyebrow", copy.heroEyebrow);
  setText(".headline-story h1", copy.heroTitle);
  setText(".hero-lede", copy.heroLead);

  const heroActions = document.querySelector(".hero-actions");
  if (heroActions) {
    heroActions.innerHTML = `
      <a class="button button-primary" href="./guides/today.html">${copy.heroPrimary}</a>
      <a class="button button-secondary" href="./guides/codes.html">${copy.heroSecondary}</a>
    `;
  }

  const heroTags = document.querySelector(".hero-tags");
  if (heroTags) {
    heroTags.innerHTML = copy.heroTags.map((item) => `<span>${item}</span>`).join("");
  }

  const quickAnswers = document.querySelector(".hero-quick-answers");
  if (quickAnswers && Array.isArray(copy.quickAnswers)) {
    quickAnswers.innerHTML = copy.quickAnswers
      .map((item, index) => {
        const actions = Array.isArray(item.actions)
          ? `
            <div class="answer-actions">
              ${item.actions
                .map(
                  (action) => `
                    <a class="button ${action.style || "button-secondary"}" href="${action.href}">${action.label}</a>
                  `
                )
                .join("")}
            </div>
          `
          : "";

        return `
          <article class="answer-card ${index === 0 ? "answer-card-primary" : ""}">
            <p class="section-kicker">${item.kicker}</p>
            <h2>${item.title}</h2>
            <p>${item.body}</p>
            ${actions}
          </article>
        `;
      })
      .join("");
  }

  const miniGrid = document.querySelector(".hero-mini-grid");
  if (miniGrid) {
    miniGrid.innerHTML = `
      <article class="hero-story-card">
        <div class="hero-story-head">
          <span class="section-kicker">${copy.heroStoryKicker}</span>
          <time>${data.appMeta.currentVersionDate}</time>
        </div>
        <strong>${copy.heroStoryTitle}</strong>
        <p>${copy.heroStoryBody}</p>
        <a class="card-link" href="./guides/today.html">${copy.heroStoryLink}</a>
      </article>
      <div class="hero-metrics-stack">
        ${copy.heroMetrics
          .map(
            (metric) => `
              <article class="stat-emphasis-card">
                <span>${metric.label}</span>
                <strong>${metric.value}</strong>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  const commandCenter = document.querySelector(".command-center");
  if (commandCenter) {
    commandCenter.innerHTML = `
      <div class="hero-visual-stack">
        <div class="hero-game-card">
          <div class="hero-game-copy">
            <p class="section-kicker">${copy.visualKicker}</p>
            <strong>${copy.visualTitle}</strong>
            <p>${copy.visualBody}</p>
          </div>
          <img src="${data.assets.appIcon}" alt="Kingshot app icon" class="hero-app-icon" />
        </div>
        <div class="screenshot-strip">
          ${data.assets.screenshots
            .slice(0, 3)
            .map(
              (src, index) => `
                <figure class="shot-card ${index === 0 ? "shot-card-large" : ""}">
                  <img src="${src}" alt="Kingshot screenshot ${index + 1}" />
                </figure>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  const promoCodes = document.querySelector(".promo-codes-card");
  if (promoCodes) {
    promoCodes.innerHTML = `
      <p class="section-kicker">${copy.promoCodes.kicker}</p>
      <h2>${copy.promoCodes.title}</h2>
      <p>${copy.promoCodes.body}</p>
      <a class="card-link" href="./guides/codes.html">${copy.promoCodes.cta}</a>
    `;
  }

  const promoToday = document.querySelector(".promo-today-card");
  if (promoToday) {
    promoToday.innerHTML = `
      <p class="section-kicker">${copy.promoToday.kicker}</p>
      <h2>${copy.promoToday.title}</h2>
      <p>${copy.promoToday.body}</p>
      <a class="card-link" href="./guides/today.html">${copy.promoToday.cta}</a>
    `;
  }

  const promoNews = document.querySelector(".promo-news-card");
  if (promoNews) {
    promoNews.innerHTML = `
      <p class="section-kicker">${copy.promoNews.kicker}</p>
      <h2>${copy.promoNews.title}</h2>
      <p>${copy.promoNews.body}</p>
      <a class="card-link" href="./guides/event-core.html">${copy.promoNews.cta}</a>
    `;
  }
};

const renderTicker = () => {
  const tickerTrack = document.querySelector(".ticker-track");
  if (tickerTrack) {
    tickerTrack.innerHTML = copy.ticker.map((item) => `<span>${item}</span>`).join("");
  }
};

const renderHead = (selector, heading) => {
  const root = document.querySelector(selector);
  if (!root) {
    return;
  }

  const kicker = root.querySelector(".section-kicker");
  const title = root.querySelector("h2");
  const link = root.querySelector(".text-link");

  if (kicker) {
    kicker.textContent = heading.kicker;
  }
  if (title) {
    title.textContent = heading.title;
  }
  if (link && heading.link) {
    link.textContent = heading.link;
  }
};

const renderNewsLists = () => {
  renderHead(".top-news-panel .section-head", copy.topNewsHeading);
  renderHead("#guides .section-head", copy.guidesHeading);
  renderHead(".updates-panel .section-head", copy.updatesHeading);
  renderHead(".spotlight-panel .section-head", copy.spotlightHeading);
  renderHead(".visual-briefing-panel .section-head", copy.visualBriefingHeading);
  renderHead(".player-needs-panel .section-head", copy.playerNeedsHeading);
  renderHead(".source-watch-panel .section-head", copy.sourceWatchHeading);

  const topNewsList = document.querySelector(".top-news-list");
  if (topNewsList) {
    topNewsList.innerHTML = copy.topNews
      .map(
        (item) => `
          <article class="news-card">
            <div class="news-meta">
              <span class="news-label">${item.label}</span>
              <time>${item.date}</time>
            </div>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
            <a class="feature-link" href="${item.href}">${item.cta}</a>
          </article>
        `
      )
      .join("");
  }

  const featureList = document.querySelector(".feature-list");
  if (featureList) {
    featureList.innerHTML = copy.features
      .map(
        (item) => `
          <article class="feature-row editorial-feature-row">
            <div class="feature-copy">
              <span class="feature-label">${item.type}</span>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </div>
            <a class="feature-link" href="${item.href}">${item.cta}</a>
          </article>
        `
      )
      .join("");
  }

  const updateList = document.querySelector(".update-list");
  if (updateList) {
    updateList.innerHTML = copy.updates
      .map(
        (item) => `
          <article class="update-row">
            <time>${item.date}</time>
            <div>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
            </div>
          </article>
        `
      )
      .join("");
  }

  const spotlightGrid = document.querySelector(".spotlight-grid");
  if (spotlightGrid) {
    spotlightGrid.innerHTML = copy.spotlightItems
      .map(
        (item) => `
          <article class="spotlight-card editorial-spotlight-card">
            <span>${item.label}</span>
            <strong>${item.title}</strong>
            <p>${item.body}</p>
            <a class="card-link" href="${item.href}">${item.cta}</a>
          </article>
        `
      )
      .join("");
  }

  const visualBriefingGrid = document.querySelector(".visual-briefing-grid");
  if (visualBriefingGrid && Array.isArray(copy.visualBriefingItems)) {
    visualBriefingGrid.innerHTML = copy.visualBriefingItems
      .map(
        (item) => `
          <article class="visual-brief-card">
            <figure class="visual-brief-image">
              <img src="${item.image}" alt="${item.title}" />
            </figure>
            <div class="visual-brief-copy">
              <span class="feature-label">${item.kicker}</span>
              <h3>${item.title}</h3>
              <p>${item.body}</p>
              <a class="feature-link" href="${item.href}">${item.cta}</a>
            </div>
          </article>
        `
      )
      .join("");
  }

  const playerNeedsGrid = document.querySelector(".player-needs-grid");
  if (playerNeedsGrid && Array.isArray(copy.playerNeeds)) {
    playerNeedsGrid.innerHTML = copy.playerNeeds
      .map(
        (item) => `
          <article class="need-card">
            <span>${item.label}</span>
            <strong>${item.title}</strong>
            <p>${item.body}</p>
          </article>
        `
      )
      .join("");
  }

  const sourceWatchGrid = document.querySelector(".source-watch-grid");
  if (sourceWatchGrid && Array.isArray(copy.sourceWatch)) {
    sourceWatchGrid.innerHTML = copy.sourceWatch
      .map(
        (item) => `
          <a class="source-watch-card" href="${item.href}" target="_blank" rel="noreferrer">
            <span>${item.label}</span>
            <strong>${item.title}</strong>
            <p>${item.body}</p>
            <b>${item.cta}</b>
          </a>
        `
      )
      .join("");
  }
};

const renderSidebar = () => {
  renderHead("#database .section-head", copy.databaseHeading);
  renderHead(".roadmap-panel .section-head", copy.roadmapHeading);

  const databaseGrid = document.querySelector(".database-grid");
  if (databaseGrid) {
    databaseGrid.innerHTML = copy.newsroomItems
      .map(
        (item) => `
          <article class="database-card newsroom-card">
            <span class="db-label">${item.kicker}</span>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
            <a class="feature-link" href="${item.href}">${item.cta}</a>
          </article>
        `
      )
      .join("");
  }

  const opsPanel = document.querySelector(".live-ops-panel");
  if (opsPanel) {
    opsPanel.innerHTML = `
      <div class="section-head">
        <div>
          <p class="section-kicker">${copy.codesPanel.kicker}</p>
          <h2>${copy.codesPanel.title}</h2>
        </div>
      </div>
      <p class="module-summary">${copy.codesPanel.body}</p>
      <div class="ops-cards">
        ${data.codes.active
          .map(
            (entry) => `
              <div class="ops-card code-spotlight-card">
                <span class="ops-label">${entry.confidence === "verified" ? copy.codesPanel.safeLabel : copy.codesPanel.watchLabel}</span>
                <strong>${entry.code}</strong>
                <p>${localizedEntryField(entry, "note")}</p>
                <p class="ops-meta">${localizedEntryField(entry, "expires")}</p>
                <div class="ops-card-actions">
                  <button class="button button-secondary ops-copy-button" type="button" data-home-copy="${entry.code}">${copy.codesPanel.copy}</button>
                  <a class="button button-primary" href="${data.officialLinks.redeem}" target="_blank" rel="noreferrer">${copy.codesPanel.redeem}</a>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="sidebar-code-links">
        <a class="card-link inline-card-link" href="./guides/codes.html">${copy.codesPanel.cta}</a>
        <a class="card-link inline-card-link" href="${data.officialLinks.codes}" target="_blank" rel="noreferrer">${copy.codesPanel.tracker}</a>
      </div>
    `;
  }

  const roadmap = document.querySelector(".roadmap-panel .build-order");
  if (roadmap) {
    const steps = localizedSteps[locale] || localizedSteps.en;
    const notes = localizedNotes[locale] || localizedNotes.en;
    roadmap.innerHTML = `
      ${steps.map((step) => `<li>${step}</li>`).join("")}
      ${notes.map((note) => `<li>${note}</li>`).join("")}
    `;
  }
};

const renderToolHub = () => {
  const hubHeader = document.querySelector(".tools-hub .hub-header");
  if (hubHeader) {
    const kicker = hubHeader.querySelector(".section-kicker");
    const title = hubHeader.querySelector("h2");
    const input = hubHeader.querySelector(".tool-search");
    const chipNodes = Array.from(hubHeader.querySelectorAll(".chip"));

    if (kicker) {
      kicker.textContent = copy.toolHub.kicker;
    }
    if (title) {
      title.textContent = copy.toolHub.title;
    }
    if (input) {
      input.setAttribute("placeholder", copy.toolHub.placeholder);
    }
    copy.toolHub.chips.forEach((label, index) => {
      if (chipNodes[index]) {
        chipNodes[index].textContent = label;
      }
    });
  }

  if (Array.isArray(copy.toolCards)) {
    toolCards.forEach((card, index) => {
      const content = copy.toolCards[index];
      if (!content) {
        return;
      }
      const type = card.querySelector(".tool-type");
      const title = card.querySelector("h3");
      const body = card.querySelector("p:not(.tool-type)");
      const link = card.querySelector("a");

      if (type) {
        type.textContent = content.type;
      }
      if (title) {
        title.textContent = content.title;
      }
      if (body) {
        body.textContent = content.body;
      }
      if (link) {
        link.textContent = content.cta;
      }
    });
  }
};

const renderHomeTools = () => {
  const panel = document.querySelector("[data-home-daily-tools]");
  if (!panel || !copy.homeTools) {
    return;
  }

  const tools = copy.homeTools;
  const head = panel.querySelector(".section-head");
  const kicker = head?.querySelector(".section-kicker");
  const title = head?.querySelector("h2");
  const checklistCard = panel.querySelector(".home-checklist-card");
  const decisionCard = panel.querySelector(".home-decision-card");
  const noteCard = panel.querySelector(".home-note-card");
  const checklistRoot = panel.querySelector("[data-home-checklist]");
  const checklistInputs = Array.from(checklistRoot?.querySelectorAll("input[type='checkbox']") || []);
  const resetButton = panel.querySelector("#home-reset-checklist");
  const checklistStatus = panel.querySelector("#home-checklist-status");
  const planButtons = Array.from(panel.querySelectorAll("[data-home-plan]"));
  const planResult = panel.querySelector("#home-plan-result");
  const noteField = panel.querySelector("#home-note");
  const noteStatus = panel.querySelector("#home-note-status");
  const checklistKey = "kingshot-home-daily-checklist";
  const planKey = "kingshot-home-resource-plan";
  const noteKey = "kingshot-home-next-gate";

  if (kicker) {
    kicker.textContent = tools.heading.kicker;
  }
  if (title) {
    title.textContent = tools.heading.title;
  }

  if (checklistCard) {
    const label = checklistCard.querySelector(".feature-label");
    const cardTitle = checklistCard.querySelector("h3");
    const body = checklistCard.querySelector("p");

    if (label) {
      label.textContent = tools.checklist.label;
    }
    if (cardTitle) {
      cardTitle.textContent = tools.checklist.title;
    }
    if (body) {
      body.textContent = tools.checklist.body;
    }
  }

  checklistInputs.forEach((input, index) => {
    const label = input.closest("label");
    if (label && tools.checklist.items[index]) {
      label.lastChild.textContent = ` ${tools.checklist.items[index]}`;
    }
  });

  if (resetButton) {
    resetButton.textContent = tools.checklist.reset;
  }

  if (decisionCard) {
    const label = decisionCard.querySelector(".feature-label");
    const cardTitle = decisionCard.querySelector("h3");

    if (label) {
      label.textContent = tools.decision.label;
    }
    if (cardTitle) {
      cardTitle.textContent = tools.decision.title;
    }
  }

  planButtons.forEach((button, index) => {
    if (tools.decision.options[index]) {
      button.textContent = tools.decision.options[index];
    }
  });

  if (noteCard) {
    const label = noteCard.querySelector(".feature-label");
    const cardTitle = noteCard.querySelector("h3");

    if (label) {
      label.textContent = tools.note.label;
    }
    if (cardTitle) {
      cardTitle.textContent = tools.note.title;
    }
  }

  if (noteStatus) {
    noteStatus.textContent = tools.note.saved;
  }
  if (noteField) {
    noteField.setAttribute("placeholder", tools.note.placeholder);
  }

  const readJson = (key) => {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  };

  const writeJson = (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const updateChecklist = () => {
    const state = readJson(checklistKey);
    let checked = 0;

    checklistInputs.forEach((input) => {
      const value = Boolean(state[input.dataset.item]);
      input.checked = value;
      input.closest("label")?.classList.toggle("done", value);
      checked += value ? 1 : 0;
    });

    if (checklistStatus) {
      checklistStatus.textContent = tools.checklist.progress
        .replace("{checked}", String(checked))
        .replace("{total}", String(checklistInputs.length));
    }
  };

  checklistInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const state = readJson(checklistKey);
      state[input.dataset.item] = input.checked;
      writeJson(checklistKey, state);
      updateChecklist();
    });
  });

  resetButton?.addEventListener("click", () => {
    try {
      window.localStorage.removeItem(checklistKey);
    } catch {
      // ignore storage failures
    }
    updateChecklist();
  });

  const renderPlan = (plan) => {
    planButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.homePlan === plan);
    });

    if (planResult) {
      planResult.textContent = tools.decision.results[plan] || tools.decision.results.hold;
    }
  };

  let savedPlan = "hold";
  try {
    savedPlan = window.localStorage.getItem(planKey) || "hold";
  } catch {
    savedPlan = "hold";
  }
  renderPlan(savedPlan);

  planButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.homePlan || "hold";
      try {
        window.localStorage.setItem(planKey, plan);
      } catch {
        // ignore storage failures
      }
      renderPlan(plan);
    });
  });

  try {
    if (noteField) {
      noteField.value = window.localStorage.getItem(noteKey) || "";
    }
  } catch {
    if (noteStatus) {
      noteStatus.textContent = "";
    }
  }

  noteField?.addEventListener("input", () => {
    try {
      window.localStorage.setItem(noteKey, noteField.value);
      if (noteStatus) {
        noteStatus.textContent = tools.note.saved;
      }
    } catch {
      if (noteStatus) {
        noteStatus.textContent = "";
      }
    }
  });

  updateChecklist();
};

renderNav();
renderHero();
renderTicker();
renderNewsLists();
renderSidebar();
renderToolHub();
renderHomeTools();
applyFilters();

document.querySelectorAll("[data-home-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = button.getAttribute("data-home-copy") || "";
    const original = button.textContent || copy.codesPanel.copy;
    const copied = await copyText(code);
    button.textContent = copied ? `${copy.codesPanel.copy} OK` : `${copy.codesPanel.copy}: ${code}`;

    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
});
