import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useOutsideClick from '../useOutsideClick';
import { useScript } from '../../contexts';

export default function AddScriptModal({
  id = null,
  onClose,
  modalRef,
  modalPosition,
  setShowModal,
  index,
  positioning,
  setChanged,
  changed,
}) {
  useOutsideClick(modalRef, () => setShowModal(false));

  const { projectId } = useParams();

  const { currentProjectData, setCurrentProjectData, currentChapter } =
    useScript();

  function addObjectToPosition(obj) {
    let projectData = currentProjectData;
    for (let i = 0; i < projectData.chapters.length; i++) {
      if (projectData.chapters[i].Chapter_ID == currentChapter) {
        let newContent = projectData.chapters[i].Chapter_Content;
        if (positioning == 'top') {
          if (index == 0) {
            newContent.unshift(obj);
          } else {
            newContent.splice(index, 0, obj);
          }
          projectData.chapters[index].Chapter_Content = newContent;
          setCurrentProjectData(projectData);
        } else if (positioning == 'bottom') {
          newContent.splice(index + 1, 0, obj);
          projectData.chapters[index].Chapter_Content = newContent;
          setCurrentProjectData(projectData);
        }
      }
    }
    setChanged(!changed);
  }

  function handleSceneHeadings() {
    let randomNum = Math.floor(Math.random() * 1000000);
    const scriptObject = {
      Scene_ID: randomNum,
      type: 'scene-headings',
      is_subheading: false, //dont need time or interior for subheading
      interior: 'INT. EXT. INT./EXT.',
      location: 'E.G. CENTRAL PARK - BENCH',
      time: 'DAWN DAY DUSK NIGHT',
      //ALL CAPS FOR THIS
    };
    addObjectToPosition(scriptObject);
  }

  function handleAction() {
    let randomNum = Math.floor(Math.random() * 10000);

    const scriptObject = {
      Scene_ID: randomNum,
      type: 'action',
      content: 'Enter Action Scene',
    };
    addObjectToPosition(scriptObject);
  }

  function handleDialogue() {
    let randomNum = Math.floor(Math.random() * 10000);

    const scriptObject = {
      Scene_ID: randomNum,
      type: 'dialogue',
      character: 'Enter Character Name',
      extension: 'V.O. Voice Over',
      parenthetical: '(whispering)',
      dialogue: 'Enter Dialogue',
    };
    addObjectToPosition(scriptObject);
  }

  function handleTransition() {
    let randomNum = Math.floor(Math.random() * 10000);

    const scriptObject = {
      Scene_ID: randomNum,
      type: 'transition',
      transition: 'CUT TO:',
      //All Capital
    };
    addObjectToPosition(scriptObject);
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
