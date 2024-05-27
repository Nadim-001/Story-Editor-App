import React, { useRef, useState } from 'react';
import SceneClickEditComponent from '../SceneClickEditComponent';
import useOutsideClick from '../useOutsideClick';
import AddScriptComponent from '../AddScriptComponent';

export default function SceneHeading({ scene, index, setChanged, changed }) {
  const ref = useRef();
  const [showButton, setShowButton] = useState(false);
  function handleOnClick() {
    setShowButton(true);
  }

  useOutsideClick(ref, () => setShowButton(false));
  return (
    <div
      style={{ border: '1px dotted blue', display: 'flex', gap: '10px' }}
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
      <h2>
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
