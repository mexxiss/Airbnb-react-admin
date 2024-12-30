import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  getChartColorsArray,
  getLabels,
  getLabelsCompany,
} from "../utils/common";

type ChartOptions = {
  chart: any;
  legend: any;
  stroke: any;
  plotOptions: any;
  fill: any;
  xaxis?: any;
  tooltip: any;
  markers?: any;
  series?: Series[];
};

type Series = {
  name: string;
  type: string;
  data: number[];
  color?: string;
};

type JobWidgetChartsProps = {
  dataColors: string;
  series: Series[];
};

type StatisticsApplicationsChartProps = {
  dataColors: string;
  selectedKey: "weekly" | "monthly" | "yearly";
  onFetchChartData: (
    key: "weekly" | "monthly" | "yearly"
  ) => Promise<{ final: any[] }>;
};

type StatisticsApplicationsChartUsersProps = {
  dataColors: string;
  selectedKeyCompany: "weekly" | "monthly" | "yearly";
  onFetchChartCompanyData: (
    key: "weekly" | "monthly" | "yearly"
  ) => Promise<{ final: any[] }>;
};

type ReceivedRevenueChartsProps = {
  dataColors: string;
  selectedKeyRevenue: "weekly" | "monthly" | "yearly";
  onFetchChartUserData: (
    key: "weekly" | "monthly" | "yearly"
  ) => Promise<{ final: any[] }>;
};

const JobWidgetCharts: React.FC<JobWidgetChartsProps> = ({
  dataColors,
  series,
}) => {
  const areacharteathereumColors = getChartColorsArray(dataColors);

  const options: ChartOptions = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      offsetY: 10,
    },
    stroke: {
      width: [0, 0, 2, 2],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    fill: {
      opacity: [1, 1, 0.1, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y: number) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="46"
        width="130"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const StatisticsApplicationsChart: React.FC<
  StatisticsApplicationsChartProps
> = ({ dataColors, selectedKey, onFetchChartData }) => {
  const [chartOptions, setChartOptions] = useState<ChartOptions>(
    {} as ChartOptions
  );
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const resp = await onFetchChartData(selectedKey);
        if (resp) {
          setChartData(resp.final);
        } else {
          console.error("Invalid response:", resp);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [selectedKey]);

  useEffect(() => {
    const updatedSeries = chartData?.map((entry) => entry.total);

    setChartOptions({
      ...chartOptions,
      series: [{ name: "Properties", type: "column", data: updatedSeries }],
      xaxis: { categories: getLabels(selectedKey, chartData) },
    });
  }, [selectedKey, chartData]);

  const finalSeries = chartOptions?.series || [];
  const statisticsApplicationColors = getChartColorsArray(dataColors);

  const options: ChartOptions = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      offsetY: 10,
    },
    stroke: {
      width: [0, 0, 2, 2],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    fill: {
      opacity: [1, 1, 0.1, 1],
      colors: statisticsApplicationColors,
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    xaxis: {
      type: "category",
      categories: getLabels(selectedKey, chartData),
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          return y !== undefined
            ? `${y.toFixed(0)} ${
                y.toFixed(0) === "0" || y.toFixed(0) === "1"
                  ? "Property"
                  : "Properties"
              }`
            : "";
        },
      },
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={finalSeries}
        type="line"
        height="350"
        className="apex-charts pb-3"
      />
    </React.Fragment>
  );
};

const StatisticsApplicationsChartUsers: React.FC<
  StatisticsApplicationsChartUsersProps
> = ({ dataColors, selectedKeyCompany, onFetchChartCompanyData }) => {
  const [chartOptions, setChartOptions] = useState<any>({});
  const [chartData, setChartData] = useState<any[]>([]);
  const xAxisCategories = getLabelsCompany(selectedKeyCompany, chartData);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const resp = await onFetchChartCompanyData(selectedKeyCompany);
        if (resp) {
          setChartData(resp.final);
        } else {
          console.error("Invalid response:", resp);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [selectedKeyCompany]);

  useEffect(() => {
    const updatedSeries = chartData?.map((entry) => entry.total);

    setChartOptions({
      ...chartOptions,
      series: [{ name: "Users", type: "column", data: updatedSeries }],
      xaxis: { categories: getLabelsCompany(selectedKeyCompany, chartData) },
    });
  }, [selectedKeyCompany, chartData]);

  const finalSeries = chartOptions.series || [];
  const statisticsApplicationColors = getChartColorsArray(dataColors);

  return (
    <React.Fragment>
      <ReactApexChart
        options={{
          ...chartOptions,
          chart: {
            height: 350,
            type: "line",
            stacked: false,
            toolbar: { show: false },
          },
          legend: { show: true, offsetY: 10 },
          stroke: { width: [0, 0, 2, 2], curve: "smooth" },
          plotOptions: { bar: { columnWidth: "30%" } },
          fill: {
            opacity: [1, 1, 0.1, 1],
            colors: statisticsApplicationColors,
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          xaxis: {
            type: "category",
            categories: getLabelsCompany(selectedKeyCompany, chartData),
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: (y: number) => {
                return y !== undefined
                  ? `${y.toFixed(0)} ${
                      y.toFixed(0) === "0" || y.toFixed(0) === "1"
                        ? "User"
                        : "Users"
                    }`
                  : "";
              },
            },
          },
        }}
        series={finalSeries}
        type="line"
        height="350"
        className="apex-charts pb-3"
      />
    </React.Fragment>
  );
};

const ReceivedRevenueCharts: React.FC<ReceivedRevenueChartsProps> = ({
  dataColors,
  selectedKeyRevenue,
  onFetchChartUserData,
}) => {
  const [chartOptions, setChartOptions] = useState<any>({});
  const [chartData, setChartData] = useState<any[]>([]);
  const xAxisCategories = getLabels(selectedKeyRevenue, chartData);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const resp = await onFetchChartUserData(selectedKeyRevenue);
        if (resp) {
          setChartData(resp.final);
        } else {
          console.error("Invalid response:", resp);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [selectedKeyRevenue]);

  useEffect(() => {
    const updatedSeries = chartData?.map((entry) => entry.total);

    setChartOptions({
      ...chartOptions,
      series: [
        {
          name: "Revenue",
          type: "line",
          color: "#a58b5e",
          data: updatedSeries,
        },
      ],
      xaxis: { categories: getLabels(selectedKeyRevenue, chartData) },
    });
  }, [selectedKeyRevenue, chartData]);

  const finalSeries = chartOptions.series || [];
  const receivedTimeColors = getChartColorsArray(dataColors);

  return (
    <React.Fragment>
      <ReactApexChart
        options={{
          ...chartOptions,
          chart: {
            height: 350,
            type: "line",
            stacked: false,
            toolbar: { show: false },
          },
          legend: { show: true, offsetY: 10 },
          stroke: { width: [2], curve: "smooth" },
          fill: {
            opacity: [1, 1, 0.1, 1],
            colors: receivedTimeColors,
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          xaxis: {
            type: "category",
            categories: getLabels(selectedKeyRevenue, chartData),
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: (y: number) =>
                y !== undefined ? `${y.toFixed(0)} points` : "",
            },
          },
          markers: { size: 6 },
        }}
        series={finalSeries}
        type="line"
        height="350"
        className="apex-charts pb-3"
      />
    </React.Fragment>
  );
};

// Additional components (StatisticsApplicationsChartUsers, ReceivedRevenueCharts) and helpers
// would also be similarly converted, following the same pattern.

export {
  JobWidgetCharts,
  StatisticsApplicationsChart,
  StatisticsApplicationsChartUsers,
  ReceivedRevenueCharts,
};
