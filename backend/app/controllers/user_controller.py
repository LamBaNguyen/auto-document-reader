from datetime import datetime, timedelta
from flask import request, jsonify, current_app
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

#đăng ký
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email và mật khẩu không được để trống"}), 400

    # Kiểm tra người dùng tồn tại
    mongo = current_app.mongo
    if mongo.db.users.find_one({"email": email}):
        return jsonify({"success": False, "message": "Email đã được sử dụng"}), 409

    # Mã hóa mật khẩu trước khi lưu
    hashed_password = generate_password_hash(password)

    # Thêm người dùng mới vào MongoDB
    mongo.db.users.insert_one({"email": email, "password": hashed_password, "created_at": datetime.utcnow()})

    return jsonify({"success": True, "message": "Đăng ký thành công!"}), 201
#đăng nhập
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email và mật khẩu không được để trống"}), 400

    # Kiểm tra người dùng trong MongoDB
    mongo = current_app.mongo
    user = mongo.db.users.find_one({"email": email})
    
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"success": False, "message": "Sai email hoặc mật khẩu"}), 401

    # Tạo JWT token
    access_token = create_access_token(identity=str(user['_id']), expires_delta=timedelta(hours=1))

    return jsonify({
        "success": True,
        "message": "Đăng nhập thành công!",
        "token": access_token
    }), 200
