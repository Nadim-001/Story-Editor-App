import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';

export default function DeleteModal({
  id = null,
  onClose,
  majorField,
  fieldData,
  navigateOnceDeleted = true,
  setShowModal = false,
}) {
  const navigate = useNavigate();

  const { projectId } = useParams();

  const { currentProjectData, setCurrentProjectData, setCurrentCharacter } =
    useScript();

  function handleOnChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let projectData = currentProjectData;
    const index = projectData[`${majorField}`].indexOf(fieldData);
    console.log(index);
    console.log(fieldData);
    //console.log(projectData[`${majorField}`]);
    projectData[`${majorField}`].splice(index, 1);
    setCurrentProjectData(projectData);
    console.log(projectData);
    console.log('deleted');
    if (navigateOnceDeleted) {
      navigate('../');
    } else {
      setShowModal(false);
    }
  }
  return (
    <div id={id || 'Modal'} className="modal">
      <div className="modal-content">
        <div className="header">
          <h1>
            You are about to delete! This action cannot be reversed! Are You
            Sure?
          </h1>
        </div>
        <div className="body">
          <form autoComplete="off">
            <button onClick={onClose}>No</button>
            <button onClick={(e) => handleSubmit(e)}>Yes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
