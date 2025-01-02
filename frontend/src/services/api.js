import axios from "axios";

const api = axios.create({
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Gọi API chuyển văn bản thành giọng nói
export const textToSpeech = async ({ text, lang, gender }) => {
  try {
    // Tạo dữ liệu dạng x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append("text", text);
    formData.append("lang", lang);
    formData.append("gender", gender);
    // console.log("api", formData);
    const response = await api.post("/api/texttospeech", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Thiết lập header cho form-data
      },
      // responseType: "arraybuffer",
    });

    // Kiểm tra xem phản hồi có chứa dữ liệu âm thanh không
    if (response.data && response.data.data) {
      // console.log("Base64 Response:", response.data);
      return response.data; // Trả về dữ liệu âm thanh
    } else {
      throw new Error("Dữ liệu âm thanh không hợp lệ.");
    }
  } catch (error) {
    console.error("Error calling TTS API:", error);
    throw error.response?.data || error.message;
  }
};

export default api;
