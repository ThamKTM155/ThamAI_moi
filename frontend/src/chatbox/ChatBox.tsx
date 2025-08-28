import React, { useState } from "react";
import "./ChatBox.css";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // ✅ Gọi API backend Render
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi kết nối backend");
      }

      const data = await response.json();

      const botMessage: Message = {
        sender: "bot",
        text: data.reply || "⚠️ Bot không trả lời được.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage: Message = {
        sender: "bot",
        text: "❌ Không thể kết nối tới server. Vui lòng thử lại.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <span className="avatar">
              {msg.sender === "user" ? "🧑" : "🤖"}
            </span>
            <span className="text">{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div className="chat-message bot">
            <span className="avatar">🤖</span>
            <span className="text">Đang trả lời...</span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;