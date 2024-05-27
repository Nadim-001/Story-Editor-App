import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../useOutsideClick';
import projectData from '../../data';
import { useParams } from 'react-router-dom';
import { useScript } from '../../contexts';

export default function SceneCharacterName({
  originalInputValue,
  inputType,
  index,
  field,
  changed,
  setChanged,
  characterArray = [],
  placeholder = null,
  upperCase = false,
  originalExtensionValue,
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

  const [newExtensionValue, setNewExtensionValue] = useState(
    originalExtensionValue
  );
  const [lastExtensionValue, setLastExtensionValue] = useState(
    originalExtensionValue
  );

  const [isFocus, setIsFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useOutsideClick(ref, () => setEditing(false));

  function handleOnDoubleClick() {
    setEditing(true);
  }

  function handleOnChange(e) {
    if (upperCase) {
      setNewState(e.target.value.toUpperCase());
    }
  }

  function handleOnChangeExtension(e) {
    if (upperCase) {
      setNewExtensionValue(e.target.value.toUpperCase());
    }
  }

  function saveData() {
    //TODO: Save
    let projectData = currentProjectData;
    for (let i = 0; i < projectData.chapters.length; i++) {
      if (projectData.chapters[i].Chapter_ID == currentChapter) {
        projectData.chapters[i].Chapter_Content[index][`${field}`] = newState;
        projectData.chapters[i].Chapter_Content[index][`extension`] =
          newExtensionValue;

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
      setLastExtensionValue(newExtensionValue);
      setChanged(!changed);
      // console.log(projectData);
    }
    if (originalInputValue == newState) {
      setNewState(originalInputValue);
    }
    if (newState == undefined || newState == '') {
      setNewState(originalInputValue);
    }
    if (originalExtensionValue == newExtensionValue) {
      setNewExtensionValue(originalExtensionValue);
    }
    if (newExtensionValue == undefined) {
      setNewExtensionValue(originalExtensionValue);
    }
  }, [editing]);

  return (
    <>
      {!editing ? (
        <div onDoubleClick={handleOnDoubleClick}>
          {newState ? newState : originalInputValue} (
          {newExtensionValue ? newExtensionValue : originalExtensionValue})
        </div>
      ) : (
        <div ref={ref} style={{ border: '1px solid black' }}>
          <div>
            <input
              type={inputType}
              value={newState}
              placeholder={placeholder}
              onChange={(e) => handleOnChange(e)}
              onKeyUp={(e) => handleKeyPress(e)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                if (!isHovered) {
                  setIsFocus(false);
                }
              }}
              //onBlur={(e) => setIsFocus(false)}
            />
            {isFocus && (
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {characterArray.map((character, i) =>
                  character.indexOf(newState) > -1 ? (
                    <div
                      key={i}
                      onClick={() => {
                        setNewState(character);
                        setIsFocus(false);
                      }}
                    >
                      {character}
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
          <input
            type={inputType}
            value={newExtensionValue}
            placeholder={'Enter Extension e.g. (V.O)'}
            onChange={(e) => handleOnChangeExtension(e)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        </div>
      )}
    </>
  );
}
