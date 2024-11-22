import React, { useState } from "react";
import adminBg from "../../assets/images/adminBg.png";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="bg-white  relative">
      <div
        className="w-full lg:w-[60%] h-full absolute blur-sm md:blur-0"
        style={{ background: `#00858E30` }}
      ></div>
      <div className="relative min-h-screen overflow-auto flex items-center">
        <div className="max-w-[1440px] mx-auto sm:px-0 px-3 ">
          <div className="flex flex-col md:flex-row lg:justify-end justify-center">
            <div className="md:w-[45%] lg:w-full text-center flex justify-center items-center pt-8 sm:pt-0">
              <div>
                <img
                  src={adminBg}
                  alt=""
                  className="w-[600px] hidden md:inline-block "
                />
                {/* <p className="text-primary text-xl xs:text-22 font-bold">
                  Sign in to your admin account
                </p> */}
              </div>
            </div>
            <div className="md:w-[55%] lg:min-w-[530px] xl:min-w-[630px] pt-8 pb-10 sm:py-14 sm:px-6 md:px-16 xl:px-24 flex items-center md:min-h-screen relative md:bg-white md:rounded-l-[40px] ov">
              <div className="bg-white py-8 px-4 sm:p-8 rounded-lg md:p-0 w-full">
                <div className="mb-6 sm:mb-110">
                  <p className="text-[28px] text-[#040404] font-bold mb-3">
                    Reset password?
                  </p>
                  <p className="text-sm text-[#8B8B8B] mb-8">
                    Enter your email. We will email intructions on how to reset
                    your password.
                  </p>
                  <div className=" mb-8">
                    <label className="text-[15px] text-[#8B8B8B]">
                      Email or username
                    </label>
                    <input
                      type="email"
                      className="py-[15px] px-4 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-[#8B8B8B] mt-2 w-full rounded-xl "
                      placeholder="Enter Email or username"
                    />
                  </div>
                  <Link
                    to="/admin/reset-password/send-link"
                    className="text-center mb-4 font-medium text-white bg-primary rounded-full py-3.5 px-6 block w-full"
                  >
                    Send Reset Email
                  </Link>
                  <button className="font-medium text-primary border border-primary rounded-full py-3.5 px-6 block w-full">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
