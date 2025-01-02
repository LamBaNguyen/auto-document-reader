from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
import secrets

def create_app():
    app = Flask(__name__)

    # Configure CORS
    allowed_origins = ["http://localhost:3000","http://192.168.1.97:3000","https://be-read-doc-automatic.vercel.app"]  # Chỉ định domain của frontend
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Configure MongoDB
    app.config["MONGO_URI"] = "mongodb+srv://lam208:4BvCFILelDXTUOv1@cluster0.gcqyosi.mongodb.net/auto_document_reader?retryWrites=true&w=majority"
    mongo = PyMongo(app)
    app.mongo = mongo

    # Configure JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', secrets.token_urlsafe(32))
    jwt = JWTManager(app)

    # Register Blueprints
    from app.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')
    
    return app