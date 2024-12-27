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
import { useFetchDashboard } from "../../hooks/react-query/dashboard/useFetchDashboard";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import { assignDynamicColors } from "../../utils/common";

const Dashboard: React.FC = () => {
  // Context for mobile menu
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

  // State for option menu
  const [optionShow, setOptionShow] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("This Week");
  const { data, isLoading, isError, error } = useFetchDashboard();

  const updatedLeadingCities = assignDynamicColors(data?.leadingCities || []);

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

  const sampleData = [
    { x: Date.UTC(2024, 3, 1), y: 50000 },
    { x: Date.UTC(2024, 3, 10), y: 100000 },
    { x: Date.UTC(2024, 3, 20), y: 75000 },
    { x: Date.UTC(2024, 4, 1), y: 150000 },
    { x: Date.UTC(2024, 4, 10), y: 200000 },
    { x: Date.UTC(2024, 4, 20), y: 120000 },
  ];

  const sampleData2 = [
    { x: 17, y: 60 },
    { x: 18, y: 70 },
    { x: 19, y: 80 },
    { x: 20, y: 90 }, // Annotated point
    { x: 21, y: 100 },
    { x: 22, y: 120 },
    { x: 23, y: 130 },
    { x: 24, y: 140 },
    { x: 25, y: 150 },
    { x: 26, y: 160 },
    { x: 27, y: 170 }, // Annotated point
    { x: 28, y: 180 },
    { x: 29, y: 190 },
    { x: 30, y: 200 },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error instanceof Error) {
    return <ErrorHandleMessage msg={error?.message} />;
  }

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
                count={data?.totalUsers || 0}
                label="Total Users"
                icon={users}
                bgColor={"#bb9e6ccc"}
                iconBgColor={colors.others.white}
                textColor="#f9f7f2"
                filter={primaryFilter}
              />

              <InfoCard
                count={data?.totalProperties || 0}
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
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] p-5">
                  <PropertyListedChart
                    data={sampleData2}
                    title="No. of property listed"
                    subtitle="April - May"
                    annotationText="50-80% ↑"
                    annotationIndex={27} // Highlight the 27th
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="2xl:w-[25%] mt-8 2xl:mt-0">
            <div className="grid lg:grid-cols-2 2xl:grid-cols-1 gap-x-5 gap-y-8">
              <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] pt-1">
                <CityDistributionChart
                  title="Leading Cities"
                  data={updatedLeadingCities}
                />
              </div>
              <div className="">
                <div className="grid xs:grid-cols-2 gap-5">
                  <HorizontalCard
                    icon={properties}
                    count={data?.activeProperties || 0}
                    label={`Total Active Propert${
                      data?.activeProperties === 1 ? "y" : "ies"
                    }`}
                    bgColor={colors.primary[500]}
                    iconBgColor={colors.others.white}
                    textColor="#f9f7f2"
                    filter={primaryFilter}
                  />
                  <HorizontalCard
                    icon={properties}
                    count={data?.activeProperties || 0}
                    label={`Total Book${
                      data?.totalBookings === 1 ? "ing" : "ings"
                    }`}
                    bgColor={colors.primary[500]}
                    iconBgColor={colors.others.white}
                    textColor="#f9f7f2"
                    filter={primaryFilter}
                  />
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
