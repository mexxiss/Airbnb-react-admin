import React from "react";

const PropertyDetails = ({ setCurrentStep }: any) => {
  return (
    <>

      <form action="">
        <div className='grid sm:grid-cols-2 gap-4'>
          <div className="sm:col-span-2">
            <label className="text-[15px]">
              Title
            </label>
            <input
              type="text"
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
              placeholder="Title"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[15px]">
              Description
            </label>
            <textarea
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white resize-none"
              placeholder="Description"
              rows={6}
            ></textarea>
          </div>
          <div className="sm:col-span-2">
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Independent Floor</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2">
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>3+ BHK</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="">
            <label className="text-[15px]">
              Bedrooms
            </label>
            <input
              type="number"
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
              placeholder="No. of Bedrooms"
            />
          </div>
          <div className="">
            <label className="text-[15px]">
              Bathrooms
            </label>
            <input
              type="number"
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
              placeholder="No. of Bathrooms"
            />
          </div>
          <div className="">
            <label className="text-[15px]">
              Guests
            </label>
            <input
              type="number"
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
              placeholder="No. of Guests"
            />
          </div>
          <div className='sm:col-span-2 my-3'>
            <p className="text-lg font-medium  text-primary">Price Details</p>
            <div className='grid sm:grid-cols-2 gap-4 mt-2'>
              <div className="">
                <label className="text-[15px]">
                  Weekly Discount %
                </label>
                <input
                  type="number"
                  className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
                  placeholder="Weekly Discount %"
                />
              </div>
              <div className="">
                <label className="text-[15px]">
                  Monthly Discount %
                </label>
                <input
                  type="number"
                  className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
                  placeholder="Monthly Discount %"
                />
              </div>
              <div className="">
                <label className="text-[15px]">
                  Price Per Night
                </label>
                <input
                  type="text"
                  className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
                  placeholder="Price Per Night"
                />
              </div>
              <div className="">
                <label className="text-[15px]">
                  Security Amount
                </label>
                <input
                  type="text"
                  className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
                  placeholder="Security Amount"
                />
              </div>
              <div className="">
                <label className="text-[15px]">
                  Cleaning Fee
                </label>
                <input
                  type="text"
                  className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
                  placeholder="Cleaning Fee"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[15px]">
                  Security Details
                </label>
                <input
                  type="text"
                  className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
                  placeholder="Security Details"
                />
              </div>
            </div>
          </div>
          <div className="">
            <label className="text-[15px]">
              Check-In
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                </svg>
              </div>
              <input type="time" id="time" className="py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]" min="09:00" max="18:00" value="00:00" required />
            </div>
          </div>
          <div className="">
            <label className="text-[15px]">
              Check-Out
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                </svg>
              </div>
              <input type="time" id="time" className="py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]" min="09:00" max="18:00" value="00:00" required />
            </div>
          </div>
          <div className="sm:col-span-2">
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
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
                  className="w-full text-center text-[15px] text-[#8B8B8B] bg-white py-2.5 px-5 sm:px-7 inline-block rounded-md border border-[#E2E2EC] "
                >
                  <span>Unfrinshed</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2">
            <label className="text-[15px]">
              Staying rules
            </label>
            <textarea
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white resize-none"
              placeholder="Staying rules"
              value="Please don't forget to send your passport/valid ID as well as those checking in with you. This is a strict requirement of Dubai's Economy and Tourism Department (DET)"
              rows={4}
            ></textarea>
          </div>
          <div className="">
            <label className="text-[15px]">
              Permit Code
            </label>
            <input
              type="text"
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
              placeholder="Permit Code"
            />
          </div>
          <div className="">
            <label className="text-[15px]">
              Expiry Date
            </label>
            <input
              type="date"
              className="mt-1 py-3 px-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#E2E2EC] w-full rounded bg-white h-[45px]"
            />
          </div>
        </div>
        <div className='mt-8'>
          <button className='btn1 !rounded !px-10' onClick={() => setCurrentStep(2)}>Next</button>
        </div>
      </form>
    </>
  );
};

export default PropertyDetails;
