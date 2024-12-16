import React from "react";
import useAuthStore from "../../store/authStore";
import logoutImg from "../../assets/icons/logout.png";
import { showConfirmationDialog } from "../../utils/alerts/alertService";

interface LogoutProps {
  isActiveMenu?: boolean;
}
const LogoutButton: React.FC<LogoutProps> = ({ isActiveMenu }) => {
  const { logout } = useAuthStore();
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
    <div className="px-6 mt-6">
      <div className="pt-10 border-t border-[#DDDEED] px-2">
        <button
          className="flex items-center gap-3 text-[#8B8B8B]"
          onClick={handleConfirmation}
        >
          <img src={logoutImg} className=" w-6" alt="" />
          <span className={`${isActiveMenu && "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
