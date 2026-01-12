const pages = ["home", "password", "menu"];

function showPage(name) {
  pages.forEach(p => {
    document.getElementById(p).classList.remove("active");
  });
  document.getElementById(name).classList.add("active");

  if (name === "password") resetPattern();
}

function resetPattern() {
  input = [];
  pattern.className = "pattern";
  document.querySelectorAll(".dot").forEach(d => {
    d.classList.remove("active");
  });
}