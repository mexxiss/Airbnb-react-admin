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

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [dates, setDates] = useState<Date[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 500;

  const { data, isLoading, isError, error } = userFetchQuery({
    dates,
    searchTerm,
    isDeleted: status,
    limit,
    page,
  });

  const {
    data: propertyData,
    isLoading: proIsLoading,
    isError: proIsError,
    error: proError,
  } = usePropertiesByUser(selectedValue || "");

  const userData = useMemo(
    () =>
      data?.data?.map((item: any) => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item._id,
      })) || [],
    [data]
  );

  const propertyDataModified =
    propertyData?.properties.map((item: any) => ({
      label: item?.title,
      value: item._id,
    })) || [];

  useEffect(() => {
    if (selectedValue) {
      setSelectedUser(
        data?.data.find((item: any) => item._id === selectedValue) || null
      );
    }
  }, [selectedValue]);

  const handleChange = (value: string | number | (string | number)[]) => {
    setSelectedValue(value);
  };

  const handleChangeProperty = (
    value: string | number | (string | number)[]
  ) => {
    setSelectedProperty(value);
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
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
        ownerDetails: {
          name: `${user?.first_name} ${user?.last_name}`,
          address: `${user?.address.street} ${user?.address.country}`,
          phone: user?.phone[0] || user?.phone[1],
        },
        companyDetails: {
          name: `${selectedUser?.first_name} ${selectedUser?.last_name}`,
          address: `${selectedUser?.address.street} ${selectedUser?.address.country}`,
          phone: selectedUser?.phone[0] || selectedUser?.phone[1],
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
    loadingStates={[isLoading, proIsLoading, reveIsLoading]}
    errorStates={[
      { isError, error },
      { isError: proIsError, error: proError },
      { isError: reveIsError, error: reveError },
    ]}
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
        <div>
          <div className="grid grid-cols-3 gap-4">
            <CustomSelectInput
              label="Select User"
              options={userData}
              value={selectedValue}
              onChange={handleChange}
              placeholder="Select an option"
              className="mb-4"
              error={!selectedValue ? "This field is required" : ""}
            />

            <CustomSelectInput
              label="Select Property"
              options={propertyDataModified}
              value={selectedProperty}
              onChange={handleChangeProperty}
              placeholder="Select an option"
              className="mb-4"
              error={!selectedProperty ? "This field is required" : ""}
            />

            <MonthPicker
              label="Select a Month"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>
        </div>
        {/* <div className="mt-8">
          <div className="p-8 rounded-2xl shadow-lg bg-white">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-2xl font-bold text-gray-500">Logo</h5>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className="bg-primary bg-opacity-15 text-primary py-2 px-3 rounded-full text-xs font-medium">
                    MONTHLY REVENUE STATEMENT
                  </span>
                  <p className="text-lg font-medium">INV-1991</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                <div>
                  <div className="text-gray-800 text-sm">
                    <p className="font-semibold">Inder</p>
                    <p className="mt-1">
                      1147 Rohan Drive Suite 819 - Burlington, VT / 82021
                    </p>
                    <div className="flex mt-1 gap-2">
                      <span className="font-medium">Phone:</span>
                      <p className="">+1 802-448-2354</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <span className="font-medium">Date:</span>
                      <p className="">March 15, 2022</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-800 text-sm">
                    <div className="flex  gap-2">
                      <span className="font-medium">Owner:</span>
                      <p className="">Surinder Saini Paul Harbans</p>
                    </div>
                    <p className="mt-1">
                      18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337
                    </p>
                    <div className="flex mt-1 gap-2">
                      <span className="font-medium">Phone:</span>
                      <p className="">+1 802-448-2354</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <span className="font-medium">Statement Period:</span>
                      <p className="">2024/11</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="overflow-y-hidden">
                <table className="w-full">
                  <thead className="text-gray-600 font-medium text-sm">
                    <tr className="bg-primary bg-opacity-15">
                      <th className="py-3 text-left px-3 w-[50px]">#</th>
                      <th className="py-3 text-left px-3 min-w-[180px]">
                        Reservation Code
                      </th>
                      <th className="py-3 text-left px-3 min-w-[180px]">
                        Guest Name
                      </th>
                      <th className="py-3 text-left px-3 min-w-[100px]">
                        Check-In
                      </th>
                      <th className="py-3 text-left px-3 min-w-[100px]">
                        Check-Out
                      </th>
                      <th className="py-3 text-left px-3 min-w-[100px]">
                        Total Night
                      </th>
                      <th className="py-3 px-3 min-w-[180px] text-end">
                        Net Rental Income
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 font-medium text-sm">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <tr
                          key={i}
                          className="border-b last:border-b-0 border-primary border-opacity-30 border-dashed"
                        >
                          <td className="py-4 px-3">1</td>
                          <td className="py-4 px-3">RS-dwekjwdsc</td>
                          <td className="py-4 px-3">Inder</td>
                          <td className="py-4 px-3">27-10-2024</td>
                          <td className="py-4 px-3">30-10-2024</td>
                          <td className="py-4 px-3">3</td>
                          <td className="py-4 px-3 text-end font-semibold">
                            AED 1,803.00
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td
                        colSpan={6}
                        className="py-4 px-3 font-semibold text-lg"
                      >
                        Total
                      </td>
                      <td className="py-4 px-3 text-end font-semibold text-lg">
                        AED 1,803.00
                      </td>
                    </tr>
                    <tr className="border-t border-primary border-opacity-30 border-dashed">
                      <td colSpan={2} className="py-4"></td>
                      <td colSpan={5} className="py-4">
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td className="px-3 text-gray-700 font-normal text-base">
                                Management Fee (17%)
                              </td>
                              <td className="px-3 text-end text-gray-700 font-medium text-base">
                                -AED 303
                              </td>
                            </tr>
                            <tr>
                              <td className="px-3 pt-2 text-gray-700 font-normal text-base">
                                <p>Expenses</p>
                                <div>
                                  <table className="w-full">
                                    <tbody>
                                      <tr>
                                        <td className="px-3 text-gray-700 font-medium text-sm italic">
                                          {" "}
                                          <span>DET License Fee</span>
                                        </td>
                                        <td className="px-3 text-end text-gray-700 font-medium text-sm">
                                          -AED 370
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                              <td className="px-3 text-end text-gray-700 font-medium text-base"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr className="border-y border-primary border-opacity-30 border-dashed">
                      <td colSpan={3}></td>
                      <td
                        colSpan={3}
                        className="py-4 px-3 font-semibold text-lg"
                      >
                        Net Amount Due
                      </td>
                      <td className="py-4 px-3 text-end font-semibold text-lg">
                        AED 1,130.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-10">
              <div className="text-gray-800 text-sm font-medium">
                <p>Kind regards,</p>
                <p>Mexxstates</p>
              </div>
            </div>
            <div className="mt-10">
              <div className="bg-primary bg-opacity-15 text-primary py-2 px-3 text-sm font-medium">
                <Link to="https://www.frankporter.com/">
                  www.frankporter.com
                </Link>
              </div>
            </div>
          </div>
        </div> */}

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
