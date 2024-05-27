import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import currentProjectData from '../../data';
import { ClickEditComponent, ClickEditSelectComponent } from '../../components';
import { useScript } from '../../contexts';

export default function CharacterShowPage() {
  const navigate = useNavigate();
  const { projectId, characterId } = useParams();
  //console.log(typeof projectId, typeof characterId);
  const [characterData, setCharacterData] = useState({});
  const [characterIndex, setCharacterIndex] = useState();

  const { currentProjectData } = useScript();

  function handleBackBtn() {
    navigate(`../`);
  }

  function getCharacterData() {
    //TODO: change to fetch
    for (let index = 0; index < currentProjectData.characters.length; index++) {
      if (
        currentProjectData.characters[index].Character_ID == characterId &&
        currentProjectData.characters[index].Project_ID == projectId
      ) {
        setCharacterData(currentProjectData.characters[index]);
        setCharacterIndex(index);
      }
    }
  }

  useEffect(() => {
    getCharacterData();
    console.log(characterData);
  }, []);

  return (
    <div>
      <h1>Character {characterId}</h1>
      <h2>Project ID is {projectId}</h2>
      <div className="character-details">
        <div>
          <h2>
            Name: {characterData.Name} {characterIndex}
          </h2>
          <ClickEditComponent
            originalInputValue={characterData.Name}
            inputType={'text'}
            majorField={'characters'}
            minorField={'Name'}
            index={characterIndex}
            placeholder={'Enter Character Name'}
          />
        </div>
        <div>
          <h2>Age: {characterData.Age}</h2>
          <ClickEditComponent
            originalInputValue={characterData.Age}
            inputType={'number'}
            majorField={'characters'}
            minorField={'Age'}
            index={characterIndex}
            placeholder={'Enter Character Age'}
          />
        </div>
        <div>
          <h2>Description: {characterData.Description}</h2>
          <ClickEditComponent
            originalInputValue={characterData.Description}
            inputType={'text'}
            majorField={'characters'}
            minorField={'Description'}
            index={characterIndex}
            placeholder={'Enter Description'}
          />
        </div>
        <div>
          <h2>Role: {characterData.Role}</h2>
          <ClickEditComponent
            originalInputValue={characterData.Role}
            inputType={'text'}
            majorField={'characters'}
            minorField={'Role'}
            index={characterIndex}
            placeholder={'Enter Role'}
          />
        </div>
        <div>
          <h2>
            First Chapter Appearance: {characterData.First_Chapter_Appearance}
          </h2>
          <ClickEditComponent
            originalInputValue={characterData.First_Chapter_Appearance}
            inputType={'number'}
            majorField={'characters'}
            minorField={'First_Chapter_Appearance'}
            index={characterIndex}
            placeholder={'Enter First Chapter Appearance'}
          />
        </div>
        <div>
          <h2>Description: {characterData.Description}</h2>
          <ClickEditComponent
            originalInputValue={characterData.Description}
            inputType={'text'}
            majorField={'characters'}
            minorField={'Description'}
            index={characterIndex}
            placeholder={'Enter Description'}
          />
        </div>
        <div>
          <h2>Image goes here</h2>
        </div>
        <div>
          <h2>Gender: {characterData.Gender}</h2>
          <ClickEditSelectComponent
            originalInputValue={characterData.Gender}
            majorField={'characters'}
            minorField={'Gender'}
            index={characterIndex}
            placeholder={'Choose Gender'}
            choices={[{ value: 'Male' }, { value: 'Female' }]}
          />
        </div>
        <div>
          <h2>D.O.B: {characterData.Date_of_Birth}</h2>
          <ClickEditComponent
            originalInputValue={characterData.Date_of_Birth}
            inputType={'date'}
            majorField={'characters'}
            minorField={'Date_of_Birth'}
            index={characterIndex}
            placeholder={'Enter Date of Birth'}
          />
        </div>
        <div>
          <h2>Date of Death: {characterData.Date_of_Death}</h2>
          <ClickEditComponent
            originalInputValue={characterData.Date_of_Death}
            inputType={'date'}
            majorField={'characters'}
            minorField={'Date_of_Death'}
            index={characterIndex}
            placeholder={'Enter Date of Death'}
          />
        </div>
      </div>
      <button onClick={handleBackBtn}>Back Button</button>
    </div>
  );
}
