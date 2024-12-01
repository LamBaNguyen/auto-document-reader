from flask import request, jsonify
from googletrans import Translator

class TranslationController:
    @staticmethod
    def translate_text():
        data = request.get_json()
        text = data.get('text', '')
        target_language = data.get('language', 'en')

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        translator = Translator()
        translated = translator.translate(text, dest=target_language)

        return jsonify({'translated_text': translated.text})
