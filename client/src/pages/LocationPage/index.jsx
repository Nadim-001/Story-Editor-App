import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projectData from '../../data';
import { LocationCard } from '../../components';
import { useScript } from '../../contexts';

export default function LocationIndexPage() {
  const navigate = useNavigate();

  //FIXME: No backend so pretend no locations fetched
  const [hasLocations, setHasLocations] = useState(true);

  const { projectId } = useParams();
  const { currentProjectData } = useScript();

  function handleBackBtn() {
    navigate(`../${projectId}`);
  }

  return (
    <div>
      {hasLocations ? (
        <div>
          /* Map data from useFetch to LocationCard Components + AddNewIdea
          component */
          <h1>U got locations</h1>
          {currentProjectData.locations
            .filter((location) => location.Project_ID == projectId)
            .map((location) => (
              <LocationCard location={location} />
            ))}
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      ) : (
        <div>
          <p>Project ID is {id}</p>
          <p>No locations detected</p>
          //AddNewLocation component
          <button onClick={handleBackBtn}>Back Button</button>
        </div>
      )}
    </div>
  );
}
