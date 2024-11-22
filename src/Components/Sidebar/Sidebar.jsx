import React, { useState } from "react";
import users from "../../assets/icons/users.png";
import sellers from "../../assets/icons/sellers.png";
import properties from "../../assets/icons/properties.png";
import dashboard from "../../assets/icons/dashboard.png";
import settingIcon from "../../assets/icons/settingIcon.png";
import logout from "../../assets/icons/logout.png";
import changepassword from "../../assets/icons/changepassword.png";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isActiveMenu }) => {
  return (
    <div>
      <div className="pt-36 h-screen overflow-auto pb-10 flex flex-col justify-between">
        <ul>
          <li className="py-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${
                  isActive
                    ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r "
                    : ""
                }`
              }
            >
              <img src={dashboard} className={`min-w-6 w-6 `} alt="dashboard" />
              <span className={`${isActiveMenu && "hidden"}`}>Dashboard</span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${
                  isActive
                    ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r "
                    : ""
                }`
              }
            >
              <img src={users} className={`min-w-6 w-6`} alt="Users" />
              <span className={`${isActiveMenu && "hidden"}`}>Users</span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/sellers"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${
                  isActive
                    ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r "
                    : ""
                }`
              }
            >
              <img src={sellers} className={`min-w-6 w-6 `} alt="Sellers" />
              <span className={`${isActiveMenu && "hidden"}`}>Sellers</span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/properties"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${
                  isActive
                    ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r "
                    : ""
                }`
              }
            >
              <img
                src={properties}
                className={`min-w-6 w-6 `}
                alt="Properties"
              />
              <span className={`${isActiveMenu && "hidden"}`}>Properties</span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/account-setting"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${
                  isActive
                    ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r "
                    : ""
                }`
              }
            >
              <img
                src={settingIcon}
                className={`min-w-6 w-6 `}
                alt="account-setting"
              />
              <span className={`${isActiveMenu && "hidden"}`}>
                Account Setting
              </span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/change-password"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${
                  isActive
                    ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r "
                    : ""
                }`
              }
            >
              <img
                src={changepassword}
                className={`min-w-6 w-6 `}
                alt="Change Password"
              />
              <span className={`${isActiveMenu && "hidden"}`}>
                Change Password
              </span>
            </NavLink>
          </li>
        </ul>
        <div className="px-6 mt-6">
          <div className="pt-10 border-t border-[#DDDEED] px-2">
            <button className="flex items-center gap-3 text-[#8B8B8B]">
              <img src={logout} className=" w-6" alt="" />
              <span className={`${isActiveMenu && "hidden"}`}>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
