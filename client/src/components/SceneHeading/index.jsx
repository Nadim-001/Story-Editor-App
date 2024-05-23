import React from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';

export default function SceneHeading({ scene, index }) {
  return (
    <h2 style={{ border: '1px dotted blue', display: 'flex', gap: '10px' }}>
      <SceneClickEditComponent
        originalInputValue={scene.interior}
        inputType={'text'}
        index={index}
        field={'interior'}
        placeholder={'INT., EXT., INT./EXT. '}
        upperCase={true}
      />
      -
      <SceneClickEditComponent
        originalInputValue={scene.location}
        inputType={'text'}
        index={index}
        field={'location'}
        placeholder={'Enter Location '}
        upperCase={true}
      />
      -
      <SceneClickEditComponent
        originalInputValue={scene.time}
        inputType={'text'}
        index={index}
        field={'time'}
        placeholder={'Enter Time of Day'}
        upperCase={true}
      />
    </h2>
  );
}
