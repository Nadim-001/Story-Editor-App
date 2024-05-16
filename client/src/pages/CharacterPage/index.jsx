import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CharacterIndexPage() {
  /* Fetch Characters
  if no characters then prompt to add one 
  else display the characters along with button to add a new one.
  */

  //FIXME: No backend so pretend no characters fetched
  const [hasCharacters, setHasCharacters] = useState(false);

  const { id } = useParams();

  return (
    <div>
      {hasCharacters ? (
        <div>
          /* Map data from useFetch to CharacterCard Components +
          AddNewCharacter component */
          <h1>U got characters</h1>
        </div>
      ) : (
        <div>
          <p>Project ID is {id}</p>
          <p>No characters detected</p>
          //AddNewCharacter component
        </div>
      )}
    </div>
  );
}
