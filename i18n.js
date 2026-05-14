const supportedLocales = [
  "en",
  "zh-CN",
  "zh-TW",
  "ja",
  "ko",
  "de",
  "fr",
  "es",
  "pt-BR",
  "ru",
  "th"
];

const localeLabels = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  ko: "한국어",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  "pt-BR": "Português (BR)",
  ru: "Русский",
  th: "ไทย"
};

const fallbackLocale = "en";
const localeStorageKey = "kingshot-central-locale";

const pageMeta = {
  home: {
    en: {
      title: "Kingshot Central | Kingshot News, Codes, and Strategy Guides",
      description:
        "Kingshot Central is a Kingshot news and strategy portal with official codes, patch tracking, hero guides, event planning, and daily-use progression pages."
    },
    "zh-CN": {
      title: "Kingshot Central | Kingshot资讯、兑换码与实用攻略",
      description:
        "Kingshot Central 是一个面向 Kingshot 玩家的资讯与攻略站，提供官方兑换码、版本观察、英雄规划、活动节奏与建筑路线。"
    },
    "zh-TW": {
      title: "Kingshot Central | Kingshot資訊、兌換碼與實用攻略",
      description:
        "Kingshot Central 是一個面向 Kingshot 玩家的資訊與攻略站，提供官方兌換碼、版本觀察、英雄規劃、活動節奏與建築路線。"
    }
  },
  today: {
    en: {
      title: "Today in Kingshot | Reset, Region Watch, and Notes",
      description:
        "Today in Kingshot shows reset timing, region-aware updates, official watch links, and a locally saved memo for repeat daily use."
    },
    "zh-CN": {
      title: "Today in Kingshot | 重置、分地区资讯与备忘",
      description:
        "Today in Kingshot 提供每日重置、分地区资讯、官方动态入口与本地备忘录，适合做成玩家每天打开的实用页。"
    },
    "zh-TW": {
      title: "Today in Kingshot | 重置、分地區資訊與備忘",
      description:
        "Today in Kingshot 提供每日重置、分地區資訊、官方動態入口與本地備忘錄，適合作為玩家每天打開的實用頁。"
    }
  },
  codes: {
    en: {
      title: "Kingshot Codes | Active and Expired Redeem Codes",
      description:
        "Latest Kingshot redeem codes, expired code archive, and notes on where players usually find new codes first."
    },
    "zh-CN": {
      title: "Kingshot Codes | 最新兑换码与过期归档",
      description: "查看 Kingshot 最新兑换码、观察名单、过期归档以及高频检查入口。"
    },
    "zh-TW": {
      title: "Kingshot Codes | 最新兌換碼與過期歸檔",
      description: "查看 Kingshot 最新兌換碼、觀察名單、過期歸檔以及高頻檢查入口。"
    }
  },
  building: {
    en: {
      title: "Kingshot Building Planner",
      description:
        "Kingshot building and furnace planning guide with upgrade-gate logic, saved notes, and practical queue priorities."
    },
    "zh-CN": {
      title: "Kingshot 建筑规划器",
      description: "Kingshot 建筑与炉子规划页面，包含升级顺序、阶段目标与本地保存规划笔记。"
    },
    "zh-TW": {
      title: "Kingshot 建築規劃器",
      description: "Kingshot 建築與爐子規劃頁面，包含升級順序、階段目標與本地保存規劃筆記。"
    }
  },
  hero: {
    en: {
      title: "Kingshot Hero Meta Guide",
      description:
        "Kingshot hero priorities, gem discipline, lineup thinking, and how to evaluate pulls by role and account stage."
    },
    "zh-CN": {
      title: "Kingshot 英雄思路与抽卡优先级",
      description: "Kingshot 英雄优先级、宝石纪律、阵容方向与不同账号阶段的抽卡判断。"
    },
    "zh-TW": {
      title: "Kingshot 英雄思路與抽卡優先級",
      description: "Kingshot 英雄優先級、寶石紀律、陣容方向與不同帳號階段的抽卡判斷。"
    }
  },
  eventCore: {
    en: {
      title: "Kingshot Hall of Heroes and Hero Roulette Guide",
      description:
        "Kingshot event planning guide for Hall of Heroes, Hero Roulette, gem timing, and when to hold resources for stronger score windows."
    },
    "zh-CN": {
      title: "Kingshot 英雄活动与囤钻节奏指南",
      description: "围绕 Hall of Heroes、Hero Roulette、宝石时机和囤资源窗口的活动规划页。"
    },
    "zh-TW": {
      title: "Kingshot 英雄活動與囤鑽節奏指南",
      description: "圍繞 Hall of Heroes、Hero Roulette、寶石時機與囤資源窗口的活動規劃頁。"
    }
  },
  alliance: {
    en: {
      title: "Kingshot Alliance Daily Ops Checklist",
      description:
        "A repeat-use Kingshot daily and weekly alliance operations checklist with local browser saving for players and officers."
    },
    "zh-CN": {
      title: "Kingshot 联盟日常清单",
      description: "适合玩家和管理使用的 Kingshot 联盟日常清单，支持本地浏览器保存。"
    },
    "zh-TW": {
      title: "Kingshot 聯盟日常清單",
      description: "適合玩家與管理使用的 Kingshot 聯盟日常清單，支援本地瀏覽器儲存。"
    }
  },
  beginner: {
    en: {
      title: "Kingshot Beginner Growth Blueprint",
      description:
        "A beginner growth plan for Kingshot focused on furnace timing, resource discipline, heroes, and what low spenders should prioritize first."
    },
    "zh-CN": {
      title: "Kingshot 新手成长蓝图",
      description: "围绕炉子节奏、资源纪律、英雄投资和低氪优先级的 Kingshot 新手成长页。"
    },
    "zh-TW": {
      title: "Kingshot 新手成長藍圖",
      description: "圍繞爐子節奏、資源紀律、英雄投資與低氪優先級的 Kingshot 新手成長頁。"
    }
  },
  eventRhythm: {
    en: {
      title: "Kingshot Event Rhythm Guide",
      description:
        "A practical event-planning guide for Kingshot players who want to save speedups, prepare for alliance scoring windows, and grow more efficiently."
    },
    "zh-CN": {
      title: "Kingshot 活动节奏指南",
      description: "帮助玩家围绕加速、联盟计分窗口和资源节奏来规划成长的 Kingshot 活动页。"
    },
    "zh-TW": {
      title: "Kingshot 活動節奏指南",
      description: "幫助玩家圍繞加速、聯盟計分窗口與資源節奏來規劃成長的 Kingshot 活動頁。"
    }
  }
};

