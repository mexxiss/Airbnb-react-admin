import React, { useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { colors } from "../../../theme/colors";
import { DateOption, getDateRange } from "../../../utils/common";
import SelectInputFlowbitWithoutFormik from "../../SelectInput/SelectInputFlowbitWithoutFormik";

interface ColumnChartProps {
  data: { x: number; y: number; date: Date }[]; // Added date field to data points
  title: string;
  subtitle?: string;
  annotationText?: string;
  annotationIndex?: number;
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

  const [selectedOption, setSelectedOption] = useState<DateOption>(
    optionsDates[0]
  );

  const handleChange = (name: string, value: string) => {
    const option = optionsDates.find((opt) => opt.label === value) || null;
    if (!option) throw new Error("Invalid range type");
    setSelectedOption(option);
  };

  // Filter data based on selected date range
  const filteredData = useMemo(() => {
    const { startDate, endDate } = selectedOption.value;
    return data.filter(
      (point) =>
        new Date(point?.date) >= new Date(startDate) &&
        new Date(point.date) <= new Date(endDate)
    );
  }, [data, selectedOption]);

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
      enabled: false,
    },
    xAxis: {
      categories: filteredData.map((point) => {
        const date = point.date;
        // Format x-axis labels based on selected range
        switch (selectedOption.label) {
          case "This Week":
            return date.toLocaleDateString("en-US", { weekday: "short" });
          case "This Month":
            return date.getDate().toString();
          case "This Year":
            return date.toLocaleDateString("en-US", { month: "short" });
          default:
            return point.x.toString();
        }
      }),
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
        const point = filteredData[(this as any).point.index];
        const date = point.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return `<b>${date}</b><br/>Value: ${this.y}`;
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
        data: filteredData.map((point, index) => ({
          x: point.x,
          y: point.y,
          color:
            annotationIndex !== undefined && index === annotationIndex
              ? colors.primary[600]
              : colors.primary[300],
        })),
      },
    ],
    annotations:
      annotationIndex !== undefined && filteredData[annotationIndex]
        ? [
            {
              labels: [
                {
                  point: {
                    x: annotationIndex,
                    y: filteredData[annotationIndex].y,
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
      <div className="absolute top-0 right-0 z-40">
        <SelectInputFlowbitWithoutFormik
          islableVisible={false}
          label="Select Date Range"
          name="dateRange"
          options={optionsDates.map((opt) => ({
            value: opt.label,
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
