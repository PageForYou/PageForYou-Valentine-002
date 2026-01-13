document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isLocal = location.hostname === 'localhost';
  const homeSection = document.getElementById('home');
  
  // Create image container with class
  const imgContainer = document.createElement('div');
  imgContainer.className = 'image-container';
  imgContainer.innerHTML = '<p class="loading-text">กำลังโหลดรูปภาพ...</p>';
  homeSection.insertBefore(imgContainer, homeSection.querySelector('.unlock-hint'));

  try {
    const imgPath = isLocal
      ? '/public/assets/img/heart_3_rbg.png'
      : '../public/assets/img/heart_3_rbg.png';
    const img = document.createElement('img');
    img.className = 'heart-image';
    img.alt = 'Heart Image';
    
    img.onload = function() {
      img.classList.add('loaded');
      imgContainer.innerHTML = '';
      imgContainer.appendChild(img);
    };
    
    img.onerror = function() {
      imgContainer.innerHTML = '<p class="error-text">ไม่พบรูปภาพ</p>';
    };
    
    img.src = imgPath;
    
  } catch (error) {
    imgContainer.innerHTML = `<p class="error-text">เกิดข้อผิดพลาด: ${error.message}</p>`;
  }
});

// Keep the touch event listeners
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