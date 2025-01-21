import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface MapProps {
  location: {
    latitude: string;
    longitude: string;
  };
  zoom?: number;
  width?: string;
  height?: string;
}

const Map: React.FC<MapProps> = ({
  location,
  zoom = 10,
  width = "400px",
  height = "400px",
}) => {
  const containerStyle = {
    width,
    height,
  };

  const center = {
    lat: Number.parseFloat(location.latitude),
    lng: Number.parseFloat(location.longitude),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
