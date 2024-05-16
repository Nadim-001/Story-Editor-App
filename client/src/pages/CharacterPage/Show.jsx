import React from 'react';
import { useParams } from 'react-router-dom';

export default function CharacterShowPage() {
  const { id } = useParams();
  return <div>Character {id}</div>;
}
