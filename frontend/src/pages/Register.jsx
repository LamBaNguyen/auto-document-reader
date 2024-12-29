import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register({ email, password });
    if (response.success) {
      toast.success('Đăng ký thành công!',{
        icon: '🎉',});
      navigate('/login'); // Chuyển hướng tới trang đăng nhập
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <Link to='/'><img src="./logo.webp" alt="auto_document_reader" className="mx-auto h-20 "/></Link>
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Đăng ký tài khoản</span>
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Tạo một tài khoản để cùng LOR trải nghiệm nha!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg"
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
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Đã có tài khoản?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
            Đăng nhập tại đây!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
