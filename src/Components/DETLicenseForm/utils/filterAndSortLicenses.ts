import { LicenseRequestPayload } from "../../../types/licenseTypes";

export interface FilterSortLicenseParams {
  licensesList: LicenseRequestPayload[];
  searchTerm: string;
  sortField?: string | undefined | null;
  sortOrder?: "asc" | "desc";
}

export const filterAndSortLicenses = ({
  licensesList,
  searchTerm,
  sortField,
  sortOrder = "asc",
}: FilterSortLicenseParams): LicenseRequestPayload[] => {
  return licensesList
    .filter((license) => {
      const licenseNumberMatch = license.licenseNumber
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
      const ownerMatch = license.owner
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
      const propertyMatch = license.property
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
      const statusMatch = license.status
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());

      return licenseNumberMatch || ownerMatch || propertyMatch || statusMatch;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      let aValue: string | number | boolean | undefined;
      let bValue: string | number | boolean | undefined;

      if (sortField === "price") {
        aValue = a.price;
        bValue = b.price;
      } else if (
        sortField === "issueDate" ||
        sortField === "expiryDate" ||
        sortField === "createdAt"
      ) {
        aValue = new Date(a[sortField] as string).getTime();
        bValue = new Date(b[sortField] as string).getTime();
      } else {
        aValue = a[sortField as keyof LicenseRequestPayload] as string;
        bValue = b[sortField as keyof LicenseRequestPayload] as string;
      }

      if (aValue !== undefined && bValue !== undefined) {
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
};
