import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { colors } from "../../../theme/colors";

interface RevenueChartProps {
  data: number[];
  percentage: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, percentage }) => {
  const options: Highcharts.Options = {
    title: {
      text: "Revenue This Week",
      align: "left",
      style: {
        fontSize: "18px",
        color: colors.primary[500],
        fontWeight: "normal",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      gridLineWidth: 1,
      gridLineColor: colors.primary[200],
      lineColor: colors.primary[200],
      tickColor: colors.primary[200],
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineColor: colors.primary[100],
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "spline",
        name: "Revenue",
        data: data,
        color: colors.primary[600],
        lineWidth: 3,
      },
    ],
    tooltip: {
      backgroundColor: colors.primary[600],
      style: {
        color: "white",
      },
      borderWidth: 0,
      borderRadius: 8,
      shadow: false,
      formatter: function () {
        return `<span style="font-size: 12px">Revenue: $${this.y?.toLocaleString()}</span>`;
      },
    },
    chart: {
      style: {
        fontFamily: "Inter, sans-serif",
      },
      height: 300,
      backgroundColor: "transparent",
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-semibold text-primary">
          {percentage}%
        </span>
        <ArrowUpwardIcon
          className={`w-5 h-5`}
          sx={{ color: colors.primary[500] }}
        />
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="inline-flex items-center px-3 py-1 rounded-lg bg-primary text-white text-sm">
        22-30% ↑
      </div>
    </div>
  );
};

export default RevenueChart;
