// ===== CONFIG =====
// Updated pattern for heart shape (using 7 dots)
// const correctPattern = [7, 6, 5, 4, 3, 2, 1, 12, 11, 10, 9, 8]; // You can adjust this pattern as needed
const correctPattern = [7, 6];
// ===== STATE =====
let input = [];
let isDrawing = false;
let lastDot = null;
// ===== ELEMENTS =====
const pattern = document.getElementById("pattern");
const patternWrapper = document.getElementById("pattern-wrapper");
const svg = document.getElementById("lines");
// ===== INIT =====
pattern.innerHTML = "";
svg.innerHTML = "";
// Heart shape dot positions [x, y] in percentage
const heartDots = [
  // top cleft (รอยเว้าหัวใจ)
  [50, 28],   // 1 top center dip
  // left lobe
  [34, 18],   // 2 left top (was 38)
  [18, 22],   // 3 left upper curve (was 28)
  [10, 35],   // 4 left mid (was 22)
  [13, 55],   // 5 left lower (was 25)
  [28, 72],   // 6 left bottom curve (was 38)
  // bottom point
  [50, 88],   // 7 bottom tip (แหลม)
  // right lobe
  [72, 72],   // 8 right bottom curve (was 62)
  [87, 55],   // 9 right lower (was 75)
  [90, 35],   // 10 right mid (was 78)
  [82, 22],   // 11 right upper curve (was 72)
  [66, 18],   // 12 right top (was 62)
];
// Create dots in heart shape
heartDots.forEach((pos, index) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.dataset.id = index + 1; // 1-based index
  dot.style.left = `${pos[0]}%`;
  dot.style.top = `${pos[1]}%`;
  pattern.appendChild(dot);
});

// ===== EVENTS =====
pattern.addEventListener("touchstart", e => {
  e.preventDefault();
  isDrawing = true;
  resetPattern();
});

pattern.addEventListener("touchmove", e => {
  if (!isDrawing) return;

  const touch = e.touches[0];

  document.querySelectorAll(".dot").forEach(dot => {
    const rect = dot.getBoundingClientRect();

    if (
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom
    ) {
      const id = Number(dot.dataset.id);

      if (!input.includes(id)) {
        input.push(id);
        dot.classList.add("active");

        if (lastDot) {
          drawLine(lastDot, dot);
        }
        lastDot = dot;
      }
    }
  });
});

pattern.addEventListener("touchend", () => {
  isDrawing = false;
  if (JSON.stringify(input) === JSON.stringify(correctPattern)) {
    pattern.classList.add("success");

    setTimeout(() => {
      resetPattern();
      showPage("menu");
    }, 400);
  } else {
    navigator.vibrate?.(200);
    patternWrapper.classList.add("error");

    setTimeout(resetPattern, 400);
  }
  
  setTimeout(() => {
    resetPattern();
  }, 500);
});

// ===== FUNCTIONS =====
function drawLine(from, to) {
  const r1 = from.getBoundingClientRect();
  const r2 = to.getBoundingClientRect();
  const base = pattern.getBoundingClientRect();

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", r1.left + r1.width / 2 - base.left);
  line.setAttribute("y1", r1.top + r1.height / 2 - base.top);
  line.setAttribute("x2", r2.left + r2.width / 2 - base.left);
  line.setAttribute("y2", r2.top + r2.height / 2 - base.top);

  line.setAttribute("stroke", "#ff4f9a");
  line.setAttribute("stroke-width", "6");
  line.setAttribute("stroke-linecap", "round");

  svg.appendChild(line);
}

function resetPattern() {
  input = [];
  lastDot = null;

  pattern.className = "pattern";
  patternWrapper.classList.remove("error");
  svg.innerHTML = "";

  document.querySelectorAll(".dot").forEach(dot => {
    dot.classList.remove("active");
  });
}
