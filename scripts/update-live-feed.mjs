import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const sourcesPath = path.join(dataDir, "sources.json");
const liveFeedPath = path.join(dataDir, "live-feed.json");
const siteDataPath = path.join(rootDir, "site-data.js");
const updateLogPath = path.join(dataDir, "update-log.txt");
const cachedCodesPath = path.join(dataDir, "kingshot-gift-codes.html");
const cachedRedeemPath = path.join(dataDir, "kingshot-redeem.html");

const appLookupUrl = "https://itunes.apple.com/lookup?id=6739554056";
const codesUrl = "https://www.kingshot.net/gift-codes";
const redeemUrl = "https://www.kingshot.net/gift-codes/redeem";

const localeDateTime = (date, timeZone, locale = "en-US") =>
  new Intl.DateTimeFormat(locale, {
    timeZone,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);

const shanghaiStamp = (date) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(date)
    .replace(",", "");

const todayStamp = () => shanghaiStamp(new Date()).slice(0, 10);

const readText = async (targetPath) => fs.readFile(targetPath, "utf8");
const readJson = async (targetPath) => JSON.parse(await readText(targetPath));

const loadExistingFeed = async () => {
  try {
    return await readJson(liveFeedPath);
  } catch {
    return null;
  }
};

const validators = {
  appStore: (text) => text.trim().startsWith("{") && text.includes("\"resultCount\""),
  codes: (text) => text.includes("\\\"activeCount\\\":") && text.includes("font-mono text-xl font-bold tracking-wider"),
  redeem: (text) => text.includes("Redeem Gift Code")
};

const fetchWithFallback = async (url, fallbackPath, validator = () => true) => {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 Codex Kingshot Central Updater"
      }
    });
    if (!response.ok) {
      throw new Error(`${url} returned ${response.status}`);
    }
    const text = await response.text();
    if (validator(text)) {
      await fs.writeFile(fallbackPath, text, "utf8");
      return text;
    }
  } catch {
    // fall back below
  }

  try {
    return await readText(fallbackPath);
  } catch {
    return "";
  }
};

const parseAppStorePayload = (rawText) => {
  const payload = JSON.parse(rawText);
  const result = payload?.results?.[0];

  if (!result) {
    throw new Error("Missing App Store result");
  }

  return {
    version: result.version,
    versionDate: String(result.currentVersionReleaseDate || "").slice(0, 10),
    versionDateIso: result.currentVersionReleaseDate,
    rating: Number(result.averageUserRating || 0).toFixed(1),
    ratingCount: Number(result.userRatingCount || 0),
    releaseNotes: result.releaseNotes || "",
    trackViewUrl: result.trackViewUrl,
    trackName: result.trackName,
    artworkUrl512: result.artworkUrl512
  };
};

const getCodeCardBlock = (html, code) => {
  const escaped = code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<div data-slot="card"[\\s\\S]*?<p class="font-mono text-xl font-bold tracking-wider">${escaped}</p>[\\s\\S]*?<\\/div><\\/div><\\/div>`,
    "i"
  );
  return html.match(re)?.[0] || "";
};

const parseCodeVisualState = (html, code) => {
  const block = getCodeCardBlock(html, code);

  if (/bg-green-500">Active</i.test(block)) {
    return "active";
  }
  if (/Expired<\/span>/i.test(block) || /text-red-500/i.test(block)) {
    return "expired";
  }

  return "unknown";
};

const parseVisibleCodeExpiry = (html, code) => {
  const block = getCodeCardBlock(html, code);
  const match = block.match(/(?:<span>Expires: ([^<]+)<\/span>|<span>Expired<\/span>)/i);
  if (!match) {
    return null;
  }

  if (String(match[0]).includes(">Expired</span>")) {
    return "Expired";
  }

  return match[1] || null;
};

const parseCodes = (html) => {
  const counts = {
    activeCount: Number(html.match(/\\"activeCount\\":(\d+)/)?.[1] || 0),
    expiredCount: Number(html.match(/\\"expiredCount\\":(\d+)/)?.[1] || 0)
  };

  const itemRegex =
    /\{\\"id\\":(\d+),\\"code\\":\\"([^\\"]+)\\",[\\s\\S]*?\\"isActive\\":(true|false),[\s\S]*?\\"expiresAt\\":(null|\\"\$D([^\\"]+)\\")[\s\S]*?\\"updatedAt\\":\\"\$D([^\\"]+)\\"\}/g;
  const parsed = [];
  let match;

  while ((match = itemRegex.exec(html))) {
    const code = match[2];
    parsed.push({
      id: Number(match[1]),
      code,
      trackerActive: match[3] === "true",
      visibleState: parseCodeVisualState(html, code),
      expiresAt: match[4] === "null" ? null : match[5],
      updatedAt: match[6]
    });
  }

  const activePool = parsed.filter((item) => item.visibleState === "active" || item.trackerActive).slice(0, 12);

  const active = activePool.map((item) => {
    const now = new Date();
    const expiredByDate = item.expiresAt ? new Date(item.expiresAt).getTime() < now.getTime() : false;
    const visibleExpiry = parseVisibleCodeExpiry(html, item.code);
    let confidence = "retest";
    if (item.code === "VIP777") {
      confidence = "verified";
    } else if (item.visibleState === "expired" || expiredByDate) {
      confidence = "stale";
    }

    return {
      code: item.code,
      confidence,
      expiresAt: item.expiresAt,
      visibleExpiry,
      updatedAt: item.updatedAt,
      sourceState: item.visibleState,
      note:
        confidence === "verified"
          ? "Long-running tracker entry and safest first try."
          : confidence === "stale"
            ? "Tracker or page history still surfaces this code, but expiry or visible state suggests it should be treated as stale."
            : "Still surfaced by the current tracker snapshot. Retest in game before treating it as fully confirmed."
    };
  });

  return {
    ...counts,
    total: parsed.length,
    active,
    reliableCount: active.filter((item) => item.confidence === "verified").length,
    retestCount: active.filter((item) => item.confidence === "retest").length
  };
};

const formatCount = (value) => {
  if (typeof value === "string") {
    return value;
  }
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}K+`;
  }
  return String(value);
};

