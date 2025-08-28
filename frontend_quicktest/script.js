const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

// 🟢 Đổi URL này thành backend thật của anh trên Render
const API_URL = "https://thamai-backend-clean-1-h88m.onrender.com/chat";

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("Bạn", text);
  userInput.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (!response.ok) {
      appendMessage("ThamAI", "❌ Lỗi khi kết nối server");
      return;
    }

    const data = await response.json();
    appendMessage("ThamAI", data.reply || "❌ Không có phản hồi");
  } catch (err) {
    appendMessage("ThamAI", "⚠️ Không thể kết nối tới backend");
    console.error(err);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
