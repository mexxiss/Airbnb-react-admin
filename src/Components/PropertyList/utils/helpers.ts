import { PropertyResponse } from "../../../types/propertiesTypes";

export interface FilterSortParams {
  propertiesList: PropertyResponse[];
  searchTerm: string;
  sortField?: string | undefined | null;
  sortOrder?: "asc" | "desc";
}

/**
 * Safely retrieves nested object values based on the given path.
 */
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

/**
 * Filters and sorts a list of properties based on the search term and sorting parameters.
 */
export const filterAndSortProperties = ({
  propertiesList,
  searchTerm,
  sortField,
  sortOrder = "asc",
}: FilterSortParams): PropertyResponse[] => {
  // Convert search term to lowercase for case-insensitive matching
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

  return propertiesList
    .filter((property) => {
      const titleMatch = property.title
        .toLowerCase()
        .includes(lowerCaseSearchTerm);
      const descriptionMatch = property.description
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

      const amenitiesMatch = property.amenities?.some(
        (amenityId) =>
          typeof amenityId === "string" &&
          amenityId.toLowerCase().includes(lowerCaseSearchTerm)
      );

      const wifiMatch =
        property?.property_details?.wifi?.name
          ?.toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        property?.property_details?.wifi?.password
          ?.toLowerCase()
          .includes(lowerCaseSearchTerm);

      return (
        titleMatch ||
        descriptionMatch ||
        addressMatch ||
        amenitiesMatch ||
        wifiMatch
      );
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

      return 0; // If types do not match or are not sortable
    });
};
