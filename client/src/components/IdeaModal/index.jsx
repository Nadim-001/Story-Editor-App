import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function IdeaModal({ id = null, onClose, idea }) {
  return (
    <div id={id || 'Modal'} className="modal">
      <div className="modal-content">
        <div className="header">
          <span className="close-modal-icon" onClick={onClose}>
            &times;
          </span>
          <h1>{idea.Title}</h1>
        </div>
        <div className="body">
          <p>{idea.Content}</p>
          <p>{idea.Status}</p>
        </div>
      </div>
    </div>
  );
}
