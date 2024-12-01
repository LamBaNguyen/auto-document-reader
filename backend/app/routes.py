from flask import Blueprint, request
from app.controllers.user_controller import register, login

# Tạo Blueprint
auth_bp = Blueprint('auth', __name__)

# Route đăng ký
@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register_route():
    if request.method == 'OPTIONS':
        return '', 200  # Phản hồi thành công cho yêu cầu OPTIONS
     # Lấy dữ liệu từ form
    email = request.form.get('email')
    password = request.form.get('password')

    # Xử lý ảnh nếu có
    avatar = request.files.get('avatar')  # Nhận avatar từ form (nếu có)
    
    # Call hàm register từ controller với avatar
    return register(email, password, avatar)

#Route đăng nhập
@auth_bp.route('/login', methods=['POST'])
def login_route():
    return login()