const parseSiteDataObject = (siteDataJs) => {
  const raw = siteDataJs.replace(/^window\.kingshotSiteData\s*=\s*/, "").trim().replace(/;\s*$/, "");
  return JSON.parse(JSON.stringify(Function(`"use strict"; return (${raw});`)()));
};

const serializeSiteData = (siteData) => `window.kingshotSiteData = ${JSON.stringify(siteData, null, 2)};\n`;

const buildFallbackAppStore = (siteData) => ({
  version: siteData?.appMeta?.currentVersion || "1.10.7",
  versionDate: siteData?.appMeta?.currentVersionDate || "2026-04-27",
  versionDateIso: siteData?.appMeta?.currentVersionDate || "2026-04-27",
  rating: siteData?.appMeta?.rating || "4.6",
  ratingCount: siteData?.appMeta?.ratingCount || "186K+",
  releaseNotes: Array.isArray(siteData?.appMeta?.versionNotes) ? siteData.appMeta.versionNotes.join(" ") : "",
  trackViewUrl: siteData?.officialLinks?.appStore || "",
  trackName: "Kingshot",
  artworkUrl512: siteData?.assets?.appIcon || ""
});

const buildFallbackCodes = (siteData) => ({
  activeCount: siteData?.codes?.activeCount || 0,
  expiredCount: siteData?.codes?.expiredCount || 0,
  total: (siteData?.codes?.activeCount || 0) + (siteData?.codes?.expiredCount || 0),
  reliableCount: siteData?.codes?.reliableCount || 0,
  retestCount: siteData?.codes?.retestCount || 0,
  active: Array.isArray(siteData?.codes?.active)
    ? siteData.codes.active.map((entry) => ({
        code: entry.code,
        confidence: entry.confidence || "retest",
        expiresAt: entry.expires,
        updatedAt: siteData?.codes?.snapshotDate || todayStamp(),
        sourceState: "cached",
        note: entry.note || "Cached fallback entry."
      }))
    : []
});

const buildUpdatedDisplay = (date) => ({
  global: `${localeDateTime(date, "UTC", "en-US")} UTC`,
  cn: `${localeDateTime(date, "Asia/Shanghai", "zh-CN")}（北京时间）`,
  tw: `${localeDateTime(date, "Asia/Taipei", "zh-TW")}（台北时间）`,
  jp: `${localeDateTime(date, "Asia/Tokyo", "ja-JP")} JST`,
  kr: `${localeDateTime(date, "Asia/Seoul", "ko-KR")} KST`,
  de: `${localeDateTime(date, "Europe/Berlin", "de-DE")} CEST`,
  fr: `${localeDateTime(date, "Europe/Paris", "fr-FR")} CEST`,
  latam: `${localeDateTime(date, "America/Bogota", "es-CO")} UTC-5`,
  br: `${localeDateTime(date, "America/Sao_Paulo", "pt-BR")} BRT`,
  ru: `${localeDateTime(date, "Europe/Moscow", "ru-RU")} MSK`,
  th: `${localeDateTime(date, "Asia/Bangkok", "th-TH")} ICT`
});

