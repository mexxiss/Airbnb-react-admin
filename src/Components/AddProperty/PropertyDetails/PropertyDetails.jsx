import React from "react";

const PropertyDetails = ({ setCurrentStep }) => {
  return (
    <>
      <form>
        <div className="pb-16 lg:pb-0 ">
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Category</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="Rent"
                  class="form-radio hidden"
                />
                <label
                  for="Rent"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Rent</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="Buy"
                  class="form-radio hidden"
                />
                <label
                  for="Buy"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Buy</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="New_Project"
                  class="form-radio hidden"
                />
                <label
                  for="New_Project"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>New Project</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="Commercial_Rent"
                  class="form-radio hidden"
                />
                <label
                  for="Commercial_Rent"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Commercial Rent</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="Commercial_Buy"
                  class="form-radio hidden"
                />
                <label
                  for="Commercial_Buy"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Commercial Buy</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Property Type</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="lg:grow">
                <input
                  type="radio"
                  name="Property_Type"
                  id="Appartment"
                  class="form-radio hidden"
                />
                <label
                  for="Appartment"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Appartment</span>
                </label>
              </li>
              <li className="lg:grow">
                <input
                  type="radio"
                  name="Property_Type"
                  id="Villas"
                  class="form-radio hidden"
                />
                <label
                  for="Villas"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Villas</span>
                </label>
              </li>
              <li className="lg:grow">
                <input
                  type="radio"
                  name="Property_Type"
                  id="Flat"
                  class="form-radio hidden"
                />
                <label
                  for="Flat"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Flat</span>
                </label>
              </li>
              <li className="lg:grow">
                <input
                  type="radio"
                  name="Property_Type"
                  id="Independent Floor"
                  class="form-radio hidden"
                />
                <label
                  for="Independent Floor"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Independent Floor</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">BHK</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="1BHK"
                  class="form-radio hidden"
                />
                <label
                  for="1BHK"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="12BHK"
                  class="form-radio hidden"
                />
                <label
                  for="12BHK"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1 2 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="2BHK"
                  class="form-radio hidden"
                />
                <label
                  for="2BHK"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="3BHK"
                  class="form-radio hidden"
                />
                <label
                  for="3BHK"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="3+BHK"
                  class="form-radio hidden"
                />
                <label
                  for="3+BHK"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3+ BHK</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Bedrooms</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Studio"
                  class="form-radio hidden"
                />
                <label
                  for="Studio"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Studio</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_1"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_1"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_2"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_2"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_3"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_3"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_4"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_4"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>4</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_5"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_5"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>5</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_6"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_6"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>6</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_7"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_7"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>7</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_7+"
                  class="form-radio hidden"
                />
                <label
                  for="Bed_7+"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>7+</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Bathrooms</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_1"
                  class="form-radio hidden"
                />
                <label
                  for="bath_1"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_2"
                  class="form-radio hidden"
                />
                <label
                  for="bath_2"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_3"
                  class="form-radio hidden"
                />
                <label
                  for="bath_3"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_4"
                  class="form-radio hidden"
                />
                <label
                  for="bath_4"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>4</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_5"
                  class="form-radio hidden"
                />
                <label
                  for="bath_5"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>5</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_6"
                  class="form-radio hidden"
                />
                <label
                  for="bath_6"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>6</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_7"
                  class="form-radio hidden"
                />
                <label
                  for="bath_7"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>7</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_8"
                  class="form-radio hidden"
                />
                <label
                  for="bath_8"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>8</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_8+"
                  class="form-radio hidden"
                />
                <label
                  for="bath_8+"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>8+</span>
                </label>
              </li>
            </ul>
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Built Up Area (Sq. ft)"
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Monthly rent"
            />
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Rental Period</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Rental_Period"
                  id="Yearly"
                  class="form-radio hidden"
                />
                <label
                  for="Yearly"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Yearly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Rental_Period"
                  id="Monthly"
                  class="form-radio hidden"
                />
                <label
                  for="Monthly"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Monthly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Rental_Period"
                  id="Weekly"
                  class="form-radio hidden"
                />
                <label
                  for="Weekly"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Weekly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Rental_Period"
                  id="Daily"
                  class="form-radio hidden"
                />
                <label
                  for="Daily"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Daily</span>
                </label>
              </li>
            </ul>
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Maintenance Charges (per month)"
            />
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Furnish Type</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Furnish_Type"
                  id="Fully_Furnished"
                  class="form-radio hidden"
                />
                <label
                  for="Fully_Furnished"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Fully Furnished</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Furnish_Type"
                  id="Semi_Furnished"
                  class="form-radio hidden"
                />
                <label
                  for="Semi_Furnished"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Semi Furnished</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Furnish_Type"
                  id="Unfrinshed"
                  class="form-radio hidden"
                />
                <label
                  for="Unfrinshed"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Unfrinshed</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Payment plan</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Payment_plan"
                  id="Payment_plan_Yearly"
                  class="form-radio hidden"
                />
                <label
                  for="Payment_plan_Yearly"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Yearly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Payment_plan"
                  id="Payment_plan_Monthly"
                  class="form-radio hidden"
                />
                <label
                  for="Payment_plan_Monthly"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Monthly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Payment_plan"
                  id="Payment_plan_Weekly"
                  class="form-radio hidden"
                />
                <label
                  for="Payment_plan_Weekly"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Weekly</span>
                </label>
              </li>
            </ul>
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Start Date of Construction"
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="End Date of Construction"
            />
          </div>
          <div className=" mb-[30px]">
            <input
              type="text"
              className="py-3 px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-[#F7F8FF] h-[45px]"
              placeholder="Available from"
            />
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Maintenance Charges</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Maintenance"
                  id="Included"
                  class="form-radio hidden"
                />
                <label
                  for="Included"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Include in rent</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Maintenance"
                  id="Separate"
                  class="form-radio hidden"
                />
                <label
                  for="Separate"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Separate</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-[30px]">
            <p className="text-[15px] text-[#040404]">Security Deposit</p>
            <ul className="flex flex-wrap gap-3.5 mt-2">
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Security"
                  id="None"
                  class="form-radio hidden"
                />
                <label
                  for="None"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>None</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Security"
                  id="1Month"
                  class="form-radio hidden"
                />
                <label
                  for="1Month"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1 Month</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Security"
                  id="2Month"
                  class="form-radio hidden"
                />
                <label
                  for="2Month"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2 Month</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Security"
                  id="Custom"
                  class="form-radio hidden"
                />
                <label
                  for="Custom"
                  class="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Custom</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="fixed lg:static bottom-3 w-full left-0 lg:px-0 sm:px-6 px-4 ">
          <button
            className="lg:my-5 text-white bg-primary font-medium text-lg lg:text-xl py-2 lg:py-3 rounded-md lg:rounded-xl px-10 lg:min-w-80 w-full lg:w-auto"
            onClick={() => setCurrentStep(2)}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default PropertyDetails;
