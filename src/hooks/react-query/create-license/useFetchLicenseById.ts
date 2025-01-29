import { useQuery } from "@tanstack/react-query";
import { fetchLicenseById } from "../../../services/apiServices";

interface UseFetchLicenseByIdParams {
  licenseId: string;
}

export const useFetchLicenseById = ({
  licenseId,
}: UseFetchLicenseByIdParams) => {
  return useQuery({
    queryKey: ["licenseDetails", licenseId],
    queryFn: () => fetchLicenseById(licenseId),
    enabled: !!licenseId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
