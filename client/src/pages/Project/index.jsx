import React, { useEffect, useState } from 'react';
import { NewProjectButton, ProjectCard } from '../../components';
import projectData from '../../data';
import { useScript } from '../../contexts';

export default function ProjectPage() {
  //FIXME: For now i have set project to ___ but later should fetch from backend to see if user has projects
  const [hasProjects, setHasProjects] = useState(true);

  const { currentProjectData, setChapterContent, setCurrentChapter } =
    useScript();

  const user_id = 1;

  useEffect(() => {
    setCurrentChapter(0);
    if (
      currentProjectData.projects.filter(
        (project) => project.Created_by == user_id
      ).length > 0
    ) {
      setHasProjects(true);
    } else {
      setHasProjects(false);
    }
  }, []);

  return (
    <div>
      {hasProjects ? (
        <div>
          /* TODO: Map data from useFetch to ProjectCard Components +
          AddNewProject component */
          <h1>U got projects</h1>
          {currentProjectData.projects
            .filter((project) => project.Created_by == user_id)
            .map((project, index) => (
              <ProjectCard
                id={project.Project_ID}
                name={project.Name}
                creator={project.Created_by}
                index={index}
              />
            ))}
          <NewProjectButton />
        </div>
      ) : (
        <div>
          <p>No projects detected </p>
          <h1>OH NO</h1>
          <NewProjectButton />
        </div>
      )}
    </div>
  );
}
