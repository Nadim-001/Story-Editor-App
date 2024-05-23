import React, { useEffect, useRef, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import './styles.css';
import AddScriptModal from '../AddScriptModal';

export default function AddScriptComponent() {
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });

  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  function handleToggleModalPopup() {
    setShowModal(!showModal);
  }

  function onClose() {
    setShowModal(false);
  }

  useEffect(() => {
    if (showModal && buttonRef.current && modalRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalHeight = modalRef.current.offsetHeight;
      const buttonHeight = buttonRef.current.offsetHeight;
      console.log(buttonRect);
      const newPosition = {
        left: buttonRect.right + 10,
        top: buttonRect.top + buttonHeight / 2 - modalHeight / 2,
      };
      console.log(newPosition);
      setModalPosition(newPosition);
    }
  }, [showModal]);

  return (
    <div className="add-script-container">
      <button
        className="add-script-btn"
        onClick={handleToggleModalPopup}
        ref={buttonRef}
      >
        <HiOutlinePlusCircle size={50} />
      </button>

      {showModal ? (
        <AddScriptModal
          onClose={onClose}
          modalRef={modalRef}
          modalPosition={modalPosition}
          setShowModal={setShowModal}
        />
      ) : null}
    </div>
  );
}
