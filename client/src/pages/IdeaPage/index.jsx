import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projectData from '../../data';
import { IdeaCard } from '../../components';
import { useScript } from '../../contexts';

export default function IdeaIndexPage() {
  const navigate = useNavigate();

  //FIXME: No backend so pretend no ideas fetched
  const [hasIdeas, setHasIdeas] = useState(true);

  const { projectId } = useParams();
  const { currentProjectData } = useScript();

  function handleBackBtn() {
    navigate(`../${projectId}`);
  }

  return (
    <div>
      {hasIdeas ? (
        <div>
          /* Map data from useFetch to IdeaCard Components + AddNewIdea
          component */
          <h1>U got characters</h1>
          {currentProjectData.ideas
            .filter((idea) => idea.Project_ID == projectId)
            .map((idea) => (
              <IdeaCard idea={idea} />
            ))}
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      ) : (
        <div>
          <p>Project ID is {id}</p>
          <p>No characters detected</p>
          //AddNewCharacter component
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      )}
    </div>
  );
}
