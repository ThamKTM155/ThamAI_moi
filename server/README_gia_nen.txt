===========================================
  HƯỚNG DẪN GIẢI NÉN & CHẠY TRÊN MÁY MỚI
===========================================

1) GIẢI NÉN FILE ZIP
---------------------
- Copy file ThamAI_backend.zip từ USB vào máy tính.
- Nhấp chuột phải → Extract All… (Giải nén).
- Sau khi giải nén sẽ có thư mục chứa các file:
    app.py
    .env
    README.txt
    README_test_local.txt
    README_gia_nen.txt


2) CÀI PYTHON (nếu máy chưa có)
-------------------------------
- Vào trang: https://www.python.org/downloads/
- Tải phiên bản mới nhất (khuyên dùng Python 3.10 hoặc cao hơn).
- Cài đặt → nhớ tick vào ô "Add Python to PATH".


3) CÀI THƯ VIỆN CẦN THIẾT
-------------------------
- Mở Command Prompt (CMD).
- Di chuyển vào thư mục vừa giải nén:
    cd đường_dẫn_đến_thư_mục_giải_nén

- Chạy lệnh cài đặt:
    pip install flask flask-cors python-dotenv openai


4) CHẠY BACKEND
---------------
- Trong CMD, chạy:
    python app.py

- Nếu thành công sẽ hiện:
    * Running on http://127.0.0.1:5000
  hoặc
    * Running on http://192.168.x.x:5000


5) KIỂM TRA
-----------
- Mở trình duyệt và vào:
    http://127.0.0.1:5000/
  → Kết quả:
    {"message":"✅ ThamAI backend đang chạy"}

- Có thể xem thêm các file README.txt và README_test_local.txt
  để test Chat và Voice trực tiếp.


===========================================
 LƯU Ý:
 - Nếu chưa có API key thì hệ thống chạy ở chế độ GIẢ LẬP.
 - Khi có API key → mở file .env, điền vào OPENAI_API_KEY.
===========================================
