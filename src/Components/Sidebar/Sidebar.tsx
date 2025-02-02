import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import users from "../../assets/icons/users.png";
import properties from "../../assets/icons/properties.png";
import dashboard from "../../assets/icons/dashboard.png";
import settingIcon from "../../assets/icons/settingIcon.png";
import changepassword from "../../assets/icons/changepassword.png";
import LogoutButton from "../Logout/LogoutButton";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { useQueryParams } from "../../hooks/custom-hook/useQueryParams";
import whiteLogo from "../../assets/images/whiteLogo.png";
import FeedIcon from "@mui/icons-material/Feed";

interface SidebarProps {
  isActiveMenu: boolean;
}

const Sidebar = ({ isActiveMenu }: SidebarProps) => {
  const location = useLocation();
  const { updateQueryParams } = useQueryParams("tab");

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(false);

  useEffect(() => {
    const settingsPaths = [
      "/admin/setting/account-setting",
      "/admin/setting/privacy-policy",
      "/admin/setting/terms-and-conditions",
      "/admin/setting/refund-policy",
      "/admin/setting/about-us",
      "/admin/setting/faq",
    ];
    const invoicePaths = ["/admin/invoices", "/admin/invoice/create"];

    const isInvoiceDetailsPath =
      location.pathname.startsWith("/admin/invoice/");

    setIsSettingOpen(settingsPaths.includes(location.pathname));
    setIsInvoicesOpen(
      invoicePaths.includes(location.pathname) || isInvoiceDetailsPath
    );
  }, [location.pathname]);

  return (
    <div>
      <div className="pt-7 h-screen overflow-auto pb-10 flex flex-col justify-between overflow-x-hidden">
        <div>
          <div className="px-4">
            <img src={whiteLogo} className="w-36 mx-auto" />
          </div>
          <ul className="mt-9">
            <li className="py-2">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary ${
                    isActive ? "bg-primary" : ""
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
                  `flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary ${
                    isActive ? "bg-primary" : ""
                  }`
                }
              >
                <img src={users} className="min-w-6 w-6" alt="Users" />
                <span className={`${isActiveMenu && "hidden"}`}>Users</span>
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink
                to="/admin/properties"
                className={({ isActive }) =>
                  `flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary ${
                    isActive ? "bg-primary" : ""
                  }`
                }
              >
                <img
                  src={properties}
                  className="min-w-6 w-6"
                  alt="Properties"
                />
                <span className={`${isActiveMenu && "hidden"}`}>
                  Properties
                </span>
              </NavLink>
            </li>
            <li className="py-2">
              <div
                className="flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary cursor-pointer"
                onClick={() => setIsSettingOpen((prev) => !prev)}
              >
                <img src={settingIcon} className="min-w-6 w-6" alt="Settings" />
                <span className={`${isActiveMenu && "hidden"}`}>Settings</span>
                <span
                  className={`ml-auto duration-300 ${
                    isSettingOpen && "transform rotate-180"
                  }`}
                >
                  <KeyboardArrowDownOutlined />
                </span>
              </div>
              {isSettingOpen && (
                <ul className="ml-10">
                  {/* <li className="">
                    <NavLink
                      to="/admin/setting/account-setting"
                      className={({ isActive }) =>
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${isActive
                          ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
                          : ""
                        }`
                      }
                    >
                      Account Setting
                    </NavLink>
                  </li> */}
                  <li className="">
                    <NavLink
                      to="/admin/setting/about-us"
                      className={({ isActive }) =>
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${
                          isActive
                            ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
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
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${
                          isActive
                            ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
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
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${
                          isActive
                            ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
                            : ""
                        }`
                      }
                    >
                      Terms & Conditions
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/admin/setting/refund-policy"
                      className={({ isActive }) =>
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${
                          isActive
                            ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
                            : ""
                        }`
                      }
                    >
                      Refund Policy
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/admin/setting/faq"
                      className={({ isActive }) =>
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${
                          isActive
                            ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
                            : ""
                        }`
                      }
                    >
                      FAQ
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="py-2">
              <div
                className="flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary cursor-pointer"
                onClick={() => setIsInvoicesOpen((prev) => !prev)}
              >
                <img src={settingIcon} className="min-w-6 w-6" alt="Invoices" />
                <span className={`${isActiveMenu && "hidden"}`}>Invoice</span>
                <span
                  className={`ml-auto duration-300 ${
                    isInvoicesOpen && "transform rotate-180"
                  }`}
                >
                  <KeyboardArrowDownOutlined />
                </span>
              </div>
              {isInvoicesOpen && (
                <ul className="ml-10">
                  <li>
                    <NavLink
                      onClick={() => updateQueryParams("revenue-list")}
                      to="/admin/invoices"
                      className={({ isActive }) =>
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${
                          isActive
                            ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
                            : ""
                        }`
                      }
                    >
                      List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => updateQueryParams("revenue")}
                      to="/admin/invoice/create"
                      className={({ isActive }) =>
                        `flex relative gap-3 items-center text-white px-5 text-nowrap py-2 ${
                          isActive
                            ? "text-white before:bg-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full"
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
                to="/admin/support"
                className={({ isActive }) =>
                  `flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary ${
                    isActive ? "bg-primary" : ""
                  }`
                }
              >
                <img
                  src={changepassword}
                  className="min-w-6 w-6"
                  alt="Change Password"
                />
                <span className={`${isActiveMenu && "hidden"}`}>Support</span>
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink
                to="license-list"
                className={({ isActive }) =>
                  `flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary ${
                    isActive ? "bg-primary" : ""
                  }`
                }
              >
                {/* <img
                  src={changepassword}
                  className="min-w-6 w-6"
                  alt="Change Password"
                /> */}
                <FeedIcon className="min-w-6 w-6" />
                <span className={`${isActiveMenu && "hidden"}`}>
                  License List
                </span>
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink
                to="/admin/change-password"
                className={({ isActive }) =>
                  `flex gap-3 items-center text-white px-8 text-nowrap py-2 hover:bg-primary ${
                    isActive ? "bg-primary" : ""
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
        </div>
        <LogoutButton isActiveMenu={isActiveMenu} />
      </div>
    </div>
  );
};

export default Sidebar;
