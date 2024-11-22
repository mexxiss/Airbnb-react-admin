import React from "react";

const Sidebar = ({ currentStep }) => {
  return (
    <>
      <div className="flex lg:block justify-between lg:px-8 py-[34px] lg:shadow-[10px_10px_30px_0px_#0000000F] rounded-[20px] lg:h-[calc(100vh_-_176px)] overflow-auto">
        <div className="flex items-center gap-2 flex-col lg:flex-row">
          <span
            className={`w-[30px] h-[30px] rounded-full text-white flex items-center justify-center text-lg ${
              currentStep >= 1 ? "bg-primary" : "bg-[#9398A2]"
            }`}
          >
            1
          </span>
          <p
            className={`text-lg font-medium ${
              currentStep >= 1 ? "text-primary" : "text-[#9398A2]"
            }`}
          >
            Property Details
          </p>
        </div>
        <div
          className={`h-[2px] lg:min-h-10 w-14 lg:w-[2.8px] my-6 lg:ml-[13px] ${
            currentStep >= 2 ? "bg-primary" : "bg-[#EDEDEF]"
          }`}
        ></div>
        <div className="flex items-center gap-2 flex-col lg:flex-row">
          <span
            className={`w-[30px] h-[30px] rounded-full text-white flex items-center justify-center text-lg ${
              currentStep >= 2 ? "bg-primary" : "bg-[#9398A2]"
            }`}
          >
            2
          </span>
          <p
            className={`text-lg font-medium ${
              currentStep >= 2 ? "text-primary" : "text-[#9398A2]"
            }`}
          >
            Amenities
          </p>
        </div>
        <div
          className={`h-[2px] lg:min-h-10 w-14 lg:w-[2.8px] my-6 lg:ml-[13px] ${
            currentStep >= 3 ? "bg-primary" : "bg-[#EDEDEF]"
          }`}
        ></div>
        <div className="flex items-center gap-2 flex-col lg:flex-row">
          <span
            className={`w-[30px] h-[30px] rounded-full text-white flex items-center justify-center text-lg ${
              currentStep >= 3 ? "bg-primary" : "bg-[#9398A2]"
            }`}
          >
            3
          </span>
          <p
            className={`text-lg font-medium ${
              currentStep >= 3 ? "text-primary" : "text-[#9398A2]"
            }`}
          >
            Photos
          </p>
        </div>
        <div
          className={`h-[2px] lg:min-h-10 w-14 lg:w-[2.8px] my-6 lg:ml-[13px] ${
            currentStep >= 4 ? "bg-primary" : "bg-[#EDEDEF]"
          }`}
        ></div>
        <div className="flex items-center gap-2 flex-col lg:flex-row">
          <span
            className={`w-[30px] h-[30px] rounded-full text-white flex items-center justify-center text-lg ${
              currentStep >= 4 ? "bg-primary" : "bg-[#9398A2]"
            }`}
          >
            4
          </span>
          <p
            className={`text-lg font-medium ${
              currentStep >= 4 ? "text-primary" : "text-[#9398A2]"
            }`}
          >
            Address
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
