import React, { useState } from 'react';
import './styles.css';
import { useScript } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import IdeaModal from '../IdeaModal';

export default function IdeaCard({ idea }) {
  const navigate = useNavigate();

  const { currentIdeaID, setCurrentIdeaID } = useScript();

  function handleOnClick() {
    setCurrentIdeaID(idea.Idea_ID);
    navigate(`./${idea.Idea_ID}`);
  }

  const ideaObject = {
    Idea_ID: '',
    Title: '',
    Content: '',
    Status: '',
    Characters: 'foreign key of IDs',
    Location: 'foreign key of IDs',
  };

  return (
    <div
      className={`idea-card-container ${
        currentIdeaID == idea.Idea_ID ? 'current-idea' : null
      }`}
      onClick={handleOnClick}
    >
      <h2>{idea.Title}</h2>
      <p>{idea.Content.slice(0, 30)}...</p>
      <p>{idea.Status}</p>
    </div>
  );
}
