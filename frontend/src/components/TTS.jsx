import React, { useState } from 'react';
import { readTextAloud } from '../services/document';

const TTS = () => {
  const [text, setText] = useState('');

  const handleReadText = async (e) => {
    e.preventDefault();
    const response = await readTextAloud(text);
    if (response.success) {
      alert('Text is being read aloud');
    } else {
      alert('Error reading text aloud');
    }
  };

  return (
    <div>
      <h2>Text-to-Speech</h2>
      <textarea
        placeholder="Enter text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={handleReadText}>Read Aloud</button>
    </div>
  );
};

export default TTS;
