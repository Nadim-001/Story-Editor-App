import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewProjectModal({ id = null, onClose }) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    //If submitted correctly move on to Individual Project Page
    navigate('/');
  }
  return (
    <div id={id || 'Modal'} className="modal">
      <div className="modal-content">
        <div className="header">
          <span className="close-modal-icon" onClick={onClose}>
            &times;
          </span>
          <h1>Add New Project</h1>
        </div>
        <div className="body">
          <form>
            <label for="project_name">Project Name</label>
            <input
              type="text"
              id="project_name"
              placeholder="Enter Project Name"
            />
            <button onSubmit={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
