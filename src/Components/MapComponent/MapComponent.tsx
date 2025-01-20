import React from "react";
import GoogleMapReact from "google-map-react";

// Define the interface for location prop
interface Location {
  latitude: string;
  longitude: string;
}

interface MapComponentProps {
  location: Location; // location prop with latitude and longitude
  zoom: number; // zoom level for the map
}

const MapComponent: React.FC<MapComponentProps> = ({ location, zoom }) => {
  const { latitude, longitude } = location;

  const defaultProps = {
    center: {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    },
    zoom: zoom,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY || "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={parseFloat(latitude)} lng={parseFloat(longitude)} />
      </GoogleMapReact>
    </div>
  );
};

interface MarkerProps {
  lat: number;
  lng: number;
}

const Marker: React.FC<MarkerProps> = () => (
  <div
    style={{
      color: "red",
      fontWeight: "bold",
      fontSize: "20px",
      transform: "translate(-50%, -50%)",
    }}
  >
    📍
  </div>
);

export default MapComponent;
