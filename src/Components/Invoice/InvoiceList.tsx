import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { DashboardContext } from "../../ContextApi";
import userImg from "../../assets/images/userImg.png";
import searchIcon from "../../assets/icons/searchIcon.png";
interface Invoice {
  id: string;
  customer: string;
  invoiceNumber: string;
  createDate: string;
  createTime: string;
  dueDate: string;
  dueTime: string;
  amount: string;
  sentCount: number;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
}

const invoices: Invoice[] = [
  {
    id: "1",
    customer: "Amiah Pruitt",
    invoiceNumber: "INV-19919",
    createDate: "14 Dec 2024",
    createTime: "11:45 AM",
    dueDate: "06 Feb 2025",
    dueTime: "6:45 AM",
    amount: "$2,331.63",
    sentCount: 9,
    status: "Paid",
  },
  {
    id: "2",
    customer: "Ariana Lang",
    invoiceNumber: "INV-19918",
    createDate: "15 Dec 2024",
    createTime: "11:45 AM",
    dueDate: "05 Feb 2025",
    dueTime: "5:45 AM",
    amount: "$2,372.93",
    sentCount: 4,
    status: "Overdue",
  },
  {
    id: "3",
    customer: "Lawson Bass",
    invoiceNumber: "INV-19917",
    createDate: "16 Dec 2024",
    createTime: "11:45 AM",
    dueDate: "04 Feb 2025",
    dueTime: "4:45 AM",
    amount: "$2,283.97",
    sentCount: 9,
    status: "Paid",
  },
  {
    id: "4",
    customer: "Selina Boyer",
    invoiceNumber: "INV-19916",
    createDate: "17 Dec 2024",
    createTime: "11:45 AM",
    dueDate: "03 Feb 2025",
    dueTime: "3:45 AM",
    amount: "$2,251.84",
    sentCount: 8,
    status: "Pending",
  },
  {
    id: "5",
    customer: "Angelique Morse",
    invoiceNumber: "INV-19915",
    createDate: "18 Dec 2024",
    createTime: "11:45 AM",
    dueDate: "02 Feb 2025",
    dueTime: "2:45 AM",
    amount: "$2,343.51",
    sentCount: 11,
    status: "Paid",
  },
];

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
                <th className="px-4 py-3">Create</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Sent</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, i) => (
                <tr
                  key={invoice.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ${invoice.customer[0].match(/[AEIOU]/i)
                        ? "bg-green-500"
                        : "bg-blue-500"
                        }`}
                    >
                      {invoice.customer[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {invoice.customer}
                      </p>
                      <p className="text-sm text-gray-500">
                        {invoice.invoiceNumber}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <p>{invoice.createDate}</p>
                    <p className="text-sm text-gray-500">{invoice.createTime}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <p>{invoice.dueDate}</p>
                    <p className="text-sm text-gray-500">{invoice.dueTime}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-4 py-3 text-center">{invoice.sentCount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[invoice.status]
                        }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/invoice/${i}/edit`}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <EditIcon />
                    </Link>
                    <Link
                      to={`/admin/invoice/${i}/view`}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <VisibilityIcon />
                    </Link>
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
