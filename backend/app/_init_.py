from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# Hàm khởi tạo ứng dụng Flask
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Cấu hình MongoDB
    app.config["MONGO_URI"] = "mongodb+srv://lam208:4BvCFILelDXTUOv1@cluster0.gcqyosi.mongodb.net/auto_document_reader?retryWrites=true&w=majority"
    mongo = PyMongo(app)

    # Thêm MongoDB vào app context
    app.mongo = mongo

    # Cấu hình JWT
    app.config['JWT_SECRET_KEY'] = 'nguyenbalam'  # Đổi khóa bí mật
    jwt = JWTManager(app)
    
    # Đăng ký Blueprint
    from app.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app

