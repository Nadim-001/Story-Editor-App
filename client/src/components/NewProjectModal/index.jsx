import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScript } from '../../contexts';

export default function NewProjectModal({ id = null, onClose }) {
  const navigate = useNavigate();

  const { currentProjectData, setCurrentProjectData } = useScript();

  const [inputValue, setInputValue] = useState('');

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    let projectData = currentProjectData;
    let randomNum = Math.floor(Math.random() * 1000000);
    e.preventDefault();
    projectData.projects.push({
      Project_ID: randomNum,
      Name: inputValue,
      Created_by: 1,
    });
    console.log(randomNum);
    console.log(projectData.projects);
    setCurrentProjectData(projectData);
    //If submitted correctly move on to Individual Project Page
    //fetch project ID before navigating
    navigate(`./${randomNum}`);
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
          <form autoComplete="off">
            <label for="project_name">Project Name</label>
            <input
              type="text"
              id="project_name"
              placeholder="Enter Project Name"
              value={inputValue}
              onChange={(e) => handleOnChange(e)}
            />
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
