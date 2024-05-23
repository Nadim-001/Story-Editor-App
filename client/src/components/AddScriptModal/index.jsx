import React from 'react';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '../useOutsideClick';

export default function AddScriptModal({
  id = null,
  onClose,
  modalRef,
  modalPosition,
  setShowModal,
}) {
  const navigate = useNavigate();
  useOutsideClick(modalRef, () => setShowModal(false));

  function handleSceneHeadings() {
    const scriptObject = {
      type: 'scene-headings',
      is_subheading: false, //dont need time or interior for subheading
      interior: 'INT. EXT. INT./EXT.',
      location: 'E.G. CENTRAL PARK - BENCH',
      time: 'DAWN DAY DUSK NIGHT',
      //ALL CAPS FOR THIS
    };
  }

  function handleAction() {
    const scriptObject = {
      type: 'action',
      content: 'Enter Action Scene',
    };
  }

  function handleDialogue() {
    const scriptObject = {
      type: 'dialogue',
      character: 'Enter Character Name',
      extension: 'V.O. Voice Over',
      parenthetical: '(whispering)',
      dialogue: 'Enter Dialogue',
    };
  }

  function handleTransition() {
    const scriptObject = {
      type: 'transition',
      transition: 'CUT TO:',
      //All Capital
    };
  }

  return (
    <div
      className="modal-body"
      ref={modalRef}
      style={{
        position: 'absolute',
        left: `${modalPosition.left}px`,
        top: `${modalPosition.top}px`,
      }}
    >
      <button onClick={handleSceneHeadings}>Scene Headings</button>
      <button onClick={handleAction}>Action</button>
      <button onClick={handleDialogue}>
        Dialogue
        {/*  (should also include Character Name and Parentheticals) */}
      </button>
      <button onClick={handleTransition}>Transition</button>
      <button>Shot</button>
    </div>
  );
}
