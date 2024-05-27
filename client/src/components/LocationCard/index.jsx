import React from 'react';
import './styles.css';
import { useScript } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import IdeaModal from '../IdeaModal';

export default function LocationCard({ location }) {
  const navigate = useNavigate();

  const { currentLocationID, setCurrentLocationID } = useScript();

  function handleOnClick() {
    setCurrentLocationID(location.Location_ID);
    navigate(`./${location.Location_ID}`);
  }

  const locationObject = {
    Location_ID: '',
    Name: '',
    Population: '',
    Image: '',
    Description: '',
    Coordinates: '',
    Related_Locations: 'array of FK',
  };

  return (
    <div
      className={`location-card-container ${
        currentLocationID == location.Location_ID ? 'current-location' : null
      }`}
      onClick={handleOnClick}
    >
      <h2>{location.Name}</h2>
    </div>
  );
}
