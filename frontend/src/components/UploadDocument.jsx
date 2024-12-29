import React, { useState } from 'react';
import { uploadDocument } from '../services/document';
import { toast } from 'react-toastify';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Vui lòng chọn một tệp để tải lên.');
      return;
    }

    setIsUploading(true);
    try {
      const response = await uploadDocument(file);
      if (response.success) {
        toast.success('Tệp đã được tải lên thành công!');
      } else {
        toast.error('Đã xảy ra lỗi khi tải tệp lên.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Lỗi khi tải lên tệp.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full p-6 border-dashed border-2 border-gray-300 rounded-lg text-center bg-gray-50">
      <form onSubmit={handleUpload} className="relative">
        {/* Khu vực tải lên tệp */}
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" className="lucide lucide-upload w-6 h-6 text-gray-600 mb-2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>
          <span class="font-medium text-gray-600">
            Nhấp để tải lên tệp (tối đa 50MB)
          </span>
          <span class="text-sm text-gray-500 mt-2">
            Định dạng được hỗ trợ: .txt, .pdf, .doc, .docx, .xlsx, .xls, .ods
          </span>
        </div>
        {/* Input Tệp */}
        <input
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <p className="mt-4 text-sm text-gray-600">
            Tệp được chọn: <span className="font-semibold">{file.name}</span>
          </p>
        )}

        {/* Nút Trích Xuất */}
        <button
          type="submit"
          className={`mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg text-sm font-medium ${!file || isUploading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:opacity-90'
            }`}
          disabled={!file || isUploading}
        >
          <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mr-2 h-5 w-5">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M10 9H8"></path><path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
          </svg>
          <span>{isUploading ? 'Đang tải lên...' : 'Trích xuất văn bản'}</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default UploadDocument;
