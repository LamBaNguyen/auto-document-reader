import React, { useState } from "react";

const TTS = () => {
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(0);
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [voiceType, setVoiceType] = useState("standard");
  const [language, setLanguage] = useState("en-US");
  const [voice, setVoice] = useState("Jenny");

  const handleGenerateVoice = () => {
    // Xử lý tạo giọng nói
    console.log("Generating voice with settings:", { text, speed, volume, pitch, language, voice });
  };

  const handleReset = () => {
    setSpeed(0);
    setVolume(0);
    setPitch(0);
    setVoiceType("standard");
    setLanguage("en-US");
    setVoice("Jenny");
    setText("");
  };

  return (
    <div className="flex flex-1 flex-col gap-2 p-3 pb-8 md:px-8 lg:px-12">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Chuyển văn bản thành giọng nói</h1>

      {/* Khung nhập văn bản */}
      <div className="flex-1 mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 border rounded-lg p-4 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Nhập văn bản của bạn tại đây..."
          maxLength={20000}
        />
        <div className="text-right text-gray-500 mt-1">{text.length} / 20000</div>
      </div>

      {/* Thanh công cụ */}
      <div className="flex justify-end items-center space-x-2 mb-4">
        <button
          onClick={() => setText("")}
          className="text-gray-600 px-3 py-2 border rounded-lg hover:bg-gray-100"
        >
          Xóa văn bản
        </button>
        <button
          onClick={handleGenerateVoice}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tạo giọng nói
        </button>
      </div>

      {/* Cài đặt giọng nói */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Cột 1 */}
        <div className="flex-1 mb-4">
          <h2 className="text-lg font-semibold mb-2">Cài đặt giọng nói</h2>
          <div className="flex items-center mb-2">
            <button
              className={`px-3 py-2 rounded-lg border ${
                voiceType === "standard" ? "bg-blue-50 border-blue-500 text-blue-600" : "text-gray-700"
              }`}
              onClick={() => setVoiceType("standard")}
            >
              Giọng nói chuẩn
            </button>
            {/* <button
              className={`px-3 py-2 rounded-lg ml-2 border ${
                voiceType === "custom" ? "bg-blue-50 border-blue-500 text-blue-600" : "text-gray-700"
              }`}
              onClick={() => setVoiceType("custom")}
            >
              Giọng nói đã nhân bản
            </button> */}
          </div>

          {/* Chọn ngôn ngữ */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Chọn ngôn ngữ</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none"
            >
              <option value="en-US">English (United States)</option>
              <option value="vi-VN">Tiếng Việt</option>
            </select>
          </div>

          {/* Chọn giọng nói */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Chọn giọng nói</label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none"
            >
              <option value="Jenny">Jenny (Female)</option>
              <option value="Tom">Tom (Male)</option>
            </select>
          </div>
        </div>

        {/* Cột 2 */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Tùy chỉnh</h2>
          {/* Tốc độ */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Tốc độ</label>
            <input
              type="range"
              min={-100}
              max={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Âm lượng */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Âm lượng</label>
            <input
              type="range"
              min={-100}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Cao độ */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Cao độ</label>
            <input
              type="range"
              min={-100}
              max={100}
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 border rounded-lg text-gray-600 hover:bg-gray-200"
          >
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default TTS;
