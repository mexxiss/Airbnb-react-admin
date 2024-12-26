import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { colors } from "../../../theme/colors";

interface CityData {
  name: string;
  percentage: number | string;
  color: string;
}

interface CityDistributionChartProps {
  title: string;
  data: CityData[];
}

const CityDistributionChart: React.FC<CityDistributionChartProps> = ({
  title,
  data,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 300,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    title: {
      text: title,
      align: "left",
      margin: 2,
      style: {
        fontSize: "24px",
        fontWeight: "bold",
        color: colors.primary[800],
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 0,
      borderRadius: 8,
      shadow: true,
      padding: 12,
      style: {
        fontSize: "14px",
      },
      formatter: function (this: Highcharts.Point): string {
        return `
          <div style="text-align: center;">
            <span style="font-size: 16px; font-weight: bold; color: ${
              this.color
            }">${this.name}</span><br/>
            <span style="font-size: 24px; font-weight: bold; color: ${
              colors.primary[700]
            }">${this.percentage?.toFixed(0)}%</span><br/>
            <span style="color: ${
              colors.primary[400]
            };">of total distribution</span>
          </div>
        `;
      },
      useHTML: true,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        size: "100%",
        borderWidth: 0,
        states: {
          hover: {
            enabled: true,
            brightness: 0.1,
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.0f}%<br>{point.name}",
          distance: -50,
          style: {
            fontSize: "14px",
            fontWeight: "normal",
            color: "white",
            textOutline: "none",
            textAlign: "center",
          },
        },
        showInLegend: false,
      },
    },
    series: [
      {
        type: "pie",
        name: "Distribution",
        data: data.map((city) => ({
          name: city.name,
          y: Number(city.percentage),
          color: city.color,
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CityDistributionChart;
