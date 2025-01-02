import axios from "axios";

// Cấu hình Axios
const axiosInstance = axios.create({
  baseURL: "https://be-read-doc-automatic.vercel.app/api", // URL gốc
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", // Định dạng form
  },
});

// Hàm chuyển đổi object sang dạng form data
const toFormData = (data) => {
  const formData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

// Gọi API chuyển văn bản thành giọng nói
export const textToSpeech = async ({ text, lang, gender }) => {
    try {
      const response = await axios.post(
        "https://be-read-doc-automatic.vercel.app/api/texttospeech",
        { text, lang, gender }
      );
      return response.data;
    } catch (error) {
      console.error("Error calling TTS API:", error);
      throw error.response?.data || error.message;
    }
  };

// Gọi API tóm tắt văn bản
export const summarizeText = async (text) => {
  try {
    const response = await axiosInstance.post(
      "/summary",
      toFormData({ text })
    );
    return response.data;
  } catch (error) {
    console.error("Error in summarizeText:", error);
    throw error;
  }
};

// Gọi API dịch văn bản
export const translateText = async (text, lang) => {
  try {
    const response = await axiosInstance.post(
      "/translate",
      toFormData({ text, lang })
    );
    return response.data;
  } catch (error) {
    console.error("Error in translateText:", error);
    throw error;
  }
};
