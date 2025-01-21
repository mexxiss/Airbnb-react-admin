import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const useQueryParams = (paramName: string = "tab") => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Update query parameters
  const updateQueryParams = useMemo(() => {
    return (key: string) => {
      const params = new URLSearchParams(searchParams.toString()); // Preserve existing params
      params.set(paramName, key);
      setSearchParams(params, { preventScrollReset: true });
      localStorage.setItem("paramQuery", key);
    };
  }, [setSearchParams, searchParams, paramName]);

  // Get stored query parameter from localStorage
  const getStoredQueryParam = useMemo(() => {
    return () => localStorage.getItem("paramQuery");
  }, []);

  return { updateQueryParams, getStoredQueryParam, searchParams };
};
