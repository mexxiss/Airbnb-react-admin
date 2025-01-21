import React from "react";
import GoogleMapReact from "google-map-react";

// Define the interface for location prop
export interface Location {
  latitude: string | number | null;
  longitude: string | number | null;
}

interface MarkerProps {
  lat: number;
  lng: number;
}

// Define Marker component before using it
const Marker: React.FC<MarkerProps> = () => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: "24px",
      height: "24px",
      transform: "translate(-50%, -100%)",
      userSelect: "none",
      cursor: "pointer",
    }}
    className="marker"
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      📍
    </div>
  </div>
);

interface MapComponentProps {
  location: Location;
  zoom: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ location, zoom }) => {
  const { latitude, longitude } = location;

  // Ensure we have valid numbers for the center coordinates
  const center = {
    lat: latitude ? parseFloat(latitude.toString()) : 0,
    lng: longitude ? parseFloat(longitude.toString()) : 0,
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY || "" }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
