from app.controllers.user_controller import register, login
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
import base64
from gtts import gTTS
import io
import os


# Tạo Blueprint
auth_bp = Blueprint('auth', __name__)

# Route tts
@auth_bp.route('/texttospeech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get('text')
    lang = data.get('lang')
    gender = data.get('gender')
    
    try:
        # Tạo đối tượng gTTS
        tts = gTTS(text=text, lang=lang, slow=False)
        
         # Lưu audio vào bộ nhớ
        mp3_fp = io.BytesIO()
        tts.write_to_fp(mp3_fp)
        
        # Lấy byte audio từ bộ nhớ
        audio_data = mp3_fp.getvalue()
        
        # Mã hóa sang base64
        encoded_audio = base64.b64encode(audio_data).decode('utf-8')
        
        return jsonify({"data": encoded_audio})
    except Exception as e:
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