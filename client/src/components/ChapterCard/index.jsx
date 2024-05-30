import React, { useEffect, useRef, useState } from 'react';
import { HiTrash } from 'react-icons/hi2';
import './styles.css';
import { useScript } from '../../contexts';
import projectData from '../../data';
import { useParams } from 'react-router-dom';
import ClickEditComponent from '../ClickEditComponent';

export default function ChapterCard({ chapterID, chapterName, index }) {
  const { currentChapter, setCurrentChapter } = useScript();

  const [isChanged, setIsChanged] = useState(true);

  function handleOnClick() {
    setCurrentChapter(chapterID);
    // console.log(currentChapter);
  }

  function handleOnDelete() {
    console.log(`deleting chapter ${index + 1}: ${chapterName}`);
  }

  //index is the chapter number
  return (
    <div
      id={chapterID}
      className={`individual-chapters-container ${
        currentChapter == chapterID ? 'current-chapter' : null
      }`}
      onClick={handleOnClick}
      key={chapterID}
    >
      <ClickEditComponent
        originalInputValue={chapterName}
        inputType={'text'}
        majorField={'chapters'}
        minorField={'Chapter_Name'}
        otherIdField={'Chapter_ID'}
        otherIdValue={chapterID}
        index={index}
        placeholder={'Enter Chapter Name'}
      />

      <HiTrash className="delete-btn" onClick={handleOnDelete} />
    </div>
  );
}
