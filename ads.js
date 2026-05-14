const adSlots = Array.from(document.querySelectorAll(".ad-slot[data-ad-slot]"));
const adsenseLoaderSelector =
  'script[data-adsense-loader="true"], script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]';

if (adSlots.length) {
  const client = window.KINGSHOT_ADSENSE_CLIENT || "";
  const slotMap = window.KINGSHOT_ADSENSE_SLOTS || {};

  const mountAd = (slotRoot) => {
    const slotKey = slotRoot.dataset.adSlot || "";
    const slotId = slotMap[slotKey] || slotRoot.dataset.adSenseId || "";
    const inner = slotRoot.querySelector(".ad-slot-inner");

    if (!client || !slotId || !inner) {
      slotRoot.hidden = true;
      return;
    }

    slotRoot.hidden = false;
    slotRoot.classList.add("is-live-ad");

    inner.innerHTML = `
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="${client}"
        data-ad-slot="${slotId}"
        data-ad-format="${slotRoot.dataset.adFormat || "auto"}"
        data-full-width-responsive="${slotRoot.dataset.adResponsive || "true"}"
      ></ins>
    `;

    if (!document.querySelector(adsenseLoaderSelector)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.crossOrigin = "anonymous";
      script.dataset.adsenseLoader = "true";
      document.head.appendChild(script);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      slotRoot.hidden = true;
    }
  };

  adSlots.forEach(mountAd);
}
