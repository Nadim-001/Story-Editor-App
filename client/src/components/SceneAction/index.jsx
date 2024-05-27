import React, { useRef, useState } from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';
import useOutsideClick from '../useOutsideClick';
import AddScriptComponent from '../AddScriptComponent';

export default function SceneAction({ scene, index, setChanged, changed }) {
  const ref = useRef();
  const [showButton, setShowButton] = useState(false);
  function handleOnClick() {
    setShowButton(true);
  }

  useOutsideClick(ref, () => setShowButton(false));

  return (
    <div
      style={{ border: '1px dotted red' }}
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
      <p>
        <SceneClickEditComponent
          originalInputValue={scene.content}
          inputType={'text'}
          index={index}
          field={'content'}
          placeholder={'Enter Action '}
          upperCase={false}
        />
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
