import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import { ChapterCard } from '../../components';
import projectData from '../../data';
import { useScript } from '../../contexts';

export default function show() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  //TODO: use currentProject to fetch the Chapters
  const { currentProject } = useScript();
  console.log(projectData);

  function handleCharacters() {
    navigate('./characters');
  }

  function handleMaps() {}
  function handleIdeas() {}

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
        <div className="style-bar"></div>
        <div className="page"></div>
      </div>
    </div>
  );
}
