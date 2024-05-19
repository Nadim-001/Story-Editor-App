import React from 'react';
import './styles.css';
import { useScript } from '../../contexts';
import { useNavigate } from 'react-router-dom';

export default function CharacterCard({ character }) {
  const navigate = useNavigate();

  const { currentCharacter, setCurrentCharacter } = useScript();

  function handleOnClick() {
    setCurrentCharacter(character.Character_ID);
    console.log(currentCharacter);
    navigate(`./${character.Character_ID}`);
  }
  return (
    <div
      className={`character-card-container ${
        currentCharacter == character.Character_ID ? 'current-chapter' : null
      }`}
      onClick={handleOnClick}
    >
      <h2>
        {character.Name} {character.Project_ID}
      </h2>
      <p>{character.Age} yrs old</p>
      <p>Role: {character.Role}</p>
    </div>
  );
}
