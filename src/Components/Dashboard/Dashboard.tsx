import React, { useState } from "react";
import users from "../../assets/icons/users.png";
import properties from "../../assets/icons/properties.png";
import CityDistributionChart from "../charts/pie-charts/CityDistributionChart";
import { colors } from "../../theme/colors";
import InfoCard from "../InfoCard/InfoCard";
import { primaryFilter } from "../charts/utils/cssSupportFile";
import HorizontalCard from "../InfoCard/HorizontalCard";
import { useFetchDashboard } from "../../hooks/react-query/dashboard/useFetchDashboard";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import { assignDynamicColors } from "../../utils/common";
import {
  ChartData,
  MonthlyChartData,
  WeeklyChartData,
  YearlyChartData,
} from "../../types/chartsTypes";
import SelectInputFlowbitWithoutFormik from "../SelectInput/SelectInputFlowbitWithoutFormik";
import {
  ReceivedRevenueCharts,
  StatisticsApplicationsChart,
  StatisticsApplicationsChartUsers,
} from "../charts/Apex-chart/ApexChart";
import { PieChart } from "../charts/pie-charts/PieChart";
type DateOption = {
  label: string;
  value: "weekly" | "monthly" | "yearly";
};

const Dashboard: React.FC = () => {
  type SelectedKeySelect = "weekly" | "monthly" | "yearly";

  const [selectedKey, setSelectedKey] = useState<SelectedKeySelect>("weekly");

  const [revenukey, setSelectedKeyRevenu] =
    useState<SelectedKeySelect>("weekly");

  const [selectedKeyUsers, setSelectedKeyUsers] =
    useState<SelectedKeySelect>("weekly");

  const optionsDates: DateOption[] = [
    { label: "This Week", value: "weekly" },
    { label: "This Month", value: "monthly" },
    { label: "This Year", value: "yearly" },
  ];

  const { data, isLoading, isError, error } = useFetchDashboard();

  const updatedLeadingCities = assignDynamicColors(data?.leadingCities || []);

  const mockChartData: ChartData = {
    weekly: [
      { year: 2023, month: 12, day: 22, total: 40 },
      { year: 2023, month: 12, day: 23, total: 50 },
      { year: 2023, month: 12, day: 24, total: 30 },
      { year: 2023, month: 12, day: 25, total: 70 },
      { year: 2023, month: 12, day: 26, total: 60 },
      { year: 2023, month: 12, day: 27, total: 90 },
      { year: 2023, month: 12, day: 28, total: 80 },
    ],
    monthly: [
      { year: 2023, month: 1, total: 300 },
      { year: 2023, month: 2, total: 450 },
      { year: 2023, month: 3, total: 500 },
      { year: 2023, month: 4, total: 350 },
      { year: 2023, month: 5, total: 400 },
      { year: 2023, month: 6, total: 600 },
    ],
    yearly: [
      { year: 2021, total: 2500 },
      { year: 2022, total: 3000 },
      { year: 2023, total: 4000 },
    ],
  };

  // Type for selected keys
  type SelectedKey = keyof ChartData;

  // Mock API Response Type
  interface MockApiResponse<T> {
    final: T[];
  }

  // Mock API Functions
  const mockFetchChartData = async (
    selectedKey: SelectedKey
  ): Promise<
    MockApiResponse<WeeklyChartData | MonthlyChartData | YearlyChartData>
  > => {
    return { final: data?.propertiesChart[selectedKey] || [] };
  };

  const mockFetchChartUsers = async (
    selectedKeyUsers: SelectedKey
  ): Promise<
    MockApiResponse<WeeklyChartData | MonthlyChartData | YearlyChartData>
  > => {
    return { final: data?.usersChart[selectedKeyUsers] || [] };
  };

  const mockFetchChartRevanue = async (
    revenukey: SelectedKey
  ): Promise<
    MockApiResponse<WeeklyChartData | MonthlyChartData | YearlyChartData>
  > => {
    return { final: mockChartData[revenukey] || [] };
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error instanceof Error) {
    return <ErrorHandleMessage msg={error?.message} />;
  }

  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <h5 className="text-22 text-primary font-bold mb-5">Dashboard</h5>
        <div className="2xl:flex gap-5">
          <div className="2xl:w-[75%]">
            <div className="flex flex-wrap sm:grid grid-cols-2 lg:flex gap-5">
              {/* Cards for Top Brokers, Total Users, Sellers, and Properties */}

              <InfoCard
                count={data?.activeProperties || 0}
                label="Active Properties"
                icon={users}
                bgColor={"#bb9e6ccc"}
                iconBgColor={colors.others.white}
                textColor="#f9f7f2"
                filter={primaryFilter}
              />
              <InfoCard
                count={data?.inactiveProperties || 0}
                label="Inactive Properties"
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
              <div className="flex items-center justify-between">
                <h6
                  style={{ color: colors.primary[500] }}
                  className="text-lg font-bold"
                >
                  Revenue
                </h6>
                <SelectInputFlowbitWithoutFormik
                  islableVisible={false}
                  label="Select Date Range"
                  name="dateRange"
                  options={optionsDates.map((opt) => ({
                    value: opt.value,
                    label: opt.label,
                  }))}
                  value={revenukey}
                  onChange={(name, value) => {
                    setSelectedKeyRevenu(value as SelectedKeySelect);
                  }}
                  placeholder="Select a range"
                />
              </div>
              <ReceivedRevenueCharts
                selectedKeyRevenue={revenukey}
                dataColors='["#0b2443","#ff0000", "#00ff00", "#0000ff"]'
                onFetchChartUserData={mockFetchChartRevanue}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="2xl:w-[25%] mt-8 2xl:mt-0">
            <div className="grid lg:grid-cols-2 2xl:grid-cols-1 gap-x-5 gap-y-8">
              <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] pt-3 flex items-center justify-center">
                <PieChart
                  data={updatedLeadingCities}
                  title="Leading Cities"
                  // width={380}
                  showLegend={false}
                />
                {/* <CityDistributionChart
                  title="Leading Cities"
                  data={updatedLeadingCities}
                /> */}
              </div>
              <div className="">
                <div className="grid xs:grid-cols-2 gap-5">
                  <HorizontalCard
                    icon={users}
                    count={data?.totalUsers || 0}
                    label={`Total ${
                      data?.totalUsers === 1 ? "User" : "Users"
                    } `}
                    bgColor={colors.primary[500]}
                    iconBgColor={colors.others.white}
                    textColor="#f9f7f2"
                    filter={primaryFilter}
                  />
                  <HorizontalCard
                    icon={properties}
                    count={data?.totalBookings || 0}
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
        <div className="mt-8">
          <div className="grid lg:grid-cols-2 gap-x-5 gap-y-8">
            <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] p-5">
              <div className="flex items-center justify-between">
                <h6
                  style={{ color: colors.primary[500] }}
                  className="text-lg font-bold"
                >
                  Number of Users
                </h6>
                <SelectInputFlowbitWithoutFormik
                  islableVisible={false}
                  label="Select Date Range"
                  name="dateRange"
                  options={optionsDates.map((opt) => ({
                    value: opt.value,
                    label: opt.label,
                  }))}
                  value={selectedKey}
                  onChange={(name, value) => {
                    setSelectedKeyUsers(value as SelectedKeySelect);
                  }}
                  placeholder="Select a range"
                />
              </div>
              <StatisticsApplicationsChartUsers
                dataColors='["#a58b5e","#ff0000", "#00ff00", "#0000ff"]'
                selectedKeyCompany={selectedKeyUsers}
                onFetchChartCompanyData={mockFetchChartUsers}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-[0px_2.11px_105.51px_0px_#00000014] p-5">
              <div className="flex items-center justify-between">
                <h6
                  style={{ color: colors.primary[500] }}
                  className="text-lg font-bold"
                >
                  No. of property listed
                </h6>
                <SelectInputFlowbitWithoutFormik
                  islableVisible={false}
                  label="Select Date Range"
                  name="dateRange"
                  options={optionsDates.map((opt) => ({
                    value: opt.value,
                    label: opt.label,
                  }))}
                  value={selectedKey}
                  onChange={(name, value) => {
                    setSelectedKey(value as SelectedKeySelect);
                  }}
                  placeholder="Select a range"
                />
              </div>

              <StatisticsApplicationsChart
                dataColors='["#a58b5e","#ff0000", "#00ff00", "#0000ff"]'
                selectedKey={selectedKey}
                onFetchChartData={mockFetchChartData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
