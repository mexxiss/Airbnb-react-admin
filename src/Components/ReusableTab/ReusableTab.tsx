import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useCallback } from "react";

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

  const updateQueryParams = useCallback(
    (key: string) => {
      const params = new URLSearchParams();
      console.log({ key });

      params.set("tab", key);
      setSearchParams(params, { preventScrollReset: true });
      localStorage.setItem("paramQuery", key);
    },
    [setSearchParams]
  );

  useEffect(() => {
    const storedQuery = localStorage.getItem("paramQuery");
    if (location.pathname.includes(includesPathname)) {
      if (storedQuery) {
        updateQueryParams(storedQuery);
      } else if (tabs.length > 0) {
        updateQueryParams(tabs[0].key);
      }
    }
  }, [location.pathname, tabs, updateQueryParams]);

  const renderButton = (tab: TabConfig) => (
    <button
      key={tab.key}
      className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${searchParams.get("tab") === tab.key
        ? "font-medium bg-[#1E1E1E] border-[#1E1E1E] text-white"
        : "border-border1 text-text2"
        }`}
      onClick={() => updateQueryParams(tab.key)}
    >
      {tab.label}
    </button>
  );

  const activeTab = tabs.find((tab) => tab.key === searchParams.get("tab"));

  return (
    <div>
      <div className="mb-8 flex gap-2">
        {tabs.map((tab) => renderButton(tab))}
      </div>
      <div>{activeTab && <activeTab.Component />}</div>
    </div>
  );
};

export default ReusableTab;
