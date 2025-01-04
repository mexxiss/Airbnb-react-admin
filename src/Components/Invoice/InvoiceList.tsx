import React, { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import { DashboardContext } from "../../ContextApi";
import userImg from "../../assets/images/userImg.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import { useFetchRevenueList } from "../../hooks/react-query/revenue/useFetchRevenueList";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { formatDate } from "../../utils/common";
import MonthlyInvoiceGenerator from "./MonthlyInvoiceGenerator";
import { IMonthlyInvoice } from "../../types/invoiceTypes";

const statusClasses = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
};

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}

const InvoiceList: React.FC = () => {
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;
  const { data, isLoading, isError, error } = useFetchRevenueList();

  if (isLoading || isError) {
    return (
      <DataHandler
        loadingStates={[isLoading]}
        errorStates={[{ isError, error }]}
      />
    );
  }

  const invoices: IMonthlyInvoice[] = data.data || [];

  return (
    <div className="">
      <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">Invoices</h5>
        </div>
        <div className="flex items-center gap-6">
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
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <div>
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Invoice Number</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Invoice Statement Period</th>
                <th className="px-4 py-3">Net Due</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <div className="font-medium text-gray-900">
                      {invoice?.companyDetails?.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {invoice?.invoiceDetails?.invoiceNumber}
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(invoice?.invoiceDetails?.date || "")}
                  </td>
                  <td className="px-4 py-3">
                    {invoice?.invoiceDetails?.statementPeriod}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    ${invoice?.summary?.netAmountDue?.toFixed(2)}
                  </td>
                  <td className="text-right">
                    <MonthlyInvoiceGenerator
                      invoiceData={invoice}
                      isUseIcons={true}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
