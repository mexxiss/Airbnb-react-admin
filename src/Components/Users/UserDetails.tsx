import { MenuOutlined } from "@mui/icons-material";
import userImg from "../../assets/images/userImg.png";
import { useContext } from "react";
import { DashboardContext } from "../../ContextApi";
import PersonalDetails from "./components/PersonalDetails";
import BankDetails from "./components/BankDetails";
import UserPropertiesList from "./components/UserPropertiesList";

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}
const UserDetails = () => {
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

  return (
    <div>
      <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">User Details</h5>
        </div>
        <div className="flex items-center gap-6">
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        {/* User Details */}
        <PersonalDetails />

        {/* Bank Details */}
        <BankDetails />

        {/* Listed properties */}
        <UserPropertiesList />
      </div>
    </div>
  );
};

export default UserDetails;
