// Lấy phần tử từ DOM
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Khi bấm nút gửi
sendBtn.addEventListener("click", sendMessage);

// Khi nhấn Enter trong ô input
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Hàm gửi tin nhắn
function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // Hiển thị tin nhắn người dùng
  const userMsg = document.createElement("div");
  userMsg.textContent = "Bạn: " + message;
  chatBox.appendChild(userMsg);

  // Reset ô nhập
  userInput.value = "";

  // Giả lập phản hồi từ bot
  const botMsg = document.createElement("div");
  botMsg.textContent = "ThamAI: Bạn vừa gửi \"" + message + "\"";
  chatBox.appendChild(botMsg);

  // Cuộn xuống cuối
  chatBox.scrollTop = chatBox.scrollHeight;
}
