import React, { useState } from "react";

interface Amenity {
  _id: string;
  title: string;
  icon: string;
}

interface AmenitiesListProps {
  amenities: Amenity[];
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);
  const maxAmenitiesToShow = 6;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const amenitiesToDisplay = showAll
    ? amenities
    : amenities.slice(0, maxAmenitiesToShow);

  return (
    <div>
      <h4 className="text-xl md:text-2xl font-medium">Amenities</h4>
      <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-5">
        {amenitiesToDisplay.map((amenity) => (
          <li
            key={amenity._id}
            className="flex flex-col items-center justify-center gap-1"
          >
            <img
              src={amenity.icon}
              className="w-6 sm:w-8"
              alt={amenity.title}
            />
            <span className="text-sm md:text-base">{amenity.title}</span>
          </li>
        ))}
        {!showAll && amenities.length > maxAmenitiesToShow && (
          <li className="flex items-end justify-center col-span-2 sm:col-span-4 md:col-span-6">
            <button
              className="text-primary underline text-sm md:text-base"
              onClick={toggleShowAll}
            >
              View all amenities
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AmenitiesList;
