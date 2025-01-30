import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface Location {
  latitude: string;
  longitude: string;
}

interface MapProps {
  location: Location | Location[]; // Supports both single & multiple locations
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
  const containerStyle = { width, height };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Convert location(s) to array for uniform handling
  const locations = Array.isArray(location) ? location : [location];

  // Compute center for a single location, otherwise, use bounds for multiple
  const center =
    locations.length === 1
      ? {
          lat: parseFloat(locations[0].latitude),
          lng: parseFloat(locations[0].longitude),
        }
      : undefined; // Center will be auto-adjusted for multiple markers

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
      if (locations.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach((loc) =>
          bounds.extend(
            new google.maps.LatLng(
              parseFloat(loc.latitude),
              parseFloat(loc.longitude)
            )
          )
        );
        map.fitBounds(bounds);
      }
    },
    [locations]
  );

  const onUnmount = useCallback(() => setMap(null), []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center} // Auto-calculated for single location
      zoom={locations.length === 1 ? zoom : undefined} // Use zoom only for single location
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={{
            lat: parseFloat(loc.latitude),
            lng: parseFloat(loc.longitude),
          }}
        />
      ))}
    </GoogleMap>
  ) : null;
};

export default Map;
