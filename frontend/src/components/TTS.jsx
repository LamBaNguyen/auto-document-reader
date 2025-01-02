import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { textToSpeech } from "../services/api";

const TTS = () => {
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(0);
  const [volume, setVolume] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [voiceType, setVoiceType] = useState("standard");
  const [language, setLanguage] = useState("en-US");
  const [voice, setVoice] = useState("Jenny");

  const textInput = useRef(null);

  const isValidBase64 = (str) => {
    try {
      atob(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  const cleanBase64 = (str) => {
    // 1. Loại bỏ tiền tố b' và dấu nháy đơn
    let cleaned = str.replace(/^b['"]/, "");
    // 2. Loại bỏ ký tự \xNN
    cleaned = cleaned.replace(/\\x[0-9a-fA-F]{2}/g, "");
    // 3. Loại bỏ tất cả các ký tự không hợp lệ
    cleaned = cleaned.replace(/[^A-Za-z0-9+/=]/g, "");

    // 4. Kiểm tra và thêm padding
    const padding = cleaned.length % 4;
    if (padding === 2) {
      cleaned += "==";
    } else if (padding === 3) {
      cleaned += "=";
    }
    return cleaned;
  };

  const handleGenerateVoice = async () => {
    if (!text.trim()) {
      toast.error("Bạn chưa nhập văn bản ^^!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      textInput.current.focus();
      return;
    }

    try {
      toast.info("Đang xử lý, vui lòng chờ...");

      const gender = voice === "Jenny" ? "FEMALE" : "MALE";
      console.log("dữ liệu", text, language);

      const response = await textToSpeech({
        text,
        lang: language,
        gender,
      });
      console.log("Response from TTS API:", response);
      console.log("Response type from TTS API:", typeof response);
      console.log("Response data type from TTS API:", typeof response.data);
      console.log("Raw response data:", response.data);

      if (response && response.data && typeof response.data === "string") {
        try {
          let cleanedBase64 = cleanBase64(response.data);
          console.log("Clean:", cleanedBase64);
          if (!isValidBase64(cleanedBase64)) {
            throw new Error("Chuỗi base64 không hợp lệ sau khi làm sạch!");
          }

          // Convert the base64 string to a byte array
          const byteCharacters = atob(cleanedBase64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          const blob = new Blob([byteArray], { type: "audio/mp3" });
          const audioUrl = URL.createObjectURL(blob);
          console.log("audioUrl:", audioUrl);
          const audio = new Audio(audioUrl);
          audio.play().catch((error) => {
            console.error("Error playing audio:", error);
            toast.error("Đã xảy ra lỗi khi phát âm thanh.");
          });
          toast.success("Tạo giọng nói thành công!");
        } catch (error) {
          console.error("audioUrl error", error);
          toast.error("Đã xảy ra lỗi khi tạo giọng nói.");
        }
      } else {
        toast.error("Đã xảy ra lỗi khi tạo giọng nói, không đúng định dạng.");
      }
    } catch (error) {
      console.error("Error calling TTS API:", error);
      toast.error("Lỗi trong quá trình tạo giọng nói. Vui lòng thử lại.");
    }
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
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Chuyển văn bản thành giọng nói
      </h1>

      {/* Khung nhập văn bản */}
      <div className="flex-1 mb-4">
        <textarea
          value={text}
          ref={textInput}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 border rounded-lg p-4 text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Nhập văn bản của bạn tại đây..."
          maxLength={5000}
        />
        <div className="text-right text-gray-500 mt-1">
          {text.length} / 5000
        </div>
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
                voiceType === "standard"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "text-gray-700"
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
            <label className="block text-gray-700 font-medium mb-1">
              Chọn ngôn ngữ
            </label>
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
            <label className="block text-gray-700 font-medium mb-1">
              Chọn giọng nói
            </label>
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
            <label className="block text-gray-700 font-medium mb-1">
              Tốc độ
            </label>
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
            <label className="block text-gray-700 font-medium mb-1">
              Âm lượng
            </label>
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
            <label className="block text-gray-700 font-medium mb-1">
              Cao độ
            </label>
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
