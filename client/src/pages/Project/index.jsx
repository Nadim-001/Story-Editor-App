import React, { useState } from 'react';
import { NewProjectButton } from '../../components';

export default function ProjectPage() {
  //FIXME: For now i have set project to ___ but later should fetch from backend to see if user has projects
  const [hasProjects, setHasProjects] = useState(false);

  return (
    <div>
      {hasProjects ? (
        <div>
          /* TODO: Map data from useFetch to ProjectCard Components +
          AddNewProject component */
          <h1>U got projects</h1>
          <NewProjectButton />
        </div>
      ) : (
        <div>
          <p>No projects detected</p>
          <NewProjectButton />
        </div>
      )}
    </div>
  );
}
