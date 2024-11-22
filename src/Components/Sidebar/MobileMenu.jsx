import { CloseOutlined } from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ isActiveMobileMenu, setIsActiveMobileMenu }) => {
  document.body.style.overflow = isActiveMobileMenu ? "hidden" : "auto";
  return (
    <div className={` mobileNav ${isActiveMobileMenu && "show"}`}>
      <div
        className="bg_overlay top-0 left-0 w-full h-full fixed bg-black z-[9999]"
        onClick={() => setIsActiveMobileMenu(false)}
      ></div>
      <div className="h-screen fixed top-0 left-0 w-[300px] z-[9999] bg-white menu">
        <div className="flex justify-between p-4 border-b">
          <p className="text-lg font-medium">Main Menu</p>
          <span onClick={() => setIsActiveMobileMenu(false)}>
            <CloseOutlined />
          </span>
        </div>
        <div className="h-[calc(100vh_-_60px)] overflow-auto pb-10">
          <ul className="border-t ">
            <li>
              <NavLink
                onClick={() => setIsActiveMobileMenu(false)}
                to="/admin/dashboard"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${
                    isActive
                      ? "bg-[#00858e18] text-primary border-l-primary font-medium"
                      : isPending
                      ? "pending"
                      : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsActiveMobileMenu(false)}
                to="/admin/users"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${
                    isActive
                      ? "bg-[#00858e18] text-primary border-l-primary font-medium"
                      : isPending
                      ? "pending"
                      : ""
                  }`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsActiveMobileMenu(false)}
                to="/admin/sellers"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${
                    isActive
                      ? "bg-[#00858e18] text-primary border-l-primary font-medium"
                      : isPending
                      ? "pending"
                      : ""
                  }`
                }
              >
                Sellers
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsActiveMobileMenu(false)}
                to="/admin/properties"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${
                    isActive
                      ? "bg-[#00858e18] text-primary border-l-primary font-medium"
                      : isPending
                      ? "pending"
                      : ""
                  }`
                }
              >
                Properties
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsActiveMobileMenu(false)}
                to="/admin/account-setting"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${
                    isActive
                      ? "bg-[#00858e18] text-primary border-l-primary font-medium"
                      : isPending
                      ? "pending"
                      : ""
                  }`
                }
              >
                Account Setting
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsActiveMobileMenu(false)}
                to="/admin/change-password"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${
                    isActive
                      ? "bg-[#00858e18] text-primary border-l-primary font-medium"
                      : isPending
                      ? "pending"
                      : ""
                  }`
                }
              >
               Change Password
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
