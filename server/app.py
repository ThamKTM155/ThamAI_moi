import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI

# Load biến môi trường từ .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Lấy API key từ file .env (nếu có)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = None
if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)


# -------------------------------
# Route kiểm tra server
# -------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "✅ ThamAI backend đang chạy"})


# -------------------------------
# Route chat (vẫn gọi OpenAI nếu có key)
# -------------------------------
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "Tin nhắn rỗng"}), 400

        # Nếu có API key thì gọi OpenAI
        if client:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "Bạn là trợ lý ảo ThamAI, nói chuyện thân thiện."},
                    {"role": "user", "content": user_message}
                ]
            )
            reply = response.choices[0].message.content
        else:
            # Nếu chưa có key thì trả lời giả lập
            reply = f"📌 (Giả lập) Bạn vừa nói: {user_message}"

        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# Route voice (giả lập, không gọi API)
# -------------------------------
@app.route("/voice", methods=["POST"])
def voice():
    try:
        if "file" not in request.files:
            return jsonify({"error": "Không tìm thấy file voice"}), 400

        file = request.files["file"]

        if file.filename == "":
            return jsonify({"error": "File trống"}), 400

        # ✅ Giả lập xử lý voice
        fake_transcript = "✅ Voice đã nhận thành công (giả lập, chưa gọi OpenAI)."

        return jsonify({"reply": fake_transcript})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------
# Chạy server
# -------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
