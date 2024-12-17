import React from "react";
import breakfast from "../../../assets/icons/breakfast.png";
import wheelchair from "../../../assets/icons/wheelchair.png";
import smoking from "../../../assets/icons/smoking.png";
import elevator from "../../../assets/icons/elevator.png";
import kidFriendly from "../../../assets/icons/kidFriendly.png";
import parking from "../../../assets/icons/parking.png";
import pet from "../../../assets/icons/pet.png";
import pool from "../../../assets/icons/pool.png";
import multiFamlily from "../../../assets/icons/multiFamlily.png";
import restaurant from "../../../assets/icons/restaurant.png";
import "./Amenities.css";

const Amenities = ({ setCurrentStep }: any) => {
  return (
    <>
      <form>
        <div className="pb-16 lg:pb-0 ">
          <div className="mb-[30px]">
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Restaurant"
                  id="Restaurant"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Restaurant"
                  className="w-full text-center h-[45px] text-[#707070] py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={restaurant} alt="" className="grayImg w-4 h-4" />
                  <span>Restaurant</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Pool"
                  id="Pool"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Pool"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={pool} alt="" className="grayImg w-4 h-4" />
                  <span>Pool</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Smoking"
                  id="Smoking"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Smoking"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={smoking} alt="" className="grayImg w-4 h-4" />
                  <span>Smoking not allowed</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Wheelchair"
                  id="Wheelchair"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Wheelchair"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={wheelchair} alt="" className="grayImg w-4 h-4" />
                  <span>Wheelchair Accessible</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Elevator"
                  id="Elevator"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Elevator"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={elevator} alt="" className="grayImg w-4 h-4" />
                  <span>Elevator in building</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Breakfast"
                  id="Breakfast"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Breakfast"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={breakfast} alt="" className="grayImg w-4 h-4" />
                  <span>Breakfast Included</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="parking"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={parking} alt="" className="grayImg w-4 h-4" />
                  <span>Free parking</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Multi_family"
                  id="Multi_family"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Multi_family"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={multiFamlily} alt="" className="grayImg w-4 h-4" />
                  <span>Multi family</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Kids"
                  id="Kids"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Kids"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={kidFriendly} alt="" className="grayImg w-4 h-4" />
                  <span>Kids Friendly</span>
                </label>
              </li>
              <li className="min-w-24">
                <input
                  type="checkbox"
                  name="Pet"
                  id="Pet"
                  className="form-checkbox hidden"
                />
                <label
                  htmlFor="Pet"
                  className="w-full text-center h-[45px] text-[#707070]  py-2.5 px-4 flex items-center gap-2 rounded-full border border-[#707070] "
                >
                  <img src={pet} alt="" className="grayImg w-4 h-4" />
                  <span>Pet Allowed</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="fixed lg:static bottom-3 w-full left-0 lg:px-0 sm:px-6 px-4 ">
          <button
            className="btn1 !rounded !px-10"
            onClick={() => setCurrentStep(3)}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default Amenities;
