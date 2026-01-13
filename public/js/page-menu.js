// Menu configuration
const menuItems = [
  { id: 'timer', title: '⏱️ ระยะเวลาที่เราคบกัน' },
  { id: 'memories', title: '📸 ความทรงจำ' },
  { id: 'messages', title: '💌 ข้อความ' },
  { id: 'quiz', title: '❓ ตอบคำถาม' },
  { id: 'wheel', title: '🎡 วงล้อสุ่มตามใจ' }
];

// Function to create menu items with staggered animation
function createMenuItems() {
  const menuGrid = document.getElementById('menu-grid');
  
  // Clear any existing items
  menuGrid.innerHTML = '';
  
  // Add items with staggered delay
  menuItems.forEach((item, index) => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-box';
    menuItem.id = item.id;
    menuItem.textContent = item.title;
    
    // Initial state (hidden)
    menuItem.style.opacity = '0';
    menuItem.style.transform = 'scale(0.8) translateY(20px)';
    menuItem.style.transformOrigin = 'center bottom';
    menuItem.style.transition = `
        opacity 0.4s cubic-bezier(0.5, 2.5, 0.7, 0.7),
        transform 0.5s cubic-bezier(0.5, 1.8, 0.4, 0.8)
    `;
    menuItem.style.transitionDelay = `${index * 0.1}s`;
    
    // Add click handler
    menuItem.addEventListener('click', (e) => {
        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
        e.target.style.transform = 'scale(1)';
        }, 100);
        
        console.log(`Selected: ${item.title}`);
    });
    
    menuGrid.appendChild(menuItem);
    
    // Trigger animation
    setTimeout(() => {
        menuItem.style.opacity = '1';
        menuItem.style.transform = 'scale(1.05) translateY(0)';
        
        // Add bounce effect
        setTimeout(() => {
        menuItem.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.7, 0.3, 1.5)';
        menuItem.style.transform = 'scale(1) translateY(0)';
        }, 300);
    }, 50);
  });
}

// Call this when the menu page is shown
function onMenuShow() {
  createMenuItems();
}

// Add event listener for menu page show
document.addEventListener('DOMContentLoaded', () => {
  // If we're already on the menu page when the page loads
  if (document.getElementById('menu').classList.contains('active')) {
    onMenuShow();
  }
  
  // Listen for page changes
  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.matches('.back-btn[onclick*="showPage(\'home\')"]')) {
      // Reset menu state when going back to home
      const menuItems = document.querySelectorAll('.menu-box');
      menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
      });
    }
  });
});

// Export for router to call when showing menu
window.showMenu = onMenuShow;