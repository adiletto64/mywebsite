const MEDIA_ITEMS = [
  // ================= BOOKS =================
  {
    id: "book-why-nations-fail",
    category: "books",
    title: "Why Nations Fail",
    subtitle: "Daron Acemoglu & James A. Robinson",
    year: "2012",
    genres: ["Economics", "Political Science", "History"],
    image: "https://covers.openlibrary.org/b/isbn/9780307719218-L.jpg",
    description:
      "A landmark investigation into why some nations prosper while others remain poor, arguing that inclusive political and economic institutions—not geography or culture—are the decisive drivers of long-term wealth."
  },
  {
    id: "book-the-comedians",
    category: "books",
    title: "The Comedians",
    subtitle: "Graham Greene",
    year: "1966",
    genres: ["Literary Fiction", "Political Thriller"],
    image: "https://covers.openlibrary.org/b/isbn/9780099478379-L.jpg",
    fallbackImage: "https://covers.openlibrary.org/b/isbn/9780143039198-L.jpg",
    description:
      "Set in Haiti under the brutal dictatorship of 'Papa Doc' Duvalier, Graham Greene's sharp, morally complex novel follows a hotelier and two fellow travelers forced to choose between detachment and commitment."
  },
  {
    id: "book-thinking-fast-and-slow",
    category: "books",
    title: "Thinking, Fast and Slow",
    subtitle: "Daniel Kahneman",
    year: "2011",
    genres: ["Psychology", "Behavioral Economics"],
    image: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
    description:
      "Nobel laureate Daniel Kahneman maps the two systems that drive how we think—fast, intuitive System 1 and slow, deliberate System 2—revealing the cognitive biases that shape everyday judgment."
  },
  {
    id: "book-code-complete",
    category: "books",
    title: "Code Complete",
    subtitle: "Steve McConnell",
    year: "2004",
    genres: ["Software Engineering", "Computer Science"],
    image: "https://covers.openlibrary.org/b/isbn/9780735619678-L.jpg",
    description:
      "Widely regarded as one of the finest practical handbooks on software construction, distilling timeless engineering principles, design craftsmanship, debugging, and code quality into actionable guidance."
  },

  // ================= MOVIES =================
  {
    id: "movie-f1",
    category: "movies",
    title: "F1",
    subtitle: "Joseph Kosinski · Brad Pitt",
    year: "2025",
    genres: ["Sports", "Action", "Drama"],
    image: "https://upload.wikimedia.org/wikipedia/en/3/38/F1_%282025_film%29.png",
    description:
      "A former Formula One prodigy returns to the grid decades after a career-ending crash to mentor a rising rookie and fight for survival alongside the fictional APXGP racing team."
  },
  {
    id: "movie-hateful-eight",
    category: "movies",
    title: "The Hateful Eight",
    subtitle: "Quentin Tarantino",
    year: "2015",
    genres: ["Western", "Mystery", "Thriller"],
    image: "https://upload.wikimedia.org/wikipedia/en/d/d4/The_Hateful_Eight.jpg",
    description:
      "Trapped in a Wyoming stagecoach stopover during a ferocious post-Civil War blizzard, eight strangers with hidden agendas slowly unravel in a tense, razor-sharp chamber mystery."
  },
  {
    id: "movie-black-box",
    category: "movies",
    title: "Black Box",
    originalTitle: "Boîte noire",
    subtitle: "Yann Gozlan · Pierre Niney",
    year: "2021",
    genres: ["French Thriller", "Mystery"],
    image: "https://upload.wikimedia.org/wikipedia/en/7/79/Bo%C3%AEte_noire_2021_film_poster.png",
    description:
      "A brilliant aviation acoustic analyst with an extraordinary ear becomes obsessed with the cockpit voice recorder of a fatal airliner crash, uncovering a chilling conspiracy behind the tragedy."
  },
  {
    id: "movie-chainsaw-man-reze-arc",
    category: "movies",
    title: "Chainsaw Man: Reze Arc",
    originalTitle: "Gekijō-ban Chensō Man: Reze-hen",
    subtitle: "Tatsuya Yoshihara · MAPPA",
    year: "2025",
    genres: ["Anime", "Action", "Dark Fantasy"],
    image: "https://upload.wikimedia.org/wikipedia/en/9/95/Chainsaw_Man_Reze_Arc_movie_poster.jpg",
    description:
      "Denji meets Reze, a charming café worker who turns his chaotic world upside down—until an explosive secret ignites one of the most unforgettable battles in the Chainsaw Man saga."
  },
  {
    id: "movie-intouchables",
    category: "movies",
    title: "The Intouchables",
    originalTitle: "Intouchables",
    subtitle: "Olivier Nakache & Éric Toledano",
    year: "2011",
    genres: ["Comedy", "Drama", "Biography"],
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/The_Intouchables.jpg",
    description:
      "Inspired by a true story, a wealthy quadriplegic Parisian aristocrat hires an irreverent ex-con from the projects as his live-in caretaker, sparking an unlikely, life-affirming friendship."
  },
  {
    id: "movie-shot-caller",
    category: "movies",
    title: "Shot Caller",
    subtitle: "Ric Roman Waugh · Nikolaj Coster-Waldau",
    year: "2017",
    genres: ["Crime", "Thriller", "Drama"],
    image: "https://upload.wikimedia.org/wikipedia/en/2/25/Shot_Caller_poster.jpg",
    description:
      "After a fatal DUI sends a successful financier to a brutal California prison, he is forced to transform into a hardened gang shot-caller to survive and protect his family on the outside."
  },
  {
    id: "movie-barbie",
    category: "movies",
    title: "Barbie",
    subtitle: "Greta Gerwig · Margot Robbie & Ryan Gosling",
    year: "2023",
    genres: ["Comedy", "Fantasy", "Satire"],
    image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
    description:
      "When Stereotypical Barbie begins experiencing an existential crisis in the pastel perfection of Barbieland, she and Ken venture into the Real World and discover the messy beauty of being human."
  },
  {
    id: "movie-promised-land",
    category: "movies",
    title: "The Promised Land",
    originalTitle: "Bastarden",
    subtitle: "Nikolaj Arcel · Mads Mikkelsen",
    year: "2023",
    genres: ["Historical Drama", "Western"],
    image: "https://upload.wikimedia.org/wikipedia/en/7/71/The_Promised_Land_%282023_film%29_poster.jpg",
    description:
      "In 18th-century Denmark, impoverished soldier Ludvig Kahlen (Mads Mikkelsen) sets out to cultivate the barren Jutland heath in pursuit of a royal title, clashing with a ruthless local nobleman."
  },

  // ================= SERIES =================
  {
    id: "series-house-of-the-dragon",
    category: "series",
    title: "House of the Dragon",
    subtitle: "HBO · Ryan Condal & George R. R. Martin",
    year: "2022–Present",
    genres: ["Fantasy", "Drama", "Political Intrigue"],
    image: "https://upload.wikimedia.org/wikipedia/en/d/df/House_of_the_Dragon_season_1.png",
    description:
      "Set nearly two centuries before Game of Thrones, this epic prequel chronicles the beginning of the end of House Targaryen and the devastating civil war known as the Dance of the Dragons."
  },
  {
    id: "series-heavenly-delusion",
    category: "series",
    title: "Heavenly Delusion",
    originalTitle: "Tengoku Daimakyō",
    subtitle: "Production I.G · Masakazu Ishiguro",
    year: "2023",
    genres: ["Anime", "Sci-Fi", "Mystery"],
    image: "https://upload.wikimedia.org/wikipedia/en/1/12/HeavenlyDelusionanimekeyvisual.jpg",
    description:
      "Two intertwined mysteries unfold in a post-apocalyptic Japan: sheltered children raised inside a walled paradise, and two travelers braving a monster-haunted wasteland in search of 'Heaven.'"
  },
  {
    id: "series-loki",
    category: "series",
    title: "Loki",
    subtitle: "Disney+ · Michael Waldron · Tom Hiddleston",
    year: "2021–2023",
    genres: ["Sci-Fi", "Fantasy", "Action"],
    image: "https://upload.wikimedia.org/wikipedia/en/c/c9/Loki_season_1_poster.jpeg",
    description:
      "After stealing the Tesseract, the mercurial God of Mischief is apprehended by the Time Variance Authority and drawn into a mind-bending multiverse odyssey across time and glorious purpose."
  },
  {
    id: "series-better-call-saul",
    category: "series",
    title: "Better Call Saul",
    subtitle: "AMC · Vince Gilligan & Peter Gould",
    year: "2015–2022",
    genres: ["Crime", "Legal Drama", "Black Comedy"],
    image: "https://upload.wikimedia.org/wikipedia/en/0/04/Better_Call_Saul_season_6.jpg",
    description:
      "A masterwork character study tracing the slow, heartbreaking transformation of earnest hustler Jimmy McGill into Albuquerque's flamboyant criminal defense attorney, Saul Goodman."
  }
];

