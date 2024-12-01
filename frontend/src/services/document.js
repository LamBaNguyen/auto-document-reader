import api from './api';

export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const readTextAloud = async (text) => {
  try {
    const response = await api.post('/tts/read', { text });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const translateText = async (text, language) => {
  try {
    const response = await api.post('/translate', { text, language });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};
