import React from "react";
import { formatDate } from "../../utils/common";
import UpDownIcon from "../../assets/icons/UpDown.png";
import MonthlyInvoiceGenerator from "../../Components/Invoice/MonthlyInvoiceGenerator";

export const getRevenueColumnsHandler = () => [
  {
    key: "companyDetails.name",
    label: "Customer",
    minWidth: "150px",
    render: (rowData: any) => (
      <div className="font-medium text-gray-900">
        {rowData?.companyDetails?.name || "-"}
      </div>
    ),
  },
  {
    key: "invoiceDetails.invoiceNumber",
    label: "Invoice",
    minWidth: "150px",
    render: (rowData: any) => (
      <div>{rowData?.invoiceDetails?.invoiceNumber || "-"}</div>
    ),
  },
  {
    key: "invoiceDetails.date",
    label: "Date",
    minWidth: "150px",
    render: (rowData: any) => (
      <div>{formatDate(rowData?.invoiceDetails?.date || "")}</div>
    ),
  },
  {
    key: "invoiceDetails.statementPeriod",
    label: "Invoice Period",
    minWidth: "140px",
    render: (rowData: any) => (
      <div>{rowData?.invoiceDetails?.statementPeriod || "-"}</div>
    ),
  },
  {
    key: "summary.netAmountDue",
    label: "Net Due",
    minWidth: "140px",
    render: (rowData: any) => (
      <div>${rowData?.summary?.netAmountDue?.toFixed(2) || "0.00"}</div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    minWidth: "100px",
    render: (rowData: any) => (
      <MonthlyInvoiceGenerator invoiceData={rowData} isUseIcons={true} />
    ),
  },
];
