import React, { useState, useRef } from "react";

function VoiceChat() {
  const [messages, setMessages] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      audioChunksRef.current = [];

      const formData = new FormData();
      formData.append("audio", audioBlob, "input.webm");

      const res = await fetch("http://127.0.0.1:5000/speech", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "user", text: "🎤 ..." }]);
      setMessages((prev) => [...prev, { role: "ai", text: data.text }]);

      // Phát âm thanh trả lời
      const audio = new Audio("data:audio/mp3;base64," + data.audio);
      audio.play();
    };

    mediaRecorderRef.current.start();
    setTimeout(() => mediaRecorderRef.current.stop(), 4000); // ghi 4s
  };

  return (
    <div>
      <button onClick={startRecording}>🎤 Nói</button>
      <div style={{ width: "400px", height: "300px", border: "1px solid #ccc", overflowY: "scroll" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoiceChat;
