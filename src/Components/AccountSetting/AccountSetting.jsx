import React, { useContext } from "react";
import userImg from "../../assets/images/userImg.png";
import { MenuOutlined } from "@mui/icons-material";
import { DashboardContext } from "../../ContextApi/index";

const AdminAccountSetting = () => {
  const { setIsActiveMobileMenu } = useContext(DashboardContext);
  return (
    <div>
      <div className="px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">Change Password</h5>
        </div>
        <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
          <img src={userImg} className="w-full h-full object-cover" alt="" />
        </button>
      </div>
      <div className="px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <div className="text-5xl text-primary font-bold flex items-center justify-center">
          Comming Soon
        </div>
      </div>
    </div>
  );
};

export default AdminAccountSetting;
