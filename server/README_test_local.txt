===========================================
   CHECKLIST TEST LOCAL — DỰ ÁN THAMAI
===========================================

1) CHẠY BACKEND
---------------
- Mở CMD và chạy:
    cd C:\Users\Administrator\Documents\ThamAI_moi\server
    python app.py

- Kiểm tra: thấy dòng
    * Running on http://127.0.0.1:5000

- Mở trình duyệt vào:
    http://127.0.0.1:5000/
  → Kết quả:
    {"message":"✅ ThamAI backend đang chạy"}


2) KIỂM TRA API /chat
---------------------
- CMD chạy:
    curl -X POST http://127.0.0.1:5000/chat ^
         -H "Content-Type: application/json" ^
         -d "{\"message\":\"Xin chào\"}"

- Kết quả (giả lập):
    {"reply":"📌 (Giả lập) Bạn vừa nói: Xin chào"}


3) KIỂM TRA API /voice
----------------------
- Chuẩn bị 1 file test.wav
- CMD chạy:
    curl -X POST http://127.0.0.1:5000/voice -F "file=@test.wav"

- Kết quả (giả lập):
    {"reply":"✅ Voice đã nhận thành công (giả lập, chưa gọi OpenAI)."}


4) CHẠY FRONTEND
----------------
- Mở thư mục:
    C:\Users\Administrator\Documents\ThamAI_moi\frontend
- Nhấp đúp mở file index.html bằng Chrome.


5) TEST CHAT TRÊN GIAO DIỆN
---------------------------
- Gõ thử “Xin chào” → Enter
- Bot trả lời trên màn hình.
- Nếu chưa có API key → bot trả lời kiểu:
    📌 (Giả lập) Bạn vừa nói: Xin chào


6) TEST VOICE TRÊN GIAO DIỆN
----------------------------
- Nhấn 🎤 Nói → nói 1 câu
- Nhấn ⏹ Dừng → bot trả lời
- Kết quả:
    ✅ Voice đã nhận thành công (giả lập…)


7) HOÀN TẤT
-----------
- Nếu các bước trên đều OK → hệ thống frontend ↔ backend hoạt động hoàn chỉnh LOCAL.
- Khi có quota, chỉ cần bật lại API thật trong app.py là dùng ngay.


===========================================
