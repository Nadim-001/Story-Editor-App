import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from '../useOutsideClick';
import projectData from '../../data';
import { useParams } from 'react-router-dom';

export default function ClickEditSelectComponent({
  originalInputValue,
  majorField,
  minorField,
  index,
  placeholder = null,
  choices,
}) {
  //Major Field is projectData.MajorField. it could be characters, chapters or whatever.
  //Minor Field is projectData.[e.g. chapters].MinorField it could be chapter_name, text or whatever
  const ref = useRef();

  const { projectId } = useParams();

  const [editing, setEditing] = useState(false);
  const [newState, setNewState] = useState(originalInputValue);
  const [changed, setChanged] = useState(false);

  useOutsideClick(ref, () => setEditing(false));

  function handleOnDoubleClick() {
    setEditing(true);
  }

  function handleOnChange(e) {
    setNewState(e.target.value);
  }

  function saveData() {
    for (let index = 0; index < projectData.chapters.length; index++) {
      // console.log(newState != originalInputValue);
      // console.log('newState is ', newState);
      // console.log('original is ', originalInputValue);
      if (
        projectData[`${majorField}`][index][`${minorField}`] ==
          originalInputValue &&
        projectData[`${majorField}`][index].Project_ID == projectId
      ) {
        console.log('reached here');
        if (
          newState !== '' &&
          newState != originalInputValue &&
          newState !== undefined
        ) {
          projectData[`${majorField}`][index][`${minorField}`] == newState;
          setChanged(true);
        } else {
          setNewState(originalInputValue);
          setChanged(false);
        }
      }
    }
  }

  useEffect(() => {
    if (editing == false && originalInputValue !== newState) {
      saveData();
    } else {
      setNewState(originalInputValue);
      setChanged(false);
    }
    if (newState == undefined) {
      setNewState(originalInputValue);
    }
  }, [editing]);

  return (
    <>
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
          <select onChange={(e) => handleOnChange(e)}>
            <option value="">{placeholder}</option>
            {choices.map((choice) => (
              <option value={choice.value}>{choice.value}</option>
            ))}
          </select>
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
