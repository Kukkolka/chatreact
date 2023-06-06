import React, { useState } from 'react';
import './InputText.css';

export default function InputText({ addMessage }) {
  const [message, setMessage] = useState('');

  function addAMessage() {
    addMessage({
      message,
    });
    setMessage('');
  }

  return (
    <div className="input-text-container">
      <textarea
        className="input-textarea"
        rows={6}
        placeholder="Write something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button className="input-button" onClick={addAMessage}>
        Send
      </button>
    </div>
  );
}
