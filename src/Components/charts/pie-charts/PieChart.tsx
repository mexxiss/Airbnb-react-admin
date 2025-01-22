import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartDataItem {
  name: string;
  percentage: string;
  color: string;
}

interface PieChartProps {
  data: ChartDataItem[];
  width?: number;
  title?: string;
  showLegend?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 380,
  title,
  showLegend = true,
}) => {
  const series = data.map((item) => parseFloat(item.percentage));
  const labels = data.map((item) => item.name);
  const colors = data.map((item) => item.color);

  const options: ApexOptions = {
    chart: {
      width: width,
      type: "pie",
    },
    labels: labels,
    colors: colors,
    title: title
      ? {
          text: title,
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: 600,
          },
        }
      : undefined,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: showLegend,
      position: "right",
      offsetY: 0,
      height: 230,
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`,
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      width={width}
    />
    // <div className="flex justify-center items-center">
    //   <div id="chart" className="rounded-lg p-4 shadow-md">

    //   </div>
    // </div>
  );
};
