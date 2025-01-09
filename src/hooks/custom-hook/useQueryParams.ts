import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const useQueryParams = (paramName: string = "tab") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParams = useCallback(
    (key: string) => {
      const params = new URLSearchParams();
      console.log({ key });

      params.set(paramName, key);
      setSearchParams(params, { preventScrollReset: true });
      localStorage.setItem("paramQuery", key);
    },
    [setSearchParams, paramName]
  );

  const getStoredQueryParam = useCallback((): string | null => {
    return localStorage.getItem("paramQuery");
  }, []);

  return { updateQueryParams, getStoredQueryParam, searchParams };
};
