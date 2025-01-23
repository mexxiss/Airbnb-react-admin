import React from "react";
import searchIcon from "../../assets/icons/searchIcon.png";
import FurnishingInvoiceList from "./FurnishingInvoiceList";
import RevenueInvoiceList from "./RevenueInvoiceList";
import ReusableTab from "../ReusableTab/ReusableTab";
import MaintenanceList from "./MaintenanceForm/MaintenanceList";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchStore } from "../../store/useSearchStore";

const InvoiceList: React.FC = () => {
  const { searchTerm, setSearchTerm, clearSearch } = useSearchStore();

  const tabs = [
    {
      key: "revenue-list",
      label: "Revenue Invoice List",
      Component: (props: any) => (
        <RevenueInvoiceList searchTerm={searchTerm} {...props} />
      ),
    },
    {
      key: "furnishing-list",
      label: "Furnishing Invoice List",
      Component: (props: any) => (
        <FurnishingInvoiceList searchTerm={searchTerm} {...props} />
      ),
    },
    {
      key: "maintenance-list",
      label: "Maintenance Invoice List",
      Component: (props: any) => (
        <MaintenanceList searchTerm={searchTerm} {...props} />
      ),
    },
  ];

  return (
    <div className="">
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
        <SearchBar
          title="Invoices"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={clearSearch}
          searchIcon={searchIcon}
        />
        <div className="mt-5">
          <ReusableTab tabs={tabs} includesPathname="invoice" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