const translations = {
  en: {
    shared: {
      language: "Language",
      localeNotice: "Auto language: {locale}",
      adLabel: "Advertisement",
      sponsoredLabel: "Sponsored",
      open: "Open",
      view: "View",
      plan: "Plan",
      read: "Read",
      openPage: "Open page",
      backToHome: "Back to Kingshot Central",
      regions: {
        global: "Global",
        cn: "Mainland China",
        tw: "Traditional Chinese",
        jp: "Japan",
        kr: "Korea",
        de: "Germany",
        fr: "France",
        latam: "LATAM",
        br: "Brazil",
        ru: "Russia",
        th: "Thailand"
      }
    },
    home: {
      brandTagline: "Guides. Tools. Planning.",
      nav: {
        overview: "Overview",
        tools: "Tools",
        guides: "Guides",
        database: "Database",
        updates: "Updates"
      },
      sidebar: {
        coreLoopsTitle: "Core loops",
        coreLoops: [
          "Progression planning",
          "Event prep",
          "Kingdom timing",
          "Alliance coordination"
        ],
        highDemandTitle: "Most used pages",
        highDemand: [
          "Today panel",
          "Redeem code watch",
          "Hero pull planning",
          "Building target planner"
        ]
      },
      ads: {
        sidebarTitle: "Sponsored",
        sidebarBody: "Support this free Kingshot resource.",
        mobileTopTitle: "Sponsored",
        mobileTopBody: "Support this free Kingshot resource.",
        leaderboardTitle: "Sponsored",
        leaderboardBody: "Support this free Kingshot resource.",
        mobileMidTitle: "Sponsored",
        mobileMidBody: "Support this free Kingshot resource."
      },
      mobileBrand: "Mobile Command View",
      mobileQuick: {
        today: "Today",
        codes: "Codes",
        heroes: "Heroes",
        events: "Events",
        build: "Build"
      },
      statusPill: "Daily-use Kingshot strategy desk",
      topLinks: {
        today: "Today in Kingshot",
        codes: "Latest codes",
        hero: "Hero meta",
        event: "Event core"
      },
      heroEyebrow: "Built for repeat opens",
      heroTitle: "Kingshot codes, reset timing, hero events, and upgrade routes.",
      heroLead:
        "Start with the live utility panel, code watch, hero planning, and building targets. Then branch into region-aware updates and practical reference pages when needed.",
      heroButtons: {
        today: "Open daily panel",
        codes: "Check latest codes"
      },
      heroTags: ["Daily tools", "Redeem codes", "Hero planning", "Region news"],
      heroMini: {
        today: {
          kicker: "Today",
          title: "Reset, note, and official watch",
          body: "Check reset pressure, official signals, and the next account action in seconds."
        },
        codes: {
          kicker: "Codes",
          title: "Fast copy and verification flow",
          body: "Short-life codes are still one of the fastest checks players can complete before reset."
        }
      },
      radar: {
        kicker: "Command map",
        title: "Player-first utility stack"
      },
      metrics: [
        {
          label: "Open-first feature",
          title: "Daily panel with memo and reset timer",
          body: "This is the page players can reopen every day for reset timing, notes, and next-step clarity."
        },
        {
          label: "Search demand",
          title: "Codes, heroes, events, buildings",
          body: "These four topics still carry the strongest repeat-intent cluster for Kingshot players."
        },
        {
          label: "Retention layer",
          title: "Region updates and saved personal notes",
          body: "Players return when the page helps them check reset timing, codes, events, and their next account note quickly."
        }
      ],
      mobileMissions: [
        { kicker: "Now", title: "Open Today in Kingshot" },
        { kicker: "Priority", title: "Check region update stream" },
        { kicker: "Growth", title: "Push your core building chain" }
      ],
      ticker: [
        "Today panel now supports region-specific official watch",
        "Codes page stores personal last-check time locally",
        "Building planner keeps your current bottleneck note"
      ],
      commandCards: [
        {
          kicker: "Most useful daily page",
          badge: "Updated",
          title: "Today in Kingshot",
          body: "Reset countdown, current focus, official update watch, and a saved local memo make this the cleanest daily habit page on the site.",
          link: "Open daily panel"
        },
        {
          kicker: "Highest demand",
          badge: "Search",
          title: "Kingshot codes and expired archive",
          body: "Short-life gift codes create the strongest repeat-check habit when working and dead entries are separated cleanly.",
          link: "Open codes page"
        },
        {
          kicker: "Most expensive mistake",
          badge: "Meta",
          title: "Hero priorities and gem discipline",
          body: "Players lose long-term account value fastest when they spend on the wrong hero window.",
          link: "Open hero meta"
        }
      ],
      liveBoard: {
        kicker: "Live player board",
        title: "Open the three things players care about first",
        cards: [
          {
            label: "Today",
            title: "Reset, memo, and region update stream",
            body: "The daily panel is the fastest way to know what matters before spending any resources.",
            link: "Open Today"
          },
          {
            label: "Codes",
            title: "Check whether a new code dropped before it dies",
            body: "This is one of the highest-frequency revisit needs and belongs one click from the homepage.",
            link: "Open Codes"
          },
          {
            label: "Planning",
            title: "Do not waste gems, pulls, or building time",
            body: "Hero timing and building targets are where most players either gain efficiency or throw it away.",
            link: "Open Hero Guide"
          }
        ]
      },
      quickStart: {
        kicker: "Quick start",
        title: "Start from the page that matches your problem",
        items: [
          {
            title: "I need to know what to do today",
            body: "Open the daily panel for reset, watchlist, and memo."
          },
          {
            title: "I only care about the newest codes",
            body: "Jump straight to active watchlist and expired archive."
          },
          {
            title: "My building queue is stuck",
            body: "Use the building planner to find the next meaningful gate."
          },
          {
            title: "I am saving for the next hero event",
            body: "Review event timing before spending gems or premium pulls."
          }
        ]
      },
      toolHub: {
        kicker: "Tool hub",
        title: "Find the right page in a few seconds",
        searchPlaceholder: "Search tools, guides, and reference pages",
        filters: {
          all: "All",
          calculators: "Calculators",
          guides: "Guides",
          alliance: "Alliance",
          reference: "Reference"
        }
      },
      toolCards: [
        {
          type: "Daily utility",
          title: "Today in Kingshot",
          body: "Reset countdown, official watch feed, current focus, and a saved local memo."
        },
        {
          type: "Reference",
          title: "Latest Codes Archive",
          body: "Working and expired codes with dates, notes, and fast copy buttons."
        },
        {
          type: "Hero guide",
          title: "Hero Meta and Priorities",
          body: "What to pull, what to skip, and how to think by generation and role."
        },
        {
          type: "Event guide",
          title: "Hall of Heroes and Hero Roulette",
          body: "Weekly windows, gem logic, and which events deserve saved resources."
        },
        {
          type: "Building guide",
          title: "Building Planner",
          body: "Town Center chain, military supports, and the upgrade order that matters most."
        },
        {
          type: "Starter guide",
          title: "Beginner Growth Blueprint",
          body: "What to rush, what to save, and how to avoid wasting early resources."
        },
        {
          type: "Event guide",
          title: "Event Rhythm Guide",
          body: "Structure upgrades around scoring windows instead of panic spending."
        },
        {
          type: "Alliance tool",
          title: "Alliance Ops Checklist",
          body: "Browser-saved checklist for officers and active players who run tight routines."
        }
      ],
      guideLibrary: {
        kicker: "Popular guides",
        title: "Most-read pages this week",
        link: "Open today's board",
        rows: [
          {
            title: "Latest codes and expiry tracking",
            body: "Code pages are useful only when they separate confirmed, retest, stale, and expired entries clearly."
          },
          {
            title: "Hero priorities and lineup logic",
            body: "Hero investment is repeatedly cited as the biggest difference-maker for account strength."
          },
          {
            title: "Hall of Heroes, Hero Roulette, and gem timing",
            body: "Event-centered planning helps players avoid wasting premium resources in weak windows."
          }
        ]
      },
      updatesPanel: {
        kicker: "News watch",
        title: "Latest official signals to watch",
        rows: [
          {
            date: "May 13",
            title: "Watch official Facebook first for maintenance, code drops, and milestone notices",
            body: "This remains the fastest visible public source for publisher-facing alerts in most regions."
          },
          {
            date: "May 13",
            title: "Store page wording is still useful when social channels go quiet",
            body: "App Store change notes can reveal version shifts, fixes, and event text even before players discuss them widely."
          },
          {
            date: "May 13",
            title: "Daily players usually return for reset timing, code checks, and event preparation",
            body: "These three behaviors are the strongest early retention loops for a utility-first Kingshot site."
          }
        ]
      },
      databasePanel: {
        kicker: "Reference hub",
        title: "The pages players save and reopen",
        cards: [
          {
            label: "Hero data",
            title: "Role-based hero database",
            body: "Role, rarity, spender value, and best-use notes by phase."
          },
          {
            label: "Kingdom data",
            title: "Kingdom timeline index",
            body: "Age breakpoints, event phases, and likely unlock sequencing."
          },
          {
            label: "Event data",
            title: "Event points and prep matrix",
            body: "Which resources matter most, how to save them, and what to score into."
          },
          {
            label: "Building data",
            title: "Furnace and prerequisite tables",
            body: "The classic high-intent reference cluster for every progression stage."
          }
        ]
      },
      roadmap: {
        kicker: "Before you log off",
        title: "Five checks that usually save the most value",
        items: [
          "Check whether a new code dropped before reset.",
          "Confirm if tomorrow could be a hero or scoring window.",
          "Keep one memo for your next furnace or Town Center goal.",
          "Do not spend gems unless it changes your real account direction.",
          "Make sure alliance timing is not more important than your solo queue."
        ]
      },
      userNeeds: {
        kicker: "Player needs",
        title: "What players usually search after entering the game",
        cards: [
          {
            label: "Resource timing",
            title: "When should I spend gems and speedups?",
            body: "Players want fast answers on whether today is a spend day or a save day."
          },
          {
            label: "Progression",
            title: "What building actually blocks my next level?",
            body: "A clean prerequisite path keeps people from wasting queue time on side upgrades."
          },
          {
            label: "Events",
            title: "What is worth preparing before the next event?",
            body: "Good event prep content keeps users coming back before every scoring window."
          }
        ]
      },
      mobileDock: {
        home: "Home",
        today: "Today",
        codes: "Codes",
        heroes: "Heroes",
        events: "Events"
      }
    },
    today: {
      introEyebrow: "Daily utility",
      introTitle: "Today in Kingshot",
      introBody:
        "This page is built for repeat opening: reset timing, market-aware update watching, practical priorities, and a local memo that stays in the browser.",
      topCards: {
        resetKicker: "Server reset",
        resetBody: "Estimated time until the next daily reset based on the current feed configuration.",
        updatedKicker: "Feed updated",
        marketKicker: "Current market",
        scopeKicker: "Watch scope"
      },
      sections: {
        focusKicker: "What to do now",
        focusTitle: "Current focus",
        notesKicker: "Practical notes",
        notesTitle: "Keep these in mind",
        updatesKicker: "Region watch",
        updatesTitle: "Important update stream",
        pipelineKicker: "Daily checklist",
        pipelineTitle: "What to confirm before you log off",
        memoKicker: "Local memo",
        memoTitle: "Your kingdom note"
      },
      pipelineNotes: [
        "The page works even when the site is opened directly from local files.",
        "Region feeds can be refreshed by editing the embedded JSON block or regenerating it from the updater script.",
        "The long-term plan is to pull official-source changes several times per day."
      ],
      memoPlaceholder:
        "Write your kingdom age, next furnace goal, next hero event, or alliance reminder here.",
      memoStatus: "Saved locally"
    },
    codes: {
      introEyebrow: "Highest-demand page",
      introTitle: "Kingshot codes and expired archive",
      introBody:
        "Redeem-code pages are usually the highest-frequency search habit in this genre. Players revisit because codes die quickly and they want a clear split between active watch items and expired history.",
      activeKicker: "Use this first",
      metaLiveLabel: "Confirmed live",
      metaRetestLabel: "Retest first",
      metaSnapshotLabel: "Snapshot",
      openOfficialSource: "Open official list",
      checkKicker: "Last personal check",
      notChecked: "Not checked yet",
      markChecked: "Mark as checked now",
      helper: "Use copy buttons on each code card.",
      adTitle: "Sponsored",
      adBody: "Support this free Kingshot code board.",
      activeTitle: "Official active code board",
      activeBody:
        "These codes are shown as active on the official Kingshot.net gift-code page, which makes this one of the strongest repeat-check pages on the site.",
      responsibleTitle: "How to check this page efficiently",
      responsibleItems: [
        "Test active entries before spending time on expired ones.",
        "Use the official redeem page directly after copying a code.",
        "Keep dead codes in archive so players do not waste attempts.",
        "Watch official social channels during campaigns and maintenance periods."
      ],
      codes: [
        {
          state: "Watchlist",
          note: "Seen in recent guide roundups. Treat as needs-verification before public launch.",
          copy: "Copy code"
        },
        {
          state: "Watchlist",
          note: "Common code-style format in Kingshot coverage. Recheck before labeling active.",
          copy: "Copy code"
        },
        {
          state: "Watchlist",
          note: "Seasonal pattern worth checking whenever publisher socials or event posts refresh.",
          copy: "Copy code"
        }
      ],
      archiveTitle: "Expired code archive",
      archiveBody:
        "A maintained expired archive prevents wasted attempts and shows players which campaign-style codes are already dead.",
      expired: "Expired",
      archiveNotes: [
        "Example archive entry for structure and layout planning.",
        "Archive old campaign-style codes instead of removing historical context."
      ],
      bottomAdLabel: "Sponsored",
      bottomAdTitle: "Sponsored",
      bottomAdBody:
        "More recommendations may appear here after the code board.",
      noteTitle: "Where new codes usually appear",
      noteBody:
        "Check Kingshot.net first, then watch official social posts during updates, events, and milestone campaigns. That is usually where the next real code appears earliest."
    },
    building: {
      introEyebrow: "Building guide",
      introTitle: "Kingshot building planner and furnace focus",
      introBody:
        "Use this page to decide which building chain should take your next queue, which support buildings matter, and what to write down before the next reset or event window.",
      selectGoal: "Select your current goal",
      planningTarget: "Planning target",
      goals: [
        "Push next furnace or town center gate",
        "Prepare for next hero event",
        "Stabilize economy and bottlenecks"
      ],
      planResults: {
        furnace: {
          title: "Furnace push plan",
          details:
            "Prioritize your main level gate, gather the exact prerequisite chain in advance, and avoid side upgrades that do not unlock the next meaningful breakpoint."
        },
        heroes: {
          title: "Hero event prep plan",
          details:
            "Shift building time toward research, training, and any chain that improves your ability to convert held resources when the next hero event arrives."
        },
        economy: {
          title: "Resource stabilization plan",
          details:
            "Upgrade only the economy and storage supports that reduce bottlenecks, then return focus to your next major unlock instead of broad account beautification."
        }
      },
      adTitle: "Sponsored",
      adBody: "Support this free Kingshot building planner.",
      priorityTitle: "Priority mindset",
      priorityItems: [
        "Center account planning around your main level gate and its prerequisites.",
        "Push buildings that unlock troop quality, research throughput, or event efficiency.",
        "Delay decorative or marginal upgrades that do not change account momentum.",
        "Always think one level ahead so you are not surprised by blocked requirements."
      ],
      userNeedTitle: "Check these before you start a long upgrade",
      userNeedItems: [
        "What blocks the next furnace or Town Center jump.",
        "Which support building actually unlocks troop, research, or event value.",
        "Whether the upgrade should finish during an event window instead of today.",
        "What resource or prerequisite will stall the next queue if you ignore it now."
      ],
      tableTitle: "High-value building paths",
      tableHead: ["Main goal", "Key supports", "Reason to care"],
      tableRows: [
        [
          "Push Town Center or Furnace milestone",
          "Wall, economy supports, military chain",
          "Unlocks future account level and keeps queue value concentrated."
        ],
        [
          "Prepare next hero or troop event window",
          "Research and training supports",
          "Improves your ability to convert held resources into points."
        ],
        [
          "Stabilize mid-game progress",
          "Only the buildings that unblock future growth",
          "Stops the account from wasting days on low-impact upgrades."
        ]
      ],
      mobileAdTitle: "Sponsored",
      mobileAdBody:
        "Support this free Kingshot building planner.",
      noteGuideTitle: "How to use this page correctly",
      noteGuideBody:
        "Do not ask which building looks weakest. Ask which building is blocking your next real account breakpoint. If it does not unlock future growth, troop quality, research speed, or event conversion, it usually should wait.",
      noteKicker: "Local planner note",
      noteTitle: "Your next bottleneck",
      notePlaceholder:
        "Write your current furnace level, blocked building, missing resources, or next timed event here.",
      noteStatus: "Saved locally"
    },
    hero: {
      introEyebrow: "Hero guide",
      introTitle: "Kingshot hero meta and gem priorities",
      introBody:
        "Across public guides and player discussions, the same pattern keeps appearing: players who spend gems and pulls without a hero plan fall behind much faster than players who focus on role value and event timing.",
      adTitle: "Sponsored",
      adBody: "Support this free Kingshot hero guide.",
      logicTitle: "High-level hero logic",
      logicItems: [
        "Do not build every legendary equally just because it looks powerful.",
        "Value heroes by role fit, march purpose, and future event alignment.",
        "Save premium pulls for the events or banners that actually change your account.",
        "Think in core lineups plus supports, not in random collection progress."
      ],
      mistakesTitle: "Where players usually make mistakes",
      mistakeItems: [
        "Overspending gems during weak value windows.",
        "Splitting fragments too broadly.",
        "Copying whale lineups without the same investment depth.",
        "Ignoring generation timing and upcoming event rotations."
      ],
      lineupTitle: "Practical lineup thinking",
      lineupCards: [
        {
          label: "Early account",
          title: "Stability over greed",
          body: "Use heroes that help reliable progress and avoid stretching for niche luxury picks."
        },
        {
          label: "Mid account",
          title: "Build around one strong lane",
          body: "Double down on the march or combat style your account can actually support."
        },
        {
          label: "Event planning",
          title: "Pull with purpose",
          body: "Hero events should decide your spend rhythm more than random temptation."
        },
        {
          label: "Low spender",
          title: "Value concentration wins",
          body: "Concentrated investment usually beats shallow diversification."
        }
      ],
      midAdTitle: "Sponsored",
      midAdBody: "Support this free Kingshot hero guide.",
      questionsTitle: "Three questions before you pull",
      questions: [
        "Does this hero solve a real lineup weakness or just look exciting?",
        "Will this spend happen inside a stronger event window than waiting would?",
        "Can your account actually support this hero with fragments, gear, and march context?"
      ],
      noteTitle: "Fast pull rule",
      noteBody:
        "If a hero does not improve your main march, your event score, or your next meaningful combat breakpoint, it is usually not worth premium resources yet."
    },
    eventCore: {
      introEyebrow: "Event guide",
      introTitle: "Hall of Heroes, Hero Roulette, and gem timing",
      introBody:
        "Event-focused hero spending is one of the most repeated advice points in Kingshot coverage. Players are usually better off saving for meaningful hero windows than spending impulsively as soon as they can afford a pull.",
      adTitle: "Sponsored",
      adBody: "Support this free Kingshot event guide.",
      familyTitle: "What this family of events usually means",
      familyItems: [
        "Hero events are often your cleanest chance to stack account growth with rewards.",
        "Saved gems and pulls matter more than random daily impulse value.",
        "These windows should shape your whole weekly planning loop.",
        "The wrong event timing can delay your best hero progress by days or weeks."
      ],
      gemRuleTitle: "Practical gem rule",
      gemRuleBody:
        "If a spend does not improve your main lineup or score into a valuable event tier, it is often better delayed. This is one of the simplest heuristics that separates efficient accounts from accounts that always feel starved.",
      weeklyTitle: "Recommended weekly behavior",
      weeklyItems: [
        "Check whether a hero-centered event is approaching before major gem spends.",
        "Keep a reserve specifically for meaningful lineup upgrades.",
        "Pair hero pulls with the parts of your account that can immediately use them.",
        "Do not burn every premium item during low-impact windows just to feel active."
      ],
      weeklyBody:
        "Use this page as a fast filter: if the event, the rewards, and your main lineup do not all line up together, the safer move is usually to hold resources a little longer.",
      tableTitle: "Fast decision table",
      tableHead: ["Situation", "Recommended play", "Why it wins long term"],
      tableRows: [
        [
          "You have enough gems for a small pull session, but no scoring event is live",
          "Hold gems and wait",
          "Small off-cycle spending usually gives emotion, not account direction."
        ],
        [
          "A hero event is close and your main march still lacks one key role",
          "Keep reserve for that window",
          "Event stacking lets one spend improve roster strength and reward yield at the same time."
        ],
        [
          "You are tempted to spend just because resources are piling up",
          "Check lineup need first",
          "If the spend does not fix a real roster weakness, it is often just leakage."
        ]
      ],
      questionsTitle: "Three questions active players actually ask",
      questionCards: [
        {
          label: "Question 1",
          title: "Is this a real scoring window or just another banner?",
          body: "If the rewards and your account goal do not stack together, the spend often loses value fast."
        },
        {
          label: "Question 2",
          title: "Does this improve my main march immediately?",
          body: "Older accounts usually care less about collecting and more about whether the spend changes real combat output."
        },
        {
          label: "Question 3",
          title: "What stronger window am I giving up if I spend now?",
          body: "A lot of weak spending happens because players look at current resources instead of next-cycle leverage."
        }
      ],
      noteTitle: "The 30-second answer",
      noteBody:
        "A player opening this page usually has one question: should I spend now or hold for a stronger window? Spend only when the event, the rewards, and your main lineup line up at once. If one is missing, waiting is usually safer.",
      bottomAdLabel: "Sponsored",
      bottomAdTitle: "Sponsored",
      bottomAdBody: "More recommendations may appear here after the event planning guide."
    },
    alliance: {
      introEyebrow: "Repeat-use tool",
      introTitle: "Kingshot alliance daily operations checklist",
      introBody:
        "This page is designed to be revisited. It saves checkbox state in the browser so a player or officer can use it as a lightweight daily control panel.",
      adTitle: "Sponsored",
      adBody: "Support this free Kingshot alliance checklist.",
      routineTitle: "What strong routine usually looks like",
      routineItems: [
        "Queue timers are never left idle for long.",
        "Alliance help, donations, and cooperative tasks are cleared consistently.",
        "Gathering, healing, and training stay aligned with the next scoring window.",
        "Officers remind members before event bursts instead of after missed opportunities."
      ],
      retentionTitle: "Officer note board",
      retentionBody:
        "Use this block as an officer reminder space: keep one short note on queues, alliance help, or tomorrow's scoring prep.",
      trackerEyebrow: "Saved locally in your browser",
      trackerTitle: "Daily and weekly tracker",
      trackerReset: "Reset checklist",
      trackerItems: [
        "Use all alliance help and donation opportunities.",
        "Refresh building, research, training, and healing queues.",
        "Send marches to gather with the next event goal in mind.",
        "Spend core stamina or energy in a way that supports growth priorities.",
        "Check whether tomorrow needs saved speedups, pulls, or troop prep.",
        "Post one alliance reminder if a scoring window or rally block is coming up."
      ],
      bottomAdLabel: "Sponsored",
      bottomAdTitle: "Sponsored",
      bottomAdBody:
        "More recommendations may appear here after the checklist."
    },
    beginner: {
      introEyebrow: "Starter guide",
      introTitle: "Kingshot beginner growth blueprint",
      introBody:
        "The early game is not about doing everything fast. It is about pushing the upgrades that unlock account momentum while keeping enough speedups and premium items for score-based events.",
      principleTitle: "Your first principle",
      principleBody:
        "Think in windows, not impulses. If an upgrade improves march strength, furnace access, training throughput, or event scoring efficiency, it is usually worth accelerating. If it only gives a tiny comfort boost, it can wait.",
      rushTitle: "What to rush first",
      rushItems: [
        "Furnace and prerequisite buildings that gate future account levels.",
        "Research and facilities that improve troop quality and training efficiency.",
        "Alliance participation unlocks because rewards compound faster than solo grinding.",
        "Core hero development on a small number of units instead of spreading resources thin."
      ],
      avoidTitle: "What to avoid early",
      avoidItems: [
        "Upgrading every hero evenly just because you pulled them.",
        "Burning speedups outside a meaningful score or unlock threshold.",
        "Using premium currency to paper over planning mistakes.",
        "Ignoring alliance timing and then trying to catch up alone."
      ],
      approachTitle: "A practical first 14-day approach",
      approachItems: [
        "Join the best active alliance you can qualify for as early as possible.",
        "Anchor your development around furnace progression and the buildings it blocks behind it.",
        "Save a noticeable portion of speedups, summons, and premium items for event windows.",
        "Pick a main combat lineup quickly and stop over-investing in bench heroes.",
        "Log in around alliance activity times because cooperative rewards often beat solo efficiency."
      ],
      approachBody:
        "For free-to-play and low-spend players, discipline matters more than perfect hero luck. A focused account with smart event timing tends to outgrow messy spenders who do not plan.",
      checklistTitle: "Beginner daily checklist",
      checklistItems: [
        "Never let your core building queue sit idle for long.",
        "Use alliance activity to multiply progress instead of solo-grinding everything.",
        "Do not burn every speedup the same day you get it.",
        "Keep your best premium resources for events that actually improve your main team."
      ],
      noteTitle: "Biggest early-game trap",
      noteBody:
        "Early accounts fall behind fastest when they spread resources across too many heroes, too many upgrades, and too many low-value speedup uses at once."
    },
    eventRhythm: {
      introEyebrow: "Planning guide",
      introTitle: "How to play Kingshot around event rhythm",
      introBody:
        "One of the biggest gaps between average and strong accounts is not raw activity. It is knowing when to hold resources and when to unload them.",
      mindsetTitle: "The rhythm mindset",
      mindsetBody:
        "Most strategy games in this category reward the same behavior loop: save upgrade value, spend into a scoring window, collect layered rewards, then reset and prepare again.",
      saveTitle: "Resources usually worth saving",
      saveItems: [
        "Construction speedups",
        "Research speedups",
        "Hero pulls and fragments",
        "Stamina-like consumables and premium currencies",
        "Large burst upgrades that can finish on command"
      ],
      spendTitle: "Resources usually safe to spend",
      spendItems: [
        "Small maintenance upgrades that unblock account flow",
        "Alliance contribution actions with immediate compounding rewards",
        "Training and gathering habits that you can restock reliably",
        "Routine dailies tied to stable recurring income"
      ],
      loopTitle: "Weekly planning loop",
      loopItems: [
        "Check which major event or alliance push is approaching.",
        "Estimate which category will score best for your account.",
        "Front-load prep work like gathering, queues, and prerequisite construction.",
        "Hold your finishers until you can stack event points with milestone rewards.",
        "Review what you overspent so next cycle gets cleaner."
      ],
      loopBody:
        "A strong account does not spend burst resources every day. It saves them for the moment when event points, lineup value, and account progression can all be stacked together.",
      prepTitle: "What to write in your own prep note",
      prepItems: [
        "How many construction speedups you want untouched by the next reset.",
        "Which building finish you are saving to stack with event points.",
        "Whether tomorrow is a hold day, a prep day, or a burst day.",
        "What one mistake you made this cycle that should not happen again next week."
      ],
      noteTitle: "Simple weekly resource rhythm",
      noteBody:
        "Use routine income to keep growing, keep burst items untouched, then unload only when a scoring window and a real account upgrade line up together."
    }
  },
  "zh-CN": {
    shared: {
      language: "语言",
      localeNotice: "自动语言：{locale}",
      adLabel: "广告",
      sponsoredLabel: "赞助内容",
      open: "打开",
      view: "查看",
      plan: "规划",
      read: "阅读",
      openPage: "打开页面",
      backToHome: "返回 Kingshot Central",
      regions: {
        global: "全球服",
        cn: "中国大陆观察区",
        tw: "繁中观察区",
        jp: "日本",
        kr: "韩国",
        de: "德国",
        fr: "法国",
        latam: "拉美",
        br: "巴西",
        ru: "俄罗斯",
        th: "泰国"
      }
    },
    home: {
      brandTagline: "攻略、工具、规划",
      nav: {
        overview: "总览",
        tools: "工具",
        guides: "攻略",
        database: "资料库",
        updates: "更新"
      },
      sidebar: {
        coreLoopsTitle: "核心使用场景",
        coreLoops: ["养成规划", "活动准备", "王国节奏", "联盟协作"],
        highDemandTitle: "最高频页面",
        highDemand: ["今日面板", "兑换码观察", "英雄抽卡规划", "建筑目标规划"]
      },
      ads: {
        sidebarTitle: "赞助内容",
        sidebarBody: "支持这个免费的 Kingshot 工具站。",
        mobileTopTitle: "赞助内容",
        mobileTopBody: "支持这个免费的 Kingshot 工具站。",
        leaderboardTitle: "赞助内容",
        leaderboardBody: "支持这个免费的 Kingshot 工具站。",
        mobileMidTitle: "赞助内容",
        mobileMidBody: "支持这个免费的 Kingshot 工具站。"
      },
      mobileBrand: "移动指挥视图",
      mobileQuick: {
        today: "今日",
        codes: "兑换码",
        heroes: "英雄",
        events: "活动",
        build: "建筑"
      },
      statusPill: "适合每日打开的 Kingshot 战略桌面",
      topLinks: {
        today: "Today in Kingshot",
        codes: "最新兑换码",
        hero: "英雄思路",
        event: "活动核心"
      },
      heroEyebrow: "围绕反复打开来设计",
      heroTitle: "Kingshot 兑换码、重置时间、英雄活动与建筑路线。",
      heroLead:
        "优先给玩家最常用的入口：今日实用页、兑换码、英雄规划、建筑目标，再往下才是分地区资讯和资料页。",
      heroButtons: {
        today: "打开今日面板",
        codes: "查看最新兑换码"
      },
      heroTags: ["日常工具", "兑换码", "英雄规划", "分地区资讯"],
      heroMini: {
        today: {
          kicker: "今日",
          title: "重置、备忘和官方动态",
          body: "最强的日常入口页，应该让玩家几秒内知道今天先做什么。"
        },
        codes: {
          kicker: "兑换码",
          title: "快速复制与核验",
          body: "短时效 code 仍然是这一类游戏最稳定的高频回访流量。"
        }
      },
      radar: {
        kicker: "功能地图",
        title: "以玩家需求为核心的工具栈"
      },
      metrics: [
        {
          label: "最先打开的功能",
          title: "带备忘和重置倒计时的今日页",
          body: "这是最容易培养每日习惯和直接流量入口的页面。"
        },
        {
          label: "搜索需求",
          title: "兑换码、英雄、活动、建筑",
          body: "这四类内容仍然是 Kingshot 玩家最强的一组重复搜索意图。"
        },
        {
          label: "留存层",
          title: "分地区资讯 + 个人备忘",
          body: "真正带来粘性的不是空文章数量，而是有用的日常检查页。"
        }
      ],
      mobileMissions: [
        { kicker: "现在", title: "打开 Today in Kingshot" },
        { kicker: "优先", title: "查看当前地区资讯流" },
        { kicker: "成长", title: "推进你的核心建筑链" }
      ],
      ticker: [
        "今日页已支持按地区切换官方动态观察流",
        "兑换码页面会保存你上次个人检查时间",
        "建筑规划页面会记录你当前的瓶颈备忘"
      ],
      commandCards: [
        {
          kicker: "最值得每天打开",
          badge: "已更新",
          title: "Today in Kingshot",
          body: "重置倒计时、当前重点、官方动态观察和本地备忘，让它成为全站最值得重复打开的页面。",
          link: "打开今日面板"
        },
        {
          kicker: "需求最高",
          badge: "搜索",
          title: "Kingshot 兑换码与过期归档",
          body: "当可用 code 与过期 code 明确分开时，短时效礼包码会形成最强的重复检查习惯。",
          link: "打开兑换码页"
        },
        {
          kicker: "最容易亏资源",
          badge: "Meta",
          title: "英雄优先级与钻石纪律",
          body: "玩家长期价值损失最大的地方，往往就是在错误英雄窗口乱花资源。",
          link: "打开英雄页"
        }
      ],
      liveBoard: {
        kicker: "玩家速览",
        title: "先打开玩家最在意的三个入口",
        cards: [
          {
            label: "Today",
            title: "先看重置、备忘和当前地区资讯流",
            body: "在花任何资源之前，先知道今天真正该看什么，是最有价值的一步。",
            link: "打开 Today"
          },
          {
            label: "兑换码",
            title: "先确认有没有新 code，别等过期了才发现",
            body: "这是最稳定的高频回访需求，应该始终离首页只有一步。",
            link: "打开兑换码"
          },
          {
            label: "规划",
            title: "别把钻石、抽卡和建造时间浪费掉",
            body: "英雄时机和建筑目标，往往决定玩家是高效成长还是一直亏资源。",
            link: "打开英雄页"
          }
        ]
      },
      quickStart: {
        kicker: "快速开始",
        title: "从最符合你当前问题的页面进去",
        items: [
          {
            title: "我只想知道今天先做什么",
            body: "打开 Today 页面，先看重置、观察流和备忘。"
          },
          {
            title: "我只关心最新兑换码",
            body: "直接进 code 页面，看观察名单和过期归档。"
          },
          {
            title: "我的建筑队列卡住了",
            body: "用建筑规划页找下一个真正值得推进的门槛。"
          },
          {
            title: "我在为下一次英雄活动囤资源",
            body: "花钻前先看活动页，确认窗口值不值得出手。"
          }
        ]
      },
      toolHub: {
        kicker: "工具中心",
        title: "几秒钟找到你要用的页面",
        searchPlaceholder: "搜索工具、攻略与资料页",
        filters: {
          all: "全部",
          calculators: "计算器",
          guides: "攻略",
          alliance: "联盟",
          reference: "资料"
        }
      },
      toolCards: [
        {
          type: "日常工具",
          title: "Today in Kingshot",
          body: "重置倒计时、官方动态观察流、当前重点和本地备忘。"
        },
        {
          type: "资料页",
          title: "最新兑换码归档",
          body: "可用与过期 code 分开展示，附带日期、说明和快速复制。"
        },
        {
          type: "英雄攻略",
          title: "英雄思路与优先级",
          body: "看什么值得抽、什么应该跳过，以及按阶段怎样判断。"
        },
        {
          type: "活动攻略",
          title: "Hall of Heroes 与 Hero Roulette",
          body: "看周节奏、钻石逻辑，以及哪些活动值得囤资源。"
        },
        {
          type: "建筑攻略",
          title: "建筑规划器",
          body: "围绕主城链、兵营支撑和最关键的升级顺序展开。"
        },
        {
          type: "新手攻略",
          title: "新手成长蓝图",
          body: "告诉玩家前期该冲什么、该省什么、怎么少走弯路。"
        },
        {
          type: "活动攻略",
          title: "活动节奏指南",
          body: "围绕计分窗口来安排升级，而不是焦虑式乱花资源。"
        },
        {
          type: "联盟工具",
          title: "联盟日常清单",
          body: "给管理和活跃玩家用的浏览器本地保存清单。"
        }
      ],
      guideLibrary: {
        kicker: "热门攻略",
        title: "本周最常被打开的页面",
        link: "打开今日面板",
        rows: [
          {
            title: "最新兑换码与过期追踪",
            body: "高频 code 页面仍然是这类站点最好的流量和回访支点之一。"
          },
          {
            title: "英雄优先级与阵容逻辑",
            body: "英雄投资被反复提到是账号强度差距最大的关键之一。"
          },
          {
            title: "Hall of Heroes、Hero Roulette 与囤钻时机",
            body: "围绕活动的规划内容更容易把搜索流量转成更长停留和回访。"
          }
        ]
      },
      updatesPanel: {
        kicker: "资讯观察",
        title: "当前最值得盯的官方信号",
        rows: [
          {
            date: "5月13日",
            title: "先盯官方 Facebook，看维护、礼包码和里程碑公告",
            body: "对大多数地区来说，这仍然是官方最先公开玩家向动态的地方。"
          },
          {
            date: "5月13日",
            title: "社媒没动静时，也要看商店页更新说明",
            body: "App Store 的版本说明经常会提前透露修复、版本变化和活动文本。"
          },
          {
            date: "5月13日",
            title: "日常玩家最常回来的三个理由，通常是重置、code 和活动准备",
            body: "这三类行为是工具型 Kingshot 站点前期最强的留存循环。"
          }
        ]
      },
      databasePanel: {
        kicker: "资料中心",
        title: "玩家会收藏并重复打开的页面",
        cards: [
          {
            label: "英雄资料",
            title: "按角色分类的英雄库",
            body: "角色、稀有度、氪度价值和不同阶段的使用说明。"
          },
          {
            label: "王国资料",
            title: "王国时间线索引",
            body: "王国天数节点、活动阶段与常见解锁顺序。"
          },
          {
            label: "活动资料",
            title: "活动积分与准备矩阵",
            body: "哪些资源最重要、怎么囤、应该冲进哪些分数窗口。"
          },
          {
            label: "建筑资料",
            title: "炉子与前置建筑表",
            body: "这类高意图资料页几乎覆盖所有成长阶段。"
          }
        ]
      },
      roadmap: {
        kicker: "下线前检查",
        title: "最容易帮玩家省资源的五个检查点",
        items: [
          "先看 reset 前有没有新兑换码。",
          "确认明天会不会是英雄或计分窗口。",
          "给自己的炉子或主城目标留一条备忘。",
          "除非会真正改变账号方向，否则别乱花钻石。",
          "确认联盟节奏是不是比你的个人队列更重要。"
        ]
      },
      userNeeds: {
        kicker: "玩家需求",
        title: "玩家进游戏后最常继续搜索的三个问题",
        cards: [
          {
            label: "资源时机",
            title: "钻石和加速到底什么时候花？",
            body: "玩家最想要的是快速判断今天该花还是该继续囤。"
          },
          {
            label: "成长卡点",
            title: "到底是哪一个建筑卡了我下一级？",
            body: "清楚的前置路径能减少很多浪费在边角升级上的时间。"
          },
          {
            label: "活动准备",
            title: "下一次活动前到底要准备什么？",
            body: "活动准备内容越实用，玩家越容易在每次计分前回来查看。"
          }
        ]
      },
      mobileDock: {
        home: "首页",
        today: "今日",
        codes: "兑换码",
        heroes: "英雄",
        events: "活动"
      }
    },
    today: {
      introEyebrow: "日常实用页",
      introTitle: "Today in Kingshot",
      introBody: "这是一页适合每天打开的实用页：看重置、看当前地区资讯、看今天重点，再顺手记一条本地备忘。",
      topCards: {
        resetKicker: "每日重置",
        resetBody: "根据当前 feed 配置估算距离下一次日重置还有多久。",
        updatedKicker: "Feed 更新时间",
        marketKicker: "当前观察地区",
        scopeKicker: "观察范围"
      },
      sections: {
        focusKicker: "现在先做什么",
        focusTitle: "当前重点",
        notesKicker: "实用提醒",
        notesTitle: "今天要记住的事",
        updatesKicker: "地区资讯流",
        updatesTitle: "重要更新观察区",
        pipelineKicker: "下线前检查",
        pipelineTitle: "今天关掉游戏前确认这三件事",
        memoKicker: "本地备忘",
        memoTitle: "你的王国笔记"
      },
      pipelineNotes: [
        "即使直接双击本地 HTML 打开，这个页面也能正常工作。",
        "分地区 feed 可以通过修改内嵌 JSON 或运行更新脚本来刷新。",
        "长期方案仍然是每天多次拉取官方来源变化并更新这里。"
      ],
      memoPlaceholder: "在这里记下王国天数、下一个炉子目标、下一次英雄活动或联盟提醒。",
      memoStatus: "已保存在本地"
    },
    codes: {
      introEyebrow: "需求最高的页面",
      introTitle: "Kingshot 兑换码与过期归档",
      introBody: "兑换码页通常是这类游戏里最高频的搜索行为。玩家会反复回来，因为 code 过期很快，而且他们想清楚知道哪些还活着，哪些已经失效。",
      activeKicker: "先看这里",
      metaLiveLabel: "确认可用",
      metaRetestLabel: "建议复测",
      metaSnapshotLabel: "快照日期",
      openOfficialSource: "打开官方列表",
      checkKicker: "上次个人检查时间",
      notChecked: "还没检查过",
      markChecked: "现在标记为已检查",
      helper: "点每个 code 卡片下方的复制按钮即可。",
      adTitle: "赞助内容",
      adBody: "支持这个免费的 Kingshot 兑换码页。",
      activeTitle: "官方当前活跃兑换码",
      activeBody: "这些兑换码来自 Kingshot.net 官方 Gift Codes 页面，是当前最值得玩家优先检查的高频内容。",
      responsibleTitle: "怎么最快用好这页",
      responsibleItems: [
        "先试官方活跃列表，再去看失效归档。",
        "复制后直接跳去官方兑换页，减少来回切换。",
        "失效码保留在归档里，避免玩家重复踩坑。",
        "活动期和维护期优先盯官方社媒，最容易出新码。"
      ],
      codes: [
        {
          state: "观察名单",
          note: "近期汇总页里出现过，正式公开前要先再验证一次。",
          copy: "复制 code"
        },
        {
          state: "观察名单",
          note: "是 Kingshot 相关页面里常见的礼包码格式，标记可用前应复查。",
          copy: "复制 code"
        },
        {
          state: "观察名单",
          note: "属于季节性命名风格，官方社媒或活动发帖更新时值得一起检查。",
          copy: "复制 code"
        }
      ],
      archiveTitle: "失效兑换码归档",
      archiveBody: "过期归档不是废内容，它能减少无效尝试，也能让玩家快速判断哪些活动风格的礼包码已经失效。",
      expired: "已过期",
      archiveNotes: ["保留旧码归档能减少玩家重复试错。", "节日、周末和里程碑风格的礼包码通常最容易形成固定命名规律。"],
      bottomAdLabel: "赞助内容",
      bottomAdTitle: "赞助内容",
      bottomAdBody: "兑换码列表之后可能显示更多推荐内容。",
      noteTitle: "怎样更快发现新兑换码",
      noteBody: "先看 Kingshot.net 官方页，再盯官方社媒的活动、维护和里程碑发帖。真正新的礼包码，通常最早就出现在这两个地方。"
    },
    building: {
      introEyebrow: "建筑攻略",
      introTitle: "Kingshot 建筑规划与炉子主线",
      introBody: "用这一页判断下一条队列该给哪条建筑链、哪些支撑建筑真正有价值，以及重置或活动前需要记下什么。",
      selectGoal: "选择你当前的目标",
      planningTarget: "当前规划目标",
      goals: ["推进下一个炉子或主城门槛", "准备下一次英雄活动", "稳定经济与瓶颈"],
      planResults: {
        furnace: {
          title: "炉子推进方案",
          details: "优先围绕主等级门槛推进，提前备好完整前置链，不要把时间浪费在不能解锁关键节点的旁支升级上。"
        },
        heroes: {
          title: "英雄活动准备方案",
          details: "把建筑时间倾向到科研、训练和能提升资源转分效率的链条，为下一次英雄活动窗口做准备。"
        },
        economy: {
          title: "资源稳定方案",
          details: "只升级真正能缓解瓶颈的经济和仓储支撑，然后尽快回到下一个关键解锁，而不是把账号摊大做满。"
        }
      },
      adTitle: "赞助内容",
      adBody: "支持这个免费的 Kingshot 建筑规划页。",
      priorityTitle: "优先级思路",
      priorityItems: [
        "围绕主等级门槛和它的前置建筑来做全局规划。",
        "优先推能解锁兵种质量、科研效率或活动效率的建筑。",
        "延后那些不会改变账号节奏的装饰性或边际升级。",
        "永远提前想下一层，别等被卡住了才发现前置不够。"
      ],
      userNeedTitle: "开长升级前先确认这几件事",
      userNeedItems: [
        "下一个炉子或主城门槛到底被什么卡住。",
        "哪座支撑建筑真的能解锁兵种、科研或活动价值。",
        "这次升级是否应该压到活动窗口再完成，而不是今天随手点掉。",
        "如果现在不处理，下一条队列会被哪种资源或前置卡住。"
      ],
      tableTitle: "高价值建筑路线",
      tableHead: ["主要目标", "关键支撑", "为什么要看"],
      tableRows: [
        ["推进主城或炉子门槛", "城墙、经济支撑、军事链", "决定未来账号等级解锁，并让施工队列价值更集中。"],
        ["准备下一次英雄或部队活动", "科研与训练支撑", "提高你把囤积资源转成积分的能力。"],
        ["稳定中期成长", "只升真正解锁未来成长的建筑", "避免账号把几天时间浪费在低影响升级上。"]
      ],
      mobileAdTitle: "赞助内容",
      mobileAdBody: "支持这个免费的 Kingshot 建筑规划页。",
      noteGuideTitle: "正确的建筑判断方式",
      noteGuideBody: "不要问哪座建筑看起来最弱，而要问哪座建筑正在卡你下一个真实门槛。如果它不能解锁成长、兵种质量、科研效率或活动转分，那通常就该往后放。",
      noteKicker: "本地规划备忘",
      noteTitle: "你的下一个瓶颈",
      notePlaceholder: "在这里记录当前炉子等级、卡住的建筑、缺的资源，或者下一次定时活动。",
      noteStatus: "已保存在本地"
    },
    hero: {
      introEyebrow: "英雄攻略",
      introTitle: "Kingshot 英雄思路与钻石优先级",
      introBody: "从公开攻略和玩家讨论里反复能看到同一个规律：没有英雄规划就乱花钻石和抽卡资源的玩家，往往会比重视角色价值和活动时机的玩家掉队得更快。",
      adTitle: "赞助内容",
      adBody: "支持这个免费的 Kingshot 英雄攻略页。",
      logicTitle: "高层英雄判断逻辑",
      logicItems: [
        "不要因为看起来强，就把每个传说英雄平均培养。",
        "判断英雄价值时，要看角色定位、队伍用途和未来活动窗口。",
        "高级抽卡资源应该留给真正改变账号的活动或池子。",
        "优先想核心阵容加辅助，而不是杂乱地收集一堆角色。"
      ],
      mistakesTitle: "玩家最常见的错误",
      mistakeItems: ["在低价值窗口乱花钻石。", "碎片投资太分散。", "照抄鲸鱼阵容却没有同等投入深度。", "忽视代际节奏和后续活动轮换。"],
      lineupTitle: "更实用的阵容思路",
      lineupCards: [
        { label: "前期账号", title: "稳定比贪心更重要", body: "优先用能稳定推进成长的英雄，不要硬追小众奢侈位。" },
        { label: "中期账号", title: "围绕一条强主线发力", body: "集中资源强化你账号真正能支撑起来的队伍方向。" },
        { label: "活动规划", title: "抽卡要有目的", body: "英雄活动应该比一时冲动更能决定你的花费节奏。" },
        { label: "低氪玩家", title: "集中价值才会赢", body: "集中投入通常比浅层铺开更强。" }
      ],
      midAdTitle: "赞助内容",
      midAdBody: "适合放在阵容分区之后的宽幅内文广告。",
      questionsTitle: "抽之前先问自己的三个问题",
      questions: [
        "这个英雄是在补真实阵容缺口，还是只是看起来很诱人？",
        "现在花，真的比等更强的活动窗口更划算吗？",
        "你的账号能不能在碎片、装备和队伍环境上把它真正养起来？"
      ],
      noteTitle: "快速抽卡判断",
      noteBody: "如果一个英雄不能强化你的主力队、活动得分，或者下一个关键战力节点，那通常还不是它该吃掉高级资源的时候。"
    },
    eventCore: {
      introEyebrow: "活动攻略",
      introTitle: "Hall of Heroes、Hero Roulette 与囤钻时机",
      introBody: "围绕英雄活动来花资源，是 Kingshot 攻略里被重复最多的建议之一。相比一有资源就冲动抽卡，等到真正有价值的英雄窗口再出手，通常更赚。",
      adTitle: "赞助内容",
      adBody: "支持这个免费的 Kingshot 活动攻略页。",
      familyTitle: "这类活动通常意味着什么",
      familyItems: [
        "英雄活动往往是把账号成长和奖励叠加起来的最好窗口。",
        "囤钻和囤抽卡资源，比日常零碎价值更重要。",
        "这些窗口应该反过来塑造你整周的规划循环。",
        "踩错活动时机会把你最关键的英雄进度拖慢几天甚至几周。"
      ],
      gemRuleTitle: "实用的钻石判断规则",
      gemRuleBody: "如果一次花费既不能强化主阵容，也不能打进高价值活动层级，那通常更适合延后。这是区分高效率账号和永远缺资源账号的最简单规则之一。",
      weeklyTitle: "建议的每周行为",
      weeklyItems: [
        "大额花钻前，先确认是否有英雄活动临近。",
        "专门留一笔资源给真正重要的阵容升级。",
        "抽英雄时尽量配合账号能立刻消化的成长部位。",
        "不要为了看起来活跃，就在低影响窗口烧光所有高级资源。"
      ],
      weeklyBody: "把这页当作一个快筛逻辑来看：活动窗口、奖励层级和你的主力阵容三者没有同时对上时，通常就不值得现在花资源。",
      tableTitle: "快速决策表",
      tableHead: ["当前情况", "更推荐的动作", "为什么长期更赚"],
      tableRows: [
        ["你手里够来一轮小抽，但当前没有计分活动", "继续囤钻", "脱离窗口的小额花费，更多给的是情绪，不是账号方向。"],
        ["英雄活动快到了，而你的主力队还缺一个关键位", "把资源留到那个窗口", "一个花费同时叠到战力成长和活动收益，长期性价比更高。"],
        ["你只是因为资源堆多了而想花", "先看阵容缺口", "如果不能补真实问题，这种花费很多时候只是漏资源。"]
      ],
      questionsTitle: "活跃玩家真正会问的三个问题",
      questionCards: [
        { label: "问题 1", title: "这到底是真计分窗口，还是普通池子？", body: "如果奖励层级和账号目标叠不起来，这次花费的价值通常会掉得很快。" },
        { label: "问题 2", title: "它能不能立刻强化我的主力队？", body: "老玩家通常没那么在意收集，而更在意这次花费会不会立刻改变实战输出。" },
        { label: "问题 3", title: "我现在花掉，等于放弃了哪个更强的窗口？", body: "很多低质量花费，本质上都是只看眼前资源，不看下一个高杠杆周期。" }
      ],
      noteTitle: "30 秒答案",
      noteBody: "玩家打开这页，通常只想知道一件事：现在该花，还是继续囤？实用答案很简单。只有当活动窗口、奖励层级和主力阵容三者同时对齐时，才更值得交资源。",
      bottomAdLabel: "赞助内容",
      bottomAdTitle: "赞助内容",
      bottomAdBody: "活动规划内容之后可能显示更多推荐内容。"
    },
    alliance: {
      introEyebrow: "重复使用工具",
      introTitle: "Kingshot 联盟日常操作清单",
      introBody: "这是一页适合反复打开的联盟清单工具。它会把勾选状态保存在浏览器里，方便玩家或管理当成轻量版日常控制台来用。",
      adTitle: "赞助内容",
      adBody: "支持这个免费的 Kingshot 联盟清单工具。",
      routineTitle: "强势日常通常是什么样",
      routineItems: [
        "所有队列不会长时间空着。",
        "联盟帮助、捐献和协作任务会稳定清掉。",
        "采集、治疗和训练会跟下一次计分窗口保持同步。",
        "管理会在爆发活动前提醒，而不是错过后才补救。"
      ],
      retentionTitle: "管理提醒区",
      retentionBody: "把这里当成管理提醒区即可：留一条关于队列、联盟帮助或明天计分准备的短备注。",
      trackerEyebrow: "保存在你的浏览器本地",
      trackerTitle: "每日与每周追踪",
      trackerReset: "重置清单",
      trackerItems: [
        "把联盟帮助和捐献次数都清掉。",
        "刷新建筑、科研、训练和治疗队列。",
        "按下一次活动目标来安排采集队伍。",
        "把核心体力或能量花在真正支持成长的地方。",
        "检查明天是否需要保留加速、抽卡或练兵资源。",
        "如果要开计分或集结，发一条联盟提醒。"
      ],
      bottomAdLabel: "赞助内容",
      bottomAdTitle: "赞助内容",
      bottomAdBody: "清单之后可能显示更多推荐内容。"
    },
    beginner: {
      introEyebrow: "新手攻略",
      introTitle: "Kingshot 新手成长蓝图",
      introBody: "前期并不是把所有东西都尽快做完，而是优先推进能打开账号成长动能的升级，同时为计分活动保留足够的加速和高级资源。",
      principleTitle: "你的第一原则",
      principleBody: "要按窗口思考，而不是按冲动思考。如果一项升级能提高队伍强度、炉子推进、训练效率或活动转分效率，它通常值得加速；如果只是小幅舒适提升，就可以等。",
      rushTitle: "前期优先冲什么",
      rushItems: [
        "炉子以及卡主未来等级的前置建筑。",
        "提升兵种质量和训练效率的科研与设施。",
        "联盟参与相关解锁，因为收益累积速度通常远高于单刷。",
        "集中培养少数核心英雄，而不是把资源铺得很散。"
      ],
      avoidTitle: "前期要避免什么",
      avoidItems: [
        "因为抽到了就把每个英雄平均升级。",
        "在没有意义的计分或解锁门槛之外乱烧加速。",
        "用高级货币去弥补规划失误。",
        "忽视联盟活动节奏，最后只能自己补课。"
      ],
      approachTitle: "一个实用的前 14 天思路",
      approachItems: [
        "尽早加入你能进的最活跃联盟。",
        "围绕炉子成长和它背后的前置链来规划发展。",
        "留出一部分加速、抽卡资源和高级道具给活动窗口。",
        "尽快确定主力阵容，不要过度投资替补英雄。",
        "尽量配合联盟活跃时段上线，因为协作收益通常高于单打独斗。"
      ],
      approachBody: "对于零氪和低氪来说，纪律通常比完美的英雄运气更重要。节奏清晰的账号，往往能反超那些乱花资源的账号。",
      checklistTitle: "新手日常检查清单",
      checklistItems: ["核心建筑队列不要长时间空着。", "优先借联盟活跃来放大成长，而不是什么都自己单刷。", "不要当天拿到加速就当天全烧掉。", "把最好的高级资源留给真正能强化主力队的活动。"],
      noteTitle: "前期最大陷阱",
      noteBody: "前期掉队最快的原因，通常不是少上线，而是把资源平均铺到太多英雄、太多小升级和太多低价值加速上。"
    },
    eventRhythm: {
      introEyebrow: "规划攻略",
      introTitle: "如何围绕活动节奏来玩 Kingshot",
      introBody: "普通账号和强势账号之间最大的差距之一，不是单纯在线时长，而是知道什么时候该囤、什么时候该集中释放资源。",
      mindsetTitle: "活动节奏思维",
      mindsetBody: "这一类策略游戏通常都奖励同一种循环：先囤价值，再冲进计分窗口，吃多层奖励，接着重新准备下一轮。如果忽略这套节奏，你就会一直用原价做成长。",
      saveTitle: "通常值得囤的资源",
      saveItems: ["建筑加速", "科研加速", "英雄抽卡和碎片", "体力类消耗品和高级货币", "可以集中完成的大额升级"],
      spendTitle: "通常可以正常花的资源",
      spendItems: ["维持账号流畅度的小型升级", "有即时复利的联盟贡献动作", "能稳定补回来的训练与采集习惯", "绑定稳定日常收益的例行任务"],
      loopTitle: "每周规划循环",
      loopItems: [
        "先看接下来靠近的是哪个大活动或联盟冲分。",
        "估算哪一类资源对你当前账号最容易转分。",
        "提前做好采集、队列和前置建筑等准备动作。",
        "把真正的完工动作留到能叠活动奖励的时候。",
        "复盘这轮哪里花超了，下一轮就会更干净。"
      ],
      loopBody: "强账号不是每天都把爆发资源花掉，而是等到活动积分、主力成长和账号节点可以叠在一起的时候再集中释放。",
      prepTitle: "自己的准备备忘里该写什么",
      prepItems: ["下次 reset 前你想保留多少建筑加速。", "你准备留到活动窗口再完工的那一个建筑是什么。", "明天到底是继续囤、做准备，还是集中爆发。", "这轮你犯了哪一个错，下周不能再重复。"],
      noteTitle: "简单的一周资源节奏",
      noteBody: "日常收入负责维持成长，爆发资源先别动，等到计分窗口和真实成长收益对齐时再一起交出去。"
    }
  },
  "zh-TW": {
    shared: {
      language: "語言",
      localeNotice: "自動語言：{locale}",
      adLabel: "廣告",
      sponsoredLabel: "贊助內容",
      open: "打開",
      view: "查看",
      plan: "規劃",
      read: "閱讀",
      openPage: "打開頁面",
      backToHome: "返回 Kingshot Central",
      regions: {
        global: "全球服",
        cn: "中國大陸觀察區",
        tw: "繁中觀察區",
        jp: "日本",
        kr: "韓國",
        de: "德國",
        fr: "法國",
        latam: "拉美",
        br: "巴西",
        ru: "俄羅斯",
        th: "泰國"
      }
    }
  },
  ja: {
    shared: {
      language: "言語",
      localeNotice: "自動言語: {locale}"
    }
  },
  ko: {
    shared: {
      language: "언어",
      localeNotice: "자동 언어: {locale}"
    }
  },
  de: {
    shared: {
      language: "Sprache",
      localeNotice: "Automatische Sprache: {locale}"
    }
  },
  fr: {
    shared: {
      language: "Langue",
      localeNotice: "Langue automatique : {locale}"
    }
  },
  es: {
    shared: {
      language: "Idioma",
      localeNotice: "Idioma automatico: {locale}"
    }
  },
  "pt-BR": {
    shared: {
      language: "Idioma",
      localeNotice: "Idioma automatico: {locale}"
    }
  },
  ru: {
    shared: {
      language: "Язык",
      localeNotice: "Автоязык: {locale}"
    }
  },
  th: {
    shared: {
      language: "ภาษา",
      localeNotice: "ภาษาที่ตรวจพบ: {locale}"
    }
  }
};

