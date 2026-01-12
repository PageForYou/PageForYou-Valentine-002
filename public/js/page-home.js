let startY = 0;

document.getElementById("home").addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.getElementById("home").addEventListener("touchend", e => {
  const endY = e.changedTouches[0].clientY;
  if (startY - endY > 50) {
    showPage("password");
  }
});
