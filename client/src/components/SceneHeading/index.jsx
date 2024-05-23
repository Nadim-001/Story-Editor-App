import React from 'react';

export default function SceneHeading({ scene }) {
  return (
    <h2 style={{ border: '1px dotted blue' }}>
      {scene.interior} - {scene.location} - {scene.time}
    </h2>
  );
}
