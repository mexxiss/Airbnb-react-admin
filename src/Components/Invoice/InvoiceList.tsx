import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
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

const InvoiceList: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Invoices</h1>
        <input
          type="text"
          placeholder="Search customer or invoice number..."
          className="border rounded-lg p-2 text-sm focus:outline-none"
        />
      </div>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Create</th>
            <th className="px-4 py-3">Due</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Sent</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
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
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ${
                    invoice.customer[0].match(/[AEIOU]/i)
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
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusClasses[invoice.status]
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
  );
};

export default InvoiceList;
