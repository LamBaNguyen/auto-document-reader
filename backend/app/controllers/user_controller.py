from datetime import datetime, timedelta
from flask import request, jsonify, current_app
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, decode_token
from werkzeug.security import generate_password_hash, check_password_hash


def get_data_by_user_id(user_id):
    try:
        mongo = current_app.mongo
        data = mongo.db.data.find({"user_id": user_id})
        # print(data)
        if not data:
            return jsonify({"message": "Data not found"}), 404
        
        data_list = []
        for a in data:
            # MongoDB objectId sẽ được chuyển thành string nếu cần
            a['_id'] = str(a['_id'])
            data_list.append(a)

        return jsonify(data_list)
    except Exception as e:
        print(e)

def decode(token):
    return decode_token(token)

#add_document
def add_document(user_id, text, audio, voice):
    if not user_id and not text and not audio and not voice :
        return False
    
    mongo = current_app.mongo
    mongo.db.data.insert_one(
        {
         "user_id": user_id, 
         "text": text, 
         "audio": audio,
         "voice": voice,
         "created_at": datetime.now()
        })
    return True
    
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
    mongo.db.users.insert_one(
        {
         "email": email, 
         "password": hashed_password, 
         "created_at": datetime.utcnow(),
         "status": "inactive"
        })

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

    # Kiểm tra trạng thái người dùng
    if user['status'] == "inactive":
        # Cập nhật trạng thái người dùng thành "active" khi đăng nhập thành công
        mongo.db.users.update_one({"email": email}, {"$set": {"status": "active"}})

    # Tạo JWT token
    access_token = create_access_token(identity=str(user['_id']))
    decodea =decode(access_token)
    print('decode_token',decodea)
    return jsonify({
        "success": True,
        "message": "Đăng nhập thành công!",
        "token": decodea
    }), 200