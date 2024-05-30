import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useScript } from '../../contexts';
import { ClickEditComponent } from '../../components';

export default function LocationShowPage() {
  const navigate = useNavigate();
  const { projectId, locationId } = useParams();

  const [locationData, setLocationData] = useState({});
  const [locationIndex, setLocationIndex] = useState();

  const { currentProjectData } = useScript();

  function getLocationsData() {
    //TODO: change to fetch
    for (let index = 0; index < currentProjectData.locations.length; index++) {
      if (
        currentProjectData.locations[index].Location_ID == locationId &&
        currentProjectData.locations[index].Project_ID == projectId
      ) {
        setLocationData(currentProjectData.locations[index]);
        setLocationIndex(index);
      }
    }
  }

  function handleBackBtn() {
    navigate(`../`);
  }

  useEffect(() => {
    getLocationsData();
    console.log(locationData);
  }, []);

  return (
    <div>
      <h1>Location is {locationId}</h1>
      <h2>Project ID is {projectId}</h2>
      <h3>Image not set</h3>
      <div>
        <h2>
          Name: {locationData.Name} {locationIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={locationData.Name}
          inputType={'text'}
          majorField={'locations'}
          minorField={'Name'}
          otherIdField={'Location_ID'}
          otherIdValue={locationId}
          index={locationIndex}
          placeholder={'Enter Location Name'}
        />
      </div>
      <div>
        <h2>
          Population: {locationData.Population} {locationIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={locationData.Population}
          inputType={'number'}
          majorField={'locations'}
          minorField={'Population'}
          otherIdField={'Location_ID'}
          otherIdValue={locationId}
          index={locationIndex}
          placeholder={'Enter Location Population'}
        />
      </div>
      <div>
        <h2>
          Description: {locationData.Description} {locationIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={locationData.Description}
          inputType={'text'}
          majorField={'locations'}
          minorField={'Description'}
          otherIdField={'Location_ID'}
          otherIdValue={locationId}
          index={locationIndex}
          placeholder={'Enter Location Description'}
        />
      </div>
      <div>
        <h2>
          Coordinates: {locationData.Coordinates} {locationIndex}
        </h2>
        <ClickEditComponent
          originalInputValue={locationData.Coordinates}
          inputType={'text'}
          majorField={'locations'}
          minorField={'Coordinates'}
          otherIdField={'Location_ID'}
          otherIdValue={locationId}
          index={locationIndex}
          placeholder={'Enter Location Coordinates'}
        />
      </div>
      <div>
        <h2>
          Related_Locations: {locationData.Related_Locations} {locationIndex}
        </h2>
        {locationData.Related_Locations &&
        locationData.Related_Locations.length ? (
          locationData.Related_Locations.map((related_location) =>
            currentProjectData.locations
              .filter((location) => location.Location_ID == related_location)
              .map((place) => <p>{place.Name}</p>)
          )
        ) : (
          <p>No Related Locations</p>
        )}
      </div>
      <button onClick={handleBackBtn}>Back Button</button>
    </div>
  );
}
