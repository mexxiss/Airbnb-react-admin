import { colors } from "../theme/colors";

/**
 * Formats the given amount with the specified currency code and symbol.
 * @param amount - The numeric amount to be formatted.
 * @param currency - The currency type ("AED", "USD", or "INR").
 * @returns The formatted amount as a string.
 */
export function formatAmountWithCurrency(
  amount: number,
  currency: string | "AED" | "USD" | "INR"
): string {
  let formattedAmount: string;

  switch (currency) {
    case "AED":
      formattedAmount = `AED ${amount.toLocaleString()} د.إ`;
      break;
    case "USD":
      formattedAmount = `USD ${amount.toLocaleString()} $`;
      break;
    case "INR":
      formattedAmount = `INR ${amount.toLocaleString()} ₹`;
      break;
    default:
      throw new Error("Unsupported currency type");
  }

  return formattedAmount;
}

export const getDynamicColor = (percentage: number): string => {
  if (percentage >= 30) return colors.primary[900]; // Darkest for highest percentages
  if (percentage >= 20) return colors.primary[700]; // Darker for medium-high percentages
  if (percentage >= 10) return colors.primary[500]; // Medium shade
  return colors.primary[300]; // Lightest for lowest percentages
};

export type DateOption = {
  label: string;
  value: { startDate: string; endDate: string };
};

export const getDateRange = (
  rangeType: "week" | "month" | "year"
): { startDate: string; endDate: string } => {
  const now = new Date();
  let startDate, endDate;

  switch (rangeType) {
    case "week":
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
      endOfWeek.setHours(23, 59, 59, 999);

      startDate = startOfWeek.toISOString();
      endDate = endOfWeek.toISOString();
      break;

    case "month":
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      startOfMonth.setHours(0, 0, 0, 0);
      endOfMonth.setHours(23, 59, 59, 999);

      startDate = startOfMonth.toISOString();
      endDate = endOfMonth.toISOString();
      break;

    case "year":
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear(), 11, 31);

      startOfYear.setHours(0, 0, 0, 0);
      endOfYear.setHours(23, 59, 59, 999);

      startDate = startOfYear.toISOString();
      endDate = endOfYear.toISOString();
      break;

    default:
      throw new Error("Invalid range type");
  }

  return { startDate, endDate };
};
