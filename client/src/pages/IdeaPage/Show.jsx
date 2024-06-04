import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';
import {
  ClickEditComponent,
  DeleteModal,
  RelatedIdeaModal,
} from '../../components';

export default function IdeaShowPage() {
  const navigate = useNavigate();
  const { projectId, ideaId } = useParams();

  const [ideaData, setIdeaData] = useState({});
  const [ideaIndex, setIdeaIndex] = useState();

  const { currentProjectData } = useScript();

  function getIdeasData() {
    //TODO: change to fetch
    for (let index = 0; index < currentProjectData.ideas.length; index++) {
      if (
        currentProjectData.ideas[index].Idea_ID == ideaId &&
        currentProjectData.ideas[index].Project_ID == projectId
      ) {
        setIdeaData(currentProjectData.ideas[index]);
        setIdeaIndex(index);
      }
    }
  }

  function handleBackBtn() {
    navigate(`../`);
  }

  useEffect(() => {
    getIdeasData();
    console.log(ideaData);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  function handleToggleModalPopup() {
    setShowModal(!showModal);
  }

  function onClose() {
    setShowModal(false);
  }

  function handleRelatedCharactersToggleModalPopup() {
    setShowCharacterModal(!showCharacterModal);
  }

  function onRelatedCharactersClose() {
    setShowCharacterModal(false);
  }

  function handleRelatedLocationsToggleModalPopup() {
    setShowLocationModal(!showCharacterModal);
  }

  function onRelatedLocationsClose() {
    setShowLocationModal(false);
  }

  return (
    <div>
      <h1>Idea is {ideaId}</h1>
      <h2>Project ID is {projectId}</h2>
      <h3>Image not set</h3>
      <div>
        <h2>
          Title: {ideaData.Title} {ideaIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={ideaData.Title}
          inputType={'text'}
          majorField={'ideas'}
          minorField={'Title'}
          otherIdField={'Idea_ID'}
          otherIdValue={ideaId}
          index={ideaIndex}
          placeholder={'Enter Idea Title'}
        />
      </div>
      <div>
        <h2>
          Content: {ideaData.Content} {ideaIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={ideaData.Content}
          inputType={'text'}
          majorField={'ideas'}
          minorField={'Content'}
          otherIdField={'Idea_ID'}
          otherIdValue={ideaId}
          index={ideaIndex}
          placeholder={'Enter Idea Content'}
        />
      </div>

      <div>
        <h2>
          Status: {ideaData.Status} {ideaIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={ideaData.Status}
          inputType={'text'}
          majorField={'ideas'}
          minorField={'Status'}
          otherIdField={'Idea_ID'}
          otherIdValue={ideaId}
          index={ideaIndex}
          placeholder={'Enter Idea Status'}
        />
      </div>
      <div>
        <h2>
          Characters: {ideaData.Characters} {ideaIndex}
        </h2>
        {ideaData.Characters && ideaData.Characters.length ? (
          //NOTE: related_character is already the ID lol
          ideaData.Characters.map((related_character) =>
            currentProjectData.characters
              .filter(
                (character) => character.Character_ID == related_character
              )
              .map((person) => <p>{person.Name}</p>)
          )
        ) : (
          <p>No Related Ideas</p>
        )}
        <button onClick={handleRelatedCharactersToggleModalPopup}>
          Add New Character
        </button>
        {showCharacterModal ? (
          <RelatedIdeaModal
            onClose={onRelatedCharactersClose}
            // majorField={'ideas'}
            ideaData={ideaData}
            majorField={'characters'}
            minorField={'Characters'}
            idField={'Character_ID'}
          />
        ) : null}
      </div>
      <div>
        <h2>
          Location: {ideaData.Location} {ideaIndex}
        </h2>
        {ideaData.Location && ideaData.Location.length ? (
          //NOTE: related_character is already the ID lol
          ideaData.Location.map((related_location) =>
            currentProjectData.locations
              .filter((location) => location.Location_ID == related_location)
              .map((location) => <p>{location.Name}</p>)
          )
        ) : (
          <p>No Related Ideas</p>
        )}
        <button onClick={handleRelatedLocationsToggleModalPopup}>
          Add New Location
        </button>
        {showLocationModal ? (
          <RelatedIdeaModal
            onClose={onRelatedLocationsClose}
            // majorField={'ideas'}
            ideaData={ideaData}
            majorField={'locations'}
            minorField={'Location'}
            idField={'Location_ID'}
          />
        ) : null}
      </div>
      <button onClick={handleToggleModalPopup}>Delete</button>
      {showModal ? (
        <DeleteModal
          onClose={onClose}
          majorField={'ideas'}
          fieldData={ideaData}
        />
      ) : null}
      <button onClick={handleBackBtn}>Back Button</button>
    </div>
  );
}
