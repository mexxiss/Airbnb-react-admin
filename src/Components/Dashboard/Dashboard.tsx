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
import { DashboardContext, DashboardContextType } from "../../ContextApi";
import RevenueChart from "../charts/line-charts/RevenueChart";
import CityDistributionChart from "../charts/pie-charts/CityDistributionChart";
import { colors } from "../../theme/colors";
import InfoCard from "../InfoCard/InfoCard";
import { primaryFilter } from "../charts/utils/cssSupportFile";
import HorizontalCard from "../InfoCard/HorizontalCard";
import LineChart from "../charts/line-charts/LineChart";
import PropertyListedChart from "../charts/Column-charts/PropertyListedChart";

const Dashboard: React.FC = () => {
  // Context for mobile menu
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

  // State for option menu
  const [optionShow, setOptionShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("This Week");

  // Ref for option menu
  const optionRef = useRef<HTMLDivElement>(null);

  // Service options for the dropdown
  const seviceOptions = [
    { id: 1, text: "This Week" },
    { id: 2, text: "Last week" },
    { id: 3, text: "Last Month" },
  ];

  // Toggle the option menu visibility
  const toggleOptionMenu = () => {
    setOptionShow((prev) => !prev);
  };

  // Handle option click
  const handleOptionClick = (option: { id: number; text: string }) => {
    setSelectedOption(option.text);
    setOptionShow(false);
  };

  // Handle click outside of the option menu
  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionRef.current &&
      !optionRef.current.contains(event.target as Node)
    ) {
      setOptionShow(false);
    }
  };

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const revenueData = [2800, 1500, 2200, 2100, 3200, 2900, 2100];
  const percentageIncrease = 32.5;

  const cityData = [
    { name: "Chandigarh", percentage: 30, color: colors.primary[500] },
    { name: "Mohali", percentage: 20, color: colors.primary[600] },
    { name: "Patiala", percentage: 15, color: colors.primary[900] },
    { name: "Others", percentage: 35, color: colors.primary[300] },
  ];
  const sampleData = [
    { x: Date.UTC(2024, 3, 1), y: 50000 },
    { x: Date.UTC(2024, 3, 10), y: 100000 },
    { x: Date.UTC(2024, 3, 20), y: 75000 },
    { x: Date.UTC(2024, 4, 1), y: 150000 },
    { x: Date.UTC(2024, 4, 10), y: 200000 },
    { x: Date.UTC(2024, 4, 20), y: 120000 },
  ];

  const sampleData2 = [
    { x: 23, y: 50 },
    { x: 24, y: 70 },
    { x: 25, y: 60 },
    { x: 26, y: 80 },
    { x: 27, y: 120 }, // Annotated point
    { x: 28, y: 70 },
    { x: 29, y: 60 },
  ];

  return (
    <div>
      <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">Dashboard</h5>
        </div>
        <div>
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img
              src={userImg}
              className="w-full h-full object-cover"
              alt="User"
            />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <div className="2xl:flex gap-5">
          <div className="2xl:w-[75%]">
            <div className="flex flex-wrap sm:grid grid-cols-2 lg:flex gap-5">
              {/* Cards for Top Brokers, Total Users, Sellers, and Properties */}

              <InfoCard
                count={460}
                label="Total Users"
                icon={users}
                bgColor={"#bb9e6ccc"}
                iconBgColor={colors.others.white}
                textColor="#f9f7f2"
                filter={primaryFilter}
              />

              <InfoCard
                count={460}
                label="Total Propertries"
                icon={properties}
                bgColor={colors.primary[500]}
                iconBgColor={colors.others.white}
                textColor="#f9f7f2"
                filter={primaryFilter}
              />
            </div>

            {/* Revenue and other graphs */}
            <div className="mt-8 bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] pt-5 px-8 pb-8">
              <RevenueChart
                data={revenueData}
                percentage={percentageIncrease}
              />
            </div>

            {/* Graphs for User Numbers and Listed Properties */}
            <div className="mt-8">
              <div className="grid lg:grid-cols-2 gap-x-5 gap-y-8">
                <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] p-5">
                  <LineChart
                    data={sampleData}
                    title="Number of Users"
                    subtitle="April - May"
                    showPercent={true}
                    percent={38}
                    xAxisLabel="April - May"
                    yAxisLabel="Number of Users"
                  />

                  {/* <p className="text-lg text-[#101828] font-medium">
                    Number of Users
                  </p>
                  <div className="mt-1">
                    <span className="text-sm text-[#101828] pb-1 border-b border-[#101828]">
                      April - May
                    </span>
                  </div>
                  <div className="mt-5">
                    <img src={waveChart} alt="Wave Graph" />
                  </div> */}
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] p-5">
                  <PropertyListedChart
                    data={sampleData2}
                    title="No. of property listed"
                    subtitle="April - May"
                    annotationText="22-30% ↑"
                    annotationIndex={27} // Highlight the 27th
                  />

                  {/* <div className="flex justify-between items-center">
                    <p className="text-lg text-[#101828] font-medium">
                      No. of property listed
                    </p>
                    <div>
                      <div
                        className="my-3 md:my-0 py-1.5 px-3 lg:pl-4 lg:pr-3 rounded-lg border border-border1 hover:border-primary relative hover:text-primary flex gap-3 justify-between items-center cursor-pointer"
                        onClick={toggleOptionMenu}
                        ref={optionRef}
                      >
                        <div
                          className={`select-menu flex ${
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
                                {seviceOptions.map((option) => (
                                  <li
                                    key={option.id}
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
                    <img src={barChart} alt="Bar Graph" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="2xl:w-[25%] mt-8 2xl:mt-0">
            <div className="grid lg:grid-cols-2 2xl:grid-cols-1 gap-x-5 gap-y-8">
              <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] pt-1">
                <CityDistributionChart title="Leading Cities" data={cityData} />
              </div>
              <div className="">
                <div className="grid xs:grid-cols-2 gap-5">
                  <HorizontalCard
                    icon={properties}
                    count={156}
                    label="Total Rentel Properties"
                    bgColor={colors.primary[500]}
                    iconBgColor={colors.others.white}
                    textColor="#f9f7f2"
                    filter={primaryFilter}
                  />

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
