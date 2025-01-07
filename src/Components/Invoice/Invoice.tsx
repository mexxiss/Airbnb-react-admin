import { useLocation, useSearchParams } from "react-router-dom";
import InvoiceCreate from "./InvoiceCreate";
import FurnishingInvoiceCreate from "./FurnishingInvoiceCreate";
import { useEffect, useCallback } from "react";

const Invoice = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParams = useCallback(
    (key: string) => {
      const params = new URLSearchParams();
      params.set(key, key);
      setSearchParams(params, { preventScrollReset: true });
      localStorage.setItem("paramQuery", key);
    },
    [setSearchParams]
  );

  useEffect(() => {
    const storedQuery = localStorage.getItem("paramQuery");

    if (location.pathname.includes("invoice")) {
      if (storedQuery) {
        updateQueryParams(storedQuery);
      } else {
        updateQueryParams("revenue");
      }
    }
  }, [location.pathname, updateQueryParams]);

  const renderButton = (queryKey: string, label: string) => (
    <button
      className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${
        searchParams.get(queryKey) === queryKey
          ? "font-medium bg-[#1E1E1E] border-[#1E1E1E] text-white"
          : "border-border1 text-text2"
      }`}
      onClick={() => updateQueryParams(queryKey)}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="m-8 flex gap-2">
        {renderButton("revenue", "Create Revenue Invoice")}
        {renderButton("furnishing", "Create Furnishing Invoice")}
      </div>

      {searchParams.get("revenue") === "revenue" && <InvoiceCreate />}
      {searchParams.get("furnishing") === "furnishing" && (
        <FurnishingInvoiceCreate />
      )}
    </div>
  );
};

export default Invoice;
