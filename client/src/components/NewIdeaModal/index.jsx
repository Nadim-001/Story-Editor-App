import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';

export default function NewIdeaModal({ id = null, onClose }) {
  const navigate = useNavigate();

  const { projectId } = useParams();

  const { currentProjectData, setCurrentProjectData, setCurrentCharacter } =
    useScript();

  const [inputValue, setInputValue] = useState('');

  const [charName, setCharName] = useState();

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    let projectData = currentProjectData;
    let randomNum = Math.floor(Math.random() * 1000000);

    e.preventDefault();

    projectData.ideas.push({
      Idea_ID: randomNum,
      Project_ID: parseInt(projectId),
      Title: e.target.form['idea_title'].value,
      Content: e.target.form['idea_content'].value,
      Status: 'Not Used',
      Characters: [],
      Location: [],
    });

    //setting character id
    setCurrentCharacter(randomNum);
    setCurrentProjectData(projectData);
    // //If submitted correctly move on to Individual Project Page
    // //fetch project ID before navigating
    navigate(`./${randomNum}`);
  }
  return (
    <div id={id || 'Modal'} className="modal">
      <div className="modal-content">
        <div className="header">
          <span className="close-modal-icon" onClick={onClose}>
            &times;
          </span>
          <h1>Add New Idea</h1>
        </div>
        <div className="body">
          <form autoComplete="off">
            <div>
              <label for="idea_title">Idea Title</label>
              <input
                type="text"
                id="idea_title"
                placeholder="Enter Idea Title"
                value={inputValue}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="idea_content">Idea Content: </label>
              <input
                type="text"
                id="idea_content"
                placeholder="Enter Idea Content"
                // value={inputValue}
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
