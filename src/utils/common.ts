import axiosInstance from "../services/axiosInstance";
import { colors } from "../theme/colors";
import moment from "moment";
import { saveAs } from "file-saver";

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
      formattedAmount = `AED ${amount.toLocaleString()}`;
      break;
    case "USD":
      formattedAmount = `USD ${amount.toLocaleString()}`;
      break;
    case "INR":
      formattedAmount = `INR ${amount.toLocaleString()}`;
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

export const getRelativeTime = (date: string): string => {
  const parsedDate = moment(new Date(date));

  // Check if the date is valid
  if (!parsedDate.isValid()) {
    throw new Error("Invalid date format");
  }

  return parsedDate.fromNow(); // Returns relative time
};

export const assignDynamicColors = (
  leadingCities: { name: string; percentage: string }[]
) => {
  // Define the colors for the leading cities in order
  const predefinedColors = [
    colors.primary[500],
    colors.primary[600],
    colors.primary[900],
    colors.primary[300],
  ];

  return leadingCities.map((city, index) => {
    const color = predefinedColors[index % predefinedColors.length]; // Cycle through colors if more than 4 cities

    return {
      ...city,
      color,
    };
  });
};

/**
 * Formats a date string into a specified format using Moment.js.
 * Defaults to 'YYYY/MM/DD' if no format is provided.
 *
 * @param {string | undefined | null} date - The date string to format (e.g., "2025-01-04T00:00:00.000Z").
 * @param {string} format - The desired date format (e.g., "DD/MM/YYYY", "YYYY-MM-DD"). Default is "YYYY/MM/DD".
 * @returns {string} - The formatted date in the specified format.
 */
export const formatDate = (
  date?: string | null,
  format: string = "YYYY/MM/DD"
): string => {
  if (!date) {
    return "";
    console.error("Error: Date input is null or undefined.");
    // throw new Error("Invalid date input. Please provide a valid date string.");
  }

  const formattedDate = moment(date);

  if (!formattedDate.isValid()) {
    console.error("Error: Invalid date format:", date);
    throw new Error("Invalid date input. Please provide a valid date string.");
  }

  return formattedDate.format(format);
};
export function generateRandomString(
  prefix: string = "INV",
  middle: string = "FURNISHING"
): string {
  // Generate a 6-character unique string using random numbers and letters
  const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Concatenate the parts to form the final string
  return `${prefix}-${middle}-${uniquePart}`;
}

export const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

/**
 * Formats a number with commas as thousands separators.
 * @param num - The number to format.
 * @returns The formatted string with commas.
 */
export function formatWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const calculateSubtotalAndVAT = (
  works: Array<{ priceSummary: number }>,
  vatPercentage: number
): { subtotal: number; vatTax: number; total: number } => {
  const subtotal = works.reduce(
    (subtotal, work) => subtotal + work.priceSummary,
    0
  );

  const vatTax = (subtotal * (vatPercentage || 0)) / 100;
  const total = subtotal + vatTax;

  return { subtotal, vatTax, total };
};

export const fixPhoneNumbers = (numbers: string[]): string[] => {
  return numbers.map((num) => {
    // Remove all `+` symbols first
    const cleanNum = num.replace(/\+/g, "");
    // Add `+` at the beginning to ensure it starts with it
    return `+${cleanNum}`;
  });
};

export const numberRoundFix = (value: any = 0.0) => {
  const roundedValue = Math.round(value * 100) / 100;
  return roundedValue;
};

export const formatBHK = (bhk: string): string => {
  if (!bhk) return "N/A";

  return bhk
    .replace("bhk", "BHK")
    .replace("studio", "Studio")
    .replace(/\+/, "+ ");
};

// Define Types
type PDFType = "maintenance" | "statement" | "furnishing";

interface Reservation {
  id: number;
  code: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  totalNights: number;
  amount: string;
}

interface PDFData {
  invoiceNumber: string;
  date: string;
  owner: string;
  phone: string;
  statementPeriod: string;
  reservations: Reservation[];
  managementFee: string;
  licenseFee: string;
  netAmountDue: string;
}

export const handleDownloadPDF = async (type: PDFType): Promise<void> => {
  try {
    const requestData = {
      type,
      data: {
        invoiceNumber: "INV-12345",
        date: "March 15, 2024",
        owner: "John Doe",
        phone: "+1 802-448-2354",
        statementPeriod: "2024/11",
        reservations: [
          {
            id: 1,
            code: "RS-98765",
            guestName: "Alice Brown",
            checkIn: "2024-10-27",
            checkOut: "2024-10-30",
            totalNights: 3,
            amount: "AED 1,803.00",
          },
        ],
        managementFee: "AED 303",
        licenseFee: "AED 370",
        netAmountDue: "AED 1,130.00",
      } as PDFData,
    };

    const response = await axiosInstance.post<Blob>(
      "/users/generate-pdf",
      requestData,
      { responseType: "blob" } // Ensures we get a PDF blob
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    saveAs(blob, `${type}.pdf`); // Downloads the file

    console.log("PDF downloaded successfully");
  } catch (error: any) {
    console.error("Error downloading PDF:", error);
  }
};