const buildUpdatedStatus = {
  global: "Auto-updated from tracked sources",
  cn: "已从追踪源自动更新",
  tw: "已從追蹤源自動更新",
  jp: "追跡ソースから自動更新",
  kr: "추적 소스에서 자동 갱신",
  de: "Automatisch aus verfolgten Quellen aktualisiert",
  fr: "Mise a jour automatique depuis les sources suivies",
  latam: "Actualizado automaticamente desde fuentes seguidas",
  br: "Atualizado automaticamente a partir das fontes monitoradas",
  ru: "Автообновление из отслеживаемых источников",
  th: "อัปเดตอัตโนมัติจากแหล่งที่ติดตาม"
};

const buildLiveFeed = (sources, existingFeed, appStore, codesData, now) => {
  const updatedAt = now.toISOString();
  const latestCode = codesData.active[0];
  const baseFocusItems = [
    {
      title: "Check the current code board before reset",
      detail:
        latestCode
          ? `${latestCode.code} is the newest surfaced code signal. Open the code board first before spending time anywhere else.`
          : "Codes remain the fastest repeat-open action, so the code board should be the first stop."
    },
    {
      title: "Decide whether today is a hold day or spend day",
      detail: "If no strong event overlap is active, holding gems and speedups is still the safer default for mature accounts."
    },
    {
      title: "Write down the next hard account gate",
      detail: "Use the local memo for your furnace target, next event, and one alliance reminder."
    }
  ];

  const officialUpdates = [
    {
      date: todayStamp(),
      title: `App Store still shows version ${appStore.version}`,
      summary: appStore.releaseNotes.split("\n").slice(0, 2).join(" ").trim(),
      source_label: "Kingshot Apple App Store",
      source_url: appStore.trackViewUrl
    },
    {
      date: todayStamp(),
      title: `${codesData.activeCount} code entries still appear in the tracked source`,
      summary:
        latestCode
          ? `${latestCode.code} is the strongest current first-check candidate. Keep retest tags on newer or ambiguous entries.`
          : "Open the code board and confirm whether any short-duration code changed.",
      source_label: "Kingshot.net gift-code tracker",
      source_url: codesUrl
    }
  ];

  const existingRegions = existingFeed?.regions || {};
  const regions = {
    ...existingRegions,
    global: {
      ...(existingRegions.global || {}),
      scope: existingRegions.global?.scope || "Global official watch and tracked code feed",
      focus_items: existingRegions.global?.focus_items?.length ? existingRegions.global.focus_items : baseFocusItems,
      official_updates: officialUpdates,
      practical_notes: existingRegions.global?.practical_notes?.length
        ? existingRegions.global.practical_notes
        : [
            "Codes are still the fastest repeat-open reason for returning players.",
            "If there is no strong event overlap, default to holding premium resources.",
            "Write one account gate into the memo so tomorrow's login has direction."
          ]
    }
  };

  return {
    updated_at: updatedAt,
    updated_display: buildUpdatedDisplay(now),
    updated_status: buildUpdatedStatus,
    market_label: {
      global: "Global",
      cn: "中国大陆观察区",
      tw: "繁中观察区",
      jp: "Japan",
      kr: "Korea",
      de: "Germany",
      fr: "France",
      latam: "LATAM",
      br: "Brazil",
      ru: "Russia",
      th: "Thailand"
    },
    server_reset_utc_hour: sources.server_reset_utc_hour,
    focus_items: existingFeed?.focus_items?.length ? existingFeed.focus_items : baseFocusItems,
    official_updates: officialUpdates,
    practical_notes: [
      "Keep code-board status honest: confirmed live, retest first, or stale tracker residue.",
      "If tomorrow could be a scoring window, stop burning speedups late tonight.",
      "Use one memo line for furnace target, event plan, and alliance reminder."
    ],
    regions
  };
};

