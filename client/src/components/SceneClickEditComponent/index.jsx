import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../useOutsideClick';
import projectData from '../../data';
import { useParams } from 'react-router-dom';

export default function SceneClickEditComponent({
  originalInputValue,
  inputType,
  index,
  field,
  placeholder = null,
  upperCase = false,
}) {
  //Major Field is projectData.MajorField. it could be characters, chapters or whatever.
  //Minor Field is projectData.[e.g. chapters].MinorField it could be chapter_name, text or whatever

  const ref = useRef();

  const { projectId } = useParams();

  const [editing, setEditing] = useState(false);
  const [newState, setNewState] = useState(originalInputValue);

  useOutsideClick(ref, () => setEditing(false));

  function handleOnDoubleClick() {
    setEditing(true);
  }

  function handleOnChange(e) {
    if (upperCase) {
      setNewState(e.target.value.toUpperCase());
    } else {
      setNewState(e.target.value);
    }
  }

  function saveData() {
    //TODO: Save
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
      // console.log(projectData);
    }
    if (originalInputValue == newState) {
      setNewState(originalInputValue);
    }
    if (newState == undefined) {
      setNewState(originalInputValue);
    }
  }, [editing]);

  return (
    <>
      {!editing ? (
        <div onDoubleClick={handleOnDoubleClick}>
          {newState ? newState : originalInputValue}
        </div>
      ) : (
        <div ref={ref}>
          <input
            type={inputType}
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
