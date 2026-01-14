<script>
/* === Mopinion: Page-specific actions toggle (thumbs → show submit) =======
   Page: #page1-df6beb65f642fdecc492d95ae0020e9067cb62e8
   - Hide page-break actions by default
   - Show when thumbs-5875_0 or thumbs-5875_1 is selected
   ====================================================================== */

(function () {
  const PAGE_ID = 'page1-df6beb65f642fdecc492d95ae0020e9067cb62e8';
  const THUMBS_IDS = ['thumbs-5875_0', 'thumbs-5875_1'];
  const ACTIONS_SELECTOR = '[data-testid="page_break-group"]';

  function getPage() {
    return document.getElementById(PAGE_ID);
  }

  function getActions(pageEl) {
    return pageEl ? pageEl.querySelector(ACTIONS_SELECTOR) : null;
  }

  function isThumbSelected() {
    return THUMBS_IDS.some((id) => {
      const el = document.getElementById(id);
      return el && el.checked === true;
    });
  }

  function hideActions(actionsEl) {
    if (!actionsEl) return;
    // Store original display once
    if (!actionsEl.dataset.originalDisplay) {
      const computed = window.getComputedStyle(actionsEl).display;
      actionsEl.dataset.originalDisplay = computed && computed !== 'none' ? computed : 'flex';
    }
    actionsEl.style.display = 'none';
  }

  function showActions(actionsEl) {
    if (!actionsEl) return;
    const display = actionsEl.dataset.originalDisplay || 'flex';
    actionsEl.style.display = display;
  }

  function sync() {
    const page = getPage();
    const actions = getActions(page);
    if (!actions) return;

    if (isThumbSelected()) {
      showActions(actions);
    } else {
      hideActions(actions);
    }
  }

  // Bind events on thumbs
  function bind() {
    THUMBS_IDS.forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('change', sync);
      input.addEventListener('input', sync);
      input.addEventListener('click', sync);
    });
  }

  // Init when DOM is ready (Mopinion sometimes injects late; run a few times)
  function init() {
    sync();
    bind();
    // Small resilience: try again shortly in case Mopinion injects after DOMContentLoaded
    setTimeout(() => { sync(); bind(); }, 300);
    setTimeout(() => { sync(); bind(); }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>