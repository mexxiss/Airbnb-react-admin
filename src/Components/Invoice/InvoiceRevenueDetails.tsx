import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const InvoiceRevenueDetails = () => {
  const { user } = useAuthStore();
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-8 rounded-2xl shadow-lg bg-white">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-2xl font-bold text-gray-500">Logo</h5>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="bg-primary bg-opacity-15 text-primary py-2 px-3 rounded-full text-xs font-medium">
                MONTHLY REVENUE STATEMENT
              </span>
              <p className="text-lg font-medium">INV-1991</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <div className="text-gray-800 text-sm">
                <p className="font-semibold">{user?.address.street}</p>
                <p className="mt-1">
                  1147 Rohan Drive Suite 819 - Burlington, VT / 82021
                </p>
                <div className="flex mt-1 gap-2">
                  <span className="font-medium">Phone:</span>
                  <p className="">+1 802-448-2354</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="font-medium">Date:</span>
                  <p className="">March 15, 2022</p>
                </div>
              </div>
            </div>
            <div>
              <div className="text-gray-800 text-sm">
                <div className="flex  gap-2">
                  <span className="font-medium">Owner:</span>
                  <p className="">Surinder Saini Paul Harbans</p>
                </div>
                <p className="mt-1">
                  18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337
                </p>
                <div className="flex mt-1 gap-2">
                  <span className="font-medium">Phone:</span>
                  <p className="">+1 802-448-2354</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="font-medium">Statement Period:</span>
                  <p className="">2024/11</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                {Array(3)
                  .fill(0)
                  .map((_) => (
                    <tr className="border-b last:border-b-0 border-primary border-opacity-30 border-dashed">
                      <td className="py-4 px-3">1</td>
                      <td className="py-4 px-3">RS-dwekjwdsc</td>
                      <td className="py-4 px-3">Inder</td>
                      <td className="py-4 px-3">27-10-2024</td>
                      <td className="py-4 px-3">30-10-2024</td>
                      <td className="py-4 px-3">3</td>
                      <td className="py-4 px-3 text-end font-semibold">
                        AED 1,803.00
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan={6} className="py-4 px-3 font-semibold text-lg">
                    Total
                  </td>
                  <td className="py-4 px-3 text-end font-semibold text-lg">
                    AED 1,803.00
                  </td>
                </tr>
                <tr className="border-t border-primary border-opacity-30 border-dashed">
                  <td colSpan={2} className="py-4"></td>
                  <td colSpan={5} className="py-4">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="px-3 text-gray-700 font-normal text-base">
                            Management Fee (17%)
                          </td>
                          <td className="px-3 text-end text-gray-700 font-medium text-base">
                            -AED 303
                          </td>
                        </tr>
                        <tr>
                          <td className="px-3 pt-2 text-gray-700 font-normal text-base">
                            <p>Expenses</p>
                            <div>
                              <table className="w-full">
                                <tbody>
                                  <tr>
                                    <td className="px-3 text-gray-700 font-medium text-sm italic">
                                      {" "}
                                      <span>DET License Fee</span>
                                    </td>
                                    <td className="px-3 text-end text-gray-700 font-medium text-sm">
                                      -AED 370
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                          <td className="px-3 text-end text-gray-700 font-medium text-base"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr className="border-y border-primary border-opacity-30 border-dashed">
                  <td colSpan={3}></td>
                  <td colSpan={3} className="py-4 px-3 font-semibold text-lg">
                    Net Amount Due
                  </td>
                  <td className="py-4 px-3 text-end font-semibold text-lg">
                    AED 1,130.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-10">
          <div className="text-gray-800 text-sm font-medium">
            <p>Kind regards,</p>
            <p>Mexxstates</p>
          </div>
        </div>
        <div className="mt-10">
          <div className="bg-primary bg-opacity-15 text-primary py-2 px-3 text-sm font-medium">
            <Link to="https://www.frankporter.com/">www.frankporter.com</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceRevenueDetails;
