import os
from flask import request, jsonify
from app import db
from app.models.document import Document
from app.config import Config

class DocumentController:
    @staticmethod
    def upload_document():
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        filename = file.filename
        file_path = os.path.join(Config.UPLOAD_FOLDER, filename)

        file.save(file_path)

        document = Document(filename=filename)
        db.session.add(document)
        db.session.commit()

        return jsonify({'message': 'File uploaded successfully'})
