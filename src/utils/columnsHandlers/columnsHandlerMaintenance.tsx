import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import EllipsisTooltip from "../../Components/EllipsisTooltip/EllipsisTooltip";
import ActionButtonGroup from "../../Components/ActionButtonGroup/ActionButtonGroup";
import MaintenanceInvoiceGenerator from "../../Components/Invoice/MaintenanceForm/MaintenanceInvoiceGenerator";

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
    render: (rowData: any) => {
      return <p>{rowData?.toFixed(2)}</p>;
    },
  },
  {
    key: "amountOwedToFP",
    label: "Balance",
    minWidth: "100px",
    render: (rowData: any) => {
      return <p>{rowData?.toFixed(2)}</p>;
    },
  },
  {
    key: "subtotal",
    label: "Sub Total",
    minWidth: "50px",
    render: (rowData: any) => {
      return <p>{rowData?.toFixed(2)}</p>;
    },
  },
  {
    key: "tax",
    label: "Tax",
    minWidth: "50px",
    render: (rowData: any) => {
      return <p>{rowData?.toFixed(2)}</p>;
    },
  },
  {
    key: "actions",
    label: "Actions",
    minWidth: "100px",
    render: (rowData: any) => {
      const handleView = () => {
        navigate(`/admin/invoice/maintenance-details/${rowData._id}`);
      };

      const handleEdit = () => {
        navigate(`/admin/invoice/maintenance-details/${rowData._id}/edit`);
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
      return <MaintenanceInvoiceGenerator invoiceData={rowData} />;
    },
  },
];
