import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../useOutsideClick';
import projectData from '../../data';
import { useParams } from 'react-router-dom';
import { useScript } from '../../contexts';

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
  const { currentProjectData, setCurrentProjectData, currentChapter } =
    useScript();

  const [editing, setEditing] = useState(false);
  const [newState, setNewState] = useState(originalInputValue);
  const [lastValue, setLastValue] = useState(originalInputValue);

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
    let projectData = currentProjectData;
    for (let i = 0; i < projectData.chapters.length; i++) {
      if (projectData.chapters[i].Chapter_ID == currentChapter) {
        projectData.chapters[i].Chapter_Content[index][`${field}`] = newState;
        //setCurrentProjectData(projectData);
        console.log(projectData.chapters[i].Chapter_Content[index][`${field}`]);
      }
    }
  }

  function handleKeyPress(e) {
    if (e.code == 'Enter') {
      setEditing(false);
    }
  }

  useEffect(() => {
    if (editing == false && lastValue !== newState) {
      saveData();
      setLastValue(newState);
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
