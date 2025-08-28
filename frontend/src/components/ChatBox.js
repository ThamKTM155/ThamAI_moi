// frontend/src/components/ChatBox.js
import React, { useState, useRef } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]); // {sender, text}
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setStatus("Yêu cầu quyền micro...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setStatus("Gửi audio lên server...");
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        // show temporary "Bạn nói" message (will replace with transcript)
        setMessages((prev) => [...prev, { sender: "🧑", text: "(đang gửi audio...)" }]);

        // Build FormData
        const fd = new FormData();
        fd.append("file", audioBlob, "recording.webm");
        // optional: fd.append("lang", "vi");

        try {
          const resp = await fetch("http://127.0.0.1:5000/voice", {
            method: "POST",
            body: fd,
          });
          const data = await resp.json();
          if (data.error) {
            setMessages((prev) => [...prev, { sender: "🤖", text: "Lỗi server: " + data.error }]);
            setStatus("");
            return;
          }

          // Replace last (placeholder) user message with actual transcript
          setMessages((prev) => {
            // remove last placeholder if exists
            const copy = prev.slice(0, -1);
            copy.push({ sender: "🧑", text: data.transcript || "(không nhận diện được)" });
            return copy;
          });

          // Add bot reply text
          setMessages((prev) => [...prev, { sender: "🤖", text: data.reply }]);
          setStatus("Phát âm thanh...");

          // Play base64 audio
          if (data.audio_b64 && data.audio_mime) {
            const audioSrc = `data:${data.audio_mime};base64,${data.audio_b64}`;
            const audio = new Audio(audioSrc);
            audio.play().catch((e) => console.error("play error:", e));
          }
          setStatus("");
        } catch (err) {
          console.error(err);
          setMessages((prev) => [...prev, { sender: "🤖", text: "Lỗi kết nối tới server." }]);
          setStatus("");
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setStatus("Đang ghi âm... Nhấn STOP để dừng.");
    } catch (err) {
      console.error(err);
      setStatus("Không thể truy cập micro: " + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>ThamAI — Trợ lý nghe & nói</h2>
        <div className="status">{status}</div>
      </div>

      <div className="messages" id="messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.sender === "🤖" ? "bot" : "user"}`}>
            <span className="sender">{m.sender}</span>
            <span className="text">: {m.text}</span>
          </div>
        ))}
      </div>

      <div className="controls">
        {!recording ? (
          <button className="btn-record" onClick={startRecording}>🎤 Ghi âm</button>
        ) : (
          <button className="btn-stop" onClick={stopRecording}>⏹️ Dừng</button>
        )}
      </div>
    </div>
  );
}
