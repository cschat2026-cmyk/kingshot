(() => {
  const config = window.KINGSHOT_SITE_CONFIG || {};
  const siteName = config.siteName || "Kingshot Central";
  const contactEmail = config.contactEmail || "cschat2026@gmail.com";
  const pageTitle = document.title || siteName;
  const pageUrl = window.location.href;
  const subject = encodeURIComponent(config.feedbackSubject || `${siteName} - Player Feedback`);
  const body = encodeURIComponent(
    [
      `Website: ${siteName}`,
      `Page: ${pageTitle}`,
      `URL: ${pageUrl}`,
      "",
      "Suggestion or correction:",
      ""
    ].join("\n")
  );
  const mailHref = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  const pathPrefix = window.location.pathname.includes("/guides/") ? "../" : "./";
  const shareText = encodeURIComponent(`${siteName} - Kingshot codes, daily reset, hero timing, and build guides`);
  const shareUrl = encodeURIComponent(pageUrl);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="site-footer-card">
      <div>
        <p class="section-kicker">Player feedback</p>
        <h2>Found a missing code, wrong timer, or better route?</h2>
        <p>
          Send corrections, kingdom notes, source tips, or guide suggestions. The email template
          includes this site name and page title so reports stay easy to sort.
        </p>
      </div>
      <div class="site-footer-actions">
        <a class="button button-primary" href="${mailHref}">Email suggestions</a>
        <a class="button button-secondary" href="${pathPrefix}guides/sources-contact.html">Sources and contact</a>
        <a class="button button-secondary" href="${pathPrefix}guides/privacy.html">Privacy</a>
        <a class="button button-secondary" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noreferrer">Share on X</a>
        <a class="button button-secondary" href="https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}" target="_blank" rel="noreferrer">Share on Reddit</a>
      </div>
      <p class="site-footer-disclaimer">
        Fan-made Kingshot resource. Not affiliated with, endorsed by, or connected to Century Games.
      </p>
    </div>
  `;

  const frame = document.querySelector(".site-frame") || document.querySelector(".page-shell") || document.body;
  frame.appendChild(footer);
})();
