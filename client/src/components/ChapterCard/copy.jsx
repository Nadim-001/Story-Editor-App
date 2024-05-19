import React, { useEffect, useRef, useState } from 'react';
import { HiTrash } from 'react-icons/hi2';
import './styles.css';
import { useScript } from '../../contexts';
import useOutsideClick from '../useOutsideClick';
import projectData from '../../data';
import { useParams } from 'react-router-dom';

export default function ChapterCard({ chapterID, chapterName, index }) {
  const ref = useRef();

  const { currentChapter, setCurrentChapter } = useScript();
  const { projectId } = useParams();

  const [editing, setEditing] = useState(false);
  const [newChapterName, setNewChapterName] = useState(chapterName);
  const [isChanged, setIsChanged] = useState(true);

  useOutsideClick(ref, () => setEditing(false));

  function handleOnClick() {
    setCurrentChapter(chapterID);
    // console.log(currentChapter);
  }

  function handleOnDoubleClick() {
    setEditing(true);
  }

  function handleOnChange(e) {
    setNewChapterName(e.target.value);
  }

  function saveChapterName() {
    for (let index = 0; index < projectData.chapters.length; index++) {
      if (
        projectData.chapters[index].Chapter_Name == chapterName &&
        projectData.chapters[index].Project_ID == projectId
      ) {
        if (newChapterName !== '') {
          projectData.chapters[index].Chapter_Name == newChapterName;
        } else {
          setNewChapterName(chapterName);
        }
      }
    }
  }

  console.log(projectData['chapters'][0]['Chapter_Name']);

  function handleKeyPress(e) {
    if (e.code == 'Enter') {
      setEditing(false);
      saveChapterName();
    }
  }

  useEffect(() => {
    if (editing == false && chapterName !== newChapterName) {
      saveChapterName();
      console.log(projectData);
    }
  }, [editing]);

  //index is the chapter number
  return (
    <div
      id={chapterID}
      className={`individual-chapters-container ${
        currentChapter == chapterID ? 'current-chapter' : null
      }`}
      onClick={handleOnClick}
      onDoubleClick={handleOnDoubleClick}
    >
      {!editing ? (
        <div>
          {newChapterName}
          <span>{index}</span>
        </div>
      ) : (
        <div ref={ref}>
          <input
            type="text"
            value={newChapterName}
            placeholder="Enter Chapter Name"
            onChange={(e) => handleOnChange(e)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        </div>
      )}

      <HiTrash />
    </div>
  );
}
