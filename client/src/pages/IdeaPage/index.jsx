import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projectData from '../../data';
import { IdeaCard, NewIdeaModal } from '../../components';
import { useScript } from '../../contexts';

export default function IdeaIndexPage() {
  const navigate = useNavigate();

  //FIXME: No backend so pretend no ideas fetched
  const [hasIdeas, setHasIdeas] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const { projectId } = useParams();
  const { currentProjectData } = useScript();

  function handleBackBtn() {
    navigate(`../${projectId}`);
  }

  function handleToggleModalPopup() {
    setShowModal(!showModal);
  }

  function onClose() {
    setShowModal(false);
  }

  useEffect(() => {
    if (
      currentProjectData.ideas.filter((idea) => idea.Project_ID == projectId)
        .length > 0
    ) {
      setHasIdeas(true);
    } else {
      setHasIdeas(false);
    }
  }, []);

  return (
    <div>
      {hasIdeas ? (
        <div>
          /* Map data from useFetch to IdeaCard Components + AddNewIdea
          component */
          <h1>U got ideas</h1>
          <button onClick={handleToggleModalPopup}>Add New Idea</button>
          {showModal ? <NewIdeaModal onClose={onClose} /> : null}
          {currentProjectData.ideas
            .filter((idea) => idea.Project_ID == projectId)
            .map((idea) => (
              <IdeaCard idea={idea} key={idea.Idea_ID} />
            ))}
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      ) : (
        <div>
          <p>Project ID is {projectId}</p>
          <p>No Ideas detected</p>
          //AddNewIdea component
          <button onClick={handleToggleModalPopup}>Add New Idea</button>
          {showModal ? <NewIdeaModal onClose={onClose} /> : null}
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      )}
    </div>
  );
}
