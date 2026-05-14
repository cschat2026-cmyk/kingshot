(() => {
  const config = window.KINGSHOT_SITE_CONFIG || {};
  const siteName = config.siteName || "Kingshot Central";
  const siteUrl = (config.siteUrl || "https://www.kingshotcentral.com").replace(/\/$/, "");
  const contactEmail = config.contactEmail || "cschat2026@gmail.com";
  const path = window.location.pathname || "/";
  const pageUrl = path.includes("/guides/")
    ? `${siteUrl}/guides/${path.split("/guides/").pop()}`
    : siteUrl;

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "name": siteName,
      "url": `${siteUrl}/`,
      "inLanguage": ["en", "zh-CN", "zh-TW"],
      "description": "Kingshot codes, daily reset watch, hero timing, event planning, building routes, and alliance tools.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": siteName,
      "url": `${siteUrl}/`,
      "email": contactEmail,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": contactEmail,
        "contactType": "player feedback"
      }
    },
    {
      "@type": path.includes("/guides/") ? "Article" : "WebPage",
      "@id": `${pageUrl}#webpage`,
      "url": pageUrl,
      "name": document.title || siteName,
      "isPartOf": { "@id": `${siteUrl}/#website` },
      "publisher": { "@id": `${siteUrl}/#organization` },
      "dateModified": "2026-05-14"
    }
  ];

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
  document.head.appendChild(script);
})();
