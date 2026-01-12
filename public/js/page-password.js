// ===== CONFIG =====
const correctPattern = [1, 2, 6, 9];

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

for (let i = 1; i <= 9; i++) {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.dataset.id = i;
  pattern.appendChild(dot);
}

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
