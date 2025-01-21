import React from "react";
import { MapPin } from "lucide-react";

interface MarkerProps {
  lat: number;
  lng: number;
  text?: string;
}

const MapMarker: React.FC<MarkerProps> = ({ text }) => {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer">
      <MapPin className="w-8 h-8 text-red-500" />
      {text && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white px-2 py-1 rounded shadow-md text-sm whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

export default MapMarker;
