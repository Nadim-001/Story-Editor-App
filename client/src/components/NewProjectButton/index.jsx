import { useState } from 'react';
import NewProjectModal from '../NewProjectModal';
import './styles.css';

export default function NewProjectButton() {
  const [showModal, setShowModal] = useState(false);

  function handleToggleModalPopup() {
    setShowModal(!showModal);
  }

  function onClose() {
    setShowModal(false);
  }

  //Should open NewProjectModal
  return (
    <div className="container">
      <button onClick={handleToggleModalPopup}>Add New Project</button>
      {showModal ? <NewProjectModal onClose={onClose} /> : null}
    </div>
  );
}
