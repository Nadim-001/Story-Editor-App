import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';

export default function NewLocationModal({ id = null, onClose }) {
  const navigate = useNavigate();

  const { projectId } = useParams();

  const { currentProjectData, setCurrentProjectData, setCurrentCharacter } =
    useScript();

  const [inputValue, setInputValue] = useState('');

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    let projectData = currentProjectData;
    let randomNum = Math.floor(Math.random() * 1000000);

    e.preventDefault();

    projectData.locations.push({
      Location_ID: randomNum,
      Project_ID: parseInt(projectId),
      Name: e.target.form['location_name'].value,
      Population: 0,
      Description: 'Blank',
      Coordinates: '0.00, 0.00',
      Related_Location: [],
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
          <h1>Add New Location</h1>
        </div>
        <div className="body">
          <form autoComplete="off">
            <div>
              <label for="location_name">Location Name</label>
              <input
                type="text"
                id="location_name"
                placeholder="Enter Location Name"
                value={inputValue}
                onChange={(e) => handleOnChange(e)}
              />
            </div>

            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
