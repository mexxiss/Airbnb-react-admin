import React from "react";
import property from "../../../assets/images/property.png";

const UserPropertiesList = () => {
  return (
    <div className="mt-10">
      <h6 className="text-lg text-primary font-semibold">
        Listed Properties (10)
      </h6>
      <div className="grid xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 mt-5 gap-4">
        <div className="border border-primary flex flex-col gap-2 sm:gap-3 relative">
          <a className="absolute w-full h-full" href="/user-panel/calender"></a>
          <div className="">
            <img src={property} className="w-full h-full object-cover" />
          </div>
          <div className="w-full ">
            <div className="px-2 pb-2 sm:pb-3 w-full">
              <div>
                <h6 className="sm:text-lg md:text-xl text-gray-800 w-[calc(100%_-_10px)] text-nowrap overflow-hidden text-ellipsis">
                  My New Property
                </h6>
              </div>
              <hr className="w-full my-2 sm:my-3 border-primary border-opacity-50" />
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm tracking-wide">
                  Studio
                </span>
                <div className="text-sm flex items-center gap-1 text-primary">
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium !text-lg css-q7mezt"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="CheckCircleIcon"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"></path>
                  </svg>
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPropertiesList;
