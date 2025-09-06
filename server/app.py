from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai
import os, datetime

# ---------------------------
# Load API key từ .env
# ---------------------------
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError("❌ Thiếu OPENAI_API_KEY trong file .env")

openai.api_key = api_key

# ---------------------------
# Khởi tạo Flask
# ---------------------------
app = Flask(__name__)
CORS(app)


# ---------------------------
# API /chat
# ---------------------------
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_msg = data.get("message", "")

        if not user_msg.strip():
            return jsonify({"error": "Tin nhắn rỗng"}), 400

        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Bạn là trợ lý AI ThamAI, trả lời ngắn gọn, tự nhiên bằng tiếng Việt."},
                {"role": "user", "content": user_msg}
            ]
        )

        reply = response.choices[0].message.content.strip()

        return jsonify({
            "reply": reply,
            "timestamp": datetime.datetime.now().isoformat()
        })

    except Exception as e:
        return jsonify({"error": f"Lỗi khi xử lý chat: {str(e)}"}), 500


# ---------------------------
# API /voice
# ---------------------------
@app.route("/voice", methods=["POST"])
def voice():
    try:
        if "file" not in request.files:
            return jsonify({"error": "Không có file ghi âm"}), 400

        audio_file = request.files["file"]

        # B1: chuyển giọng nói -> text
        transcript = openai.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
        user_text = transcript.text.strip()

        # B2: gọi chat để phản hồi
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Bạn là trợ lý AI ThamAI, trả lời ngắn gọn, tự nhiên bằng tiếng Việt."},
                {"role": "user", "content": user_text}
            ]
        )
        reply = response.choices[0].message.content.strip()

        return jsonify({
            "reply": reply,
            "timestamp": datetime.datetime.now().isoformat()
        })

    except Exception as e:
        return jsonify({"error": f"Lỗi khi xử lý voice: {str(e)}"}), 500


# ---------------------------
# Main
# ---------------------------
if __name__ == "__main__":
    print("✅ Đã nạp OPENAI_API_KEY, bắt đầu bằng:", api_key[:8])
    app.run(debug=True)
