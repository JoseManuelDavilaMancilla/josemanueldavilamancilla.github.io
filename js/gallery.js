/* =========================================================================
   Photography gallery — vanilla, no dependencies.
   To add a photo: drop the scan in img/photography/ and add one entry below.
   ========================================================================= */
const photos = [
  // { file: "img/photography/beijing-hutong.jpg", caption: "Hutong, early morning", year: 2026, stock: "Portra 400" },
  // Leave the array empty [] until scans arrive — empty tiles render instead.
];

const grid     = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg    = document.getElementById("lb-img");
const lbCap    = document.getElementById("lb-cap");
const btnClose = document.getElementById("lb-close");
const btnPrev  = document.getElementById("lb-prev");
const btnNext  = document.getElementById("lb-next");

let current = 0;

/* ---- Build the tile grid ---- */
function buildGrid() {
  if (!grid) return;
  if (!photos.length) {
    for (let i = 0; i < 6; i++) {
      const el = document.createElement("div");
      el.className = "tile-empty";
      el.innerHTML = '<span class="ph">[ a scan from the next roll ]</span>';
      grid.appendChild(el);
    }
    return;
  }
  photos.forEach((p, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    const meta = [p.stock, p.year].filter(Boolean).join(" · ");
    tile.innerHTML =
      `<button type="button">
         <img class="tile-media" src="${p.file}" alt="${p.caption || ""}" loading="lazy">
         <p class="tile-meta">${meta}</p>
         <p class="tile-title">${p.caption || ""}</p>
       </button>`;
    tile.querySelector("button").addEventListener("click", () => open(i));
    grid.appendChild(tile);
  });
}

/* ---- Lightbox ---- */
function open(i)  { current = i; render(); lightbox.classList.add("open"); lightbox.focus(); }
function close()  { lightbox.classList.remove("open"); }
function step(d)  { current = (current + d + photos.length) % photos.length; render(); }
function render() {
  const p = photos[current];
  lbImg.src = p.file;
  lbImg.alt = p.caption || "";
  const meta = [p.stock, p.year].filter(Boolean).join(" · ");
  lbCap.textContent = meta ? `${p.caption || ""} — ${meta}` : (p.caption || "");
}

if (btnClose) btnClose.addEventListener("click", close);
if (btnPrev)  btnPrev.addEventListener("click", () => step(-1));
if (btnNext)  btnNext.addEventListener("click", () => step(1));
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape")     close();
  if (e.key === "ArrowLeft")  step(-1);
  if (e.key === "ArrowRight") step(1);
});
if (lightbox) lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });

buildGrid();
