import requests

url = "http://127.0.0.1:5000/chat"
payload = {"message": "Xin chào"}  # có Unicode
r = requests.post(url, json=payload, timeout=30)
print("Status:", r.status_code)
print("JSON:", r.json())
