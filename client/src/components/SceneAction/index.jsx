import React from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';

export default function SceneAction({ scene, index }) {
  return (
    <p style={{ border: '1px dotted red' }}>
      <SceneClickEditComponent
        originalInputValue={scene.content}
        inputType={'text'}
        index={index}
        field={'content'}
        placeholder={'Enter Action '}
        upperCase={false}
      />
    </p>
  );
}
