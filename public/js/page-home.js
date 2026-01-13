document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isLocal = location.hostname === 'localhost';
  // const customerId = urlParams.get('id') || 'example'; // Default to 'example' if no ID provided
  const homeSection = document.getElementById('home');
  
  // Create image container
  const imgContainer = document.createElement('div');
  imgContainer.style.width = '100%';
  imgContainer.style.maxWidth = '500px';
  imgContainer.style.margin = '0 auto';
  imgContainer.style.padding = '20px';
  imgContainer.style.textAlign = 'center';
  imgContainer.style.minHeight = '200px'; // Prevent layout shift

  // Show loading state
  imgContainer.innerHTML = '<p>กำลังโหลดรูปภาพ...</p>';
  homeSection.insertBefore(imgContainer, homeSection.querySelector('.unlock-hint'));

  try {
    // const imgPath = `/public/assets/img/heart_3_rbg.png`;
    const imgPath = isLocal
      ? '/public/assets/img/heart_3_rbg.png'
      : '/PageForYou-Valentine-002/public/assets/img/heart_3_rbg.png';
    const img = document.createElement('img');
    
    img.onload = function() {
      img.style.opacity = '1';
      imgContainer.innerHTML = ''; // Clear loading message
      imgContainer.appendChild(img);
    };
    
    img.onerror = function() {
      imgContainer.innerHTML = '<p style="color: #ff4f9a;">ไม่พบรูปภาพ</p>';
    };
    
    // Set image properties
    img.src = imgPath;
    img.alt = 'Couple Image';
    // img.style.width = '100%';
    img.style.height = '25svh';
    img.style.borderRadius = '15px';
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
  } catch (error) {
    imgContainer.innerHTML = `
      <div style="color: #ff4f9a;">
        <p>เกิดข้อผิดพลาด: ${error.message}</p>
      </div>
    `;
  }

  // Add some space below the image
  const spacer = document.createElement('div');
  spacer.style.height = '40px';
  homeSection.insertBefore(spacer, homeSection.querySelector('.unlock-hint').nextSibling);
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