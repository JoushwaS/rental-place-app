import React, { useRef, useState } from "react";
import { Input } from "antd";
import { useLoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];

const AddressInput = ({ onAddressSelect }) => {
  const [address, setAddress] = useState("");
  const searchBoxRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setAddress(place.formatted_address);
      onAddressSelect(place); // You can pass the place object to the parent component
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (searchBoxRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
      />
    </StandaloneSearchBox>
  );
};

export default AddressInput;
