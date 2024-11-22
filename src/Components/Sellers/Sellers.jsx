import React, { useContext, useState } from "react";
import userImg from "../../assets/images/userImg.png";
import UpDown from "../../assets/icons/UpDown.png";
import trashIcon from "../../assets/icons/trashIcon.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { ToggleSwitch } from "flowbite-react";
import { DashboardContext } from "../../ContextApi/index";

const Sellers = () => {
  const { setIsActiveMobileMenu } = useContext(DashboardContext);
  const [isActive, setIsActive] = useState("Broker");
  const initialData = [
    {
      name: "Walter Horton",
      status: "blocked",
    },
    {
      name: "Hennry",
      status: "Active",
    },
  ];
  const [sellers, setSellers] = useState(initialData);

  // Handle status change
  const handleToggle = (index) => {
    const updatedSellers = sellers.map((seller, i) =>
      i === index
        ? {
            ...seller,
            status: seller.status === "Active" ? "blocked" : "Active",
          }
        : seller
    );
    setSellers(updatedSellers);
  };
  return (
    <div>
      <div className="px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">Sellers</h5>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative bg-white rounded-lg py-1.5 pl-10 pr-5">
            <input
              type="text"
              placeholder="Search"
              className="p-0 placeholder:text-[#4E307A80] text-[#4E307A80] text-sm border-none lg:min-w-[350px]"
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
      <div className="px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <div>
          <div className="mb-6">
            <ul className="flex gap-2">
              <li
                className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${
                  isActive === "Broker"
                    ? "font-medium bg-[#1E1E1E] border-[#1E1E1E] text-white"
                    : "border-border1 text-text2"
                }`}
                onClick={() => setIsActive("Broker")}
              >
                Broker
              </li>
              <li
                className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${
                  isActive === "Owner"
                    ? "font-medium bg-[#1E1E1E] border-[#1E1E1E] text-white"
                    : "border-border1 text-text2"
                }`}
                onClick={() => setIsActive("Owner")}
              >
                Owner
              </li>
              <li
                className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${
                  isActive === "Builder"
                    ? "font-medium bg-[#1E1E1E] border-[#1E1E1E] text-white"
                    : "border-border1 text-text2"
                }`}
                onClick={() => setIsActive("Builder")}
              >
                Builder
              </li>
            </ul>
          </div>
          <p className="text-lg text-[#040404] font-medium">
            Total Brokers (<span>15</span>)
          </p>
          <div className="mt-3">
            <div className="relative overflow-x-auto">
              <table
                className="w-full border-separate min-w-full"
                style={{ borderSpacing: "0 10px" }}
              >
                <thead className="text-sm text-[#8B8B8B] font-medium">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 px-3 pl-6"
                      style={{ minWidth: "270px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Admin <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "150px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Contact no. <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "150px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Member since <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "150px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Property Listed <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "140px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Status <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3 pr-6"
                      style={{ minWidth: "100px" }}
                    >
                      <div className="flex items-center gap-2.5">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {sellers.map((seller, index) => (
                    <tr className="bg-white mb-2" key={index}>
                      <td className=" py-4 px-3 pl-6 rounded-l-xl">
                        <div>
                          <div className="flex items-center gap-3">
                            <img
                              src={userImg}
                              className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 object-cover"
                              alt=""
                            />
                            <div>
                              <p className="text-sm text-[#040404] font-medium">
                                {seller.name}
                              </p>
                              <p className="text-xs text-text2 font-medium">
                                walterhorton@gmail.com
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className=" py-4 px-3">
                        <span className="text-sm text-[#040404]">
                          +91 9876543210
                        </span>
                      </td>
                      <td className=" py-4 px-3">
                        <span className="text-sm text-[#040404]">
                          20 Aug 2024
                        </span>
                      </td>
                      <td className=" py-4 px-3">
                        <span className="text-sm text-[#040404]">12</span>
                      </td>
                      <td className=" py-4 px-3">
                        <div className="">
                          <ToggleSwitch
                            checked={seller.status === "Active"}
                            label={seller.status}
                            onChange={() => handleToggle(index)}
                            className="*:focus:!shadow-none *:focus:!ring-0 toggleBtn flex items-center"
                          />
                        </div>
                      </td>
                      <td className=" py-4 px-3 text-center pr-6 rounded-r-xl">
                        <button className="mx-auto">
                          <img src={trashIcon} alt="" className="w-5 grayImg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#8B8B8B">
                  Showing 10 of 1265 users
                </p>
                <div>
                  <ul className="flex items-center gap-3">
                    <li>
                      <button className="text-[#8B8B8B]">
                        <KeyboardArrowLeftOutlined />
                      </button>
                    </li>
                    <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        1
                      </button>
                    </li>
                    <li>
                      <button className="text-white bg-[#040404] w-10 h-10 rounded-full flex items-center justify-center">
                        2
                      </button>
                    </li>
                    <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        3
                      </button>
                    </li>
                    <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        4
                      </button>
                    </li>
                    <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        ...
                      </button>
                    </li>
                    <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        10
                      </button>
                    </li>
                    <li>
                      <button className="text-[#8B8B8B]">
                        <KeyboardArrowRightOutlined />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellers;
