import React, { useState } from "react";
import { Link } from "react-router-dom";
import TTS from "../components/TTS"; // Component Text-to-Speech chính
import UploadDocument from "../components/UploadDocument"; // Component Upload file
import History from "../components/History";
import { useUser } from "../context/UserContext"; // Context lấy thông tin user

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("textToSpeech");
  const { user, loading } = useUser(); // Lấy thông tin user từ context

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full h-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-7 flex-grow">
          {/* Logo */}
          <div className="mb-7">
            <Link to="/" className="flex items-center no-underline">
              <img src="./logo.webp" alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                LOR
              </span>
            </Link>
            <hr className="mt-4 border-gray-600" />
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {" "}
            <button
              onClick={() => setActiveTab("textToSpeech")}
              className={`flex items-center w-full text-left px-4 py-2 rounded-lg font-medium ${
                activeTab === "textToSpeech"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-file-text mr-2 h-7 w-7"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              Chuyển văn bản thành giọng nói
            </button>
            <button
              onClick={() => setActiveTab("fileToSpeech")}
              className={`flex items-center w-full text-left px-4 py-2 rounded-lg font-medium ${
                activeTab === "fileToSpeech"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-file-audio mr-2 h-7 w-7"
              >
                <path d="M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0"></path>
              </svg>
              Chuyển tệp thành giọng nói
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex items-center w-full text-left px-4 py-2 rounded-lg font-medium ${
                activeTab === "history"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-history mr-2 h-5 w-5"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M12 7v5l4 2"></path>
              </svg>
              Lịch sử
            </button>
          </nav>
        </div>

        <div className="p-4">
        <hr className="mt-4 border-gray-600" />

          {/* User Profile */}
          <div className="flex items-center mt-4 space-x-2">
            {/* <img
              src="https://placekitten.com/40/40"
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            /> */}
            <div className="flex flex-col cursor-pointer">
              <span className="font-medium">Account current</span>
              {/* <span className="text-sm text-gray-500">18299 Tín dụng</span> */}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "textToSpeech" && (
          <div>
            {/* <h1 className="text-xl font-bold text-gray-800 mb-4">Chuyển văn bản thành giọng nói</h1> */}
            <TTS />
          </div>
        )}
        {activeTab === "fileToSpeech" && (
          <div>
            <h1 class="text-2xl font-bold text-gray-800 mb-4">
              Chuyển tệp thành giọng nói
            </h1>
            <UploadDocument />
          </div>
        )}
        {activeTab === "history" && (
          <div>
            {/* <h1 className="text-xl font-bold text-gray-800 mb-4">Lịch sử</h1> */}
            <History />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
