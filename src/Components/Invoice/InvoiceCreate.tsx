import userImg from "../../assets/images/userImg.png";
import { MenuOutlined } from "@mui/icons-material";
import { useContext, useEffect, useMemo, useState } from "react";
import { DashboardContext } from "../../ContextApi";
import { userFetchQuery } from "../../hooks/react-query/users-queries";
import CustomSelectInput from "../SelectInput/CustomSelectInput";
import { usePropertiesByUser } from "../../hooks/react-query/properties-query";
import MonthPicker from "../DateInput/MonthPicker";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import RevenueStatement from "./RevenueStatement";
import { IMonthlyInvoice } from "../../types/invoiceTypes";
import useAuthStore from "../../store/authStore";
import { User } from "../../types/usersTypes";
import { useFetchRevenue } from "../../hooks/react-query/revenue/useFetchRevenue";
import { useCreateMonthlyInvoice } from "../../hooks/react-query/revenue";
import { SelectionGroup } from "../SelectionGroup/SelectionGroup";

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}
const InvoiceCreate = () => {
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

  const { user } = useAuthStore();

  const [selectedValue, setSelectedValue] = useState<
    string | string | number | (string | number)[]
  >("");

  const [selectedProperty, setSelectedProperty] = useState<
    string | string | number | (string | number)[]
  >("");

  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const handleUserChange = (value: string | number | (string | number)[]) => {
    setSelectedValue(value);
  };

  const handlePropertyChange = (
    value: string | number | (string | number)[]
  ) => {
    setSelectedProperty(value);
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleSelectedUserChange = (user: User | null) => {
    setCurrentUser(user);
  };

  const {
    data: revenueData,
    error: reveError,
    isLoading: reveIsLoading,
    isError: reveIsError,
  } = useFetchRevenue({
    selectedValue: selectedValue as string,
    selectedProperty: selectedProperty as string,
    selectedMonth: selectedMonth as string,
  });

  const newObject: IMonthlyInvoice = revenueData
    ? {
        ...revenueData,
        property_id: selectedProperty as string,
        ownerDetails: {
          name: `${user?.first_name} ${user?.last_name}`,
          address: `${user?.address.street} ${user?.address.country}`,
          phone: user?.phone[0] || user?.phone[1],
        },
        companyDetails: {
          name: `${currentUser?.first_name} ${currentUser?.last_name}`,
          address: `${currentUser?.address.street} ${currentUser?.address.country}`,
          phone: currentUser?.phone[0] || currentUser?.phone[1],
        },
      }
    : null;

  const { mutate: createInvoice, isPending } = useCreateMonthlyInvoice();

  const handleSubmit = () => {
    if (newObject) {
      createInvoice(newObject);
    }
  };

  <DataHandler
    loadingStates={[reveIsLoading]}
    errorStates={[{ isError: reveIsError, error: reveError }]}
  />;

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
          <h5 className="text-22 text-primary font-bold">Create Invoice</h5>
        </div>
        <div className="flex items-center gap-6">
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>
      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        <SelectionGroup
          onUserChange={handleUserChange}
          onPropertyChange={handlePropertyChange}
          onMonthChange={handleMonthChange}
          onSelectedUserChange={handleSelectedUserChange}
        />

        {revenueData && Object.keys(revenueData).length > 0 && (
          <RevenueStatement data={newObject} />
        )}

        <div className="text-end mt-8">
          {revenueData && Object.keys(revenueData).length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className=" inline-block  px-4 py-2 bg-primary rounded text-white"
            >
              {isPending ? "Creating..." : "Create Invoice"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreate;
