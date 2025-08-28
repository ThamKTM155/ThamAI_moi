import requests

url = "http://127.0.0.1:5000/chat"
payload = {"message": "Xin chào"}
response = requests.post(url, json=payload)

print("Status code:", response.status_code)
print("Response:", response.json())
