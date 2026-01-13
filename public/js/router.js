const pages = ["home", "password", "menu"];

function showPage(name) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show the selected page
  const page = document.getElementById(name);
  if (page) {
    page.classList.add('active');
    
    // If showing menu, trigger the animation
    if (name === 'menu' && window.showMenu) {
      setTimeout(() => window.showMenu(), 50);
    }
  }
}

function resetPattern() {
  input = [];
  pattern.className = "pattern";
  document.querySelectorAll(".dot").forEach(d => {
    d.classList.remove("active");
  });
}