import React from "react";
import locationPin from "../../../assets/icons/locationPin.png";

interface Address {
  building_no?: string;
  city?: string;
  street?: string;
  area?: string;
  landmark?: string;
  country?: string;
  pincode?: string;
}

interface AddressDisplayProps {
  address: Address;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
  const formattedAddress = Object.values(address)
    .filter((value) => value && value.trim() !== "")
    .join(", ");

  return (
    <p className="flex items-start gap-2 mt-1">
      <img
        src={locationPin}
        alt="Location"
        className="w-2.5 md:w-3 mt-1 md:mt-1.5"
      />
      {formattedAddress ? (
        <span className="text-sm md:text-base text-[#717171] w-full">
          {formattedAddress}
        </span>
      ) : (
        <span className="text-sm md:text-base text-[#717171] w-full italic">
          Address information is not available.
        </span>
      )}
    </p>
  );
};

export default AddressDisplay;
