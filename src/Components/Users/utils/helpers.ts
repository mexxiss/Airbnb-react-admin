import { User } from "../../../types/usersTypes";

export interface FilterSortParams {
  usersList: User[];
  searchTerm: string;
  sortField?: string | undefined | null; // Optional sort field
  sortOrder?: "asc" | "desc"; // Sorting order
}

/**
 * Filters and sorts a list of users based on the search term and sorting parameters.
 */
export const filterAndSortUsers = ({
  usersList,
  searchTerm,
  sortField,
  sortOrder = "asc",
}: FilterSortParams): User[] => {
  return usersList
    .filter((user) => {
      const fullName = `${user?.first_name} ${user?.last_name}`?.toLowerCase();
      const emailMatch = user.email.some((email) =>
        email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      const phoneMatch = user.phone.some((phone) => phone.includes(searchTerm));

      return (
        fullName?.includes(searchTerm?.toLowerCase()) ||
        emailMatch ||
        phoneMatch
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0; // No sorting if sortField is not provided

      let aValue: string | boolean | undefined;
      let bValue: string | boolean | undefined;

      if (sortField === "area") {
        // Handle nested property 'area'
        aValue = a?.address?.area?.toLowerCase();
        bValue = b?.address?.area?.toLowerCase();
      } else if (sortField === "isDeleted") {
        // Handle boolean sorting for 'isDeleted'
        aValue = a.isDeleted;
        bValue = b.isDeleted;
      } else {
        // Handle top-level string properties
        aValue = a[sortField as keyof User] as string;
        bValue = b[sortField as keyof User] as string;
      }

      // Sorting logic
      if (aValue !== undefined && bValue !== undefined) {
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
};