const CATEGORY_LABELS = {
  books: "Book",
  movies: "Movie",
  series: "Series"
};

// Hardcoded initial placement (x%, y%, angle°, scale, ratio, z-index) clustered by type.
// Note sits at (50%, 46%) with z-index 7. Only a couple of edge posters have z > 7
// so they lightly graze the corners of "Hello, I am Adilet" without blocking it.
const HARDCODED_LAYOUT = {
  // 4 Books (top-left cluster)
  "book-why-nations-fail":       { x: 13.5, y: 19.0, angle: -9.4,  scale: 1.08, ratio: 0.64, z: 3 },
  "book-the-comedians":          { x: 25.8, y: 15.5, angle: 7.2,   scale: 0.91, ratio: 0.72, z: 5 },
  "book-thinking-fast-and-slow": { x: 17.2, y: 37.5, angle: -4.8,  scale: 1.13, ratio: 0.61, z: 4 },
  "book-code-complete":          { x: 30.2, y: 34.5, angle: 11.6,  scale: 0.94, ratio: 0.69, z: 10 },

  // 4 Series (top-right cluster)
  "series-house-of-the-dragon":  { x: 86.2, y: 18.5, angle: 8.5,   scale: 1.11, ratio: 0.63, z: 3 },
  "series-heavenly-delusion":    { x: 73.5, y: 16.0, angle: -11.2, scale: 0.89, ratio: 0.74, z: 5 },
  "series-loki":                 { x: 83.8, y: 38.5, angle: 5.4,   scale: 1.02, ratio: 0.60, z: 4 },
  "series-better-call-saul":     { x: 70.4, y: 35.5, angle: -8.7,  scale: 0.96, ratio: 0.68, z: 11 },

  // 8 Movies (bottom cluster)
  "movie-f1":                    { x: 12.5, y: 69.5, angle: -12.3, scale: 1.06, ratio: 0.71, z: 3 },
  "movie-hateful-eight":         { x: 24.8, y: 79.0, angle: 6.1,   scale: 0.92, ratio: 0.59, z: 5 },
  "movie-black-box":             { x: 36.2, y: 66.5, angle: -6.8,  scale: 1.14, ratio: 0.66, z: 4 },
  "movie-chainsaw-man-reze-arc": { x: 47.6, y: 80.5, angle: 9.8,   scale: 0.87, ratio: 0.75, z: 6 },
  "movie-intouchables":          { x: 56.8, y: 63.5, angle: -10.4, scale: 0.95, ratio: 0.62, z: 12 },
  "movie-shot-caller":           { x: 67.2, y: 78.5, angle: 4.5,   scale: 1.09, ratio: 0.67, z: 5 },
  "movie-barbie":                { x: 78.0, y: 66.0, angle: -7.9,  scale: 0.90, ratio: 0.73, z: 4 },
  "movie-promised-land":         { x: 88.2, y: 75.5, angle: 12.1,  scale: 1.12, ratio: 0.61, z: 6 }
};

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildPlaceholderDataUri(item) {
  const safeTitle = item.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600">
      <rect width="400" height="600" fill="#f0eee9" />
      <foreignObject x="36" y="210" width="328" height="180">
        <div xmlns="http://www.w3.org/1999/xhtml" style="color:#161615;font-family:Georgia,serif;text-align:center;display:flex;flex-direction:column;justify-content:center;height:100%;">
          <div style="font-size:12px;font-family:monospace;letter-spacing:2px;opacity:0.55;margin-bottom:10px;">${item.year}</div>
          <div style="font-size:26px;font-weight:500;line-height:1.25;">${safeTitle}</div>
        </div>
      </foreignObject>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function setImageWithFallback(imgEl, item) {
  imgEl.dataset.triedFallback = "false";
  imgEl.src = item.image;
  imgEl.onerror = () => {
    if (item.fallbackImage && imgEl.dataset.triedFallback !== "true") {
      imgEl.dataset.triedFallback = "true";
      imgEl.src = item.fallbackImage;
      return;
    }
    imgEl.onerror = null;
    imgEl.src = buildPlaceholderDataUri(item);
  };
}

const BUILTIN_FONTS = [
  "Georgia, serif",
  "'Times New Roman', Times, serif",
  "'Palatino Linotype', Palatino, serif",
  "'Courier New', Courier, monospace",
  "Monaco, 'Lucida Console', monospace",
  "Helvetica, Arial, sans-serif",
  "Verdana, Geneva, sans-serif",
  "Impact, Charcoal, sans-serif",
  "'Trebuchet MS', sans-serif",
  "'Comic Sans MS', cursive",
  "'Brush Script MT', cursive",
  "Futura, 'Century Gothic', sans-serif",
  "Baskerville, serif",
  "Didot, 'Bodoni MT', serif",
  "Copperplate, fantasy",
  "Optima, sans-serif",
  "'Gill Sans', sans-serif"
];

const DEFERRED_GOOGLE_FONTS = [
  "Caveat",
  "Abril Fatface",
  "Space Mono",
  "Permanent Marker",
  "Pacifico",
  "Press Start 2P",
  "Syne",
  "UnifrakturMaguntia",
  "Rubik Bubbles",
  "Cormorant Garamond"
];

const DEFERRED_GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?" +
  DEFERRED_GOOGLE_FONTS.map((f) => `family=${encodeURIComponent(f)}`).join("&") +
  "&display=swap";

function initCleanCanvasGrain() {
  const overlay = document.getElementById("grainOverlay");
  if (!overlay) return;

  const size = 160;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  // Deterministic pseudo-random generator for clean, crisp monochrome film grain
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < data.length; i += 4) {
    const v = rand();
    // Crisp neutral monochrome specks (both subtle light & dark grains, zero muddiness)
    const isLight = v > 0.5;
    const tone = isLight ? 255 : 18;
    const alpha = Math.floor(Math.abs(v - 0.5) * 2 * 44);
    data[i] = tone;
    data[i + 1] = tone;
    data[i + 2] = tone;
    data[i + 3] = alpha;
  }

  ctx.putImageData(imgData, 0, 0);
  overlay.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
}

