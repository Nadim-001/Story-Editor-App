import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projectData from '../../data';
import { CharacterCard } from '../../components';
import { useScript } from '../../contexts';

export default function CharacterIndexPage() {
  /* Fetch Characters
  if no characters then prompt to add one 
  else display the characters along with button to add a new one.
  */
  const navigate = useNavigate();

  //FIXME: No backend so pretend no characters fetched
  const [hasCharacters, setHasCharacters] = useState(true);

  const { projectId } = useParams();
  const { currentProjectData } = useScript();
  // console.log(projectData);

  function handleBackBtn() {
    navigate(`../${projectId}`);
  }

  return (
    <div>
      {hasCharacters ? (
        <div>
          /* Map data from useFetch to CharacterCard Components +
          AddNewCharacter component */
          <h1>U got characters</h1>
          {currentProjectData.characters
            .filter((character) => character.Project_ID == projectId)
            .map((character) => (
              <CharacterCard character={character} />
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
