// Add this function to get the first image in the directory
function getFirstImageInDir(dir) {
  // This is a simplified example - in a real app, you'd need server-side code to list files
  // For now, we'll assume the image is named '01.jpg' or similar
  const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  
  for (const ext of possibleExtensions) {
    const imgPath = `${dir}/01${ext}`;
    // We'll try to load the image to check if it exists
    const img = new Image();
    img.src = imgPath;
    if (img.complete) {
      return imgPath;
    }
  }
  
  // If no image found with common extensions, you might want to handle this case
  console.error('No image found in directory:', dir);
  return null;
}

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('id');
  const homeSection = document.getElementById('home');
  
  if (!customerId) {
    // Show error message if no ID is provided
    homeSection.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #ff4f9a; margin-bottom: 20px;">Error</h1>
        <p>No customer ID provided. Please check your URL.</p>
      </div>
    `;
    return;
  }

  // Create image container
  const imgContainer = document.createElement('div');
  imgContainer.style.width = '100%';
  imgContainer.style.maxWidth = '500px';
  imgContainer.style.margin = '0 auto';
  imgContainer.style.padding = '20px';
  imgContainer.style.textAlign = 'center';

  // Create image element
  const img = document.createElement('img');
  const imgDir = `customers/${customerId}/img/01`;
  const imgPath = getFirstImageInDir(imgDir);
  
  if (!imgPath) {
    imgContainer.innerHTML = '<p style="color: #ff4f9a;">ไม่พบรูปภาพ</p>';
    homeSection.insertBefore(imgContainer, homeSection.querySelector('.unlock-hint'));
    return;
  }

  img.src = imgPath;
  img.alt = 'Couple Image';
  img.style.width = '100%';
  img.style.height = 'auto';
  img.style.borderRadius = '15px';
  img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  
  // Add loading state
  img.onload = function() {
    img.style.opacity = '1';
  };
  img.onerror = function() {
    imgContainer.innerHTML = '<p style="color: #ff4f9a;">ไม่สามารถโหลดรูปภาพได้</p>';
  };
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';

  // Insert the image container after the title
  const title = homeSection.querySelector('.title');
  if (title) {
    homeSection.insertBefore(imgContainer, title.nextSibling);
    imgContainer.appendChild(img);
  }

  // Add some space below the image
  const spacer = document.createElement('div');
  spacer.style.height = '40px';
  imgContainer.appendChild(spacer);
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
