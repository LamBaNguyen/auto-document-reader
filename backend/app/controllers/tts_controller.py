import pyttsx3
from flask import request, jsonify

class TTSController:
    @staticmethod
    def read_text():
        data = request.get_json()
        text = data.get('text', '')

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        engine = pyttsx3.init()
        engine.say(text)
        engine.runAndWait()

        return jsonify({'message': 'Text is being read aloud'})