const normalizeLocale = (input) => {
  if (!input) {
    return fallbackLocale;
  }

  const exact = supportedLocales.find((locale) => locale.toLowerCase() === input.toLowerCase());
  if (exact) {
    return exact;
  }

  const base = input.split("-")[0].toLowerCase();

  if (base === "zh") {
    if (/tw|hk|mo/i.test(input)) {
      return "zh-TW";
    }
    return "zh-CN";
  }

  if (base === "pt") {
    return "pt-BR";
  }

  return supportedLocales.find((locale) => locale.split("-")[0].toLowerCase() === base) || fallbackLocale;
};

const getPreferredLocale = () => {
  try {
    const saved = window.localStorage.getItem(localeStorageKey);
    if (saved) {
      return normalizeLocale(saved);
    }
  } catch {
    // ignore storage failures
  }

  return normalizeLocale(navigator.language || fallbackLocale);
};

const getRegionForLocale = (locale) => {
  const mapping = {
    en: "global",
    "zh-CN": "cn",
    "zh-TW": "tw",
    ja: "jp",
    ko: "kr",
    de: "de",
    fr: "fr",
    es: "latam",
    "pt-BR": "br",
    ru: "ru",
    th: "th"
  };

  return mapping[locale] || "global";
};

const getByPath = (source, path) => {
  return String(path)
    .split(".")
    .reduce((current, segment) => {
      if (current === undefined || current === null) {
        return undefined;
      }

      return current[segment];
    }, source);
};

