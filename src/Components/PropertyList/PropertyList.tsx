import React, { useContext, useEffect, useState } from "react";
import userImg from "../../assets/images/userImg.png";
import house1 from "../../assets/images/house1.png";
import UpDown from "../../assets/icons/UpDown.png";
import trashIcon from "../../assets/icons/trashIcon.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import {
  Clear,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { ToggleSwitch } from "flowbite-react";
import { Link } from "react-router-dom";
import { DashboardContext, DashboardContextType } from "../../ContextApi";
import { useFetchProperties } from "../../hooks/react-query/properties-query";
import { PropertyResponse } from "../../types/propertiesTypes";
import { filterAndSortProperties } from "./utils/helpers";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import { formatAmountWithCurrency } from "../../utils/common";
import { useUpdateProperties } from "../../hooks/react-query/properties-query/useUpdateProperties";
import Flatpickr from "react-flatpickr";

const PropertyList = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [showMonths, setShowMonths] = useState(2);
  const [propertiesList, setpropertiesList] = useState<PropertyResponse[]>([]);
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useFetchProperties(page, 10);
  const { mutate: updateProperty, isPending: togglePending } =
    useUpdateProperties();


  useEffect(() => {
    const updateShowMonths = () => {
      setShowMonths(window.innerWidth < 768 ? 1 : 2);
    };

    updateShowMonths(); // Initial call

    window.addEventListener("resize", updateShowMonths);

    return () => {
      window.removeEventListener("resize", updateShowMonths);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setpropertiesList(data.data);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const filteredSortedProperties = filterAndSortProperties({
    propertiesList,
    searchTerm,
    sortField,
    sortOrder,
  });

  const itemsPerPage = 10; // Number of users per page
  const startUserIndex = (page - 1) * itemsPerPage + 1;
  const endUserIndex = Math.min(
    page * itemsPerPage,
    data?.totalProperties || 0
  );

  // Handle status change
  const handleToggleStatus = async (id: string, statusStr: string) => {
    const updates = { status: statusStr === "Active" ? "Inactive" : "Active" };
    try {
      updateProperty(
        { id, updates },
        {
          onSuccess: (updatedUser) => {
            // Update the query cache after the mutation succeeds
            const updatedData = propertiesList?.map(
              (property: PropertyResponse) =>
                property._id === updatedUser?.data?._id
                  ? updatedUser?.data
                  : property
            );
            setpropertiesList(updatedData);
          },
          onError: (error) => {
            console.error("Error toggling user status:", error);
          },
        }
      );
    } catch (error) {
      console.log({ error });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error instanceof Error) {
    return <ErrorHandleMessage msg={error?.message} />;
  }

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
          <h5 className="text-22 text-primary font-bold">Properties</h5>
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
        <div>
          <div className="flex items-center justify-between mb-6">
            <ul className="flex gap-2">
              {/* <li
                className={`text-sm py-1.5 px-4 tracking-wider border rounded-full cursor-pointer ${
                  isActive === "Commercial Rent"
                    ? "font-medium bg-primary border-pribg-primary text-white"
                    : "border-border1 text-text2"
                }`}
                onClick={() => setIsActive("Commercial Rent")}
              >
                Commercial Rent
              </li> */}
            </ul>
          </div>
          <p className="text-lg text-[#040404] font-medium">
            Total Properties (<span>{data?.totalProperties}</span>)
          </p>
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
                options={{
                  mode: "range", // Enables range selection
                  dateFormat: "d-m-Y", // Format of the displayed date
                  showMonths: showMonths, // Show two calendars side by side
                }}
                value={dates}
                onChange={(selectedDates: Date[]) => setDates(selectedDates)}
                className="w-full border !border-gray-300 rounded-lg p-2 text-sm text-gray-600"
                placeholder="DD-MM-YYYY – DD-MM-YYYY"
              />
            </div>
            <div className="bg-white px-3 flex items-center justify-between text-gray-600 rounded-md border border-gray-300">
              Status:
              <select className="border-none bg-transparent rounded-lg py-1 px-2 focus:ring-0 w-full">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <button className="w-full btn1 !bg-transparent !text-red-600 border border-red-600 hover:!bg-red-600 hover:!text-white flex items-center justify-center gap-1"><Clear className="!text-lg" /> Clear</button>
            </div>
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
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-2.5">
                        Name <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "220px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Address <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "150px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Listed by <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "130px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Price Per Night <img src={UpDown} className="w-2" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-3"
                      style={{ minWidth: "140px" }}
                    >
                      <div className="flex items-center gap-2.5">
                        Status <img src={UpDown} className="w-2" />
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
                <tbody className="">
                  {filteredSortedProperties.map((property, index) => (
                    <tr className="bg-white mb-2" key={index}>
                      <td className=" py-4 px-3 pl-6 rounded-l-xl">
                        <div>
                          <div className="flex items-center gap-3">
                            <img
                              src={house1}
                              className="border-2 border-[#E8E1F6] rounded-lg w-16 h-12 object-cover"
                              alt=""
                            />
                            <Link
                              to={"#"}
                              className="text-sm text-[#040404] font-medium hover:text-primary duration-300 block)]"
                            >
                              {property.title}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className=" py-4 px-3">
                        <span className="text-sm text-[#040404]">
                          {`${property.address.building_no}, ${property.address.street}, ${property.address.city}, ${property.address.country}`}
                        </span>
                      </td>
                      <td className=" py-4 px-3">
                        <span className="text-sm text-[#040404] font-medium">
                          air bnb
                        </span>
                      </td>
                      <td className=" py-4 px-3">
                        <span className="text-sm text-[#040404] font-medium">
                          {formatAmountWithCurrency(
                            property.costs.prices.price_per_night || 0,
                            property?.costs?.currency || "AED"
                          )}
                        </span>
                      </td>
                      <td className=" py-4 px-3">
                        <div className="">
                          <ToggleSwitch
                            checked={property.status === "Active"}
                            label={property.status}
                            onChange={() =>
                              handleToggleStatus(property._id, property.status)
                            }
                            className="*:focus:!shadow-none *:focus:!ring-0 toggleBtn flex items-center"
                          />
                        </div>
                      </td>
                      <td className=" py-4 px-3 text-center pr-6 rounded-r-xl">
                        <button className="mx-auto">
                          <img src={trashIcon} alt="" className="w-5 grayImg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#8B8B8B">
                  Showing {startUserIndex} - {endUserIndex} of{" "}
                  {data?.totalProperties} Properties
                </p>
                <div>
                  <ul className="flex items-center gap-3">
                    <li>
                      <button
                        className="text-[#8B8B8B]"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      >
                        <KeyboardArrowLeftOutlined />
                      </button>
                    </li>
                    {Array.from(
                      { length: data?.totalPages || 0 },
                      (_, index) => (
                        <li key={index}>
                          <button
                            className={`${page === index + 1
                              ? "text-white bg-primary"
                              : "text-text2"
                              } w-10 h-10 rounded-full flex items-center justify-center`}
                            onClick={() => setPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                    {/* <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        1
                      </button>
                    </li>
                    <li>
                      <button className="text-white bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                        2
                      </button>
                    </li> */}
                    {/* <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        3
                      </button>
                    </li>
                    <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        4
                      </button>
                    </li> */}
                    {/* <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        ...
                      </button>
                    </li> */}
                    {/* <li>
                      <button className="text-text2 w-10 h-10 rounded-full flex items-center justify-center">
                        10
                      </button>
                    </li> */}
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
      </div>
    </div>
  );
};

export default PropertyList;