function initRansomHeroTitle() {
  const heroEl = document.getElementById("heroName");
  if (!heroEl) return;

  const text = "Books, Movies, Series";
  heroEl.textContent = "";

  const availableFonts = [...BUILTIN_FONTS];
  const initialOrder = shuffleArray(availableFonts);
  let fontIdx = 0;

  // Offscreen probe to measure a single glyph's natural width in any font
  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.position = "fixed";
  probe.style.top = "-9999px";
  probe.style.left = "-9999px";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.whiteSpace = "pre";
  probe.style.padding = "0 0.02em";
  document.body.appendChild(probe);

  const measureGlyphWidth = (ch, fontFamily) => {
    const computed = window.getComputedStyle(heroEl);
    probe.style.fontSize = computed.fontSize;
    probe.style.fontWeight = computed.fontWeight;
    probe.style.letterSpacing = computed.letterSpacing;
    probe.style.fontFamily = fontFamily;
    probe.textContent = ch;
    return Math.ceil(probe.getBoundingClientRect().width * 10) / 10;
  };

  const pickRandomFont = (currentFont) => {
    let next = currentFont;
    for (let tries = 0; tries < 10 && next === currentFont; tries++) {
      next = availableFonts[Math.floor(Math.random() * availableFonts.length)];
    }
    return next;
  };

  const letterSpans = [];

  Array.from(text).forEach((ch) => {
    if (ch === " ") {
      const sp = document.createElement("span");
      sp.className = "hero-space";
      sp.innerHTML = "&nbsp;";
      heroEl.appendChild(sp);
      return;
    }

    const span = document.createElement("span");
    span.className = "hero-letter";
    span.textContent = ch;

    const assignedFont = initialOrder[fontIdx % initialOrder.length];
    fontIdx += 1;
    span.style.fontFamily = assignedFont;
    span.dataset.font = assignedFont;

    span.addEventListener("mouseenter", () => {
      const nextFont = pickRandomFont(span.dataset.font);
      const nextWidth = measureGlyphWidth(ch, nextFont);
      span.style.fontFamily = nextFont;
      span.dataset.font = nextFont;
      span.style.width = `${nextWidth}px`;
    });

    heroEl.appendChild(span);
    letterSpans.push(span);
  });

  const syncAllLetterWidths = () => {
    letterSpans.forEach((span) => {
      const w = measureGlyphWidth(span.textContent, span.dataset.font);
      span.style.width = `${w}px`;
    });
  };

  // Set initial explicit widths so the very first hover smoothly animates spacing
  requestAnimationFrame(syncAllLetterWidths);
  window.addEventListener("resize", syncAllLetterWidths);

  // Defer loading the 10 extra Google Fonts until after initial render
  const loadDeferredFonts = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = DEFERRED_GOOGLE_FONTS_URL;
    link.onload = () => {
      DEFERRED_GOOGLE_FONTS.forEach((fontName) => {
        availableFonts.push(`'${fontName}', sans-serif`);
      });
    };
    document.head.appendChild(link);
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadDeferredFonts, { timeout: 1500 });
  } else {
    window.addEventListener("load", () => setTimeout(loadDeferredFonts, 200), { once: true });
  }
}

