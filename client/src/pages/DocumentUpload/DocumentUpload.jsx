import React from 'react';

export default function DocumentUpload() {
  return (
    <div>
      <h1>Upload Financial Statements</h1>
      <p>Upload M-Pesa or Bank statements (PDF/Image) to begin processing.</p>
      <input type="file" accept=".pdf,.png,.jpg" />
    </div>
  );
}
