// page-gallery.js
function showGalleryPage() {
  const content = document.querySelector('#gallerytest .gallerytest-content');
  content.innerHTML = `
    <h2>📸 ความทรงจำ</h2>
    <div class="gallery-grid" id="gallery-grid">
      <div class="gallery-loading">กำลังโหลดภาพความทรงจำ...</div>
    </div>
  `;
  
  // Get customer ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('id');
  
  if (!customerId) {
    document.getElementById('gallery-grid').innerHTML = '<p class="error-message">ไม่พบรหัสลูกค้า</p>';
    return;
  }

  // Example image paths - replace with your actual image paths
  const images = [
    `../customers/${customerId}/img/01.jpg`,
    `../customers/${customerId}/img/02.png`,
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  galleryGrid.innerHTML = ''; // Clear loading message
  
  // Create image elements
  images.forEach((imgSrc, index) => {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'gallery-item';
    
    // Create image element
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = `ความทรงจำที่ ${index + 1}`;
    
    // Add loading state
    img.onload = () => {
      imgContainer.classList.add('loaded');
    };
    
    // Handle image loading errors
    img.onerror = () => {
      console.error(`Error loading image: ${imgSrc}`);
      imgContainer.classList.add('error');
      imgContainer.innerHTML = '<span>โหลดรูปภาพไม่สำเร็จ</span>';
    };
    
    // Set image source
    img.src = imgSrc;
    
    // Create caption
    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = `ความทรงจำที่ ${index + 1}`;
    
    // Append elements
    imgContainer.appendChild(img);
    imgContainer.appendChild(caption);
    galleryGrid.appendChild(imgContainer);
  });
  
  // Show the page
  if (typeof showPage === 'function') {
    showPage('gallerytest');
  }
}

// Add to window object
window.showGalleryPage = showGalleryPage;