import React, { useState } from 'react';
import { translateText } from '../services/document';

const Translate = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('vi');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async (e) => {
    e.preventDefault();
    const response = await translateText(text, language);
    if (response.success) {
      setTranslatedText(response.data.translated_text);
    } else {
      alert('Error translating text');
    }
  };

  return (
    <div>
      <h2>Translate Text</h2>
      <textarea
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="vi">Vietnamese</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>
      <div>
        <h3>Translated Text:</h3>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default Translate;
