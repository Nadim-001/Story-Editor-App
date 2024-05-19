import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../useOutsideClick';
import projectData from '../../data';
import { useParams } from 'react-router-dom';

export default function ClickEditComponent({
  originalInputValue,
  newState,
  setNewState,
  majorField,
  minorField,
  index,
  placeholder = null,
}) {
  //Major Field is projectData.MajorField. it could be characters, chapters or whatever.
  //Minor Field is projectData.[e.g. chapters].MinorField it could be chapter_name, text or whatever
  const ref = useRef();

  const { projectId } = useParams();

  const [editing, setEditing] = useState(false);

  useOutsideClick(ref, () => setEditing(false));

  function handleOnDoubleClick() {
    setEditing(true);
  }

  function handleOnChange(e) {
    setNewState(e.target.value);
  }

  function saveData() {
    for (let index = 0; index < projectData.chapters.length; index++) {
      console.log('Reached 0');
      console.log(projectData[`${majorField}`][index][`${minorField}`]);
      if (
        projectData[`${majorField}`][index][`${minorField}`] ==
          originalInputValue &&
        projectData[`${majorField}`][index].Project_ID == projectId
      ) {
        console.log('Reached 1');
        if (newState !== '') {
          projectData[`${majorField}`][index][`${minorField}`] == newState;
          console.log('Reached 2');
        } else {
          setNewState(originalInputValue);
          console.log('Reached 3');
        }
      }
    }
  }

  function handleKeyPress(e) {
    if (e.code == 'Enter') {
      setEditing(false);
      saveData();
    }
  }

  useEffect(() => {
    if (editing == false && originalInputValue !== newState) {
      saveData();
      console.log(projectData);
    }
  }, [editing]);

  console.log('component');

  return (
    <>
      {!editing ? (
        <div
          onDoubleClick={handleOnDoubleClick}
          style={newState !== originalInputValue ? { color: 'red' } : null}
        >
          {newState}
          <span className="chapter-index"> {index + 1}</span>
        </div>
      ) : (
        <div ref={ref}>
          <input
            type="text"
            value={newState}
            placeholder={placeholder}
            onChange={(e) => handleOnChange(e)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        </div>
      )}
    </>
  );
}
