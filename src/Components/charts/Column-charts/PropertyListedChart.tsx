import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { colors } from "../../../theme/colors";
import { DateOption, getDateRange } from "../../../utils/common";
import SelectInputFlowbitWithoutFormik from "../../SelectInput/SelectInputFlowbitWithoutFormik";

interface ColumnChartProps {
  data: { x: number; y: number }[]; // Array of data points with x (categories) and y (values)
  title: string; // Chart title
  subtitle?: string; // Optional subtitle
  annotationText?: string; // Annotation text, e.g., "22-30%"
  annotationIndex?: number; // Index of the data point to annotate
}

const PropertyListedChart: React.FC<ColumnChartProps> = ({
  data,
  title,
  subtitle,
  annotationText = "",
  annotationIndex,
}) => {
  const optionsDates: DateOption[] = [
    { label: "This Week", value: getDateRange("week") },
    { label: "This Month", value: getDateRange("month") },
    { label: "This Year", value: getDateRange("year") },
  ];

  // Set default selection to "This Week"
  const [selectedOption, setSelectedOption] = useState<DateOption>(
    optionsDates[0]
  );

  const handleChange = (name: string, value: string) => {
    const option = optionsDates.find((opt) => opt.label === value) || null;

    if (!option) throw new Error("Invalid range type");
    setSelectedOption(option);
  };

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
      <div className="absolute top-0 right-0 z-40">
        <SelectInputFlowbitWithoutFormik
          islableVisible={false}
          label="Select Date Range"
          name="dateRange"
          options={optionsDates.map((opt) => ({
            value: opt.label, // Use label as the value
            label: opt.label,
          }))}
          value={selectedOption.label}
          onChange={(name, value) => handleChange(name, value as string)}
          placeholder="Select a range"
        />
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PropertyListedChart;
