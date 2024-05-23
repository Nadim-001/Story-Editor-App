import React from 'react';

export default function SceneAction({ scene }) {
  return <p style={{ border: '1px dotted red' }}>{scene.content}</p>;
}
