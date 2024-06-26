import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import {
  ChapterCard,
  AddScriptComponent,
  SceneDialogue,
  SceneAction,
  SceneHeading,
  SceneTransition,
  NewChapterButton,
  DeleteModal,
} from '../../components';
import projectData from '../../data';
import { useScript } from '../../contexts';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function show() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  //TODO: use currentProject to fetch the Chapters
  const {
    currentProject,
    currentChapter,
    setCurrentProjectData,
    currentProjectData,
  } = useScript();

  const [chapterContent, setChapterContent] = useState([]);
  const [changed, setChanged] = useState(false);
  const [characterArray, setCharacterArray] = useState([]);

  const [projectData, setProjectData] = useState(currentProjectData);

  function handleCharacters() {
    navigate('./characters');
  }
  function handleLocations() {
    navigate('./locations');
  }
  function handleIdeas() {
    navigate('./ideas');
  }

  useEffect(() => {
    if (currentChapter) {
      const newContent = currentProjectData.chapters.filter(
        (chapter) => chapter.Chapter_ID == currentChapter
      );
      setChapterContent(newContent[0].Chapter_Content);
      setCharacterArray([]);
      let charArr = [];
      for (let i = 0; i < newContent[0].Chapter_Content.length; i++) {
        if (newContent[0].Chapter_Content[i].type == 'dialogue') {
          charArr.includes(newContent[0].Chapter_Content[i].character)
            ? null
            : charArr.push(newContent[0].Chapter_Content[i].character);
        }
        setCharacterArray(charArr);
      }
      console.log(characterArray);
      // console.log(newContent[0].Chapter_Content);
      // console.log(chapterContent);
    }
    setProjectData(currentProjectData);
  }, [currentChapter, changed]);

  const [showModal, setShowModal] = useState(false);

  function handleToggleModalPopup() {
    setShowModal(!showModal);
  }

  function onClose() {
    setShowModal(false);
  }

  return (
    <div className="project-container">
      <div className="left-bar">
        <div className="project-title">
          <h1>Project Title {projectId}</h1>
          <button onClick={handleToggleModalPopup}>Delete</button>
          {showModal ? (
            <DeleteModal
              onClose={onClose}
              majorField={'projects'}
              fieldData={
                projectData.projects.filter(
                  (project) => project.Project_ID == projectId
                )[0]
              }
            />
          ) : null}
        </div>
        <div className="nav-container">
          <button onClick={handleCharacters}>Characters</button>
          <button onClick={handleLocations}>Locations</button>
          <button onClick={handleIdeas}>Ideas</button>
          <button>Systems</button>
          <button>Tropes</button>
          <button>Items</button>
          <button>Timeline</button>
          <button>Races</button>
          <button>Archived</button>
        </div>
        <div className="chapters-container">
          {projectData.chapters
            .filter((chapter) => chapter.Project_ID == projectId)
            .map((chapter, index) => (
              <ChapterCard chapterData={chapter} index={index} />
            ))}
          <NewChapterButton
            chapterNumber={
              currentProjectData.chapters.filter(
                (chapter) => chapter.Project_ID == projectId
              ).length + 1
            }
            changed={changed}
            setChanged={setChanged}
          />
        </div>
      </div>
      <div className="script-container">
        <div className="page">
          <div className="page-area">
            {chapterContent.length ? (
              chapterContent.map((chapter, index) => {
                // console.log(chapter);
                if (chapter.type == 'dialogue') {
                  return (
                    <SceneDialogue
                      scene={chapter}
                      index={index}
                      setChanged={setChanged}
                      changed={changed}
                      characterArray={characterArray}
                    />
                  );
                }
                if (chapter.type == 'action') {
                  return (
                    <SceneAction
                      scene={chapter}
                      index={index}
                      setChanged={setChanged}
                      changed={changed}
                    />
                  );
                }
                if (chapter.type == 'scene-headings') {
                  return (
                    <SceneHeading
                      scene={chapter}
                      index={index}
                      setChanged={setChanged}
                      changed={changed}
                    />
                  );
                }
                if (chapter.type == 'transition') {
                  return (
                    <SceneTransition
                      scene={chapter}
                      index={index}
                      setChanged={setChanged}
                      changed={changed}
                    />
                  );
                }
              })
            ) : currentProjectData.chapters.filter(
                (chapter) => chapter.Project_ID == projectId
              ).length ? (
              <h2>Select Chapter</h2>
            ) : (
              <h2>Add Chapter to begin editing</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
