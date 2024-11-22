import React, { useContext, useState } from "react";
import userImg from "../../assets/images/userImg.png";
import {
  MenuOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { DashboardContext } from "../../ContextApi/index";

const AdminChangePassword = () => {
  const { setIsActiveMobileMenu } = useContext(DashboardContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const toggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
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
        <div className="flex items-center justify-center">
          <div className="mt-5 w-full max-w-[420px]">
            <div className=" mb-4">
              <label className="text-[15px] text-[#8B8B8B]">
                Current password
              </label>
              <div className="border-[#8B8B8B] border rounded-xl relative py-2 mt-1 bg-white ">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="py-0 pl-4 pr-12 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full "
                  placeholder="Enter current password"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]"
                  onClick={() => toggleCurrentPassword()}
                >
                  {showCurrentPassword ? (
                    <VisibilityOffOutlined className="!text-lg" />
                  ) : (
                    <VisibilityOutlined  className="!text-lg" />
                  )}
                </button>
              </div>
            </div>
            <div className=" mb-4">
              <label className="text-[15px] text-[#8B8B8B]">New password</label>
              <div className="border-[#8B8B8B] border rounded-xl relative py-2 mt-1 bg-white ">
                <input
                  type={showPassword ? "text" : "password"}
                  className="py-0 pl-4 pr-12 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full "
                  placeholder="Create a new password"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]"
                  onClick={() => togglePassword()}
                >
                  {showPassword ? (
                    <VisibilityOffOutlined className="!text-lg" />
                  ) : (
                    <VisibilityOutlined  className="!text-lg" />
                  )}
                </button>
              </div>
            </div>
            <div className=" mb-8">
              <label className="text-[15px] text-[#8B8B8B]">
                Repeat password
              </label>
              <div className="border-[#8B8B8B] border rounded-xl relative py-2 mt-1 bg-white ">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="py-0 pl-4 pr-12 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full "
                  placeholder="Repeat a new password"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]"
                  onClick={() => toggleConfirmPassword()}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlined className="!text-lg" />
                  ) : (
                    <VisibilityOutlined  className="!text-lg" />
                  )}
                </button>
              </div>
            </div>
            <button className="w-full py-3 px-6 bg-primary text-white font-medium rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChangePassword;
