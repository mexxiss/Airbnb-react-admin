import React, { useRef } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    text?: string;
  }>;
  height?: string;
  width?: string;
  apiKey?: string;
}

const Map: React.FC<MapProps> = ({
  center,
  zoom = 14,
  markers = [],
  height = "400px",
  width = "100%",
  apiKey = "",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mapRef} style={{ height, width }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY || "" }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{
          fullscreenControl: false,
          zoomControl: true,
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={index}
            lat={marker.lat}
            lng={marker.lng}
            text={marker.text}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
