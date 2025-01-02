import {
  CloudDownloadRounded,
  KeyboardArrowLeftOutlined,
  MenuOutlined,
  PrintRounded,
  ShareRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import userImg from "../../assets/images/userImg.png";
import { useContext } from "react";
import { DashboardContext } from "../../ContextApi";
import { Link, useLocation, useParams } from "react-router-dom";
import Invoice from "./Invoice";
import InvoiceRevenueDetails from "./InvoiceRevenueDetails";
import useAuthStore from "../../store/authStore";

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}
const InvoiceEdit = () => {
  const location = useLocation();

  const params = useParams();
  console.log(location.pathname.includes("edit"));

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
          <h5 className="text-22 text-primary font-bold">
            Invoice Edit Details
          </h5>
        </div>
        <div className="flex items-center gap-6">
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>
      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <div className="">
          <div className="">
            <Link
              to="/admin/invoices"
              className="w-max flex items-center justify-center uppercase text-2xl font-medium"
            >
              <KeyboardArrowLeftOutlined className="text-gray-600" /> INV-1991
            </Link>
          </div>
          <div className="mt-6">
            <div className="mb-4 pr-6">
              <ul className="flex justify-end gap-4 items-center text-gray-600">
                <li>
                  <button className="duration-300 hover:text-primary">
                    <VisibilityRounded className="!text-2xl" />
                  </button>
                </li>
                <li>
                  <button className="duration-300 hover:text-primary">
                    <CloudDownloadRounded className="!text-2xl" />
                  </button>
                </li>
                <li>
                  <button className="duration-300 hover:text-primary">
                    <PrintRounded className="!text-2xl" />
                  </button>
                </li>
                <li>
                  <button className="duration-300 hover:text-primary">
                    <ShareRounded className="!text-2xl" />
                  </button>
                </li>
              </ul>
            </div>
            <InvoiceRevenueDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEdit;
