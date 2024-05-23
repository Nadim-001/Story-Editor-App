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
} from '../../components';
import projectData from '../../data';
import { useScript } from '../../contexts';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function show() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  //TODO: use currentProject to fetch the Chapters
  const { currentProject, currentChapter } = useScript();

  const [scriptValue, setScriptValue] = useState('');
  const [chapterContent, setChapterContent] = useState([]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'formula'],
      [{ script: 'sub' }, { script: 'super' }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ color: [] }, { background: [] }],
      [{ align: '' }],
      [{ align: 'center' }],
      [{ align: 'right' }],
      [{ align: 'justify' }],
    ],
  };

  const chapter_content = [{ type: 'scene-heading' }];

  function handleCharacters() {
    navigate('./characters');
  }

  function handleMaps() {}
  function handleIdeas() {}

  useEffect(() => {
    if (currentChapter) {
      const newContent = projectData.chapters.filter(
        (chapter) => chapter.Chapter_ID == currentChapter
      );
      setChapterContent(newContent[0].Chapter_Content);
      // console.log(newContent[0].Chapter_Content);
    }
  }, [currentChapter]);

  return (
    <div className="project-container">
      <div className="left-bar">
        <div className="project-title">
          <h1>Project Title {projectId}</h1>
        </div>
        <div className="nav-container">
          <button onClick={handleCharacters}>Characters</button>
          <button onClick={handleMaps}>Locations</button>
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
              <ChapterCard
                chapterID={chapter.Chapter_ID}
                chapterName={chapter.Chapter_Name}
                index={index}
              />
            ))}
          {/* <ChapterCard chapterID={1} chapterName={'Pilot'} index={1} />
          <ChapterCard chapterID={3} chapterName={'middle'} index={2} />
          <ChapterCard chapterID={4} chapterName={'end'} index={3} /> */}
        </div>
      </div>
      <div className="script-container">
        <div className="page">
          <div className="page-area">
            {chapterContent
              ? chapterContent.map((chapter, index) => {
                  console.log(chapter);
                  if (chapter.type == 'dialogue') {
                    return <SceneDialogue scene={chapter} index={index} />;
                  }
                  if (chapter.type == 'action') {
                    return <SceneAction scene={chapter} index={index} />;
                  }
                  if (chapter.type == 'scene-headings') {
                    return <SceneHeading scene={chapter} index={index} />;
                  }
                  if (chapter.type == 'transition') {
                    return <SceneTransition scene={chapter} index={index} />;
                  }
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