// Kyrgyzstan map pins projected onto Wikimedia Kyrgyzstan_adm_location_map.svg
// Bounding box: top 43.5°N, bottom 39.0°N, left 69.0°E, right 80.6°E
const KYRGYZSTAN_PINS = [
  {
    name: "Бишкек",
    lat: 42.8746,
    lon: 74.5698,
    labelPos: "top",
    desc: "Столица у подножия Кыргызского хребта — зелёные бульвары, кофейни и вид на снежные пики Ала-Тоо."
  },
  {
    name: "Бостери",
    lat: 42.6500,
    lon: 77.1833,
    labelPos: "right",
    desc: "Северный берег Иссык-Куля — прозрачная горная вода, летнее солнце и бескрайний горизонт озера."
  },
  {
    name: "Джалал-Абад",
    lat: 40.9333,
    lon: 73.0000,
    labelPos: "top",
    desc: "Тёплый южный город в Ферганской долине, знаменитый минеральными источниками и ореховыми лесами."
  },
  {
    name: "Ош",
    lat: 40.5140,
    lon: 72.8161,
    labelPos: "left",
    desc: "Древняя южная столица у священной горы Сулайман-Тоо — восточный базар, история и лучший плов."
  },
  {
    name: "Гулчо",
    lat: 40.3167,
    lon: 73.4431,
    labelPos: "right",
    desc: "Горное село в Алайском районе на пути по Памирскому тракту среди красных скал и перевалов."
  },
  {
    name: "Кара-Кой",
    lat: 39.9832,
    lon: 72.6051,
    labelPos: "left",
    desc: "Высокогорное ущелье и жайлоо в Ноокате — арчовые леса, кристальный воздух и дикая природа Алая."
  },
  {
    name: "Ленин-Пик",
    lat: 39.3436,
    lon: 72.8775,
    labelPos: "bottom",
    desc: "Величественный семитысячник (7134 м) на границе Памира и Алайской долины — царство ледников и неба."
  }
];

