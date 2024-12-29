from app.controllers.user_controller import register, login
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from bson import ObjectId  # Thêm import này để làm việc với ObjectId của MongoDB

# Tạo Blueprint
auth_bp = Blueprint('auth', __name__)

# Route đăng ký
@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register_route():
    if request.method == 'OPTIONS':
        return '', 200  # Phản hồi thành công cho yêu cầu OPTIONS
    return register()

# Route đăng nhập
@auth_bp.route('/login', methods=['POST'])
def login_route():
    return login()

# Route lấy thông tin người dùng (được bảo vệ bởi JWT)
@auth_bp.route('/user', methods=['GET'])
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
