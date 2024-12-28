export interface WeeklyChartData {
  year: number;
  month: number;
  day: number;
  total: number;
}

export interface MonthlyChartData {
  year: number;
  month: number;
  total: number;
}

export interface YearlyChartData {
  year: number;
  total: number;
}

export type ChartData = {
  weekly: WeeklyChartData[];
  monthly: MonthlyChartData[];
  yearly: YearlyChartData[];
};
