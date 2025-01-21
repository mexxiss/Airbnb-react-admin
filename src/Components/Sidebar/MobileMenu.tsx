import { CloseOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { showConfirmationDialog } from "../../utils/alerts/alertService";
import { useState } from "react";

const MobileMenu = ({ isActiveMobileMenu, setIsActiveMobileMenu }: any) => {
  document.body.style.overflow = isActiveMobileMenu ? "hidden" : "auto";
  const { logout } = useAuthStore();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(false);

  const handleConfirmation = async () => {
    const confirmed = await showConfirmationDialog(
      "Are you sure?",
      "Do you want to logout?",
      "Logout",
      "Cancel",
      {
        popup: "bg-gray-100 border border-blue-500 p-6 rounded-lg",
        title: "text-gray-800 font-bold text-lg",
        confirmButton:
          "bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600",
        cancelButton:
          "bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400",
      }
    );
    if (confirmed) {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
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
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${isActive
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
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${isActive
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
                to="/admin/properties"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${isActive
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
              <div
                className={`py-2.5 hover:text-primary hover:bg-[#00858e09] w-full pl-4 flex justify-between items-center cursor-pointer ${!isSettingOpen && "border-b"}`}
                onClick={() => setIsSettingOpen((prev) => !prev)}
              >
                <span>Settings</span>
                <KeyboardArrowDownOutlined
                  className={`transition-transform ${isSettingOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
              {isSettingOpen && (
                <ul className="pl-4 border-b">
                  <li>
                    <NavLink
                      onClick={() => setIsActiveMobileMenu(false)}
                      to="/admin/setting/privacy-policy"
                      className={({ isActive }) =>
                        `py-2.5 hover:text-primary w-full pl-4 block ${isActive ? "text-primary font-medium" : ""}`
                      }
                    >
                      Privacy Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsActiveMobileMenu(false)}
                      to="/admin/setting/terms-and-conditions"
                      className={({ isActive }) =>
                        `py-2.5 hover:text-primary w-full pl-4 block ${isActive ? "text-primary font-medium" : ""}`
                      }
                    >
                      Terms & Conditions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsActiveMobileMenu(false)}
                      to="/admin/setting/faq"
                      className={({ isActive }) =>
                        `py-2.5 hover:text-primary w-full pl-4 block ${isActive ? "text-primary font-medium" : ""}`
                      }
                    >
                      FAQ
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div
                className={`py-2.5 hover:text-primary hover:bg-[#00858e09] w-full pl-4 flex justify-between items-center cursor-pointer ${!isSettingOpen && "border-b"}`}
                onClick={() => setIsInvoicesOpen((prev) => !prev)}
              >
                <span>Invoices</span>
                <KeyboardArrowDownOutlined
                  className={`transition-transform ${isInvoicesOpen ? "rotate-180" : ""
                    }`}
                />
              </div>
              {isInvoicesOpen && (
                <ul className="pl-4 border-b">
                  <li>
                    <NavLink
                      onClick={() => setIsActiveMobileMenu(false)}
                      to="/admin/invoices"
                      className={({ isActive }) =>
                        `py-2.5 hover:text-primary w-full pl-4 block ${isActive ? "text-primary font-medium" : ""}`
                      }
                    >
                      List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => setIsActiveMobileMenu(false)}
                      to="/admin/invoice/create"
                      className={({ isActive }) =>
                        `py-2.5 hover:text-primary w-full pl-4 block ${isActive ? "text-primary font-medium" : ""}`
                      }
                    >
                      Create
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink
                onClick={() => setIsActiveMobileMenu(false)}
                to="/admin/change-password"
                className={({ isActive, isPending }) =>
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-white pl-4 inline-block ${isActive
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
            <li>
              <button
                onClick={() => { handleConfirmation(); setIsActiveMobileMenu(false) }}
                className={
                  ` py-2.5 border-b hover:text-primary hover:bg-[#00858e09] w-full border-l-4 border-l-transparent pl-4 inline-block text-left`
                }
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
