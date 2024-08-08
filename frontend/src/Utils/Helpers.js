import { Geolocated } from "react-geolocated";

// create a function that gets current location as lat lng and based on that generate array of objects of nearby lat lng and array list is also a prop
const generateNearbyLocation = ({ currentLocation, records = 4 }) => {
  const locationList = [];
  for (let i = 0; i < records; i++) {
    locationList.push({
      lat: currentLocation?.lat + 0.01 * i,
      lng: currentLocation?.lng + 0.01 * i,
    });
  }
  return locationList;
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
      render: ({
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        positionError,
      }) => {
        if (!isGeolocationAvailable) {
          reject("Geolocation is not supported by this browser.");
        } else if (!isGeolocationEnabled) {
          reject("Geolocation is not enabled.");
        } else if (positionError) {
          reject(positionError.message);
        } else if (coords) {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        } else {
          reject("Unable to retrieve location data.");
        }
        return null; // Since we're using the function outside the component, no rendering is needed
      },
    });
  });
};
// export the function
export { generateNearbyLocation, getCurrentLocation };
