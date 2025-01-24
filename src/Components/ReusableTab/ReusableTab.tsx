import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useCallback } from "react";

interface TabConfig {
  key: string;
  label: string;
  Component: React.FC;
}

interface ReusableTabProps {
  tabs: TabConfig[];
  includesPathname?: string;
}

const ReusableTab: React.FC<ReusableTabProps> = ({
  tabs,
  includesPathname = "invoice",
}) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Update query parameters with memoization to prevent re-creation on every render
  const updateQueryParams = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", key);
      setSearchParams(params, { preventScrollReset: true });
      localStorage.setItem("paramQuery", key);
    },
    [searchParams, setSearchParams]
  );

  // Initialize query parameters when the component mounts
  useEffect(() => {
    const storedQuery = localStorage.getItem("paramQuery");
    if (location.pathname.includes(includesPathname)) {
      if (storedQuery && tabs.some((tab) => tab.key === storedQuery)) {
        updateQueryParams(storedQuery);
      } else if (tabs.length > 0) {
        updateQueryParams(tabs[0].key);
      }
    }
    // Only run this effect when pathname, tabs, or updateQueryParams change
  }, [location.pathname, includesPathname, tabs, updateQueryParams]);

  // Memoize rendered buttons to avoid recalculation on every render
  const tabButtons = useMemo(
    () =>
      tabs.map((tab) => (
        <button
          key={tab.key}
          className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${
            searchParams.get("tab") === tab.key
              ? "font-medium bg-primary border-pribg-primary text-white"
              : "border-border1 text-text2"
          }`}
          onClick={() => updateQueryParams(tab.key)}
        >
          {tab.label}
        </button>
      )),
    [tabs, searchParams, updateQueryParams]
  );

  // Determine the active tab's component
  const activeTabComponent = useMemo(() => {
    const activeTab = tabs.find((tab) => tab.key === searchParams.get("tab"));
    return activeTab ? <activeTab.Component /> : null;
  }, [tabs, searchParams]);

  return (
    <div>
      <div className="mb-8 flex gap-2">{tabButtons}</div>
      <div>{activeTabComponent}</div>
    </div>
  );
};

export default ReusableTab;
