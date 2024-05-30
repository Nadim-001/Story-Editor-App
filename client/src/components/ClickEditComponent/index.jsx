import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../useOutsideClick';
//import projectData from '../../data';
import { useParams } from 'react-router-dom';
import { useScript } from '../../contexts';

export default function ClickEditComponent({
  originalInputValue,
  inputType,
  majorField,
  minorField,
  otherIdField,
  otherIdValue,
  index,
  placeholder = null,
}) {
  //Major Field is projectData.MajorField. it could be characters, chapters or whatever.
  //Minor Field is projectData.[e.g. chapters].MinorField it could be chapter_name, text or whatever
  //OtherID is just in case there are 2 e.g. characters with the same name. we just want 1 of the names to be updated in the 'for loop' so we differentiate them via their other ID

  const ref = useRef();

  const { projectId } = useParams();
  const { currentProjectData, setCurrentProjectData } = useScript();

  const [editing, setEditing] = useState(false);
  const [newState, setNewState] = useState(originalInputValue);
  const [changed, setChanged] = useState(false);

  const [newOriginalValue, setNewOriginalValue] = useState();

  useOutsideClick(ref, () => setEditing(false));

  function handleOnDoubleClick() {
    setEditing(true);
  }

  function handleOnChange(e) {
    setNewState(e.target.value);
    //console.log(e.target.value, typeof e.target.value);
  }

  function saveData() {
    let projectData = currentProjectData;
    console.log(`${otherIdField} is ${otherIdValue}`);
    for (let index = 0; index < projectData[`${majorField}`].length; index++) {
      // console.log(projectData[`${majorField}`][index][`${minorField}`]);
      if (
        (projectData[`${majorField}`][index][`${minorField}`] ==
          originalInputValue ||
          projectData[`${majorField}`][index][`${minorField}`] ==
            newOriginalValue) &&
        projectData[`${majorField}`][index].Project_ID == projectId &&
        projectData[`${majorField}`][index][`${otherIdField}`] == otherIdValue
      ) {
        //console.log('reached if 1');
        console.log(
          projectData[`${majorField}`][index][`${otherIdField}`] == otherIdValue
        );
        if (newState !== '' && newState !== undefined) {
          //console.log('reached if 2');
          if (inputType == 'number') {
            projectData[`${majorField}`][index][`${minorField}`] =
              Number(newState);
            setChanged(true);
            setCurrentProjectData(projectData);
            setNewOriginalValue(newState);
          } else {
            //else it is a string. date is saved is given in string from input
            projectData[`${majorField}`][index][`${minorField}`] = newState;

            setChanged(true);
            setCurrentProjectData(projectData);
            setNewOriginalValue(newState);
          }
        } else {
          //console.log('reached else');
          setNewState(originalInputValue);
          setChanged(false);
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
      // console.log(projectData);
    }
    if (originalInputValue == newState) {
      setNewState(originalInputValue);
      setChanged(false);
    }
    if (newState == undefined) {
      setNewState(originalInputValue);
    }
  }, [editing]);

  return (
    <>
      {minorField == 'Date_of_Death' &&
      (newState == '' || newState == undefined) &&
      !editing ? (
        <div>
          <input
            type={inputType}
            onChange={(e) => handleOnChange(e)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        </div>
      ) : null}
      {!editing ? (
        <div
          onDoubleClick={handleOnDoubleClick}
          style={changed ? { color: 'red' } : null}
        >
          {newState ? newState : originalInputValue}
          <span className="chapter-index"> {index + 1}</span>
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

/** Example Use:
 <ClickEditComponent
    originalInputValue={chapterName}
    inputType={'text'}
    majorField={'chapters'}
    minorField={'Chapter_Name'}
    index={index}
    placeholder={'Enter Chapter Name'}
  />
 */
