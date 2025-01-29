import UserQueries from "./Component/UserQueries";
import WebQueries from "./Component/WebQueries";
import PropertyQueries from "./Component/PropertyQueries";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SupportQuerry = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "user");

    // Sync activeTab with URL
    useEffect(() => {
        setSearchParams({ tab: activeTab });
    }, [activeTab, setSearchParams]);

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case "user":
                return <UserQueries />;
            case "web":
                return <WebQueries />;
            case "property":
                return <PropertyQueries />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
                <h5 className="text-22 text-primary font-bold">Support Query</h5>
                <div className="mt-8">
                    <ul className="flex items-center gap-4">
                        <li>
                            <button
                                className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer font-medium ${activeTab === "user" ? "bg-primary border-primary text-white" : "border-primary text-primary"}`}
                                onClick={() => setActiveTab("user")}
                            >
                                User Queries
                            </button>
                        </li>
                        <li>
                            <button
                                className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer font-medium ${activeTab === "web" ? "bg-primary border-primary text-white" : "border-primary text-primary"}`}
                                onClick={() => setActiveTab("web")}
                            >
                                Web Queries
                            </button>
                        </li>
                        <li>
                            <button
                                className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer font-medium ${activeTab === "property" ? "bg-primary border-primary text-white" : "border-primary text-primary"}`}
                                onClick={() => setActiveTab("property")}
                            >
                                Property Queries
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="mt-4">
                    {renderActiveTabContent()}
                </div>
            </div>
        </div >
    )
}

export default SupportQuerry