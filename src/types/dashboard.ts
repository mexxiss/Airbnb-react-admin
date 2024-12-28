export interface LeadingCity {
  name: string;
  percentage: string;
}
interface ChartEntryWeekly {
  year: number;
  month: number;
  day: number;
  total: number;
}

interface ChartEntryMonthly {
  year: number;
  month: number;
  total: number;
}

interface ChartEntryYearly {
  year: number;
  total: number;
}

interface ChartData {
  weekly: ChartEntryWeekly[];
  monthly: ChartEntryMonthly[];
  yearly: ChartEntryYearly[];
}

export interface DashboardData {
  totalUsers: number;
  activeProperties: number;
  leadingCities: LeadingCity[];
  totalBookings: number;
  totalProperties: number;
  inactiveProperties: number;
  usersChart: ChartData;
  propertiesChart: ChartData;
}