const getTranslation = (locale, key) => {
  const fallbackMap = {
    "zh-TW": ["zh-TW", "zh-CN", "en"],
    "zh-CN": ["zh-CN", "en"]
  };
  const candidates = fallbackMap[locale] || [locale, fallbackLocale];

  for (const candidate of candidates) {
    const value = getByPath(translations[candidate], key);
    if (value !== undefined) {
      return value;
    }
  }

  return undefined;
};

const applyPageMeta = (locale) => {
  const page = document.body.dataset.page;
  const entry = pageMeta[page];

  if (!entry) {
    document.documentElement.lang = locale;
    return;
  }

  const meta = entry[locale] || entry[fallbackLocale];
  if (!meta) {
    document.documentElement.lang = locale;
    return;
  }

  document.title = meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", meta.description);
  }

  document.documentElement.lang = locale;
};

const applyDataTranslations = (locale) => {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = key ? getTranslation(locale, key) : undefined;

    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    const value = key ? getTranslation(locale, key) : undefined;

    if (typeof value === "string") {
      node.setAttribute("placeholder", value);
    }
  });
};

const buildLocaleSwitcher = (locale) => {
  const languageLabel = getTranslation(locale, "shared.language") || "Language";
  const noticeTemplate = getTranslation(locale, "shared.localeNotice") || "Auto language: {locale}";
  const wrapper = document.createElement("div");
  wrapper.className = "locale-switcher";

  const label = document.createElement("label");
  label.className = "locale-label";
  label.setAttribute("for", "locale-select");
  label.textContent = languageLabel;

  const select = document.createElement("select");
  select.id = "locale-select";
  select.className = "locale-select";

  supportedLocales.forEach((code) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = localeLabels[code];
    option.selected = code === locale;
    select.appendChild(option);
  });

  const notice = document.createElement("span");
  notice.className = "locale-notice";
  notice.textContent = noticeTemplate.replace("{locale}", localeLabels[locale] || locale);

  select.addEventListener("change", () => {
    try {
      window.localStorage.setItem(localeStorageKey, select.value);
    } catch {
      // ignore storage failures
    }

    window.location.reload();
  });

  wrapper.append(label, select, notice);
  return wrapper;
};

const mountLocaleSwitcher = (locale) => {
  const existing = document.querySelector(".locale-switcher");
  if (existing) {
    existing.remove();
  }

  const target = document.querySelector(".masthead-top") || document.querySelector(".page-shell");
  if (!target) {
    return;
  }

  const switcher = buildLocaleSwitcher(locale);

  if (target.classList.contains("masthead-top")) {
    target.appendChild(switcher);
  } else {
    target.prepend(switcher);
  }
};

const applyLocale = () => {
  const locale = getPreferredLocale();
  const region = getRegionForLocale(locale);

  window.kingshotLocale = locale;
  window.kingshotRegion = region;
  window.kingshotI18n = {
    locale,
    region,
    supportedLocales,
    localeLabels,
    normalizeLocale,
    getPreferredLocale,
    getRegionForLocale,
    t: (key) => getTranslation(locale, key)
  };

  applyPageMeta(locale);
  applyDataTranslations(locale);
  mountLocaleSwitcher(locale);
  document.documentElement.setAttribute("data-locale", locale);
  document.documentElement.setAttribute("data-region", region);
};

applyLocale();
