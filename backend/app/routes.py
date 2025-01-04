from app.controllers.user_controller import register, login, add_document, decode, get_data_by_user_id
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
import base64
from gtts import gTTS
import io
import os
import requests
import json

# Tạo Blueprint
auth_bp = Blueprint('auth', __name__)

#
@auth_bp.route('/getdata', methods=['GET'])
def get_data():
    
    user_id = request.args.get("user_id")
    print('userID',user_id)
    return get_data_by_user_id(user_id)
# Route tts
@auth_bp.route('/texttospeech', methods=['POST'])
def text_to_speech():
    try:

        data = request.form
        text = data.get('text')
        lang = data.get('lang')
        gender = data.get('gender')
        token = data.get('token')
        user_id=json.loads(token)
        url = "https://be-read-doc-automatic.vercel.app/api/texttospeech"
        # Dữ liệu bạn muốn gửi
        data = {
            "text": text,
            "lang": lang,
            "gender": gender,
            
        }
        # Gửi POST request
        response = requests.post(url, data=data)
        #Lưu dữ liệu vào db
        add_document(user_id['sub'],text,json.loads(response.text)['data'],gender)
        return response.json()
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    

# Route đăng ký
@auth_bp.route('/auth/register', methods=['POST', 'OPTIONS'])
def register_route():
    if request.method == 'OPTIONS':
        return '', 200  # Phản hồi thành công cho yêu cầu OPTIONS
    return register()


# Route đăng nhập
@auth_bp.route('/auth/login', methods=['POST'])
def login_route():
    return login()

# Route lấy thông tin người dùng (được bảo vệ bởi JWT)
@auth_bp.route('/auth/user', methods=['GET'])
@jwt_required()  # Bảo vệ route bằng JWT
def get_user_info():
    user_id = get_jwt_identity()  # Lấy user_id từ JWT token

    # Chuyển đổi user_id thành ObjectId
    if isinstance(user_id, str):
        user_id = ObjectId(user_id)

    mongo = current_app.mongo
    user = mongo.db.users.find_one({"_id": user_id})
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    # Trả về thông tin người dùng (bao gồm email và trạng thái)
    return jsonify({
        "email": user["email"],
        "status": user.get("status", "inactive"),  # Nếu không có status, trả về 'inactive'
        "created_at": user["created_at"]
    })