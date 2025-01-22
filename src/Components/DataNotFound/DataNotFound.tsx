import React from "react";

const DataNotFound = ({ message }: { message: string }) => {
  return (
    <div className="w-full relative z-10 flex items-center justify-center pt-10">
      <p className="text-2xl sm:text-3xl text-gray-500 font-medium">
        {`No ${message} Found`}
      </p>
    </div>
  );
};

export default DataNotFound;
