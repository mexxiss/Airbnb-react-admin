import React, { useContext, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
import "./AdminDashboard.css";
import userImg2 from "../../assets/images/userImg2.png";
import whiteLogo from "../../assets/images/whiteLogo.png";
import { MenuOutlined } from "@mui/icons-material";
import MobileMenu from "../../Components/Sidebar/MobileMenu";
import useAuthStore from "../../store/authStore";

const AdminDashboard: React.FC = () => {
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
  const { user } = useAuthStore();

  const handleToggle = (): void => {
    setIsActiveMenu(!isActiveMenu);
  };

  return (
    <div>
      <div className="max-w-[1640px] mx-auto">
        <div className="relative w-full">
          <div
            className={`absolute top-0 left-0  hidden lg:block border-[#c0a679] overflow-x-hidden ${
              isActiveMenu ? "w-0" : "w-[220px] border-r"
            } duration-100 h-screen bg-[#8e7344]`}
          >
            <Sidebar isActiveMenu={isActiveMenu} />
          </div>
          <MobileMenu />
          <div
            className={`duration-200 ${
              isActiveMenu ? "w-full lg:pl-0" : "w-full lg:pl-[220px]"
            }`}
          >
            <div className="px-6 py-[20px] flex items-center justify-between border-b border-gray-300 bg-[#8e7344]">
              <div className="flex items-center gap-3">
                <button className="text-white" onClick={handleToggle}>
                  <MenuOutlined />
                </button>
                <button
                  className="lg:hidden text-white duration-300 hover:text-primary active:text-primary"
                  // onClick={() => setIsActiveMobileMenu(true)}
                >
                  <MenuOutlined className="!text-3xl" />
                </button>
                <img src={whiteLogo} className="lg:hidden w-32 mx-auto" />
              </div>
              <div className="flex items-center gap-6">
                <Link
                  to="/admin/profile"
                  className="border-2 border-[#E8E1F6] rounded-full w-10 h-10 overflow-hidden"
                >
                  <img
                    src={user?.profile_img || userImg2}
                    className="w-full h-full object-cover rounded-full"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
