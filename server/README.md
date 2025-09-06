Phần thứ I:  ThamAI Backend (Flask + OpenAI)

Đây là backend cho dự án **ThamAI**. Backend sử dụng Flask để cung cấp API cho frontend React, gồm:
- `/chat`: Nhận tin nhắn văn bản và trả phản hồi.
- `/voice`: Nhận file audio (ghi âm từ frontend) và dùng Whisper để chuyển thành văn bản.

---

## 🚀 Yêu cầu hệ thống
- Python 3.9+ (khuyến nghị 3.10 hoặc 3.11)
- Tài khoản và API Key của [OpenAI](https://platform.openai.com/)

---

## 📦 Cài đặt

1. Clone hoặc copy dự án về máy:
   ```bash
   git clone <repo_url>
   cd ThamAI_moi/server
2. Cài đặt thư viện cần thiết:
pip install -r requirements.txt
3. Tạo file .env từ mẫu:
cp .env.example .env
(trên Windows: copy thủ công rồi đổi tên)
4. Mở file .env và điền API key thật:
OPENAI_API_KEY=sk-xxxx
5.▶️ Chạy server

Chạy Flask development server:

python app.py


Màn hình sẽ hiển thị:

 * Running on http://127.0.0.1:5000

6.🔗 API Endpoints
POST /chat

Input (JSON):

{ "message": "Xin chào trợ lý" }


Output (JSON):

{ "reply": "Bạn vừa nói: Xin chào trợ lý" }

POST /voice

Input: file audio (.webm) trong FormData.

Output (JSON):

{
  "reply": "Bạn vừa nói (voice): Xin chào trợ lý",
  "transcript": "Xin chào trợ lý"
}

📂 Cấu trúc thư mục
server/
│── app.py              # Flask app chính
│── requirements.txt    # Danh sách thư viện cần cài
│── .env.example        # Mẫu file cấu hình
│── uploads/            # Nơi lưu file audio tạm (tự tạo khi chạy)

🌐 Deploy (tuỳ chọn)

Khi triển khai thực tế (Render, Heroku, v.v.), nên dùng:

gunicorn app:app


gunicorn đã được khai báo trong requirements.txt.

✍️ Tác giả: Hoàng Ngọc Thắm

Phần thứ II:
📌 Nội dung README.md cho frontend
# ThamAI Frontend (React)

Đây là giao diện người dùng (frontend) của dự án **ThamAI**.  
Ứng dụng được xây dựng bằng **React** để trò chuyện với trợ lý AI qua text và voice.

---

## 🚀 Yêu cầu hệ thống
- Node.js 18+ (khuyến nghị bản LTS)
- npm (đi kèm khi cài Node.js)

---

## 📦 Cài đặt

1. Clone hoặc copy dự án về máy:
   ```bash
   git clone <repo_url>
   cd ThamAI_moi/frontend


Cài đặt thư viện:

npm install


(Tuỳ chọn) Cấu hình URL backend:

Mặc định, ChatBox.js trỏ đến http://localhost:5000.

Nếu backend chạy ở URL khác (ví dụ Render), sửa trong file:

const response = await fetch("https://your-backend.onrender.com/chat", { ... })

▶️ Chạy ứng dụng

Chạy React dev server:

npm start


Ứng dụng sẽ chạy ở:

http://localhost:3000

🔗 Tính năng

💬 Chat: Gõ văn bản và nhận phản hồi từ AI.

🎤 Voice chat: Ghi âm giọng nói, gửi lên backend để chuyển thành text (Whisper).

🔊 Text-to-Speech: Phát lại câu trả lời bằng giọng nói (Web Speech API).

📂 Cấu trúc thư mục
frontend/
│── public/
│── src/
│   │── components/
│   │   └── ChatBox.js     # Hộp chat chính (text + voice)
│   │── App.js             # App root
│   │── index.js           # Điểm khởi động React
│   │── index.css          # CSS chung
│── package.json
│── README.md

🌐 Build & Deploy

Tạo bản build tối ưu:

npm run build


Sau đó có thể deploy lên:

Vercel (khuyến nghị, dễ cho React)

Netlify

Hoặc bất kỳ hosting tĩnh nào (chỉ cần build/).

✍️ Tác giả: Hoàng Ngọc Thắm
