import React from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';

export default function SceneDialogue({ scene, index }) {
  return (
    <div style={{ border: '1px dotted black' }}>
      <h3>
        <SceneClickEditComponent
          originalInputValue={scene.character}
          inputType={'text'}
          index={index}
          field={'character'}
          placeholder={'Enter Character Name'}
          upperCase={true}
        />
      </h3>
      <h4>
        {
          <SceneClickEditComponent
            originalInputValue={scene.parenthetical}
            inputType={'text'}
            index={index}
            field={'parenthetical'}
            placeholder={'Enter Parenthetical'}
          />
        }
      </h4>
      <p>
        {
          <SceneClickEditComponent
            originalInputValue={scene.dialogue}
            inputType={'text'}
            index={index}
            field={'dialogue'}
            placeholder={'Enter Dialogue'}
          />
        }
      </p>
    </div>
  );
}
