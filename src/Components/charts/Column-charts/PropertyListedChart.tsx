import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { colors } from "../../../theme/colors";

interface ColumnChartProps {
  data: { x: number; y: number }[]; // Array of data points with x (categories) and y (values)
  title: string; // Chart title
  subtitle?: string; // Optional subtitle
  selectedDateRange?: string; // Dropdown label for date range
  annotationText?: string; // Annotation text, e.g., "22-30%"
  annotationIndex?: number; // Index of the data point to annotate
}

const PropertyListedChart: React.FC<ColumnChartProps> = ({
  data,
  title,
  subtitle,
  selectedDateRange = "This Week",
  annotationText = "",
  annotationIndex,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
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
      categories: data.map((point) => point.x.toString()),
      title: {
        text: null,
      },
      gridLineWidth: 0,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      gridLineWidth: 1,
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 0,
      shadow: true,
      padding: 12,
      style: {
        fontSize: "12px",
      },
      formatter: function () {
        return `<b>Day ${this.x}</b><br/>Value: ${this.y}`;
      },
    },
    plotOptions: {
      column: {
        borderRadius: 5,
        pointPadding: 0.2,
        groupPadding: 0.1,
      },
    },
    series: [
      {
        type: "column",
        data: data.map((point) => ({
          x: point.x,
          y: point.y,
          color:
            annotationIndex !== undefined && point.x === annotationIndex
              ? colors.primary[600]
              : colors.primary[300],
        })),
      },
    ],
    annotations:
      annotationIndex !== undefined
        ? [
            {
              labels: [
                {
                  point: {
                    x: annotationIndex,
                    y: data[annotationIndex - 1]?.y,
                    xAxis: 0,
                    yAxis: 0,
                  },
                  text: annotationText,
                  backgroundColor: "#00796b",
                  borderRadius: 3,
                  style: {
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                    padding: "5px",
                  },
                },
              ],
            },
          ]
        : [],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="relative">
      {/* Dropdown for Date Range */}
      <div className="absolute top-0 right-0">
        <button className="px-3 py-1 text-sm bg-gray-200 rounded-lg shadow">
          {selectedDateRange}
        </button>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PropertyListedChart;
