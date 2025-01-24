import { KeyboardArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchPropertyById } from "../../hooks/react-query/properties-query";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import PropertyImagesGrid from "./PropertyImagesGrid";
import ImageSliderModal from "./ImageSliderModal";
import AddressDisplay from "./components/AddressDisplay";
import FeaturesDetails from "./components/FeaturesDetails";
import {
  formatCheckDetails,
  PropertyCheckDetails,
} from "../../services/apiServices";
import AmenitiesList from "./components/AmenitiesList";
import { Amenity } from "../../types/amenitiesTypes";
import Map from "../MapComponent/Map";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useFetchPropertyById({
    propertyId: id || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("lg:overflow-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("lg:overflow-hidden");
  };

  const location = {
    latitude: "25.266666",
    longitude: "55.316666",
  };

  // Convert string coordinates to numbers
  const center = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude),
  };

  const markers = [
    {
      lat: center.lat,
      lng: center.lng,
      text: "Dubai Location",
    },
  ];

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <div className="propertyDetail">
          <div>
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  to="/admin/properties"
                  className="text-text2 hover:text-text1 hover:underline"
                >
                  Back
                </Link>
              </li>
              <li>
                <span>
                  <KeyboardArrowRightOutlined className="!text-lg text-text2" />
                </span>
              </li>
              <li>
                <p className="text-primary max-w-[180px] text-nowrap text-ellipsis overflow-hidden">
                  {data?.data.title || "N/A"}
                </p>
              </li>
            </ul>
          </div>

          <PropertyImagesGrid
            images={data?.data.property_images || []}
            onViewAllClick={openModal}
          />

          <ImageSliderModal
            isOpen={isModalOpen}
            images={data?.data.property_images || []}
            onClose={closeModal}
          />

          <div className="mt-6 sm:mt-10">
            <div>
              <div className="lg:flex gap-10 relative">
                <div className="w-full">
                  <div>
                    <div className="mb-5 text-[#1F1607]">
                      <h5 className="text-lg md:text-xl lg:text-2xl font-medium leading-6 mb-2">
                        {data?.data.title}
                      </h5>
                      <AddressDisplay address={data?.data.address || {}} />
                    </div>
                    <div className="mb-4 ">
                      <p className="text-xl">
                        AED{" "}
                        <span className="text-3xl font-semibold">
                          {data?.data?.costs?.prices?.price_per_night || ""}
                        </span>{" "}
                        <span className="text-text2">/night</span>
                      </p>
                    </div>
                    <FeaturesDetails
                      property_details={
                        data?.data.property_details || {
                          max_guest_count: 0,
                          rooms_count: 0,
                          beds_count: 0,
                          bathrooms_count: 0,
                        }
                      }
                    />
                    <div>
                      <p className="text-[#1F1607]">
                        {data?.data.description || ""}
                      </p>
                    </div>

                    <hr className="my-6 border-[#C3C3C3]" />
                    <div className="flex flex-col xs:flex-row gap-8">
                      <div>
                        <p className="text-[#1F1607] font-medium text-lg">
                          Check in and out
                        </p>
                        <ul className="text-[#1F1607] mt-2">
                          <li>
                            Check in:{" "}
                            {(data?.data?.property_check_details &&
                              formatCheckDetails(
                                data?.data
                                  ?.property_check_details as PropertyCheckDetails
                              )?.check_in) ||
                              ""}
                          </li>
                          <li>
                            Check out:{" "}
                            {(data?.data?.property_check_details &&
                              formatCheckDetails(
                                data?.data
                                  ?.property_check_details as PropertyCheckDetails
                              )?.check_out) ||
                              ""}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-[#1F1607] font-medium text-lg">
                          Prices
                        </p>
                        <ul className="text-[#1F1607] mt-2">
                          <li>
                            Weekly discount:{" "}
                            {data?.data.discounts_percentage.weekly}%
                          </li>
                          <li>
                            Monthly discount:{" "}
                            {data?.data.discounts_percentage.monthly}%
                          </li>
                          <li>
                            Security Deposit: AED{" "}
                            {data?.data.costs.prices.security_amount || "0"}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <hr className="my-6 border-[#C3C3C3]" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-medium">
                  Important Information
                </h4>

                <div
                  className="property-information"
                  dangerouslySetInnerHTML={{
                    __html: data?.data.important_information || "",
                  }}
                />
              </div>
              <hr className="my-6 border-[#C3C3C3]" />
              {data?.data.amenities && (
                <AmenitiesList
                  amenities={(data?.data.amenities as Amenity[]) || []}
                />
              )}
              <div className="mt-10">
                <div className="h-[400px] rounded-3xl overflow-hidden">
                  <Map
                    zoom={9}
                    width="100%"
                    height="400px"
                    location={{
                      latitude: data?.data.location?.latitude || "0",
                      longitude: data?.data.location?.longitude || "0",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DataHandler>
  );
};

export default PropertyDetails;
