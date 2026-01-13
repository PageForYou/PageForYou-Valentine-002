// page-timer.js
function showTimerPage() {
  const content = document.querySelector('#timecount .timecount-content');
  content.innerHTML = `
    <h2>⏱️ ระยะเวลาที่เราคบกัน</h2>
    <div class="timer-container">
      <div class="time-block">
        <span id="years">0</span>
        <span class="time-label">ปี</span>
      </div>
      <div class="time-block">
        <span id="months">0</span>
        <span class="time-label">เดือน</span>
      </div>
      <div class="time-block">
        <span id="days">0</span>
        <span class="time-label">วัน</span>
      </div>
      <div class="time-block">
        <span id="hours">0</span>
        <span class="time-label">ชั่วโมง</span>
      </div>
      <div class="time-block">
        <span id="minutes">0</span>
        <span class="time-label">นาที</span>
      </div>
      <div class="time-block">
        <span id="seconds">0</span>
        <span class="time-label">วินาที</span>
      </div>
    </div>
    <p class="love-message">❤️ ทุกๆ วินาทีที่มีคุณอยู่คือความสุขที่สุด ❤️</p>
  `;

  // Set the start date (adjust this to your relationship start date)
  const startDate = new Date('2023-01-01T00:00:00');
  
  function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }
  
  // Update immediately and then every second
  updateTimer();
  setInterval(updateTimer, 1000);
  
  // Show the page
  showPage('timecount');
}

// Add to window object so it can be called from menu
window.showTimerPage = showTimerPage;