import React from 'react';

export default function SceneDialogue({ scene }) {
  return (
    <div style={{ border: '1px dotted black' }}>
      <h3>{scene.character}</h3>
      <h4>({scene.parenthetical})</h4>
      <p>{scene.dialogue}</p>
    </div>
  );
}
