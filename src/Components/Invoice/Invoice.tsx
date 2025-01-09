import InvoiceCreate from "./InvoiceCreate";
import FurnishingInvoiceCreate from "./FurnishingInvoiceCreate";
import MaintenanceForm from "./MaintenanceForm/MaintenanceForm";
import ReusableTab from "../ReusableTab/ReusableTab";

const Invoice = () => {
  const tabs = [
    {
      key: "revenue",
      label: "Create Revenue Invoice",
      Component: InvoiceCreate,
    },
    {
      key: "furnishing",
      label: "Create Furnishing Invoice",
      Component: FurnishingInvoiceCreate,
    },
    {
      key: "maintenance",
      label: "Create Maintenance Invoice",
      Component: MaintenanceForm,
    },
  ];

  return (
    <div>
      <ReusableTab tabs={tabs} includesPathname="invoice" />
    </div>
  );
};

export default Invoice;
