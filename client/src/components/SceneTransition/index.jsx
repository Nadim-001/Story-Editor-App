import React, { useRef, useState } from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';
import useOutsideClick from '../useOutsideClick';
import AddScriptComponent from '../AddScriptComponent';

export default function SceneTransition({ scene, index, setChanged, changed }) {
  const ref = useRef();
  const [showButton, setShowButton] = useState(false);
  function handleOnClick() {
    setShowButton(true);
  }

  useOutsideClick(ref, () => setShowButton(false));
  return (
    <div
      style={{ textAlign: 'right', border: '1px dotted turquoise' }}
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
          originalInputValue={scene.transition}
          inputType={'text'}
          index={index}
          field={'transition'}
          placeholder={'Enter Transition '}
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
