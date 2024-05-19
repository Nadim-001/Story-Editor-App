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

  //index is the chapter number
  return (
    <div
      id={chapterID}
      className={`individual-chapters-container ${
        currentChapter == chapterID ? 'current-chapter' : null
      }`}
      onClick={handleOnClick}
    >
      <ClickEditComponent
        originalInputValue={chapterName}
        inputType={'text'}
        majorField={'chapters'}
        minorField={'Chapter_Name'}
        index={index}
        placeholder={'Enter Chapter Name'}
      />

      <HiTrash />
    </div>
  );
}
