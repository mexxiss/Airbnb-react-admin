import { PropertyResponse } from "../../../types/propertiesTypes";


export interface FilterSortParams {
  propertiesList: PropertyResponse[]; // Changed to PropertyResponse[]
  searchTerm: string;
  sortField?: string | undefined | null; // Optional sort field
  sortOrder?: "asc" | "desc"; // Sorting order
}

/**
 * Filters and sorts a list of properties based on the search term and sorting parameters.
 */
export const filterAndSortProperties = ({
  propertiesList,
  searchTerm,
  sortField,
  sortOrder = "asc",
}: FilterSortParams): PropertyResponse[] => {
  return propertiesList
    .filter((property) => {
      const titleMatch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = property.description.toLowerCase().includes(searchTerm.toLowerCase());
      const addressMatch = property.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address.country.toLowerCase().includes(searchTerm.toLowerCase());

      const amenitiesMatch = property.amenities.some((amenityId) =>
        amenityId.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const wifiMatch = property?.property_details?.wifi?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        property?.property_details?.wifi?.password.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        titleMatch || descriptionMatch || addressMatch || amenitiesMatch || wifiMatch
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0; // No sorting if sortField is not provided

      let aValue: string | number | undefined;
      let bValue: string | number | undefined;

      if (sortField === "address.city" || sortField === "address.area" || sortField === "address.street") {
        // Handle nested address fields
        aValue = a.address[sortField.split('.')[1] as keyof typeof a.address]?.toLowerCase();
        bValue = b.address[sortField.split('.')[1] as keyof typeof b.address]?.toLowerCase();
      } else if (sortField === "property_details.max_guest_count") {
        // Handle numeric property like max_guest_count
        aValue = a.property_details.max_guest_count;
        bValue = b.property_details.max_guest_count;
      } else if (sortField === "status") {
        // Handle status (string)
        aValue = a.status;
        bValue = b.status;
      } else if (sortField === "costs.prices.price_per_night") {
        // Handle cost per night (numeric)
        aValue = a.costs.prices.price_per_night;
        bValue = b.costs.prices.price_per_night;
      } else {
        // Handle top-level string properties
        aValue = a[sortField as keyof PropertyResponse] as string;
        bValue = b[sortField as keyof PropertyResponse] as string;
      }

      // Sorting logic
      if (aValue !== undefined && bValue !== undefined) {
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
};
