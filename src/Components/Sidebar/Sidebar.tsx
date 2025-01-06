import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import users from "../../assets/icons/users.png";
import sellers from "../../assets/icons/sellers.png";
import properties from "../../assets/icons/properties.png";
import dashboard from "../../assets/icons/dashboard.png";
import settingIcon from "../../assets/icons/settingIcon.png";
import changepassword from "../../assets/icons/changepassword.png";
import LogoutButton from "../Logout/LogoutButton";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";

interface SidebarProps {
  isActiveMenu: boolean;
}

const Sidebar = ({ isActiveMenu }: SidebarProps) => {
  const location = useLocation();

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(false);

  useEffect(() => {
    const settingsPaths = [
      "/admin/setting/account-setting",
      "/admin/setting/privacy-policy",
      "/admin/setting/terms-and-conditions",
      "/admin/setting/about-us",
    ];
    const invoicePaths = [
      "/admin/invoices",
      "/admin/invoice/create",
    ];

    const isInvoiceDetailsPath = location.pathname.startsWith("/admin/invoice/");

    setIsSettingOpen(settingsPaths.includes(location.pathname));
    setIsInvoicesOpen(
      invoicePaths.includes(location.pathname) || isInvoiceDetailsPath
    );
  }, [location.pathname]);


  return (
    <div>
      <div className="pt-32 h-screen overflow-auto pb-10 flex flex-col justify-between">
        <ul>
          <li className="py-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${isActive
                  ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r "
                  : ""
                }`
              }
            >
              <img src={dashboard} className="min-w-6 w-6" alt="dashboard" />
              <span className={`${isActiveMenu && "hidden"}`}>Dashboard</span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${isActive
                  ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r"
                  : ""
                }`
              }
            >
              <img src={users} className="min-w-6 w-6" alt="Users" />
              <span className={`${isActiveMenu && "hidden"}`}>Users</span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/sellers"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${isActive
                  ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r"
                  : ""
                }`
              }
            >
              <img src={sellers} className="min-w-6 w-6" alt="Sellers" />
              <span className={`${isActiveMenu && "hidden"}`}>Sellers</span>
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/properties"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${isActive
                  ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r"
                  : ""
                }`
              }
            >
              <img src={properties} className="min-w-6 w-6" alt="Properties" />
              <span className={`${isActiveMenu && "hidden"}`}>Properties</span>
            </NavLink>
          </li>
          <li className="py-2">
            <div
              className="flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 cursor-pointer"
              onClick={() => setIsSettingOpen((prev) => !prev)}
            >
              <img src={settingIcon} className="min-w-6 w-6" alt="Settings" />
              <span className={`${isActiveMenu && "hidden"}`}>Settings</span>
              <span
                className={`ml-auto duration-300 ${isSettingOpen && "transform rotate-180"
                  }`}
              >
                <KeyboardArrowDownOutlined />
              </span>
            </div>
            {isSettingOpen && (
              <ul className="ml-10">
                <li className="">
                  <NavLink
                    to="/admin/setting/account-setting"
                    className={({ isActive }) =>
                      `flex gap-3 items-center text-[#8B8B8B] px-5 text-nowrap py-2 ${isActive
                        ? "imgColor before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                        : ""
                      }`
                    }
                  >
                    Account Setting
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/admin/setting/about-us"
                    className={({ isActive }) =>
                      `flex gap-3 items-center text-[#8B8B8B] px-5 text-nowrap py-2 ${isActive
                        ? "imgColor before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                        : ""
                      }`
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/admin/setting/privacy-policy"
                    className={({ isActive }) =>
                      `flex gap-3 items-center text-[#8B8B8B] px-5 text-nowrap py-2 ${isActive
                        ? "imgColor before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                        : ""
                      }`
                    }
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to="/admin/setting/terms-and-conditions"
                    className={({ isActive }) =>
                      `flex gap-3 items-center text-[#8B8B8B] px-5 text-nowrap py-2 ${isActive
                        ? "imgColor before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                        : ""
                      }`
                    }
                  >
                    Terms & Conditions
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2">
            <div
              className="flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 cursor-pointer"
              onClick={() => setIsInvoicesOpen((prev) => !prev)}
            >
              <img src={settingIcon} className="min-w-6 w-6" alt="Invoices" />
              <span className={`${isActiveMenu && "hidden"}`}>Invoice</span>
              <span
                className={`ml-auto duration-300 ${isInvoicesOpen && "transform rotate-180"
                  }`}
              >
                <KeyboardArrowDownOutlined />
              </span>
            </div>
            {isInvoicesOpen && (
              <ul className="ml-10">
                <li>
                  <NavLink
                    to="/admin/invoices"
                    className={({ isActive }) =>
                      `flex gap-3 items-center text-[#8B8B8B] px-5 text-nowrap py-2 ${isActive
                        ? "imgColor before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                        : ""
                      }`
                    }
                  >
                    List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/invoice/1"
                    className={({ isActive }) =>
                      `flex gap-3 items-center text-[#8B8B8B] px-5 text-nowrap py-2 ${isActive
                        ? "imgColor before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                        : ""
                      }`
                    }
                  >
                    Details
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/invoice/create"
                    className={({ isActive }) =>
                      `flex gap-3 items-center text-[#8B8B8B] px-5 text-nowrap py-2 ${isActive
                        ? "imgColor before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-white before:rounded-full"
                        : ""
                      }`
                    }
                  >
                    Create
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="py-2">
            <NavLink
              to="/admin/change-password"
              className={({ isActive }) =>
                `flex gap-3 items-center text-[#8B8B8B] px-8 text-nowrap py-2 ${isActive
                  ? "imgColor before:absolute before:left-0 before:top-0 before:w-1.5 before:h-full before:bg-white before:rounded-r"
                  : ""
                }`
              }
            >
              <img
                src={changepassword}
                className="min-w-6 w-6"
                alt="Change Password"
              />
              <span className={`${isActiveMenu && "hidden"}`}>
                Change Password
              </span>
            </NavLink>
          </li>
        </ul>
        <LogoutButton isActiveMenu={isActiveMenu} />
      </div>
    </div>
  );
};

export default Sidebar;
