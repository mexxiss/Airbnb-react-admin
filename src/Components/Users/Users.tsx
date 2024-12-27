import React, { useContext, useEffect, useRef, useState } from "react";
import userImg from "../../assets/images/userImg.png";
import UpDown from "../../assets/icons/UpDown.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Clear,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { DashboardContext } from "../../ContextApi/index";
import {
  useDeleteUser,
  userFetchQuery,
} from "../../hooks/react-query/users-queries";
import { User } from "../../types/usersTypes";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import { IconButton } from "@mui/material";
import { ToggleSwitch } from "flowbite-react";
import { filterAndSortUsers } from "./utils/helpers";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { useToggle } from "../../hooks/custom-hook/useToggle";

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}

const Users: React.FC = () => {
  const refComp = useRef<Flatpickr | null>(null);
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

  const [isOpen, toggleOpen] = useToggle();
  const [dates, setDates] = useState<Date[]>([]);
  const [showMonths, setShowMonths] = useState(2);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = userFetchQuery({
    dates,
    searchTerm,
    isDeleted: status,
    limit,
    page,
  });

  const { mutate: toggleDelete, isPending: togglePending } = useDeleteUser();

  useEffect(() => {
    const updateShowMonths = () =>
      setShowMonths(window.innerWidth < 768 ? 1 : 2);
    updateShowMonths();
    window.addEventListener("resize", updateShowMonths);
    return () => window.removeEventListener("resize", updateShowMonths);
  }, []);

  useEffect(() => {
    if (data) setUsersList(data.data);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleToggleDelete = (id: string) => {
    toggleDelete(id, {
      onSuccess: (updatedUser) => {
        setUsersList((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser?.data?._id ? updatedUser?.data : user
          )
        );
      },
      onError: (err) => console.error("Error toggling user status:", err),
    });
  };

  const handleClear = () => {
    toggleOpen(false);
    setSearchTerm("");
    setDates([]);
    setStatus("");
    refComp.current?.flatpickr?.clear();
  };

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error)
    return <ErrorHandleMessage msg={error.message} />;

  const filteredUsers = filterAndSortUsers({
    usersList,
    searchTerm,
    sortField,
    sortOrder,
  });

  const startUserIndex = (page - 1) * limit + 1;
  const endUserIndex = Math.min(page * limit, data?.totalUsers || 0);

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
          <h5 className="text-22 text-primary font-bold">Users</h5>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative bg-white rounded-lg py-1.5 pl-10 pr-5 hidden sm:block border border-gray-300">
            <input
              type="text"
              placeholder="Search"
              className="p-0 placeholder:text-gray-600 text-gray-600 text-sm border-none lg:min-w-[350px]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <img
              src={searchIcon}
              className="w-4 brightness-75 absolute left-4 top-1/2 -translate-y-1/2"
              alt=""
            />
          </div>
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>
      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading users</p>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg text-[#040404] font-medium">
                Total users (<span>{data?.totalUsers}</span>)
              </p>
              <Link
                to={"/admin/user/new-user"}
                className="btn1 flex items-center justify-center"
              >
                Add User
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 sm:flex gap-2 sm:gap-4 mt-4">
              <div className="relative bg-white rounded-lg py-1.5 pl-10 pr-5 sm:hidden border border-gray-300">
                <input
                  type="text"
                  placeholder="Search"
                  className="p-0 placeholder:text-gray-600 text-gray-600 text-sm border-none w-full"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <img
                  src={searchIcon}
                  className="w-4 brightness-50 absolute left-4 top-1/2 -translate-y-1/2"
                  alt=""
                />
              </div>
              <div className="">
                <Flatpickr
                  ref={refComp}
                  options={{
                    mode: "range", // Enables range selection
                    dateFormat: "d-m-Y", // Format of the displayed date
                    showMonths: showMonths, // Show two calendars side by side
                  }}
                  value={dates || []}
                  onChange={(selectedDates: Date[]) => {
                    setDates(selectedDates);
                    toggleOpen(selectedDates.length > 0);
                  }}
                  className="w-full border !border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                  placeholder="DD-MM-YYYY – DD-MM-YYYY"
                />
              </div>
              <div className="bg-white px-3 flex items-center justify-between text-gray-600 rounded-md border border-gray-300">
                Status:
                <select
                  value={status || ""}
                  className="border-none bg-transparent rounded-lg py-1 px-2 focus:ring-0 w-full"
                  onChange={(e) => {
                    setStatus(e.target.value);
                    toggleOpen(true);
                  }}
                >
                  <option value="all">All</option>
                  <option value="false">Active</option>
                  <option value="true">Inactive</option>
                </select>
              </div>
              {isOpen && (
                <div className="sm:col-span-2">
                  <button
                    onClick={() => handleClear()}
                    className="w-full btn1 !bg-transparent !text-red-600 border border-red-600 hover:!bg-red-600 hover:!text-white flex items-center justify-center gap-1"
                  >
                    <Clear className="!text-lg" /> Clear
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="relative overflow-x-auto">
                <table
                  className="w-full border-separate min-w-full"
                  style={{ borderSpacing: "0 10px" }}
                >
                  <thead className="text-sm text-[#8B8B8B] font-medium">
                    <tr>
                      <th
                        scope="col"
                        className="py-2 px-3 pl-6"
                        style={{ minWidth: "270px" }}
                        onClick={() => handleSort("first_name")}
                      >
                        <div className="flex items-center gap-2.5">
                          User <img src={UpDown} className="w-2" alt="" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "150px" }}
                      >
                        <div className="flex items-center gap-2.5">
                          Email
                          <img src={UpDown} className="w-2" alt="" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "130px" }}
                        onClick={() => handleSort("area")}
                      >
                        <div className="flex items-center gap-2.5">
                          Location
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "100px" }}
                        onClick={() => handleSort("isDeleted")}
                      >
                        <div className="flex items-center gap-2.5">
                          Status <img src={UpDown} className="w-2" alt="" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "150px" }}
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center gap-2.5">
                          Member since{" "}
                          <img src={UpDown} className="w-2" alt="" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3 pr-6"
                        style={{ minWidth: "100px" }}
                      >
                        <div className="flex items-center gap-2.5">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers?.map((user) => (
                      <tr className="bg-white mb-2" key={user._id}>
                        <td className="py-4 px-3 pl-6 rounded-l-xl">
                          <div>
                            <div className="flex items-center gap-3">
                              <img
                                src={userImg}
                                className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 object-cover"
                                alt=""
                              />
                              <div>
                                <p className="text-sm text-[#040404] font-medium">
                                  {user.first_name} {user.last_name}
                                </p>
                                <p className="text-xs text-text2 font-medium">
                                  {user.email[0]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <span className="text-sm text-[#040404] flex flex-col">
                            {user.email[0]}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <span className="text-sm text-[#040404]">
                            {user.address.area}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <span className="text-sm text-[#040404]">
                            {user.isDeleted ? "Inactive" : "Active"}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <span className="text-sm text-[#040404]">
                            {new Date(user?.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-4 px-3 text-center pr-6 rounded-r-xl flex gap-1 items-center justify-center">
                          <td className=" py-4 px-3">
                            <div className="">
                              <ToggleSwitch
                                disabled={togglePending}
                                checked={!user.isDeleted}
                                onChange={() => handleToggleDelete(user._id)}
                                className="*:focus:!shadow-none *:focus:!ring-0 toggleBtn flex items-center"
                              />
                            </div>
                          </td>
                          <Link to={`/admin/user/${user._id}`}>
                            <IconButton>
                              <VisibilityIcon className="text-[#bb9e6c]" />
                            </IconButton>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#8B8B8B]">
                    Showing {startUserIndex} - {endUserIndex} of{" "}
                    {data?.totalUsers} users
                  </p>
                  <div>
                    <ul className="flex items-center gap-3">
                      <li>
                        <button
                          className="text-[#8B8B8B]"
                          onClick={() =>
                            setPage((prev) => Math.max(prev - 1, 1))
                          }
                        >
                          <KeyboardArrowLeftOutlined />
                        </button>
                      </li>
                      {Array.from(
                        { length: data?.totalPages || 0 },
                        (_, index) => (
                          <li key={index}>
                            <button
                              className={`${
                                page === index + 1
                                  ? "text-white bg-[#040404]"
                                  : "text-text2"
                              } w-10 h-10 rounded-full flex items-center justify-center`}
                              onClick={() => setPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        )
                      )}
                      <li>
                        <button
                          className="text-[#8B8B8B]"
                          onClick={() =>
                            setPage((prev) =>
                              Math.min(prev + 1, data?.totalPages || 1)
                            )
                          }
                        >
                          <KeyboardArrowRightOutlined />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
