import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { colors } from "../../../theme/colors";

interface LineChartProps {
  data: { x: number; y: number }[]; // Array of data points with x and y coordinates
  title: string; // Chart title
  subtitle?: string; // Optional subtitle
  showPercent?: boolean; // Whether to show percentage annotation
  percent?: number; // Percentage value to display
  xAxisLabel?: string; // Custom X-axis label
  yAxisLabel?: string; // Custom Y-axis label
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  subtitle,
  showPercent = false,
  percent,
  xAxisLabel = "Date",
  yAxisLabel = "Number of Users",
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
      height: 300,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: colors.primary[500],
      },
    },
    subtitle: {
      text: subtitle,
      style: {
        fontSize: "12px",
        color: colors.primary[500],
      },
    },
    legend: {
      enabled: false, // Disable the legend
    },
    xAxis: {
      type: "datetime",
      title: {
        text: xAxisLabel,
        style: {
          fontSize: "12px",
          color: colors.primary[500],
        },
      },
      gridLineWidth: 1,
    },
    yAxis: {
      title: {
        text: yAxisLabel,
        style: {
          fontSize: "12px",
          color: colors.primary[500],
        },
      },
      gridLineWidth: 1,
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#ccc",
      style: {
        fontSize: "12px",
      },
      formatter: function () {
        return `<b>${Highcharts.dateFormat(
          "%e %b, %Y",
          this.x as number
        )}</b><br/>Value: ${this.y}`;
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 4,
        },
        lineWidth: 2,
      },
      area: {
        fillOpacity: 0.2,
      },
    },
    series: [
      {
        type: "area",
        name: "Users",
        data: data,
        color: colors.primary[600],
      },
    ],
    annotations: showPercent
      ? [
          {
            labels: [
              {
                point: {
                  x: data[data.length - 1]?.x,
                  y: data[data.length - 1]?.y,
                  xAxis: 0,
                  yAxis: 0,
                },
                text: `${percent}%`,
                style: {
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: "#00bcd4",
                  padding: "5px",
                  borderRadius: 3,
                },
              },
            ],
            shapes: [
              {
                type: "rect",
                point: {
                  x: data[data.length - 1]?.x,
                  y: data[data.length - 1]?.y,
                  xAxis: 0,
                  yAxis: 0,
                },
                width: 30,
                height: 30,
                r: 5,
                fill: "#00bcd4",
              },
            ],
          },
        ]
      : [],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
