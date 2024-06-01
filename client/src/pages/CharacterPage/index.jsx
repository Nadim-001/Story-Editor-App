import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projectData from '../../data';
import { CharacterCard, NewCharacterModal } from '../../components';
import { useScript } from '../../contexts';

export default function CharacterIndexPage() {
  /* Fetch Characters
  if no characters then prompt to add one 
  else display the characters along with button to add a new one.
  */
  const navigate = useNavigate();

  //FIXME: No backend so pretend no characters fetched
  const [hasCharacters, setHasCharacters] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const { projectId } = useParams();
  const { currentProjectData } = useScript();
  // console.log(projectData);

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
      currentProjectData.characters.filter(
        (character) => character.Project_ID == projectId
      ).length > 0
    ) {
      setHasCharacters(true);
    } else {
      setHasCharacters(false);
    }
  }, []);

  return (
    <div>
      {hasCharacters ? (
        <div>
          /* Map data from useFetch to CharacterCard Components +
          AddNewCharacter component */
          <h1>U got characters</h1>
          <button onClick={handleToggleModalPopup}>Add New Character</button>
          {showModal ? <NewCharacterModal onClose={onClose} /> : null}
          {currentProjectData.characters
            .filter((character) => character.Project_ID == projectId)
            .map((character) => (
              <CharacterCard
                character={character}
                key={character.Character_ID}
              />
            ))}
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      ) : (
        <div>
          <p>Project ID is {projectId}</p>
          <p>No characters detected</p>
          //AddNewCharacter component
          <button onClick={handleToggleModalPopup}>Add New Character</button>
          {showModal ? <NewCharacterModal onClose={onClose} /> : null}
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      )}
    </div>
  );
}
