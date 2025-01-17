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

const InvoiceCreate = () => {

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

  return (
    <div>
      <div>
        <DataHandler
          loadingStates={[reveIsLoading]}
          errorStates={[{ isError: reveIsError, error: reveError }]}
        >
          <div className="mb-5">
            <h5 className="text-22 text-primary font-bold">Create Revenue Invoice</h5>
          </div>
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
        </DataHandler>
      </div>
    </div>
  );
};

export default InvoiceCreate;
