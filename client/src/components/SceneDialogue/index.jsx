import React, { useRef, useState } from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';
import AddScriptComponent from '../AddScriptComponent';
import useOutsideClick from '../useOutsideClick';

export default function SceneDialogue({ scene, index, setChanged, changed }) {
  const ref = useRef();
  const [showButton, setShowButton] = useState(false);
  function handleOnClick() {
    setShowButton(true);
  }

  useOutsideClick(ref, () => setShowButton(false));
  return (
    <div
      style={{ border: '1px dotted black' }}
      onClick={handleOnClick}
      ref={ref}
      key={scene.Scene_ID}
    >
      {showButton ? (
        <AddScriptComponent
          index={index}
          positioning={'top'}
          setChanged={setChanged}
          changed={changed}
        />
      ) : null}
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
      {showButton ? (
        <AddScriptComponent
          index={index}
          positioning={'bottom'}
          setChanged={setChanged}
          changed={changed}
        />
      ) : null}
    </div>
  );
}
