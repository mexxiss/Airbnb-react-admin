import React, { useContext, useState } from "react";
import { MenuOutlined } from "@mui/icons-material";
import { DashboardContext } from "../../ContextApi";
import userImg from "../../assets/images/userImg.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import FurnishingInvoiceList from "./FurnishingInvoiceList";
import RevenueInvoiceList from "./RevenueInvoiceList";


interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}

const InvoiceList: React.FC = () => {
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;
  const [isActive, setIsActive] = useState("Revenue");

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

        <div className="mb-6">
          <ul className="flex gap-2">
            <li
              className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${isActive === "Revenue"
                ? "font-medium bg-[#1E1E1E] border-[#1E1E1E] text-white"
                : "border-border1 text-text2"
                }`}
              onClick={() => setIsActive("Revenue")}
            >
              Revenue
            </li>
            <li
              className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${isActive === "Furninshing"
                ? "font-medium bg-[#1E1E1E] border-[#1E1E1E] text-white"
                : "border-border1 text-text2"
                }`}
              onClick={() => setIsActive("Furninshing")}
            >
              Furnishing
            </li>
          </ul>
        </div>
        <div>
          <div className="relative overflow-x-auto">
            {isActive === "Furninshing" ?
              <FurnishingInvoiceList />
              : <RevenueInvoiceList />
            }
          </div>
        </div>
      </div>
    </div >
  );
};

export default InvoiceList;
