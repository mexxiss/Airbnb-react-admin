export const getChartColorsArray = (colors: string): string[] => {
  const parsedColors = JSON.parse(colors) as string[];
  return parsedColors.map((value) => {
    const newValue = value.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
      let color = getComputedStyle(document.documentElement).getPropertyValue(
        newValue
      );

      if (color.indexOf("#") !== -1) color = color.replace(" ", "");
      return color || newValue;
    } else {
      const val = value.split(",");
      if (val.length === 2) {
        let rgbaColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue(val[0]);
        rgbaColor = `rgba(${rgbaColor},${val[1]})`;
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
};

// Helper function to get the name of the day
const getDayName = (day: number): string => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[day];
};

const getDayNameCompany = (day: string | number): string => {
  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const dayIndex = typeof day === "string" ? parseInt(day, 10) : day;
  return daysOfWeek[dayIndex];
};

const getMonthNameCompany = (month: string | number): string => {
  const monthsOfYear: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex =
    typeof month === "string" ? parseInt(month, 10) - 1 : month - 1;
  return monthsOfYear[monthIndex];
};

// Helper function to get the name of the month
const getMonthName = (month: number): string => {
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthsOfYear[month - 1]; // Adjust for 1-based month
};

// Define the type for chartData
type ChartData = {
  year: number;
  month: number;
  day: number;
  total: number;
};

export const getLabels = (
  selectedKey: "weekly" | "monthly" | "yearly",
  chartData: ChartData[]
): string[] => {
  switch (selectedKey) {
    case "weekly":
      return chartData.map((entry) => {
        const date = new Date(entry.year, entry.month - 1, entry.day); // Adjust for 0-based month
        return getDayName(date.getDay());
      });

    case "monthly":
      return chartData.map((entry) => getMonthName(entry.month));

    case "yearly":
      return chartData.map((entry) => entry.year.toString());

    default:
      return [];
  }
};

interface ChartDataEntry {
  day: number;
  month: number;
  year: number;
  total: number;
}

type SelectedKeyCompany = "weekly" | "monthly" | "yearly";

export const getLabelsCompany = (
  selectedKeyCompany: SelectedKeyCompany,
  chartData: ChartDataEntry[]
): string[] => {
  switch (selectedKeyCompany) {
    case "weekly":
      return chartData?.map((entry) => {
        const date = new Date(`${entry.year}-${entry.month}-${entry.day}`);
        return getDayNameCompany(date.getDay());
      });

    case "monthly":
      return chartData?.map((entry) => `${getMonthNameCompany(entry.month)}`);

    case "yearly":
      return chartData?.map((entry) => entry.year.toString());

    default:
      return [];
  }
};
