import React, { useContext, useEffect, useRef, useState } from "react";
import users from "../../assets/icons/users.png";
import sellers from "../../assets/icons/sellers.png";
import properties from "../../assets/icons/properties.png";
import userImg from "../../assets/images/userImg.png";
import lineGraph from "../../assets/images/lineGraph.png";
import pieChart from "../../assets/images/pieChart.png";
import waveChart from "../../assets/images/waveChart.png";
import barChart from "../../assets/images/barChart.png";
import {
  ArrowUpwardOutlined,
  KeyboardArrowUpOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { DashboardContext } from "../../ContextApi/index";

const Dashboard = () => {
  const { setIsActiveMobileMenu } = useContext(DashboardContext);
  const [optionShow, setOptionShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This Week");
  const optionRef = useRef();
  const seviceOptions = [
    { id: 1, text: "This Week" },
    { id: 2, text: "Last week" },
    { id: 3, text: "Last Month" },
  ];
  const toggleOptionMenu = () => {
    setOptionShow(!optionShow);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option.text);
    setOptionShow(false);
  };
  const handleClickOutside = (event) => {
    if (optionRef.current && !optionRef.current.contains(event.target)) {
      setOptionShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden hover:text-primary active:text-primary" onClick={() => setIsActiveMobileMenu(true)}><MenuOutlined className="!text-3xl"/></button>
          <h5 className="text-22 text-primary font-bold">Dashboard</h5>
        </div>
        <div>
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>
      <div className="px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <div className="2xl:flex gap-5">
          <div className="2xl:w-[75%]">
            <div className="flex flex-wrap sm:grid grid-cols-2 lg:flex gap-5">
              <div className="w-full lg:basis-1/3 bg-white rounded-2xl p-4">
                <p className="text-lg text-[#101828] font-medium mb-5">
                  Top Brokers
                </p>
                <ul className="flex">
                  <li className="w-[34px] h-[34px] rounded-full bg-primary text-white text-xs font-normal border border-white flex items-center justify-center">
                    CK
                  </li>
                  <li className="w-[34px] h-[34px] rounded-full bg-[#a58b5e] text-white text-xs font-normal border border-white flex items-center justify-center -ml-1.5">
                    TN
                  </li>
                  <li className="w-[34px] h-[34px] rounded-full bg-[#8f7850] text-white text-xs font-normal border border-white flex items-center justify-center -ml-1.5">
                    RT
                  </li>
                  <li className="w-[34px] h-[34px] rounded-full bg-[#a58b5e] text-white text-xs font-normal border border-white flex items-center justify-center -ml-1.5">
                    UK
                  </li>
                  <li className="w-[34px] h-[34px] rounded-full bg-primary text-white text-xs font-normal border border-white flex items-center justify-center -ml-1.5">
                    UR
                  </li>
                  <li className="w-[34px] h-[34px] rounded-full bg-[#8f7850] text-white text-xs font-normal border border-white flex items-center justify-center -ml-1.5">
                    +8
                  </li>
                </ul>
              </div>
              <div className="w-full xs:flex-1 bg-primary bg-opacity-80 rounded-2xl p-4 flex xs:block gap-4 items-center ">
                <div className=" xs:w-[34px] w-12 h-12 xs:h-[34px] rounded-[10px] bg-white flex items-center justify-center xs:mb-3.5">
                  <img
                    src={users}
                    alt=""
                    className="w-6 xs:w-4 imgColor opacity-60"
                  />
                </div>
                <div>
                  <p className="text-2xl text-white font-medium">460</p>
                  <p className="text-xs text-white">Total Users</p>
                </div>
              </div>
              <div className="w-full xs:flex-1 bg-primary rounded-2xl p-4 flex xs:block gap-4 items-center ">
                <div className=" xs:w-[34px] w-12 h-12 xs:h-[34px] rounded-[10px] bg-white flex items-center justify-center xs:mb-3.5">
                  <img
                    src={sellers}
                    alt=""
                    className="w-6 xs:w-4 imgColor opacity-80"
                  />
                </div>
                <div>
                  <p className="text-2xl text-white font-medium">460</p>
                  <p className="text-xs text-white">Total Sellers</p>
                </div>
              </div>
              <div className="w-full xs:flex-1 bg-[#a58b5e] rounded-2xl p-4 flex xs:block gap-4 items-center ">
                <div className=" xs:w-[34px] w-12 h-12 xs:h-[34px] rounded-[10px] bg-white flex items-center justify-center xs:mb-3.5">
                  <img
                    src={properties}
                    alt=""
                    className="w-6 xs:w-4 imgColor"
                  />
                </div>
                <div>
                  <p className="text-2xl text-white font-medium">460</p>
                  <p className="text-xs text-white">Total Propertries</p>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] pt-5 px-8 pb-8">
              <div className="pl-8">
                <p className="text-lg text-[#667085] mb-4">Revenue This Week</p>
                <p className="text-[#0B2443] flex items-center gap-1.5">
                  <ArrowUpwardOutlined className="!text-4xl font-bold" />{" "}
                  <span className="text-[32px] font-medium">32.5%</span>
                </p>
              </div>
              <div className="mt-5">
                <img src={lineGraph} alt="" />
              </div>
            </div>
            <div className="mt-8">
              <div className="grid lg:grid-cols-2 gap-x-5 gap-y-8">
                <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] p-5">
                  <p className="text-lg text-[#101828] font-medium">
                    Number of Users
                  </p>
                  <div className="mt-1">
                    <span className="text-sm text-[#101828] pb-1 border-b border-[#101828]">
                      April - May
                    </span>
                  </div>
                  <div className="mt-5">
                    <img src={waveChart} alt="" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] p-5">
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-[#101828] font-medium">
                      No. of property listed
                    </p>
                    <div>
                      <div
                        className="my-3 md:my-0 py-1.5 px-3 lg:pl-4 lg:pr-3 rounded-lg border border-border1 hover:border-primary relative hover:text-primary flex gap-3 justify-between items-center cursor-pointer "
                        onClick={toggleOptionMenu}
                        ref={optionRef}
                      >
                        <div
                          className={`select-menu flex  ${
                            optionShow ? "active" : ""
                          }`}
                        >
                          <div className="select-btn">
                            <p className="sBtn-text text-sm text-primary">
                              {selectedOption}
                            </p>
                          </div>
                          {optionShow && (
                            <div className="w-full lg:w-fit left-1/2 top-full absolute z-[1] mt-2.5 -translate-x-1/2 bg-white px-2 shadow-md">
                              <ul className="options w-fit text-text2">
                                {seviceOptions.map((option, index) => (
                                  <li
                                    key={index}
                                    className={`flex cursor-pointer items-center bg-white hover:bg-[#f2f2f2] rounded-lg px-3 sm:px-4 py-1.5 mb-1 ${
                                      option.text === selectedOption &&
                                      "bg-[#f2f2f2]"
                                    }`}
                                    onClick={() => handleOptionClick(option)}
                                  >
                                    <span className="text-base text-nowrap">
                                      {option.text}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <span
                          className={`${optionShow ? "" : "rotate-[180deg]"}`}
                        >
                          <KeyboardArrowUpOutlined />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1">
                    <span className="text-sm text-[#101828]pb-1 border-b border-[#101828]">
                      April - May
                    </span>
                  </div>
                  <div className="mt-5">
                    <img src={barChart} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="2xl:w-[25%] mt-8">
            <div className="grid lg:grid-cols-2 2xl:grid-cols-1 gap-x-5 gap-y-8">
              <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] pt-5 px-8 pb-6">
                <p className="text-[18px] text-[#101828] font-medium">
                  Leading Cities
                </p>
                <div className="mt-5">
                  <img src={pieChart} alt="" className="w-[180px] mx-auto" />
                </div>
              </div>
              <div className="">
                <div className="grid xs:grid-cols-2 gap-5">
                  <div className="bg-primary rounded-2xl p-4">
                    <div className="w-[34px] h-[34px] rounded-[10px] bg-white flex items-center justify-center mb-3.5">
                      <img src={properties} alt="" className="w-4 imgColor" />
                    </div>
                    <p className="mt-5 text-2xl lg:text-3xl font-medium text-white">
                      128
                    </p>
                    <p className="text-sm mt-2 text-white">
                      Total Sold Properties
                    </p>
                  </div>
                  <div className="bg-[#a58b5e] rounded-2xl p-4">
                    <div className="w-[34px] h-[34px] rounded-[10px] bg-white flex items-center justify-center mb-3.5">
                      <img src={sellers} alt="" className="w-4 imgColor" />
                    </div>
                    <p className="mt-5 text-2xl lg:text-3xl font-medium text-white">
                      156
                    </p>
                    <p className="text-sm mt-2 text-white">
                      Total Active Sellers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
