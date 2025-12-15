# ThamAI_moi — Trợ lý AI cá nhân

## 📂 Cấu trúc
ThamAI_moi/
├── frontend/ # React giao diện
├── server/ # Flask backend
├── package.json # chạy song song FE + BE
├── setup.ps1 # script cài đặt lần đầu
└── start.ps1 # script khởi động trợ lý
---

## 🚀 Cách dùng

### 1️⃣ Cài đặt lần đầu
- Nhấp chuột phải `setup.ps1` → Run with PowerShell  
- Nhập **API Key OpenAI** (sk-xxxx)  

Script sẽ tự động:
- Tạo venv Python + cài thư viện backend  
- Copy `.env.example` thành `.env`  
- Cài npm packages (root + frontend)  

### 2️⃣ Khởi động
- Nhấp chuột phải `start.ps1` → Run with PowerShell  
- Mở [http://localhost:3000](http://localhost:3000) để chat  

Backend chạy ở [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

## 📝 Ghi chú
- Nếu Windows chặn script:  
powershell -ExecutionPolicy Bypass -File .\setup.ps1

- Sau đó dùng:


powershell -ExecutionPolicy Bypass -File .\start.ps1


- Frontend: React (Node.js 18+)  
- Backend: Flask (Python 3.9+)  


