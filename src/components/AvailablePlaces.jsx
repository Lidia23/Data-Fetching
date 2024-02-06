import Places from './Places.jsx';
import Error from './Error.jsx';
import { useState, useEffect } from 'react';
import { sortPlacesByDistance } from '../loc.js';


export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch places')
        }
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        }); //comes from the browser, not from us neither from react
        
      } catch (error) {
        setError({message: error.message || 'Coud not fetch places, please try again later.'});
      }
    }
    fetchPlaces();
  }, []);
if(error){
  return <Error title="An error occured!" message={error.message}/>
}
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
