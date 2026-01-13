// Update the wheel container to include a pointer
function showWheelPage() {
  const content = document.querySelector('#wheeltest .wheeltest-content');
  if (!content) {
    console.error('Could not find wheel content element');
    return;
  }
  
  content.innerHTML = `
    <h2>🎡 วงล้อสุ่มรางวัล</h2>
    <div class="wheel-container">
      <div class="wheel-wrapper">
        <canvas id="wheelCanvas" width="300" height="300"></canvas>
        <div class="wheel-center"></div>
        <div class="wheel-pointer"></div>
      </div>
      <button id="spinBtn" class="spin-btn">หมุนเลย!</button>
    </div>
    <div id="result" class="result"></div>
    <div id="prizeDialog" class="prize-dialog">
      <div class="prize-content">
        <h3>ยินดีด้วย!</h3>
        <p>คุณได้รับ: <span id="prizeText"></span></p>
        <button id="closeDialog" class="close-dialog">ตกลง</button>
      </div>
    </div>
  `;
  
  // Show the page first
  if (typeof showPage === 'function') {
    showPage('wheeltest');
  } else {
    console.error('showPage function is not defined');
    return;
  }
  
  // Then initialize the wheel
  initWheel();
}

let wheel;
let canSpin = true;
let currentRotation = 0;

function initWheel() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const spinBtn = document.getElementById('spinBtn');
  const result = document.getElementById('result');
  const prizeDialog = document.getElementById('prizeDialog');
  const prizeText = document.getElementById('prizeText');
  const closeDialog = document.getElementById('closeDialog');
  
  // Prizes
  const prizes = [
    "กอดฟรี 1 ครั้ง", 
    "จูบที่หน้าผาก", 
    "ทานข้าวด้วยกัน", 
    "ดูหนังด้วยกัน", 
    "นวดให้ 5 นาที",
    "ขออะไรได้ 1 อย่าง"
  ];
  
  // Wheel configuration
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  let currentAngle = 0;
  let spinning = false;
  let spinTimeout;
  
  // Draw the wheel
  function drawWheel() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw segments
    const arc = (Math.PI * 2) / prizes.length;
    
    for (let i = 0; i < prizes.length; i++) {
      const angle = i * arc;
      
      // Alternate colors
      ctx.fillStyle = i % 2 === 0 ? '#ff4f9a' : '#ff8fab';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + arc, false);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(prizes[i], radius - 10, 5);
      ctx.restore();
    }
  }
  
  // Spin the wheel
  function spin() {
    if (!canSpin || spinning) return;
    
    spinning = true;
    canSpin = false;
    result.textContent = '';
    spinBtn.disabled = true;
    
    const spinTime = 4000; // 4 seconds total spin time
    const spinAngleStart = Math.random() * 10; // Small random start
    const spinAngle = 360 * 8 + Math.random() * 360; // 8-9 full rotations
    const spinAngleEnd = spinAngleStart + spinAngle;
    const spinSpeed = 0.1; // Start speed (lower is faster)
    
    let startTime = null;
    let lastTime = null;
    
    // Animation function
    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      if (!lastTime) lastTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // Easing function (easeOutQuart)
      const progress = Math.min(elapsed / spinTime, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 4);
      
      if (progress < 1) {
        // Still spinning
        const currentAngle = spinAngleStart + (spinAngle * easeOutProgress);
        currentRotation = (currentAngle * Math.PI) / 180;
        drawRotatedWheel();
        requestAnimationFrame(animate);
      } else {
        // Finished spinning
        currentRotation = (spinAngleEnd * Math.PI) / 180;
        drawRotatedWheel();
        spinning = false;
        spinBtn.disabled = false;
        
        // Calculate prize
        const normalizedAngle = ((spinAngleEnd % 360) + 360) % 360;
        const prizeIndex = Math.floor((normalizedAngle + 105) / (360 / prizes.length)) % prizes.length;
        const prize = prizes[prizeIndex];
        
        // Show prize dialog
        showPrize(prize);
      }
    }
    
    // Draw wheel with rotation
    function drawRotatedWheel() {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(centerX, centerY);
      ctx.rotate(currentRotation);
      ctx.translate(-centerX, -centerY);
      drawWheel();
      ctx.restore();
    }
    
    // Start animation
    requestAnimationFrame(animate);
  }
  
  // Show prize in dialog
  function showPrize(prize) {
    prizeText.textContent = prize;
    prizeDialog.style.display = 'flex';
  }
  
  // Close dialog
  closeDialog.addEventListener('click', () => {
    prizeDialog.style.display = 'none';
    canSpin = true;
  });
  
  // Initialize wheel
  drawWheel();
  
  // Add event listeners
  spinBtn.addEventListener('click', spin);
}

window.showWheelPage = showWheelPage;