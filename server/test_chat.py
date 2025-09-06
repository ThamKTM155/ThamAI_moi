import requests

url = "http://127.0.0.1:5000/chat"  # địa chỉ backend Flask đang chạy

# Tin nhắn muốn gửi tới trợ lý
payload = {"message": "Xin chào, bạn là ai?"}

try:
    response = requests.post(url, json=payload)
    print("Status code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("Lỗi khi gửi request:", e)
