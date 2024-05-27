import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';
import { ClickEditComponent } from '../../components';

export default function IdeaShowPage() {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();

  const [ideaData, setIdeaData] = useState({});
  const [ideaIndex, setIdeaIndex] = useState();

  const { currentProjectData } = useScript();

  function getIdeasData() {
    //TODO: change to fetch
    for (let index = 0; index < currentProjectData.ideas.length; index++) {
      if (
        currentProjectData.ideas[index].Idea_ID == ideaId &&
        currentProjectData.ideas[index].Project_ID == projectId
      ) {
        setIdeaData(currentProjectData.ideas[index]);
        setIdeaIndex(index);
      }
    }
  }

  function handleBackBtn() {
    navigate(`../`);
  }

  useEffect(() => {
    getIdeasData();
    console.log(ideaData);
  }, []);

  return (
    <div>
      <h1>Idea is {ideaId}</h1>
      <h2>Project ID is {projectId}</h2>
      <h3>Image not set</h3>
      <div>
        <h2>
          Title: {ideaData.Title} {ideaIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={ideaData.Title}
          inputType={'text'}
          majorField={'ideas'}
          minorField={'Title'}
          index={ideaIndex}
          placeholder={'Enter Idea Title'}
        />
      </div>
      <div>
        <h2>
          Content: {ideaData.Content} {ideaIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={ideaData.Content}
          inputType={'text'}
          majorField={'ideas'}
          minorField={'Content'}
          index={ideaIndex}
          placeholder={'Enter Idea Content'}
        />
      </div>

      <div>
        <h2>
          Status: {ideaData.Status} {ideaIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={ideaData.Status}
          inputType={'text'}
          majorField={'ideas'}
          minorField={'Status'}
          index={ideaIndex}
          placeholder={'Enter Idea Status'}
        />
      </div>
      <div>
        <h2>
          Characters: {ideaData.Characters} {ideaIndex}
        </h2>
        {ideaData.Characters && ideaData.Characters.length ? (
          //NOTE: related_character is already the ID lol
          ideaData.Characters.map((related_character) =>
            currentProjectData.characters
              .filter(
                (character) => character.Character_ID == related_character
              )
              .map((person) => <p>{person.Name}</p>)
          )
        ) : (
          <p>No Related Ideas</p>
        )}
      </div>
    </div>
  );
}
