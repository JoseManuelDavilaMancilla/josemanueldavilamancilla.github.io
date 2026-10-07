/* =========================================================================
   questions form — composes a mailto: with the question in the body.
   no backend, no tracking.
   ========================================================================= */
(function () {
  const form = document.getElementById("q-form");
  const input = document.getElementById("q-input");
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) { input.focus(); return; }
    const subject = encodeURIComponent("a question from your site");
    const body = encodeURIComponent(q + "\n\n— sent from manueldavila's questions box");
    window.location.href = "mailto:jmanueldm.02@gmail.com?subject=" + subject + "&body=" + body;
  });
})();
