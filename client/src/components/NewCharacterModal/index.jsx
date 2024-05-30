import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';

export default function NewCharacterModal({ id = null, onClose }) {
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
    projectData.characters.push({
      Character_ID: randomNum,
      Project_ID: parseInt(projectId),
      Name: e.target.form['character_name'].value,
      Age: parseInt(e.target.form['character_age'].value),
      Role: e.target.form['character_role'].value,
      First_Chapter_Appearance: parseInt(
        e.target.form['character_first_appearance'].value
      ),

      Description: e.target.form['character_description'].value,
      Image: '',
      Date_of_Birth: e.target.form['character_DoB'].value,
      Date_of_Death: e.target.form['character_DoD'].value,
      Gender: e.target.form['character_gender'].value,

      Interests_Hobbies: e.target.form['character_interests'].value,
    });
    console.log(e.target.form['character_name'].value);
    console.log(e.target.form['character_age'].value);
    console.log(e.target.form['character_role'].value);
    console.log(e.target.form['character_first_appearance'].value);
    console.log(e.target.form['character_description'].value);
    console.log(e.target.form['character_DoB'].value);
    console.log(e.target.form['character_DoD'].value);
    console.log(e.target.form['character_gender'].value);
    console.log(e.target.form['character_interests'].value);
    console.log(randomNum);
    console.log(projectData.characters);

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
          <h1>Add New Character</h1>
        </div>
        <div className="body">
          <form autoComplete="off">
            <div>
              <label for="character_name">Character Name</label>
              <input
                type="text"
                id="character_name"
                placeholder="Enter Project Name"
                value={inputValue}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="character_age">Character Age: </label>
              <input
                type="number"
                id="character_age"
                placeholder="Enter Character Age"
                // value={inputValue}
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="character_role">Character Role: </label>
              <input
                type="text"
                id="character_role"
                placeholder="Enter Character Role"
                // value={inputValue}
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="character_description">Character Description: </label>
              <input
                type="text"
                id="character_description"
                placeholder="Enter Character Description"
                // value={inputValue}
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="character_first_appearance">
                Character First Chapter Appearance:{' '}
              </label>
              <input
                type="number"
                id="character_first_appearance"
                placeholder="Enter Character First Chapter Appearance"
                // value={inputValue}
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="character_DoB">Character's Date of Birth: </label>
              <input
                type="date"
                id="character_DoB"
                placeholder="Enter Character's Date of Birth"
                // value={inputValue}
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="character_DoD">Character's Date of Death: </label>
              <input
                type="date"
                id="character_DoD"
                placeholder="Enter Character's Date of Death"
                // value={inputValue}
                // onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <label for="character_gender">Character Gender: </label>

              <select id="character_gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label for="character_interests">Character Interests: </label>
              <input
                type="text"
                id="character_interests"
                placeholder="Enter Character Interests"
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
