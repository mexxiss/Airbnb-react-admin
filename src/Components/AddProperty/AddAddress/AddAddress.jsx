import React from "react";
import { Link } from "react-router-dom";

const AddAddress = ({ setCurrentStep }) => {
  return (
    <>
      <form>
        <div className="pb-16 lg:pb-0 ">
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="City"
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Building / Apartment / Society Name"
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Locality"
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Flat No."
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Floor No."
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Total Floors"
            />
          </div>
        </div>
        <div className="fixed lg:static bottom-3 w-full left-0 lg:px-0 sm:px-6 px-4 lg:mt-12 lg:mb-5 ">
          <Link to="/user-panel/dashboard" className=" text-white bg-primary font-medium text-lg lg:text-xl py-2 lg:py-3 rounded-md lg:rounded-xl px-10 lg:min-w-80 w-full lg:w-auto">
            Complete
          </Link>
        </div>
      </form>
    </>
  );
};

export default AddAddress;
