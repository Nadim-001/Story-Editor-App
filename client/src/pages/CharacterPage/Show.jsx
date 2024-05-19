import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CharacterShowPage() {
  const navigate = useNavigate();
  const { projectId, characterId } = useParams();

  function handleBackBtn() {
    navigate(`../`);
  }

  return (
    <div>
      <h1>Character {characterId}</h1>
      <h2>Project ID is {projectId}</h2>
      <button onClick={handleBackBtn}>Back Button</button>
    </div>
  );
}
