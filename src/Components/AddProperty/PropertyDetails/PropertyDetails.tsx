import React from "react";

const PropertyDetails = ({ setCurrentStep }: any) => {
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Rent"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Rent</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="Buy"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Buy"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Buy</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="New_Project"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="New_Project"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>New Project</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="Commercial_Rent"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Commercial_Rent"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Commercial Rent</span>
                </label>
              </li>
              <li className="xl:grow">
                <input
                  type="radio"
                  name="Category"
                  id="Commercial_Buy"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Commercial_Buy"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Appartment"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Appartment</span>
                </label>
              </li>
              <li className="lg:grow">
                <input
                  type="radio"
                  name="Property_Type"
                  id="Villas"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Villas"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Villas</span>
                </label>
              </li>
              <li className="lg:grow">
                <input
                  type="radio"
                  name="Property_Type"
                  id="Flat"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Flat"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Flat</span>
                </label>
              </li>
              <li className="lg:grow">
                <input
                  type="radio"
                  name="Property_Type"
                  id="Independent Floor"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Independent Floor"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="1BHK"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="12BHK"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="12BHK"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1 2 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="2BHK"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="2BHK"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="3BHK"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="3BHK"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3 BHK</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="BHK"
                  id="3+BHK"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="3+BHK"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Studio"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Studio</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_1"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_1"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_2"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_2"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_3"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_3"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_4"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_4"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>4</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_5"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_5"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>5</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_6"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_6"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>6</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_7"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_7"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>7</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bedrooms"
                  id="Bed_7+"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Bed_7+"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_1"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_2"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_2"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_3"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_3"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_4"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_4"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>4</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_5"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_5"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>5</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_6"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_6"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>6</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_7"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_7"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>7</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_8"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_8"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>8</span>
                </label>
              </li>
              <li className="min-w-[60px]">
                <input
                  type="radio"
                  name="Bathrooms"
                  id="bath_8+"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="bath_8+"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-1 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Yearly"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Yearly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Rental_Period"
                  id="Monthly"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Monthly"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Monthly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Rental_Period"
                  id="Weekly"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Weekly"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Weekly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Rental_Period"
                  id="Daily"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Daily"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Fully_Furnished"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Fully Furnished</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Furnish_Type"
                  id="Semi_Furnished"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Semi_Furnished"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Semi Furnished</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Furnish_Type"
                  id="Unfrinshed"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Unfrinshed"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Payment_plan_Yearly"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Yearly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Payment_plan"
                  id="Payment_plan_Monthly"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Payment_plan_Monthly"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Monthly</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Payment_plan"
                  id="Payment_plan_Weekly"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Payment_plan_Weekly"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Included"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Include in rent</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Maintenance"
                  id="Separate"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Separate"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="form-radio hidden"
                />
                <label
                  htmlFor="None"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>None</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Security"
                  id="1Month"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="1Month"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>1 Month</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Security"
                  id="2Month"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="2Month"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>2 Month</span>
                </label>
              </li>
              <li className="xl:min-w-32">
                <input
                  type="radio"
                  name="Security"
                  id="Custom"
                  className="form-radio hidden"
                />
                <label
                  htmlFor="Custom"
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-[#F7F8FF] py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
