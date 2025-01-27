import React, { useContext } from "react";
// "react-rte": "^0.16.5",
import userImg from "../../assets/images/userImg.png";
import { Link, useParams } from "react-router-dom";
import { KeyboardArrowLeftOutlined, MenuOutlined } from "@mui/icons-material";
import ComponentHeader from "../ComponentHeader/ComponentHeader";
import { useFetchFurnishingDataById } from "../../hooks/react-query/revenue/useFetchFurnishingDataById";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { formatDate, formatWithCommas } from "../../utils/common";

const FurnishingInvoiceDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useFetchFurnishingDataById({
    id: id || "",
  });

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div>
        <ComponentHeader
          title="Invoice Details"
          linkText="Invoice List"
          linkTo="/admin/invoices"
          userImage={userImg}
        />
        <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
          <div className="">
            <div className="">
              <Link
                to="/admin/invoices"
                className="w-max flex items-center justify-center uppercase text-2xl font-medium"
              >
                <KeyboardArrowLeftOutlined className="text-gray-600" />{" "}
                {data?.invoiceNumber}
              </Link>
            </div>
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 rounded-2xl shadow-lg bg-white">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-2xl font-bold text-gray-500">
                          Logo
                        </h5>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className="bg-primary bg-opacity-15 text-primary py-2 px-3 rounded-full text-xs font-medium">
                          INTERIOR DECORATION
                        </span>
                        <p className="text-lg font-medium">
                          {data?.invoiceNumber}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                      <div>
                        <div className="text-gray-800 text-sm">
                          <p className="font-semibold">
                            {data?.companyDetails?.name}
                          </p>
                          <p className="mt-1">
                            {data?.companyDetails?.address}
                          </p>
                          <div className="flex mt-1 gap-2">
                            <span className="font-medium">Phone:</span>
                            <p className=""> {data?.companyDetails?.phone}</p>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <span className="font-medium">Date:</span>
                            <p className="">
                              {formatDate(data?.createdAt || "")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-800 text-sm">
                          <div className="flex gap-2">
                            <span className="font-medium">Client Name:</span>
                            <p className=""> {data?.ownerDetails?.name}</p>
                          </div>
                          <div className="flex mt-1 gap-2">
                            <span className="font-medium">Month:</span>
                            <p className="">{data?.statementPeriod}</p>
                          </div>
                          <div className="flex mt-1 gap-2">
                            <span className="font-medium">Property:</span>
                            <p className="">{data?.property_id?.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="overflow-y-hidden">
                      <table className="w-full">
                        <thead className="text-gray-600 font-medium text-sm">
                          <tr className="bg-primary bg-opacity-15">
                            <th
                              colSpan={2}
                              className="py-3 text-left px-3 min-w-[450px]"
                            >
                              Name
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 font-medium text-sm">
                          <tr className="border-b last:border-b-0 border-primary border-opacity-30 border-dashed">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data?.furnishingDetails || "",
                              }}
                              className="html-content mt-6 mb-6"
                            />
                          </tr>
                          <tr>
                            <td className="pt-4 px-3 font-medium text-base">
                              Total Furnising
                            </td>
                            <td className="pt-4 px-3 text-end font-medium text-base">
                              AED{" "}
                              {formatWithCommas(data?.totalFurnishingCost || 0)}
                            </td>
                          </tr>
                          <tr>
                            <td className="pb-4 px-3 font-medium text-base">
                              Received Amount{" "}
                            </td>
                            <td className="pb-4 px-3 text-end font-medium text-base">
                              AED {formatWithCommas(data?.receivedAmount || 0)}
                            </td>
                          </tr>
                          <tr className="border-y border-primary border-opacity-30 border-dashed">
                            <td className="py-4 px-3 font-semibold text-lg">
                              TOTAL OWED TO FP
                            </td>
                            <td className="py-4 px-3 text-end font-semibold text-lg">
                              AED -{formatWithCommas(data?.amountOwedToFP || 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="text-gray-800 text-sm font-medium">
                      <p>Kind regards,</p>
                      <p>Mexxstates</p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <div className="bg-primary bg-opacity-15 text-primary py-2 px-3 text-sm font-medium">
                      <Link to="https://www.frankporter.com/">
                        www.frankporter.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Invoice /> */}
            </div>
          </div>
        </div>
      </div>
    </DataHandler>
  );
};

export default FurnishingInvoiceDetails;
