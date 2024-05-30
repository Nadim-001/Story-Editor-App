import React from 'react';
import './styles.css';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useScript } from '../../contexts';
import { useParams } from 'react-router-dom';

export default function NewChapterButton({
  chapterNumber,
  changed,
  setChanged,
}) {
  const { projectId } = useParams();
  const { currentProjectData, setCurrentProjectData } = useScript();

  function handleOnClick() {
    let projectData = currentProjectData;
    let randomNum = Math.floor(Math.random() * 1000000);
    console.log('making new chapter');
    console.log(projectData.chapters);
    console.log(projectId);
    projectData.chapters.push({
      Chapter_ID: randomNum,
      Project_ID: projectId,
      Chapter_Number: chapterNumber,
      Chapter_Name: 'NEW CHAPTER',
      Chapter_Content: [],
    });
    setCurrentProjectData(projectData);
    setChanged(!changed);
  }

  return (
    <div className="individual-chapters-container">
      <div>Add New Chapter</div>

      <IoAddCircleOutline onClick={handleOnClick} className="add-button" />
    </div>
  );
}
