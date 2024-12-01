import React, { useState } from 'react';
import UploadDocument from '../components/UploadDocument';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('textToSpeech'); // Tab mặc định là "Văn bản thành giọng nói"
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('English (United States)');
  const [voice, setVoice] = useState('Jenny (Female)');

  // Xử lý tạo âm thanh từ văn bản
  const handleCreate = () => {
    alert('Đang tạo giọng nói từ văn bản...');
  };

  // Xử lý xóa văn bản
  const handleClear = () => {
    setText('');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
       {/* Header Navigation */}
       <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="./logo.webp" // Đặt đường dẫn tới logo của bạn
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">L O R</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#clone-voice" className="text-gray-600 hover:text-gray-900">
              Klon giọng nói
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">
              Giá cả
            </a>
            <a href="#history" className="text-gray-600 hover:text-gray-900">
              Lịch sử
            </a>
            <a href="#blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </a>
          </nav>

          {/* Account Options */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg">
              Bảng điều khiển
            </button>
            <img
              src="/path-to-avatar.jpg" // Đặt đường dẫn tới ảnh đại diện của bạn
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
            <select className="text-sm bg-transparent text-gray-600 border-none focus:outline-none">
              <option value="VN">VN</option>
              <option value="EN">EN</option>
            </select>
          </div>
        </div>
      </header>
      {/* Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-2 flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'textToSpeech'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('textToSpeech')}
          >
            Văn bản thành giọng nói
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'fileToSpeech'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('fileToSpeech')}
          >
            Tệp thành giọng nói
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'textToSpeech' ? (
          // Tab "Văn bản thành giọng nói"
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Text Input */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Nhập văn bản của bạn...</h2>
              <span className="text-sm text-gray-500">0 / 5000</span>
            </div>
            <textarea
              rows="8"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full mt-4 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập văn bản của bạn..."
            ></textarea>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleClear}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Xóa văn bản
              </button>
            </div>

            {/* Options */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ngôn ngữ</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>English (United States)</option>
                  <option>Vietnamese</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Giọng nói</label>
                <select
                  value={voice}
                  onChange={(e) => setVoice(e.target.value)}
                  className="h-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option>Jenny (Female)</option>
                  <option>John (Male)</option>
                  <option>Anna (Female)</option>
                </select>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <button
                onClick={handleCreate}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg text-lg font-semibold hover:opacity-90 transition duration-300"
              >
                Tạo
              </button>
            </div>
          </div>
        ) : (
          // Tab "Tệp thành giọng nói"
          <div className="bg-white shadow-md rounded-lg p-6">
            <UploadDocument />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
