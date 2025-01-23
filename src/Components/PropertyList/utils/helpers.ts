import { PropertyResponse } from "../../../types/propertiesTypes";

export interface FilterSortParams {
  propertiesList: PropertyResponse[];
  searchTerm: string;
  sortField?: string | undefined | null;
  sortOrder?: "asc" | "desc";
}

/**
 * Safely retrieves nested object values based on the given path.
 * @param obj The object to search within.
 * @param path The string path representing the nested key.
 * @returns The value at the given path, or undefined if not found.
 */
const getNestedValue = (obj: any, path: string): any => {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

/**
 * Converts a string to a number if possible (for comparison).
 * @param value The value to convert.
 * @returns The number value or the original value if conversion is not possible.
 */
const parseToNumber = (value: any): number | string => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? value : parsedValue;
};

/**
 * Filters and sorts a list of properties based on the search term and sorting parameters.
 * @param propertiesList The list of properties to filter and sort.
 * @param searchTerm The term to search for in the property title, address, or costs.
 * @param sortField The field to sort by (optional).
 * @param sortOrder The order to sort by ("asc" or "desc", default is "asc").
 * @returns The filtered and sorted list of properties.
 */
export const filterAndSortProperties = ({
  propertiesList,
  searchTerm,
  sortField,
  sortOrder = "asc",
}: FilterSortParams): PropertyResponse[] => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

  const numericSearchTerm = parseToNumber(searchTerm);

  return propertiesList
    .filter((property) => {
      const titleMatch = property.title
        .toLowerCase()
        .includes(lowerCaseSearchTerm);

      const addressMatch = [
        property.address.city,
        property.address.area,
        property.address.street,
        property.address.country,
      ].some((addressPart) =>
        addressPart.toLowerCase().includes(lowerCaseSearchTerm)
      );

      // Checking if the search term matches any cost-related fields (handling numbers as well)
      const costMatch =
        property.costs?.currency.toLowerCase().includes(lowerCaseSearchTerm) ||
        property.costs?.prices.cleaning_fee
          .toString()
          .includes(lowerCaseSearchTerm) ||
        property.costs?.prices.price_per_night === numericSearchTerm ||
        property.costs?.prices.price_per_night
          .toString()
          .includes(lowerCaseSearchTerm) ||
        property.costs?.prices.security_amount
          .toString()
          .includes(lowerCaseSearchTerm);

      return titleMatch || addressMatch || costMatch;
    })
    .sort((a, b) => {
      if (!sortField) return 0; // No sorting if sortField is not provided

      const aValue = getNestedValue(a, sortField);
      const bValue = getNestedValue(b, sortField);

      if (aValue == null || bValue == null) return 0; // Skip sorting if values are undefined/null

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
};
