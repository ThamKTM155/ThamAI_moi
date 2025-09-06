===========================================
   HƯỚNG DẪN CHẠY BACKEND THAMAI (Flask)
===========================================

1) CÀI ĐẶT MÔI TRƯỜNG
--------------------
- Yêu cầu máy có Python 3.10+ (đã cài sẵn).
- Mở Command Prompt (CMD) tại thư mục server.

Cài các thư viện cần thiết:
    pip install flask flask-cors python-dotenv openai


2) CẤU HÌNH API KEY (nếu muốn dùng chat thật)
---------------------------------------------
- Tạo file .env trong cùng thư mục với app.py
- Dán nội dung sau vào file .env:

    OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx

- Nếu không có API key thì backend vẫn chạy,
  nhưng sẽ dùng chế độ "giả lập" (không gọi OpenAI).


3) CHẠY BACKEND
----------------
Trong thư mục server, chạy lệnh:

    python app.py

Nếu thành công, sẽ thấy dòng:
    * Running on http://127.0.0.1:5000


4) KIỂM TRA BACKEND
-------------------
Mở trình duyệt và truy cập:
    http://127.0.0.1:5000/

Kết quả trả về:
    {"message": "✅ ThamAI backend đang chạy"}


5) TEST CHAT
------------
- Gửi POST request tới http://127.0.0.1:5000/chat
- Dữ liệu JSON ví dụ:
    { "message": "Xin chào" }

- Nếu có API key → AI trả lời.
- Nếu không có API key → trả về:
    📌 (Giả lập) Bạn vừa nói: Xin chào


6) TEST VOICE
-------------
- Gửi POST request tới http://127.0.0.1:5000/voice
- Đính kèm file âm thanh (.wav / .mp3).
- Backend sẽ trả về JSON:
    { "reply": "✅ Voice đã nhận thành công (giả lập, chưa gọi OpenAI)." }


7) KẾT NỐI VỚI FRONTEND
-----------------------
- Chạy frontend (mở index.html).
- Khi nhấn nút Chat → gọi API /chat.
- Khi nhấn nút Voice → gọi API /voice.
- Nếu backend trả về JSON thì frontend hiển thị.


===========================================
 GHI CHÚ
 - /chat: nếu có API key → dùng OpenAI, nếu không có → giả lập.
 - /voice: luôn chạy giả lập, không tốn quota.
===========================================
