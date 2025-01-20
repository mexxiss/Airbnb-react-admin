import React from "react";
import bedIcon from "../../../assets/icons/bed.png";
import bathIcon from "../../../assets/icons/bath.png";
import roomIcon from "../../../assets/icons/room.png";
import guestIcon from "../../../assets/icons/guest.png";

interface FeaturesDetailsProps {
  property_details: {
    max_guest_count: number;
    rooms_count: number;
    beds_count: number;
    bathrooms_count: number;
  };
}

const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural}`;
};

const FeaturesDetails: React.FC<FeaturesDetailsProps> = ({
  property_details,
}) => {
  const { max_guest_count, rooms_count, beds_count, bathrooms_count } =
    property_details;

  const details = [
    { icon: guestIcon, label: pluralize(max_guest_count, "Guest", "Guests") },
    { icon: bedIcon, label: pluralize(beds_count, "Bed", "Beds") },
    { icon: roomIcon, label: pluralize(rooms_count, "Room", "Rooms") },
    { icon: bathIcon, label: pluralize(bathrooms_count, "Bath", "Baths") },
  ];

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
        {details.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <img src={item.icon} alt={item.label} className="w-6" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesDetails;
