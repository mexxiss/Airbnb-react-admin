import React from "react";
import searchIcon from "../../assets/icons/searchIcon.png";
import FurnishingInvoiceList from "./FurnishingInvoiceList";
import RevenueInvoiceList from "./RevenueInvoiceList";
import ReusableTab from "../ReusableTab/ReusableTab";
import MaintenanceList from "./MaintenanceForm/MaintenanceList";

const InvoiceList: React.FC = () => {

  const tabs = [
    {
      key: "revenue-list",
      label: "Revenue Invoice List",
      Component: RevenueInvoiceList,
    },
    {
      key: "furnishing-list",
      label: "Furnishing Invoice List",
      Component: FurnishingInvoiceList,
    },
    {
      key: "maintenance-list",
      label: "Maintenance Invoice List",
      Component: MaintenanceList,
    },
  ];

  return (
    <div className="">
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
        <div className="flex items-center justify-between border-b border-[#00858e5e] pb-5">
          <h5 className="text-22 text-primary font-bold">Invoices</h5>

          <div className="relative bg-white rounded-lg py-1.5 pl-10 pr-5 hidden sm:block border border-gray-300">
            <input
              type="text"
              placeholder="Search"
              className="p-0 placeholder:text-gray-600 text-gray-600 text-sm border-none lg:min-w-[350px]"
            />
            <img
              src={searchIcon}
              className="w-4 brightness-75 absolute left-4 top-1/2 -translate-y-1/2"
              alt=""
            />
          </div>
        </div>
        <div className="mt-5">
          <ReusableTab tabs={tabs} includesPathname="invoice" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
