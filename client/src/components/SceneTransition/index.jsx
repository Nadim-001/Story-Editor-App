import React from 'react';

export default function SceneTransition({ scene }) {
  return (
    <p style={{ textAlign: 'right', border: '1px dotted turquoise' }}>
      {scene.transition}
    </p>
  );
}
