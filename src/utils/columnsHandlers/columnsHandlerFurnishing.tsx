import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import EllipsisTooltip from "../../Components/EllipsisTooltip/EllipsisTooltip";
import ActionButtonGroup from "../../Components/ActionButtonGroup/ActionButtonGroup";
import FurnishingInvoiceGenerator from "../../Components/Invoice/FurnishingInvoiceGenerator";

const statusClasses = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
};
export const columnsHandlerFurnishing = (
  navigate: (path: string) => void,
  refatch: () => void
) => [
  {
    key: "ownerDetails.name",
    label: "Customer",
    minWidth: "150px",
    render: (rowData: any) => (
      <div className="font-medium text-gray-900">
        {rowData?.ownerDetails?.name || "-"}
      </div>
    ),
  },
  {
    key: "invoiceNumber",
    label: "Invoice No.",
    minWidth: "20px",
    render: (rowData: any) => {
      return <EllipsisTooltip title={rowData} />;
    },
  },
  {
    key: "statementPeriod",
    label: "Statement Period",
    minWidth: "150px",
  },
  {
    key: "receivedAmount",
    label: "Received Amount",
    minWidth: "150px",
  },
  {
    key: "totalFurnishingCost",
    label: "Total Furni... Cost",
    minWidth: "150px",
  },
  {
    key: "amountOwedToFP",
    label: "Balance",
    minWidth: "100px",
  },
  {
    key: "status",
    label: "Status",
    minWidth: "100px",
    render: (value: keyof typeof statusClasses) => (
      <span
        className={`text-sm px-2 py-1 rounded ${statusClasses[value] || ""}`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    minWidth: "100px",
    render: (rowData: any) => {
      const handleView = () => {
        navigate(`/admin/invoice/furnishing-details/${rowData._id}`);
      };

      const handleEdit = () => {
        navigate(`/admin/invoice/furnishing-details/${rowData._id}/edit`);
      };

      return (
        <>
          <ActionButtonGroup
            icons={[
              { icon: <VisibilityIcon />, onClick: handleView, xs: 14, sm: 18 },
              { icon: <EditIcon />, onClick: handleEdit, xs: 14, sm: 18 },
            ]}
            gap={8}
          />
        </>
      );
    },
  },
  {
    key: "download",
    label: "Download",
    minWidth: "100px",
    render: (rowData: any) => {
      return (
        <>
          <FurnishingInvoiceGenerator invoiceData={rowData} refatch={refatch} />
        </>
      );
    },
  },
];
