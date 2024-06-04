import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';
import ToggleSelected from '../ToggleSelectedComponent';
import './styles.css';

export default function RelatedIdeaModal({
  id = null,
  onClose,
  ideaData,
  majorField, // for the projectData.majorfield
  minorField, //only Characters or Location, ideaData.minorfield
  idField, // for the projectData.majorfield.idField
}) {
  const navigate = useNavigate();

  const { projectId } = useParams();

  const { currentProjectData, setCurrentProjectData } = useScript();

  const [selectedArray, setSelectedArray] = useState(
    ideaData[`${minorField}`].length > 0 ? ideaData[`${minorField}`] : []
  );
  const [unselectedArray, setUnselectedArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  const [inputValue, setInputValue] = useState('');

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }

  function save() {
    console.log('saved');
    let projectData = currentProjectData;
    for (let index = 0; index < projectData[`ideas`].length; index++) {
      if (
        projectData[`ideas`][index] == ideaData &&
        projectData[`ideas`][index].Project_ID == projectId
      ) {
        projectData[`ideas`][index][`${minorField}`] = selectedArray;
        setCurrentProjectData(projectData);
        onClose();
        //setChanged(!changed);
      }
    }
  }

  useEffect(() => {
    console.log('changed');
    let filteredArr = [];
    let unselectedArr = [];
    selectedArray && selectedArray.length > 0
      ? currentProjectData[`${majorField}`].map((character) =>
          selectedArray.includes(character[`${idField}`])
            ? filteredArr.push(character)
            : unselectedArr.push(character)
        )
      : currentProjectData[`${majorField}`].map((character) =>
          unselectedArr.push(character)
        );

    console.log(filteredArr);
    console.log(unselectedArr);
    setFilteredArray(filteredArr);
    setUnselectedArray(unselectedArr);
  }, [selectedArray]);

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
          <div>
            <h2>Selected Characters</h2>
            <div className="selected-container">
              {selectedArray && selectedArray.length > 0 ? (
                filteredArray.map((data) => (
                  <ToggleSelected
                    data={data}
                    nameField={'Name'}
                    idField={idField}
                    selectedArray={selectedArray}
                    setSelected={setSelectedArray}
                    key={data[`${idField}`]}
                  />
                ))
              ) : (
                <p>No Related Characters</p>
              )}
            </div>
          </div>
          <div>
            <h2>Unselected Characters</h2>
            <div className="not-selected-container">
              {unselectedArray && unselectedArray.length > 0 ? (
                unselectedArray.map((data) => (
                  <ToggleSelected
                    data={data}
                    nameField={'Name'}
                    idField={idField}
                    selectedArray={selectedArray}
                    setSelected={setSelectedArray}
                    key={data[`${idField}`]}
                  />
                ))
              ) : (
                <p>All characters chosen!!!</p>
              )}
            </div>
          </div>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
