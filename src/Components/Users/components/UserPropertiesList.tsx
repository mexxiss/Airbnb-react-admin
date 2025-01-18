import React from "react";
import { Link, useParams } from "react-router-dom";
import { usePropertiesByUser } from "../../../hooks/react-query/properties-query";
import Loader from "../../Loader/Loader";
import ErrorHandleMessage from "../../ErrorHandleMessage/ErrorHandleMessage";

const UserPropertiesList = () => {
  const { id: userId } = useParams();
  const { data, isLoading, isError, error } = usePropertiesByUser(userId || "");

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error instanceof Error) {
    return <ErrorHandleMessage msg={error.message} />;
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-lg text-text1 font-semibold">
          Listed Properties ({data?.totalCount || 0})
        </h6>
        <Link
          to={`/admin/user/${userId}/add-property`}
          className="btn1 flex items-center"
        >
          Add Property
        </Link>
      </div>

      <div className="grid xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 mt-5 gap-4">
        {!data?.properties?.length
          ? "User don't have properties"
          : data?.properties.map((property) => {
            return (
              <div
                className="border border-primary flex flex-col gap-2 sm:gap-3 relative"
                key={property._id}
              >
                <div className="">
                  <img
                    src={property?.property_images[0]?.img_url}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full ">
                  <div className="px-2 pb-2 sm:pb-3 w-full">
                    <div>
                      <h6 className="sm:text-lg md:text-xl text-gray-800 w-[calc(100%_-_10px)] text-nowrap overflow-hidden text-ellipsis">
                        {property?.title}
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
                        {property.status === "Active" ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserPropertiesList;
