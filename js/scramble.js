/* =========================================================================
   scramble tooltip — hovering the ascii art shows a cursor-following
   tooltip that text-scrambles between two phrases. vanilla, no deps.
   ========================================================================= */
(function () {
  const art = document.getElementById("ascii-art");
  const tip = document.getElementById("scramble-tip");
  if (!art || !tip) return;

  const PHRASES = ["ars longa, vita brevis", "ad astra per aspera"];
  const CHARS = "@#%&*+=~:. ";
  const TICKS = 12; // scramble frames per swap
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let phraseIdx = 0;
  let raf = null;
  let swapTimer = null;

  function scrambleTo(target, done) {
    if (reduced) { tip.textContent = target; if (done) done(); return; }
    let frame = 0;
    cancelAnimationFrame(raf);
    (function tick() {
      frame++;
      const progress = frame / TICKS;
      let out = "";
      for (let i = 0; i < target.length; i++) {
        out += i / target.length < progress
          ? target[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      tip.textContent = out;
      if (frame < TICKS) raf = requestAnimationFrame(tick);
      else { tip.textContent = target; if (done) done(); }
    })();
  }

  function cycle() {
    scrambleTo(PHRASES[phraseIdx], () => {
      swapTimer = setTimeout(() => {
        phraseIdx = (phraseIdx + 1) % PHRASES.length;
        cycle();
      }, 1600);
    });
  }

  art.addEventListener("mouseenter", () => { tip.classList.add("visible"); cycle(); });
  art.addEventListener("mouseleave", () => {
    tip.classList.remove("visible");
    cancelAnimationFrame(raf);
    clearTimeout(swapTimer);
  });
  art.addEventListener("mousemove", (e) => {
    tip.style.left = e.clientX + 18 + "px";
    tip.style.top = e.clientY + 14 + "px";
  });
})();
