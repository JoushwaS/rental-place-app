import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { FaHouse } from "react-icons/fa6";
import { renderToString } from "react-dom/server";

// Convert the FaHouse icon to an SVG string
const houseIconSvg = encodeURIComponent(
  renderToString(<FaHouse size={32} color="black" />)
);

// Create a URL for the SVG
const houseIconUrl = `data:image/svg+xml;charset=UTF-8,${houseIconSvg}`;

const containerStyle = {
  width: "60%",
  height: "650px",
};

function MapComponent({ defaultCenter, zoom = 40, locationList }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const onUnmount = React.useCallback(function callback(map) {}, []);

  console.log("locationList>", locationList);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={zoom}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker
          position={defaultCenter}
          draggable={false}
          onTitleChanged={(e) => console.log(e)}
        ></Marker>

        {locationList.map((location, key) => (
          <Marker
            key={key}
            icon={houseIconUrl}
            position={location}
            draggable={false}
          />
        ))}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapComponent);
