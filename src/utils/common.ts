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
