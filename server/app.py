from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import base64
import os

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/speech", methods=["POST"])
def speech_to_text():
    # Nhận file âm thanh từ frontend
    audio_file = request.files["audio"]

    # Gửi sang Whisper API
    transcript = openai.Audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )

    user_text = transcript.text

    # Gửi text sang GPT
    completion = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": user_text}]
    )
    reply_text = completion.choices[0].message.content

    # Tạo giọng nói TTS
    speech_file_path = "reply.mp3"
    with openai.audio.speech.with_streaming_response.create(
        model="gpt-4o-mini-tts",
        voice="alloy",
        input=reply_text
    ) as response:
        response.stream_to_file(speech_file_path)

    # Trả về text + audio (base64)
    with open(speech_file_path, "rb") as f:
        audio_base64 = base64.b64encode(f.read()).decode("utf-8")

    return jsonify({
        "text": reply_text,
        "audio": audio_base64
    })

if __name__ == "__main__":
    app.run(port=5000)
