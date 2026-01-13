// page-message.js
function showMessagePage() {
  const content = document.querySelector('#message .message-content');
  content.innerHTML = `
    <h2>💌 ข้อความจากใจ</h2>
    <div class="message-container">
      <div class="message-box">
        <div class="message-text">
          <p>สวัสดีที่รักของฉัน,</p>
          <p>ในวันวาเลนไทน์นี้ ฉันอยากจะบอกว่า...</p>
          <p>คุณคือความสุขที่สุดในชีวิตของฉัน ❤️</p>
          <p>รักคุณเสมอ,</p>
          <p class="signature">[ชื่อคุณ]</p>
        </div>
      </div>
      <div class="message-actions">
        <button class="btn" onclick="showNextMessage()">อ่านข้อความถัดไป</button>
      </div>
    </div>
  `;
  
  // Show the page
  showPage('message');
}

// Example function for next message
function showNextMessage() {
  const messageText = document.querySelector('.message-text');
  messageText.innerHTML = `
    <p>ข้อความพิเศษสำหรับคุณ,</p>
    <p>ฉันหวังว่าวันนี้จะเป็นวันที่พิเศษสำหรับคุณ</p>
    <p>และฉันจะทำให้คุณมีความสุขมากที่สุดเท่าที่จะทำได้!</p>
    <p>❤️❤️❤️</p>
  `;
}

window.showMessagePage = showMessagePage;
window.showNextMessage = showNextMessage;