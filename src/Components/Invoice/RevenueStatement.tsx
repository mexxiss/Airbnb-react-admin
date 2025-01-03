import React from "react";
import { Link } from "react-router-dom";
import { IMonthlyInvoice } from "../../types/invoiceTypes";

interface InvoiceDetails {
  invoiceNumber: string;
  date: string;
  statementPeriod: string;
}

interface Reservation {
  id?: number;
  reservationCode?: string;
  guestName?: string;
  checkIn?: string;
  checkOut?: string;
  nights?: number;
  income?: number;
}

interface Summary {
  totalIncome: number;
  managementFee: {
    percentage: number;
    amount: number;
  };
  expenses: {
    description: string;
    amount: number;
  }[];
  netAmountDue: number;
}

interface Props {
  data: IMonthlyInvoice;
}

const RevenueStatement: React.FC<Props> = ({ data }) => {
  const {
    invoiceDetails,
    reservations = [],
    summary,
    footer,
    companyDetails,
    ownerDetails,
  } = data;

  return (
    <div className="mt-8">
      <div className="p-8 rounded-2xl shadow-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h5 className="text-2xl font-bold text-gray-500">Logo</h5>
          <div className="flex flex-col gap-2 items-end">
            <span className="bg-primary bg-opacity-15 text-primary py-2 px-3 rounded-full text-xs font-medium">
              MONTHLY REVENUE STATEMENT
            </span>
            <p className="text-lg font-medium">
              {invoiceDetails?.invoiceNumber}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
          <div>
            <div className="text-gray-800 text-sm">
              <p className="font-semibold">{ownerDetails?.name}</p>
              <p className="mt-1">{ownerDetails?.address}</p>
              <div className="flex mt-1 gap-2">
                <span className="font-medium">Phone:</span>
                <p className="">{ownerDetails?.phone}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="font-medium">Created Date:</span>
                <p className="">{invoiceDetails?.date}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="text-gray-800 text-sm">
              <div className="flex  gap-2">
                <span className="font-medium">Owner:</span>
                <p className="">{companyDetails?.name}</p>
              </div>
              <p className="mt-1">{companyDetails?.address}</p>
              <div className="flex mt-1 gap-2">
                <span className="font-medium">Phone:</span>
                <p className="">{companyDetails?.phone}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="font-medium">Statement Period:</span>
                <p className="">{invoiceDetails?.statementPeriod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8">
          <div className="overflow-y-hidden">
            <table className="w-full">
              <thead className="text-gray-600 font-medium text-sm">
                <tr className="bg-primary bg-opacity-15">
                  <th className="py-3 text-left px-3 w-[50px]">#</th>
                  <th className="py-3 text-left px-3 min-w-[180px]">
                    Reservation Code
                  </th>
                  <th className="py-3 text-left px-3 min-w-[180px]">
                    Guest Name
                  </th>
                  <th className="py-3 text-left px-3 min-w-[100px]">
                    Check-In
                  </th>
                  <th className="py-3 text-left px-3 min-w-[100px]">
                    Check-Out
                  </th>
                  <th className="py-3 text-left px-3 min-w-[100px]">
                    Total Night
                  </th>
                  <th className="py-3 px-3 min-w-[180px] text-end">
                    Net Rental Income
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 font-medium text-sm">
                {reservations?.length > 0 ? (
                  reservations?.map((reservation, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-b-0 border-primary border-opacity-30 border-dashed"
                    >
                      <td className="py-4 px-3">{index + 1}</td>
                      <td className="py-4 px-3">
                        {reservation.reservationCode}
                      </td>
                      <td className="py-4 px-3">{reservation.guestName}</td>
                      <td className="py-4 px-3">{reservation.checkIn}</td>
                      <td className="py-4 px-3">{reservation.checkOut}</td>
                      <td className="py-4 px-3">{reservation.totalNights}</td>
                      <td className="py-4 px-3 text-end font-semibold">
                        AED {reservation?.netRentalIncome?.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-4 text-center">
                      No reservations available.
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={6} className="py-4 px-3 font-semibold text-lg">
                    Total
                  </td>
                  <td className="py-4 px-3 text-end font-semibold text-lg">
                    AED {summary?.totalIncome?.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="py-4 px-3">
                    <td className="text-gray-700 font-normal text-base">
                      Management Fee (17%)
                    </td>
                  </td>
                  <td className="py-4 px-3 text-end">
                    -AED {summary?.managementFee?.amount?.toFixed(2)}
                  </td>
                </tr>

                {summary?.expenses?.map((expense, index) => (
                  <tr key={index}>
                    <td colSpan={6} className="py-4 px-3">
                      {expense.description}
                    </td>
                    <td className="py-4 px-3 text-end">
                      -AED {expense?.amount?.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="border-y border-primary border-opacity-30 border-dashed">
                  <td colSpan={3}></td>
                  <td colSpan={3} className="py-4 px-3 font-semibold text-lg">
                    Net Amount Due
                  </td>
                  <td className="py-4 px-3 text-end font-semibold text-lg">
                    AED {summary?.netAmountDue?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10">
          <div className="text-gray-800 text-sm font-medium">
            {footer?.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="mt-10">
            <div className="bg-primary bg-opacity-15 text-primary py-2 px-3 text-sm font-medium">
              <Link to="https://www.frankporter.com/">www.frankporter.com</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueStatement;