const KG_MAP_BOUNDS = { top: 43.5, bottom: 39.0, left: 69.0, right: 80.6 };

function initKyrgyzstanMap() {
  const section = document.getElementById("kyrgyzstanSection");
  const frame = document.getElementById("kgMapFrame");
  const mapImg = document.getElementById("kgMapImg");
  if (!section || !frame || !mapImg) return;

  // Fallback to standard outline map if admin map ever fails
  mapImg.addEventListener("error", function handleMapErr() {
    mapImg.removeEventListener("error", handleMapErr);
    mapImg.src = "https://upload.wikimedia.org/wikipedia/commons/7/7b/Kyrgyzstan_location_map.svg";
  });

  // Render red pushpins (канцелярские кнопки) at exact projected coordinates
  KYRGYZSTAN_PINS.forEach((place) => {
    const xPct = ((place.lon - KG_MAP_BOUNDS.left) / (KG_MAP_BOUNDS.right - KG_MAP_BOUNDS.left)) * 100;
    const yPct = ((KG_MAP_BOUNDS.top - place.lat) / (KG_MAP_BOUNDS.top - KG_MAP_BOUNDS.bottom)) * 100;

    const pin = document.createElement("button");
    pin.type = "button";
    pin.className = "map-pin";
    pin.style.left = `${xPct.toFixed(2)}%`;
    pin.style.top = `${yPct.toFixed(2)}%`;
    pin.setAttribute("aria-label", `${place.name}: ${place.desc}`);

    pin.innerHTML = `
      <svg class="map-pin-svg" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Metallic needle tip touching exact coordinate (13, 34) -->
        <line x1="13" y1="21" x2="13" y2="33.5" stroke="#525252" stroke-width="1.8" stroke-linecap="round" />
        <circle cx="13" cy="33.5" r="1.4" fill="#1a1a1a" opacity="0.55" />
        <!-- Red pushpin plastic body -->
        <ellipse cx="13" cy="19.5" rx="6.2" ry="2.7" fill="#b42318" />
        <path d="M9.6 10.5 L16.4 10.5 L15.4 19.2 L10.6 19.2 Z" fill="#d92d20" />
        <ellipse cx="13" cy="9.5" rx="7.2" ry="3.3" fill="#ef4444" />
        <!-- Subtle glossy specular highlight on top of pin head -->
        <ellipse cx="11" cy="8.6" rx="2.6" ry="1.1" fill="#fca5a5" opacity="0.7" />
      </svg>
      <span class="map-pin-label pos-${place.labelPos}">${place.name}</span>
      <span class="map-pin-tooltip" role="tooltip">
        <span class="pin-tooltip-title d-block">${place.name}</span>
        <span class="pin-tooltip-desc d-block">${place.desc}</span>
      </span>
    `;

    frame.appendChild(pin);
  });

  // Smooth scroll-reveal when user scrolls down to the map
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("is-visible");
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(section);
  } else {
    section.classList.add("is-visible");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCleanCanvasGrain();
  initRansomHeroTitle();
  initKyrgyzstanMap();

  const tableStage = document.getElementById("tableStage");

  const flyingPoster = document.getElementById("flyingPoster");
  const flyingPosterImg = document.getElementById("flyingPosterImg");

  const detailOverlay = document.getElementById("detailOverlay");
  const detailPosterSlot = document.getElementById("detailPosterSlot");
  const closeDetailBtn = document.getElementById("closeDetailBtn");
  const detailKicker = document.getElementById("detailKicker");
  const detailTitle = document.getElementById("detailTitle");
  const detailOriginal = document.getElementById("detailOriginal");
  const detailCreator = document.getElementById("detailCreator");
  const detailDescription = document.getElementById("detailDescription");
  const detailGenres = document.getElementById("detailGenres");

  let activeSourceEl = null;
  let activeAngle = 0;
  let isAnimating = false;

  // Always bring a hovered, focused, or clicked poster strictly above all others: max(all) + 1
  function bringToFront(el) {
    let maxZ = 12;
    tableStage.querySelectorAll(".scattered-poster").forEach((node) => {
      const z = parseInt(node.style.zIndex, 10) || 0;
      if (z > maxZ) maxZ = z;
    });
    el.style.zIndex = String(maxZ + 1);
  }

  // Render all 16 posters using hardcoded deterministic positions, angles, sizes & ratios
  const posterElements = [];
  MEDIA_ITEMS.forEach((item) => {
    const spec = HARDCODED_LAYOUT[item.id];

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scattered-poster";
    btn.style.left = `${spec.x}%`;
    btn.style.top = `${spec.y}%`;
    btn.style.zIndex = String(spec.z);
    btn.style.transform = `translate(-50%, -50%) rotate(${spec.angle}deg)`;
    btn.style.setProperty("--angle", `${spec.angle}deg`);
    btn.style.setProperty("--poster-scale", String(spec.scale));
    btn.style.setProperty("--poster-ratio", String(spec.ratio));
    btn.dataset.angle = String(spec.angle);
    btn.dataset.baseX = String(spec.x);
    btn.dataset.baseY = String(spec.y);
    btn.setAttribute("aria-label", item.title);

    const img = document.createElement("img");
    img.alt = `${item.title} ${item.category === "books" ? "cover" : "poster"}`;
    img.loading = "lazy";
    img.draggable = false;
    img.referrerPolicy = "no-referrer";
    setImageWithFallback(img, item);

    btn.appendChild(img);
    attachDragAndClick(btn, item, spec.angle);
    tableStage.appendChild(btn);
    posterElements.push(btn);
  });

  // Mathematically guarantee cards covering "Hello, I am Adilet" never exceed 20% of its area.
  // Measures actual union coverage via a 40x12 point grid over the title's bounding box,
  // and gently nudges overlapping posters outward until total coverage <= 20%.
  function enforceMaxTitleCoverage(maxRatio = 0.2) {
    const heroEl = document.getElementById("heroName");
    if (!heroEl) return;

    const stageRect = tableStage.getBoundingClientRect();
    const titleRect = heroEl.getBoundingClientRect();
    if (!stageRect.width || !stageRect.height || !titleRect.width || !titleRect.height) return;

    const titleCx = titleRect.left + titleRect.width / 2;
    const titleCy = titleRect.top + titleRect.height / 2;

    const getCoveringPosters = () =>
      posterElements.filter((el) => {
        if (el.dataset.userDragged === "true") return false;
        const z = parseInt(el.style.zIndex, 10) || 0;
        if (z <= 7) return false;
        const r = el.getBoundingClientRect();
        return !(
          r.right <= titleRect.left ||
          r.left >= titleRect.right ||
          r.bottom <= titleRect.top ||
          r.top >= titleRect.bottom
        );
      });

    const computeCoverageRatio = (covering) => {
      if (covering.length === 0) return 0;
      const rects = covering.map((el) => el.getBoundingClientRect());
      const cols = 40;
      const rows = 12;
      let covered = 0;
      const total = cols * rows;

      for (let i = 0; i < cols; i++) {
        const px = titleRect.left + ((i + 0.5) / cols) * titleRect.width;
        for (let j = 0; j < rows; j++) {
          const py = titleRect.top + ((j + 0.5) / rows) * titleRect.height;
          for (let k = 0; k < rects.length; k++) {
            const r = rects[k];
            if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
              covered += 1;
              break;
            }
          }
        }
      }
      return covered / total;
    };

    for (let step = 0; step < 30; step++) {
      const covering = getCoveringPosters();
      if (computeCoverageRatio(covering) <= maxRatio) break;

      covering.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        let dx = cx - titleCx;
        let dy = cy - titleCy;
        const dist = Math.hypot(dx, dy) || 1;
        dx /= dist;
        dy /= dist;

        const curX = parseFloat(el.style.left);
        const curY = parseFloat(el.style.top);
        const stepX = (dx * 10 / stageRect.width) * 100;
        const stepY = (dy * 10 / stageRect.height) * 100;

        el.style.left = `${Math.max(8, Math.min(92, curX + stepX))}%`;
        el.style.top = `${Math.max(10, Math.min(90, curY + stepY))}%`;
      });
    }
  }

  // Run coverage guard after initial layout (and on window resize)
  requestAnimationFrame(() => enforceMaxTitleCoverage(0.2));
  window.addEventListener("resize", () => enforceMaxTitleCoverage(0.2));

  function attachDragAndClick(btn, item, angle) {
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let originLeftPx = 0;
    let originTopPx = 0;
    let stageRect = null;
    let hasDragged = false;

    btn.addEventListener("pointerenter", () => {
      if (!activeSourceEl) bringToFront(btn);
    });

    btn.addEventListener("focus", () => {
      if (!activeSourceEl) bringToFront(btn);
    });

    btn.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      if (isAnimating || activeSourceEl) return;

      bringToFront(btn);
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      hasDragged = false;

      stageRect = tableStage.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      originLeftPx = btnRect.left + btnRect.width / 2 - stageRect.left;
      originTopPx = btnRect.top + btnRect.height / 2 - stageRect.top;

      btn.setPointerCapture(pointerId);
    });

    btn.addEventListener("pointermove", (e) => {
      if (pointerId !== e.pointerId) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!hasDragged && Math.hypot(dx, dy) > 5) {
        hasDragged = true;
        bringToFront(btn);
        btn.classList.add("is-dragging");
        btn.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(1.06)`;
      }

      if (hasDragged) {
        const nextLeftPct = ((originLeftPx + dx) / stageRect.width) * 100;
        const nextTopPct = ((originTopPx + dy) / stageRect.height) * 100;
        btn.style.left = `${nextLeftPct}%`;
        btn.style.top = `${nextTopPct}%`;
      }
    });

    const finishPointer = (e, cancelled) => {
      if (pointerId !== e.pointerId) return;
      if (btn.hasPointerCapture(pointerId)) {
        btn.releasePointerCapture(pointerId);
      }
      pointerId = null;

      if (hasDragged) {
        btn.dataset.userDragged = "true";
        btn.classList.remove("is-dragging");
        btn.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      } else if (!cancelled) {
        openDetailWithFlip(item, btn);
      }
    };

    btn.addEventListener("pointerup", (e) => finishPointer(e, false));
    btn.addEventListener("pointercancel", (e) => finishPointer(e, true));

    // Keyboard activation still opens the poster
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDetailWithFlip(item, btn);
      }
    });
  }

  function getUnrotatedRect(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    return {
      left: cx - w / 2,
      top: cy - h / 2,
      width: w,
      height: h
    };
  }

  function populateDetailText(item) {
    detailKicker.textContent = `${CATEGORY_LABELS[item.category]} · ${item.year}`;
    detailTitle.textContent = item.title;

    if (item.originalTitle) {
      detailOriginal.textContent = item.originalTitle;
      detailOriginal.classList.remove("d-none");
    } else {
      detailOriginal.classList.add("d-none");
    }

    detailCreator.textContent = item.subtitle;
    detailDescription.textContent = item.description;

    detailGenres.innerHTML = "";
    item.genres.forEach((g) => {
      const tag = document.createElement("span");
      tag.className = "detail-genre-tag";
      tag.textContent = g;
      detailGenres.appendChild(tag);
    });
  }

  function openDetailWithFlip(item, sourceEl) {
    if (isAnimating || activeSourceEl) return;
    isAnimating = true;
    activeSourceEl = sourceEl;
    activeAngle = parseFloat(sourceEl.dataset.angle) || 0;

    populateDetailText(item);
    setImageWithFallback(flyingPosterImg, item);
    flyingPosterImg.alt = `${item.title} artwork`;

    const start = getUnrotatedRect(sourceEl);

    flyingPoster.classList.remove("animating");
    flyingPoster.style.left = `${start.left}px`;
    flyingPoster.style.top = `${start.top}px`;
    flyingPoster.style.width = `${start.width}px`;
    flyingPoster.style.height = `${start.height}px`;
    flyingPoster.style.transform = `rotate(${activeAngle}deg)`;
    flyingPoster.classList.add("visible");

    sourceEl.classList.add("is-lifted");

    detailOverlay.classList.add("active");
    detailOverlay.setAttribute("aria-hidden", "false");
    const target = detailPosterSlot.getBoundingClientRect();

    void flyingPoster.offsetWidth;

    requestAnimationFrame(() => {
      flyingPoster.classList.add("animating");
      flyingPoster.style.left = `${target.left}px`;
      flyingPoster.style.top = `${target.top}px`;
      flyingPoster.style.width = `${target.width}px`;
      flyingPoster.style.height = `${target.height}px`;
      flyingPoster.style.transform = "rotate(0deg)";

      setTimeout(() => {
        isAnimating = false;
      }, 540);
    });
  }

  function closeDetailWithFlip() {
    if (isAnimating || !activeSourceEl) return;
    isAnimating = true;

    const sourceEl = activeSourceEl;
    const returnRect = getUnrotatedRect(sourceEl);

    detailOverlay.classList.remove("active");
    detailOverlay.setAttribute("aria-hidden", "true");

    flyingPoster.classList.add("animating");
    flyingPoster.style.left = `${returnRect.left}px`;
    flyingPoster.style.top = `${returnRect.top}px`;
    flyingPoster.style.width = `${returnRect.width}px`;
    flyingPoster.style.height = `${returnRect.height}px`;
    flyingPoster.style.transform = `rotate(${activeAngle}deg)`;

    setTimeout(() => {
      sourceEl.classList.remove("is-lifted");
      flyingPoster.classList.remove("visible", "animating");
      activeSourceEl = null;
      isAnimating = false;
    }, 530);
  }

  window.addEventListener("resize", () => {
    if (activeSourceEl && !isAnimating) {
      const target = detailPosterSlot.getBoundingClientRect();
      flyingPoster.classList.remove("animating");
      flyingPoster.style.left = `${target.left}px`;
      flyingPoster.style.top = `${target.top}px`;
      flyingPoster.style.width = `${target.width}px`;
      flyingPoster.style.height = `${target.height}px`;
    }
  });

  closeDetailBtn.addEventListener("click", closeDetailWithFlip);
  detailOverlay.addEventListener("click", (e) => {
    if (e.target === detailOverlay) closeDetailWithFlip();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeSourceEl) {
      closeDetailWithFlip();
    }
  });
});
