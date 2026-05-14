const plannerPanel = document.querySelector("[data-building-planner]");

if (plannerPanel) {
  const locale = window.kingshotLocale || "en";
  const t = window.kingshotI18n?.t;
  const goalSelect = plannerPanel.querySelector("#goal-select");
  const resultTitle = plannerPanel.querySelector("#planner-result-title");
  const resultDetails = plannerPanel.querySelector("#planner-result-details");
  const noteField = plannerPanel.querySelector("#planner-note");
  const noteStatus = plannerPanel.querySelector("#planner-note-status");
  const phaseSelect = plannerPanel.querySelector("#current-phase");
  const blockerSelect = plannerPanel.querySelector("#current-blocker");
  const gateKicker = plannerPanel.querySelector("#gate-tool-kicker");
  const gateTitle = plannerPanel.querySelector("#gate-tool-title");
  const gateStatus = plannerPanel.querySelector("#gate-tool-status");
  const gateResultTitle = plannerPanel.querySelector("#gate-result-title");
  const gateResultBody = plannerPanel.querySelector("#gate-result-body");
  const noteStorageKey = "kingshot-building-note";
  const gateStorageKey = "kingshot-building-gate-tool";

  const strings = {
    en: {
      saved: "Saved locally",
      failed: "Save failed",
      unavailable: "Storage unavailable",
      gateKicker: "Upgrade gate helper",
      gateTitle: "Pick what is blocking you now",
      phaseLabel: "Current account phase",
      blockerLabel: "Main blocker",
      phases: ["Early account", "Mid account", "Mature account"],
      blockers: ["Main level prerequisite", "Troop or military unlock", "Research throughput", "Resource shortage"],
      gateResults: {
        early: {
          main: ["Push the main prerequisite chain first.", "Keep the main queue on the next furnace or Town Center chain. Side comfort upgrades can wait until the hard gate is moving."],
          military: ["Unlock combat supports without spreading too wide.", "Prioritize the military building that changes troop quality or training efficiency, then return to the main chain."],
          research: ["Fix research flow before long idle gaps appear.", "Keep research support moving, but do not let it steal every queue from the next main unlock."],
          resource: ["Stabilize only the resource support that removes the current choke.", "Do not max every economy building. Upgrade the support that keeps the main chain running, then go back to the gate."]
        },
        mid: {
          main: ["Pre-build the next visible hard gate.", "Look one level ahead, finish prerequisites early, and avoid discovering the wall only after your main queue frees up."],
          military: ["Time military upgrades around event value.", "Use troop, training, or military chain upgrades when they can also score into a useful event window."],
          research: ["Protect research throughput, but keep it tied to combat or event return.", "Upgrade research supports when they unlock meaningful efficiency, not just because the queue is available."],
          resource: ["Convert resource upgrades into fewer stalled queues.", "Choose economy supports that prevent tomorrow's main-chain stall, not broad account beautification."]
        },
        late: {
          main: ["Spend queue time only where it changes the next breakpoint.", "Mature accounts lose value when queues drift into low-impact upgrades. Name the next gate and build directly toward it."],
          military: ["Prioritize upgrades that change real combat output.", "If the military chain does not affect your main march or next event score, hold it behind higher-leverage requirements."],
          research: ["Research support must earn its queue time.", "Only push research infrastructure when it improves a current bottleneck, main-march output, or event conversion."],
          resource: ["Avoid expensive economy upgrades without a clear gate.", "Late accounts should only sink time into resources when the upgrade prevents a known future bottleneck."]
        }
      }
    },
    "zh-CN": {
      saved: "已保存在本地",
      failed: "保存失败",
      unavailable: "本地存储不可用",
      gateKicker: "升级卡点助手",
      gateTitle: "选择你现在真正被什么卡住",
      phaseLabel: "当前账号阶段",
      blockerLabel: "主要卡点",
      phases: ["前期账号", "中期账号", "成熟账号"],
      blockers: ["主等级前置", "兵种或军事解锁", "科研效率", "资源短缺"],
      gateResults: {
        early: {
          main: ["先推主前置链。", "主队列继续围绕炉子或主城链推进。舒适性旁支升级可以等硬门槛先动起来。"],
          military: ["补军事支撑，但不要铺太开。", "优先升能改变兵种质量或训练效率的军事建筑，然后尽快回到主线。"],
          research: ["先修复科研流，不要让科研长期空档。", "科研支撑可以推进，但不能把所有队列都从主解锁上抢走。"],
          resource: ["只稳定当前真正卡住的资源支撑。", "不要平均拉满经济建筑。升能让主线继续跑的那一个，再回到门槛。"]
        },
        mid: {
          main: ["提前做好下一层硬门槛。", "至少往前看一层，把前置提前补好，别等主队列空出来才发现被墙卡住。"],
          military: ["军事升级要尽量配合活动价值。", "兵种、训练或军事链升级最好和可用计分窗口一起交。"],
          research: ["保护科研效率，但要绑定战斗或活动回报。", "科研支撑只有能解锁关键效率时才值得吃队列，不是有空就升。"],
          resource: ["把资源升级转成更少的队列停摆。", "选择能避免明天主线停工的经济支撑，而不是把账号做得很满。"]
        },
        late: {
          main: ["队列时间只给会改变节点的升级。", "成熟账号最怕队列漂到低影响升级。先说清下一层门槛，再直接往那条链走。"],
          military: ["优先真正改变战斗输出的升级。", "如果军事链不影响主力队或下一次活动得分，就先排在更高杠杆需求后面。"],
          research: ["科研支撑必须证明值得占队列。", "只有它能改善当前瓶颈、主力输出或活动转分时，才值得推进科研基础。"],
          resource: ["不要做没有明确门槛的高成本经济升级。", "后期经济升级只有能预防已知未来瓶颈时才值得花时间。"]
        }
      }
    },
    "zh-TW": {
      saved: "已保存在本地",
      failed: "儲存失敗",
      unavailable: "本地儲存不可用",
      gateKicker: "升級卡點助手",
      gateTitle: "選擇你現在真正被什麼卡住",
      phaseLabel: "目前帳號階段",
      blockerLabel: "主要卡點",
      phases: ["前期帳號", "中期帳號", "成熟帳號"],
      blockers: ["主等級前置", "兵種或軍事解鎖", "科研效率", "資源短缺"],
      gateResults: {
        early: {
          main: ["先推主前置鏈。", "主隊列繼續圍繞爐子或主城鏈推進。舒適性旁支升級可以等硬門檻先動起來。"],
          military: ["補軍事支撐，但不要鋪太開。", "優先升能改變兵種品質或訓練效率的軍事建築，然後盡快回到主線。"],
          research: ["先修復科研流，不要讓科研長期空檔。", "科研支撐可以推進，但不能把所有隊列都從主解鎖上搶走。"],
          resource: ["只穩定目前真正卡住的資源支撐。", "不要平均拉滿經濟建築。升能讓主線繼續跑的那一個，再回到門檻。"]
        },
        mid: {
          main: ["提前做好下一層硬門檻。", "至少往前看一層，把前置提前補好，別等主隊列空出來才發現被牆卡住。"],
          military: ["軍事升級要盡量配合活動價值。", "兵種、訓練或軍事鏈升級最好和可用計分窗口一起交。"],
          research: ["保護科研效率，但要綁定戰鬥或活動回報。", "科研支撐只有能解鎖關鍵效率時才值得吃隊列，不是有空就升。"],
          resource: ["把資源升級轉成更少的隊列停擺。", "選擇能避免明天主線停工的經濟支撐，而不是把帳號做得很滿。"]
        },
        late: {
          main: ["隊列時間只給會改變節點的升級。", "成熟帳號最怕隊列漂到低影響升級。先說清下一層門檻，再直接往那條鏈走。"],
          military: ["優先真正改變戰鬥輸出的升級。", "如果軍事鏈不影響主力隊或下一次活動得分，就先排在更高槓桿需求後面。"],
          research: ["科研支撐必須證明值得占隊列。", "只有它能改善目前瓶頸、主力輸出或活動轉分時，才值得推進科研基礎。"],
          resource: ["不要做沒有明確門檻的高成本經濟升級。", "後期經濟升級只有能預防已知未來瓶頸時才值得花時間。"]
        }
      }
    }
  };

  const i18n = strings[locale] || strings.en;

  const planText = (key, fallback) => {
    if (typeof t === "function") {
      const value = t(key);
      if (typeof value === "string") {
        return value;
      }
    }
    return fallback;
  };

  const renderPlan = () => {
    const key = goalSelect?.value || "furnace";

    if (resultTitle) {
      resultTitle.textContent = planText(`building.planResults.${key}.title`, planText("building.planResults.furnace.title", ""));
    }

    if (resultDetails) {
      resultDetails.textContent = planText(
        `building.planResults.${key}.details`,
        planText("building.planResults.furnace.details", "")
      );
    }
  };

  const applyGateLabels = () => {
    if (gateKicker) {
      gateKicker.textContent = i18n.gateKicker;
    }
    if (gateTitle) {
      gateTitle.textContent = i18n.gateTitle;
    }
    if (gateStatus) {
      gateStatus.textContent = i18n.saved;
    }

    const phaseLabel = plannerPanel.querySelector('label[for="current-phase"]');
    const blockerLabel = plannerPanel.querySelector('label[for="current-blocker"]');
    if (phaseLabel) {
      phaseLabel.textContent = i18n.phaseLabel;
    }
    if (blockerLabel) {
      blockerLabel.textContent = i18n.blockerLabel;
    }

    Array.from(phaseSelect?.options || []).forEach((option, index) => {
      if (i18n.phases[index]) {
        option.textContent = i18n.phases[index];
      }
    });

    Array.from(blockerSelect?.options || []).forEach((option, index) => {
      if (i18n.blockers[index]) {
        option.textContent = i18n.blockers[index];
      }
    });
  };

  const renderGate = () => {
    const phase = phaseSelect?.value || "early";
    const blocker = blockerSelect?.value || "main";
    const result = i18n.gateResults[phase]?.[blocker] || i18n.gateResults.early.main;

    if (gateResultTitle) {
      gateResultTitle.textContent = result[0];
    }
    if (gateResultBody) {
      gateResultBody.textContent = result[1];
    }

    try {
      window.localStorage.setItem(gateStorageKey, JSON.stringify({ phase, blocker }));
      if (gateStatus) {
        gateStatus.textContent = i18n.saved;
      }
    } catch {
      if (gateStatus) {
        gateStatus.textContent = i18n.failed;
      }
    }
  };

  const saveNote = (value) => {
    try {
      window.localStorage.setItem(noteStorageKey, value);
      if (noteStatus) {
        noteStatus.textContent = i18n.saved;
      }
    } catch {
      if (noteStatus) {
        noteStatus.textContent = i18n.failed;
      }
    }
  };

  goalSelect?.addEventListener("change", renderPlan);
  phaseSelect?.addEventListener("change", renderGate);
  blockerSelect?.addEventListener("change", renderGate);

  noteField?.addEventListener("input", () => {
    saveNote(noteField.value);
  });

  try {
    const saved = window.localStorage.getItem(noteStorageKey) || "";
    if (noteField) {
      noteField.value = saved;
    }
  } catch {
    if (noteStatus) {
      noteStatus.textContent = i18n.unavailable;
    }
  }

  try {
    const savedGate = JSON.parse(window.localStorage.getItem(gateStorageKey) || "{}");
    if (savedGate.phase && phaseSelect) {
      phaseSelect.value = savedGate.phase;
    }
    if (savedGate.blocker && blockerSelect) {
      blockerSelect.value = savedGate.blocker;
    }
  } catch {
    if (gateStatus) {
      gateStatus.textContent = i18n.unavailable;
    }
  }

  applyGateLabels();
  renderPlan();
  renderGate();
}
