import React from "react";
import { Link } from "react-router-dom";

const FeaturesInvoice = () => {
  return (
    <div className="p-8 rounded-2xl shadow-lg bg-white">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-2xl font-bold text-gray-500">Logo</h5>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="bg-primary bg-opacity-15 text-primary py-2 px-3 rounded-full text-xs font-medium">
              INTERIOR DECORATION
            </span>
            <p className="text-lg font-medium">INV-1991</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
          <div>
            <div className="text-gray-800 text-sm">
              <p className="font-semibold">
                Frank Porter Vacation Homes Rental L.L.C
              </p>
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
              <div className="flex gap-2">
                <span className="font-medium">Client Name:</span>
                <p className="">Surinder Saini Paul</p>
              </div>
              <div className="flex mt-1 gap-2">
                <span className="font-medium">Month:</span>
                <p className="">November 2024</p>
              </div>
              <div className="flex mt-1 gap-2">
                <span className="font-medium">Property:</span>
                <p className="">B110 - B202 Wavz Res</p>
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
                <th colSpan={2} className="py-3 text-left px-3 min-w-[450px]">
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 font-medium text-sm">
              <tr className="border-b last:border-b-0 border-primary border-opacity-30 border-dashed">
                <td colSpan={2} className="py-4 px-3">
                  <p className="text-base font-semibold">Styling Project</p>
                  <ul className="mt-1 text-sm list-disc pl-4 flex flex-col gap-1">
                    <li>
                      <span>Deep cleaning</span>, <span>DET lock</span>,{" "}
                      <span>Decorations</span>, <span>Laundry kit</span>
                    </li>
                    <li>
                      <span>Cutlery set</span>,<span> Cutlery tray</span>,
                      <span> Coffee/tea mugs x4</span>,
                      <span> Water glass set</span>,<span> Wine glass set</span>
                      ,<span> Placemats x6</span>,<span> Knife block</span>,
                      <span> Cooking utensils</span>,<span> Baking tray</span>,
                      <span> Chopping board</span>,<span> Corkscrew</span>,
                      <span> Can opener</span>,<span> Grater</span>,
                      <span> Strainer</span>,<span> Kitchen bin with lid</span>,
                      <span> Kitchen towel</span>,<span> Mop and bucket</span>,
                    </li>
                    <li>
                      <span> Bath mat</span>,<span> Shower curtain set</span>,
                      <span> Pillow x1</span>,<span> Mattress protector</span>,
                      <span> Duvet single</span>,<span> Duvet king</span>,
                      <span> Bedroom bin</span>,<span> Ash tray</span>,
                      <span> Qibla direction sticker</span>,
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="pt-4 px-3 font-medium text-base">
                  Total Furnising
                </td>
                <td className="pt-4 px-3 text-end font-medium text-base">
                  AED 3,850.00
                </td>
              </tr>
              <tr>
                <td className="pb-4 px-3 font-medium text-base">
                  Received Amount{" "}
                </td>
                <td className="pb-4 px-3 text-end font-medium text-base">
                  AED 4,000.00
                </td>
              </tr>
              <tr className="border-y border-primary border-opacity-30 border-dashed">
                <td className="py-4 px-3 font-semibold text-lg">
                  TOTAL OWED TO FP
                </td>
                <td className="py-4 px-3 text-end font-semibold text-lg">
                  AED -150.00
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
  );
};

export default FeaturesInvoice;
