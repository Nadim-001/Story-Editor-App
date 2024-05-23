import React from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';

export default function SceneTransition({ scene, index }) {
  return (
    <p style={{ textAlign: 'right', border: '1px dotted turquoise' }}>
      <SceneClickEditComponent
        originalInputValue={scene.transition}
        inputType={'text'}
        index={index}
        field={'transition'}
        placeholder={'Enter Transition '}
        upperCase={false}
      />
    </p>
  );
}
