import React, { useEffect, useRef, useState } from 'react';
import { HiTrash } from 'react-icons/hi2';
import './styles.css';
import { useScript } from '../../contexts';
import projectData from '../../data';
import { useParams } from 'react-router-dom';
import ClickEditComponent from '../ClickEditComponent';
import DeleteModal from '../DeleteModal';

export default function ChapterCard({ chapterData, index }) {
  const { currentChapter, setCurrentChapter } = useScript();

  function handleOnClick() {
    setCurrentChapter(chapterData.Chapter_ID);
    // console.log(currentChapter);
  }

  // function handleOnDelete() {
  //   console.log(`deleting chapter ${index + 1}: ${chapterData.Chapter_Name}`);
  // }

  const [showModal, setShowModal] = useState(false);

  function handleToggleModalPopup() {
    setShowModal(!showModal);
  }

  function onClose() {
    setShowModal(false);
  }

  //index is the chapter number
  return (
    <div
      id={chapterData.Chapter_ID}
      className={`individual-chapters-container ${
        currentChapter == chapterData.Chapter_ID ? 'current-chapter' : null
      }`}
      onClick={handleOnClick}
      key={chapterData.Chapter_ID}
    >
      <ClickEditComponent
        originalInputValue={chapterData.Chapter_Name}
        inputType={'text'}
        majorField={'chapters'}
        minorField={'Chapter_Name'}
        otherIdField={'Chapter_ID'}
        otherIdValue={chapterData.Chapter_ID}
        index={index}
        placeholder={'Enter Chapter Name'}
      />

      <HiTrash className="delete-btn" onClick={handleToggleModalPopup} />
      {showModal ? (
        <DeleteModal
          onClose={onClose}
          majorField={'chapters'}
          fieldData={chapterData}
          navigateOnceDeleted={false}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  );
}
