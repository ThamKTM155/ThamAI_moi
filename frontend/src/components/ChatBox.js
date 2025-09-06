import React, { useState, useRef, useEffect } from "react";
import "./ChatBox.css"; // nhớ có file CSS đi kèm

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hàm phát giọng nói
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    window.speechSynthesis.speak(utterance);
  };

  // Thêm message mới vào khung chat
  const addMessage = (text, sender) => {
    const newMsg = {
      sender,
      text,
      timestamp: new Date().toLocaleString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    if (sender === "bot") speak(text);
  };

  // Gửi text tới Flask backend
  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage(input, "user");
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      addMessage(data.reply || "Xin lỗi, không có phản hồi.", "bot");
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
      addMessage("⚠️ Lỗi khi gửi tin nhắn.", "bot");
    } finally {
      setIsLoading(false);
    }
  };

  // Bắt đầu ghi âm
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setIsRecording(true);

      let chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = [];
        await sendVoice(blob);
      };

      recorder.start();
    } catch (err) {
      console.error("Không thể bắt đầu ghi âm:", err);
      addMessage("⚠️ Không thể bật micro.", "bot");
    }
  };

  // Dừng ghi âm
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Gửi voice tới Flask backend
  const sendVoice = async (file) => {
    const formData = new FormData();
   formData.append("audio", file, "recording.webm");

    try {
      const res = await fetch("http://127.0.0.1:5000/voice", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.reply) {
        addMessage(data.reply, "bot");
      } else {
        addMessage("⚠️ Không có phản hồi từ voice.", "bot");
      }
    } catch (err) {
      console.error("Lỗi gọi voice API:", err);
      addMessage("⚠️ Lỗi khi xử lý voice.", "bot");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">ThamAI — Trợ lý nghe & nói</div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <img
              src={
                msg.sender === "user"
                  ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  : "https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
              }
              className="avatar"
              alt={msg.sender}
            />
            <div>
              <div className="bubble">{msg.text}</div>
              <div className="timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message bot">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712107.png"
              className="avatar"
              alt="Bot"
            />
            <div>
              <div className="bubble typing">
                <span></span><span></span><span></span>
              </div>
              <div className="timestamp">{new Date().toLocaleString()}</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>Gửi</button>
        {!isRecording ? (
          <button onClick={startRecording} disabled={isLoading}>🎤 Nói</button>
        ) : (
          <button onClick={stopRecording}>⏹ Dừng</button>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
