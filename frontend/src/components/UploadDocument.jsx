import React, { useState } from 'react';
import { uploadDocument } from '../services/document';

const UploadDocument = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const response = await uploadDocument(file);
    if (response.success) {
      alert('File uploaded successfully');
    } else {
      alert('Error uploading file');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadDocument;
