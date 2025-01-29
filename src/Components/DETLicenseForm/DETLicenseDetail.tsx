import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchLicenseById } from "../../hooks/react-query/create-license";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { ArrowLeftIcon } from "lucide-react";

const DETLicenseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: license,
    isLoading,
    error,
    isError,
  } = useFetchLicenseById({
    licenseId: id || "",
  });

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <Link
              to="#"
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Licenses
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              License Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    License Number
                  </label>
                  <p className="mt-1 text-gray-900 font-semibold">
                    {license?.data?.licenseNumber}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <span
                    className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                  ${
                    license?.data?.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                  >
                    {license?.data?.status}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Price
                  </label>
                  <p className="mt-1 text-gray-900">
                    ${license?.data?.price?.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Issue Date
                  </label>
                  <p className="mt-1 text-gray-900">
                    {new Date(
                      license?.data?.issueDate || ""
                    )?.toLocaleDateString() || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Expiry Date
                  </label>
                  <p className="mt-1 text-gray-900">
                    {new Date(
                      license?.data?.expiryDate || ""
                    )?.toLocaleDateString() || "N/A"}
                  </p>
                </div>

                {license?.data?.renewalDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Renewal Date
                    </label>
                    <p className="mt-1 text-gray-900">
                      {new Date(
                        license?.data?.renewalDate || ""
                      )?.toLocaleDateString() || "N/A"}
                    </p>
                  </div>
                )}
              </div>

              {/* Relations */}
              <div className="md:col-span-2 border-t pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Owner
                  </label>
                  <p className="mt-1 text-gray-900 font-medium">
                    {typeof license?.data?.owner === "object"
                      ? `${license?.data?.owner.first_name} ${license?.data?.owner.last_name}`
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Property
                  </label>
                  <p className="mt-1 text-gray-900 font-medium">
                    {typeof license?.data?.property === "object"
                      ? license?.data?.property.title
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="md:col-span-2 border-t pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Created At
                    </label>
                    <p className="mt-1 text-gray-900">
                      {new Date(
                        license?.data?.createdAt || ""
                      )?.toLocaleDateString() || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Updated
                    </label>
                    <p className="mt-1 text-gray-900">
                      {new Date(
                        license?.data?.updatedAt || ""
                      )?.toLocaleDateString() || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DataHandler>
    // <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
    //   <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
    //     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
    //       <h2 className="text-2xl font-bold text-gray-800 mb-4">
    //         License Details
    //       </h2>
    //       <div className="grid grid-cols-2 gap-4 text-gray-700">
    //         <div>
    //           <span className="font-semibold">License Number:</span>{" "}
    //           {license?.data?.licenseNumber}
    //         </div>
    //         <div>
    //           <span className="font-semibold">Status:</span>{" "}
    //           {license?.data?.status}
    //         </div>
    //         <div>
    //           <span className="font-semibold">Price:</span> AED{" "}
    //           {license?.data?.price}
    //         </div>
    //         <div>
    //           <span className="font-semibold">Issue Date:</span>{" "}
    //           {new Date(license?.data?.issueDate || "")?.toLocaleDateString() ||
    //             "N/A"}
    //         </div>
    //         <div>
    //           <span className="font-semibold">Expiry Date:</span>{" "}
    //           {new Date(
    //             license?.data?.expiryDate || ""
    //           )?.toLocaleDateString() || "N/A"}
    //         </div>
    //         <div>
    //           <span className="font-semibold">Renewed:</span>{" "}
    //           {license?.data?.renewed ? "Yes" : "No"}
    //         </div>
    //         {license?.data?.renewed && (
    //           <div>
    //             <span className="font-semibold">Renewal Date:</span>{" "}
    //             {license?.data?.renewalDate}
    //           </div>
    //         )}
    //         <div className="col-span-2 border-t pt-4 mt-2">
    //           <h3 className="text-lg font-semibold">Owner Details</h3>
    //           <p>
    //             {typeof license?.data?.owner === "object"
    //               ? `${license?.data?.owner.first_name} ${license?.data?.owner.last_name}`
    //               : "N/A"}
    //           </p>
    //         </div>
    //         <div className="col-span-2 border-t pt-4 mt-2">
    //           <h3 className="text-lg font-semibold">Property Details</h3>
    //           <p>
    //             {typeof license?.data?.property === "object"
    //               ? license?.data?.property.title
    //               : "N/A"}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </DataHandler>
  );
};

export default DETLicenseDetail;
