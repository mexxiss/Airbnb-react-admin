import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import EllipsisTooltip from "../../Components/EllipsisTooltip/EllipsisTooltip";
import ActionButtonGroup from "../../Components/ActionButtonGroup/ActionButtonGroup";
import FurnishingInvoiceGenerator from "../../Components/Invoice/FurnishingInvoiceGenerator";

export const columnsHandlerMaintenance = (navigate: (path: string) => void) => [
  {
    key: "taxInvoiceNumber",
    label: "Invoice No.",
    minWidth: "100px",
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
    key: "totalMaintenceCost",
    label: "Total Maintenance Cost",
    minWidth: "150px",
  },
  {
    key: "amountOwedToFP",
    label: "Balance",
    minWidth: "100px",
  },
  {
    key: "subtotal",
    label: "Sub Total",
    minWidth: "50px",
  },
  {
    key: "tax",
    label: "Tax",
    minWidth: "50px",
  },
  {
    key: "actions",
    label: "Actions",
    minWidth: "100px",
    render: (rowData: any) => {
      const handleView = () => {
        alert("view");
        // navigate(`/admin/invoice/furnishing-details/${rowData._id}`);
      };

      const handleEdit = () => {
        alert("edit");
        // navigate(`/admin/invoice/furnishing-details/${rowData._id}/edit`);
      };

      return (
        <ActionButtonGroup
          icons={[
            { icon: <VisibilityIcon />, onClick: handleView, xs: 14, sm: 18 },
            { icon: <EditIcon />, onClick: handleEdit, xs: 14, sm: 18 },
          ]}
          gap={8}
        />
      );
    },
  },
  {
    key: "download",
    label: "Download",
    minWidth: "100px",
    render: (rowData: any) => {
      return <FurnishingInvoiceGenerator invoiceData={rowData} />;
    },
  },
];
