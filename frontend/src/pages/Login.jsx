import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser(); // Lấy setUser từ context để cập nhật thông tin người dùng
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    console.log('respon',response.data.token)
    if (response.success) {
      // Lưu thông tin người dùng vào UserContext và localStorage
      const userData = response.data.token; // Lấy thông tin người dùng từ phản hồi API
      setUser(userData); // Cập nhật thông tin người dùng vào context
      localStorage.setItem('user', JSON.stringify(userData)); // Lưu vào localStorage
      toast.success('Đăng nhập thành công!');
      
      navigate('/dashboard'); // Điều hướng đến trang dashboard
    } else {
      toast.error(response.error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Link to='/'><img src="./logo.webp" alt="auto_document_reader" className="mx-auto h-20 "/></Link>
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">L O R xin chào!</span>
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Nhập địa chỉ email và mật khẩu của bạn để truy cập tài khoản của bạn.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Địa chỉ email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Chưa có tài khoản?{' '}
          <a href="/register" className="text-blue-500 hover:text-blue-700 font-medium">
            Đăng ký tại đây!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
