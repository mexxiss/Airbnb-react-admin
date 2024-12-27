export interface LeadingCity {
  name: string;
  percentage: string;
}

export interface DashboardData {
  totalUsers: number;
  activeProperties: number;
  leadingCities: LeadingCity[];
  totalBookings: number;
  totalProperties: number;
  inactiveProperties: number;
}
