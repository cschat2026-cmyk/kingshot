const trackerRoot = document.querySelector("[data-tracker]");
const resetButton = document.querySelector("#reset-tracker");
const summary = document.querySelector("#tracker-summary");
const feedback = document.querySelector("#tracker-feedback");
const officerNote = document.querySelector("#officer-note");
const officerNoteStatus = document.querySelector("#officer-note-status");

if (trackerRoot) {
  const locale = window.kingshotLocale || "en";
  const storageKey = trackerRoot.dataset.tracker;
  const inputs = Array.from(trackerRoot.querySelectorAll("input[type='checkbox']"));
  let feedbackTimer;

  const strings = {
    en: {
      saved: "Task saved",
      unchecked: "Task unchecked",
      reset: "Checklist reset",
      progress: "{checked} of {total} tasks completed",
      saveFailed: "Save failed",
      resetFailed: "Reset failed",
      officerSaved: "Saved locally",
      officerPlaceholder: "Example: remind R4 before reset, hold speedups for tomorrow, rally block at 20:00."
    },
    "zh-CN": {
      saved: "任务已保存",
      unchecked: "任务已取消",
      reset: "清单已重置",
      progress: "已完成 {checked} / {total} 项任务",
      saveFailed: "保存失败",
      resetFailed: "重置失败",
      officerSaved: "已保存在本地",
      officerPlaceholder: "例：重置前提醒 R4，明天活动保留加速，20:00 集结。"
    },
    "zh-TW": {
      saved: "任務已儲存",
      unchecked: "任務已取消",
      reset: "清單已重置",
      progress: "已完成 {checked} / {total} 項任務",
      saveFailed: "儲存失敗",
      resetFailed: "重設失敗",
      officerSaved: "已保存在本地",
      officerPlaceholder: "例：重置前提醒 R4，明天活動保留加速，20:00 集結。"
    }
  };

  const i18n = strings[locale] || strings.en;
  const officerNoteKey = `${storageKey}-officer-note`;

  const readState = () => {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  };

  const writeState = (state) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  };

  const setFeedback = (message) => {
    if (!feedback) {
      return;
    }

    feedback.textContent = message;
    feedback.classList.add("visible");
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => {
      feedback.classList.remove("visible");
    }, 1800);
  };

  const applyState = () => {
    const state = readState();
    let checkedCount = 0;

    inputs.forEach((input) => {
      const checked = Boolean(state[input.dataset.item]);
      input.checked = checked;
      input.closest(".tracker-item")?.classList.toggle("done", checked);
      checkedCount += checked ? 1 : 0;
    });

    if (summary) {
      summary.textContent = i18n.progress
        .replace("{checked}", String(checkedCount))
        .replace("{total}", String(inputs.length));
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      const state = readState();
      state[input.dataset.item] = input.checked;
      const ok = writeState(state);
      applyState();
      setFeedback(ok ? (input.checked ? i18n.saved : i18n.unchecked) : i18n.saveFailed);
    });
  });

  resetButton?.addEventListener("click", () => {
    try {
      window.localStorage.removeItem(storageKey);
      applyState();
      setFeedback(i18n.reset);
    } catch {
      setFeedback(i18n.resetFailed);
    }
  });

  if (officerNote) {
    officerNote.setAttribute("placeholder", i18n.officerPlaceholder);
    try {
      officerNote.value = window.localStorage.getItem(officerNoteKey) || "";
      if (officerNoteStatus) {
        officerNoteStatus.textContent = i18n.officerSaved;
      }
    } catch {
      if (officerNoteStatus) {
        officerNoteStatus.textContent = i18n.saveFailed;
      }
    }

    officerNote.addEventListener("input", () => {
      try {
        window.localStorage.setItem(officerNoteKey, officerNote.value);
        if (officerNoteStatus) {
          officerNoteStatus.textContent = i18n.officerSaved;
        }
      } catch {
        if (officerNoteStatus) {
          officerNoteStatus.textContent = i18n.saveFailed;
        }
      }
    });
  }

  applyState();
}
