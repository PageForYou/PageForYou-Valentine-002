// Add this function to get the first image in the directory
async function getFirstImageInDir(dir) {
  try {
    // Try to fetch the directory listing
    const response = await fetch(dir);
    if (!response.ok) return null;
    
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find all image links in the directory
    const links = Array.from(doc.querySelectorAll('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".webp"]'))
      .map(link => link.getAttribute('href'))
      .filter(href => !href.startsWith('?') && href !== '../');
      
    if (links.length > 0) {
      // Return the first image found
      return `${dir}/${links[0]}`;
    }
    return null;
  } catch (error) {
    console.error('Error accessing directory:', error);
    return null;
  }
}

// Update the image loading part to be async
document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('id') || 'example'; // Default to 'example' if no ID provided
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
    const imgDir = `../customers/${customerId}/img/01`;
    const imgPath = await getFirstImageInDir(imgDir);
    
    if (!imgPath) {
      throw new Error('No image found');
    }

    const img = document.createElement('img');
    img.src = imgPath;
    img.alt = 'Couple Image';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '15px';
    img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    img.onload = function() {
      img.style.opacity = '1';
      imgContainer.innerHTML = ''; // Clear loading message
      imgContainer.appendChild(img);
    };
    
    img.onerror = function() {
      imgContainer.innerHTML = '<p style="color: #ff4f9a;">ไม่สามารถโหลดรูปภาพได้</p>';
    };
    
  } catch (error) {
    imgContainer.innerHTML = `
      <div style="color: #ff4f9a;">
        <p>ไม่พบรูปภาพสำหรับ ID: ${customerId}</p>
        <p>ตรวจสอบ URL หรือลองใหม่ภายหลัง</p>
      </div>
    `;
  }

  // Add some space below the image
  const spacer = document.createElement('div');
  spacer.style.height = '40px';
  homeSection.insertBefore(spacer, homeSection.querySelector('.unlock-hint').nextSibling);
});

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
