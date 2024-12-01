import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="w-full">
      <div className="w-full bg-gray-100"> 
        <div className="bg-white text-gray-900 py-8 pb-4">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Link to='/' className="no-underline"><img src="./logo.webp" alt="auto_document_reader" className="mx-auto h-20 "/></Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide leading-relaxed">
              <span className="text-gray-900">Chào mừng bạn đến </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">L O R</span> -
              <span className="text-gray-900"> Ứng dụng đọc tài liệu tự động</span>
            </h1>
            <p className="text-sm text-gray-900">
              <span className="text-green-500">LOR là một công cụ đọc tài liệu tự động </span> <span>chuyển văn bản thành giọng nói (TTS) trực tuyến miễn phí,</span> <Link to="/login" className="no-underline">Đăng nhập</Link> để có thêm trải nghiệm nha!
            </p>
          </div>
          <footer className="bg-gray-200 p-4 text-center">
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} L O R. All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Home;