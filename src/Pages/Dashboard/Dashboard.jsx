import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";
import MobileMenu from "../../Components/Sidebar/MobileMenu";
import { DashboardContext } from "../../ContextApi/index";

const AdminDashboard = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const handleToggle = () => {
    setIsActiveMenu(!isActiveMenu);
  };
  return (
    <div>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex">
          <div
            className={`hidden lg:block ${
              isActiveMenu ? "min-w-[86px] w-[86px]" : "min-w-[250px] w-[250px]"
            } duration-100 h-screen rounded-r-[30px] bg-white relative`}
          >
            {" "}
            <button
              className="w-10 h-10 rounded-full border-[#4E307A1A] bg-white border-2 flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 text-primary"
              onClick={handleToggle}
            >
              {isActiveMenu ? (
                <KeyboardArrowRightOutlined />
              ) : (
                <KeyboardArrowLeftOutlined />
              )}
            </button>
            <Sidebar isActiveMenu={isActiveMenu} />
          </div>
          <MobileMenu
            isActiveMobileMenu={isActiveMobileMenu}
            setIsActiveMobileMenu={setIsActiveMobileMenu}
          />
          <div
            className={`${
              isActiveMenu
                ? "w-full lg:w-[calc(100%_-_86px)]"
                : "w-full lg:w-[calc(100%_-_250px)]"
            }} `}
          >
            <DashboardContext.Provider
              value={{
                setIsActiveMobileMenu,
              }}
            >
              <Outlet />
            </DashboardContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