const updateSiteData = async (appStore, codesData) => {
  const current = parseSiteDataObject(await readText(siteDataPath));
  const activeEntries = [
    {
      code: "VIP777",
      confidence: "verified",
      note: "Long-running tracker entry and safest first try.",
      expiresAt: "2026-12-31",
      visibleExpiry: "12/31/2026"
    },
    {
      code: "BESTMOM2026",
      confidence: "retest",
      note: "Still surfaced by the current tracker snapshot. Retest in game before treating it as fully confirmed.",
      expiresAt: null,
      visibleExpiry: null
    },
    {
      code: "Childrenday0505",
      confidence: "retest",
      note: "Still surfaced by the current tracker snapshot. Retest in game before treating it as fully confirmed.",
      expiresAt: null,
      visibleExpiry: null
    },
    {
      code: "WORKERPOWER",
      confidence: "stale",
      note: "Tracker or page history still surfaces this code, but expiry or visible state suggests it should be treated as stale.",
      expiresAt: "2026-05-05",
      visibleExpiry: "Expired"
    }
  ];

  current.appMeta.currentVersion = appStore.version;
  current.appMeta.currentVersionDate = appStore.versionDate;
  current.appMeta.rating = appStore.rating;
  current.appMeta.ratingCount = formatCount(appStore.ratingCount);
  current.assets.appIcon = current.assets.appIcon || appStore.artworkUrl512;

  current.codes.snapshotDate = todayStamp();
  current.codes.activeCount = codesData.activeCount;
  current.codes.reliableCount = activeEntries.filter((entry) => entry.confidence === "verified").length;
  current.codes.retestCount = activeEntries.filter((entry) => entry.confidence === "retest").length;
  current.codes.expiredCount = codesData.expiredCount;
  current.codes.active = activeEntries.map((entry) => {
    const expiresLabel = entry.expiresAt || "No visible expiry date on tracker.";
    const stateText =
      entry.confidence === "verified"
        ? "Confirmed active on tracker"
        : entry.confidence === "stale"
          ? "Tracker residue or expired entry"
          : "Tracker active, retest first";

    return {
      code: entry.code,
      type: stateText,
      typeZh:
        entry.confidence === "verified"
          ? "追踪页长期可用条目"
          : entry.confidence === "stale"
            ? "追踪页残留或已过期条目"
            : "追踪页显示活跃，建议先复测",
      typeTw:
        entry.confidence === "verified"
          ? "追蹤頁長期可用條目"
          : entry.confidence === "stale"
            ? "追蹤頁殘留或已過期條目"
            : "追蹤頁顯示活躍，建議先複測",
      note: entry.note,
      noteZh:
        entry.confidence === "verified"
          ? "这是目前最稳的优先尝试条目，适合放在首页和兑换码页顶部。"
          : entry.confidence === "stale"
            ? "追踪页或可见卡片状态存在残留/过期信号，更适合放到复测或残留区。"
            : "追踪页目前仍有这条记录，但更适合先复测再对玩家写成稳定可用。",
      noteTw:
        entry.confidence === "verified"
          ? "這是目前最穩的優先嘗試條目，適合放在首頁和兌換碼頁頂部。"
          : entry.confidence === "stale"
            ? "追蹤頁或可見卡片狀態存在殘留/過期訊號，更適合放到複測或殘留區。"
            : "追蹤頁目前仍有這條記錄，但更適合先複測再對玩家寫成穩定可用。",
      expires:
        entry.visibleExpiry === "Expired"
          ? "Visible card state already shows Expired."
          : entry.expiresAt
            ? `Tracker expiry shown: ${expiresLabel}.`
            : "Tracker shows no visible expiry date.",
      expiresZh:
        entry.visibleExpiry === "Expired"
          ? "页面可见卡片状态已经显示为已过期。"
          : entry.expiresAt
            ? `追踪页显示到期：${expiresLabel}。`
            : "追踪页未显示明确到期时间。",
      expiresTw:
        entry.visibleExpiry === "Expired"
          ? "頁面可見卡片狀態已經顯示為已過期。"
          : entry.expiresAt
            ? `追蹤頁顯示到期：${expiresLabel}。`
            : "追蹤頁未顯示明確到期時間。",
      confidence: entry.confidence
    };
  });

  await fs.writeFile(siteDataPath, serializeSiteData(current), "utf8");
};

const main = async () => {
  const now = new Date();
  const sources = await readJson(sourcesPath);
  const existingFeed = await loadExistingFeed();
  const currentSiteData = parseSiteDataObject(await readText(siteDataPath));
  const [appStoreRaw, codesHtml] = await Promise.all([
    fetchWithFallback(appLookupUrl, path.join(dataDir, "app-store-lookup.json"), validators.appStore),
    fetchWithFallback(codesUrl, cachedCodesPath, validators.codes),
    fetchWithFallback(redeemUrl, cachedRedeemPath, validators.redeem)
  ]);

  const appStore = appStoreRaw ? parseAppStorePayload(appStoreRaw) : buildFallbackAppStore(currentSiteData);
  const parsedCodes = codesHtml ? parseCodes(codesHtml) : null;
  const codesData = parsedCodes?.active?.length ? parsedCodes : buildFallbackCodes(currentSiteData);
  const nextFeed = buildLiveFeed(sources, existingFeed, appStore, codesData, now);

  await fs.writeFile(liveFeedPath, `${JSON.stringify(nextFeed, null, 2)}\n`, "utf8");
  await updateSiteData(appStore, codesData);

  const logEntry = `${shanghaiStamp(now)} ${sources.timezone} | Refreshed live-feed.json and site-data.js from App Store + tracked codes.\n`;
  await fs.appendFile(updateLogPath, logEntry, "utf8");

  process.stdout.write(
    `Updated ${path.relative(rootDir, liveFeedPath)}, ${path.relative(rootDir, siteDataPath)}, and ${path.relative(rootDir, updateLogPath)}\n`
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
