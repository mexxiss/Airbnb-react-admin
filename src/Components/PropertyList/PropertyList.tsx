import React, { useEffect, useRef, useState } from "react";
import UpDown from "../../assets/icons/UpDown.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import {
  Clear,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  Visibility,
} from "@mui/icons-material";
import { ToggleSwitch } from "flowbite-react";
import { Link } from "react-router-dom";
import { useFetchProperties } from "../../hooks/react-query/properties-query";
import { PropertyResponse } from "../../types/propertiesTypes";
import { filterAndSortProperties } from "./utils/helpers";
import { formatAmountWithCurrency } from "../../utils/common";
import { useUpdateProperties } from "../../hooks/react-query/properties-query/useUpdateProperties";
import Flatpickr from "react-flatpickr";
import { useToggle } from "../../hooks/custom-hook/useToggle";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import DataNotFound from "../DataNotFound/DataNotFound";
import { Pagination } from "@mui/material";

const PropertyList = () => {
  const refComp = useRef<Flatpickr | null>(null);
  const [isOpen, toggleOpen] = useToggle();
  const [dates, setDates] = useState<Date[]>([]);
  const [status, setStatus] = useState("");
  const [showMonths, setShowMonths] = useState(2);
  const [propertiesList, setpropertiesList] = useState<PropertyResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useFetchProperties({
    dates,
    searchTerm,
    limit,
    page: currentPage,
    status,
  });

  const { mutate: updateProperty, isPending: togglePending } =
    useUpdateProperties();

  useEffect(() => {
    const updateShowMonths = () => {
      setShowMonths(window.innerWidth < 768 ? 1 : 2);
    };

    updateShowMonths();
    window.addEventListener("resize", updateShowMonths);
    return () => window.removeEventListener("resize", updateShowMonths);
  }, []);

  useEffect(() => {
    if (data) {
      setpropertiesList(data.data);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredSortedProperties = filterAndSortProperties({
    propertiesList,
    searchTerm,
    sortField,
    sortOrder,
  });

  const startUserIndex = (currentPage - 1) * limit + 1;
  const endUserIndex = Math.min(
    currentPage * limit,
    data?.totalProperties || 0
  );

  const handleToggleStatus = async (id: string, statusStr: string) => {
    const updates = { status: statusStr === "Active" ? "Inactive" : "Active" };
    try {
      updateProperty(
        { id, updates },
        {
          onSuccess: (updatedUser) => {
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

  const [addressField, setAddressField] = useState<
    "city" | "area" | "street" | "country"
  >("city");

  const handleAddressSort = () => {
    const nextField = {
      city: "area",
      area: "street",
      street: "country",
      country: "city",
    }[addressField] as "city" | "area" | "street" | "country";

    setAddressField(nextField);
    handleSort(`address.${nextField}`);
  };

  const handleClear = () => {
    toggleOpen(false);
    setSearchTerm("");
    setDates([]);
    setStatus("");
    setCurrentPage(1);
    refComp.current?.flatpickr?.clear();
  };

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
        <div className="flex items-center justify-between border-b border-[#00858e5e] pb-5">
          <h5 className="text-22 text-primary font-bold">Properties</h5>

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
        </div>
        <p className="text-lg text-[#040404] font-medium mt-5">
          Total Properties{" "}
          {!filteredSortedProperties?.length ? (
            ""
          ) : (
            <span>({data?.totalProperties})</span>
          )}
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
              ref={refComp}
              options={{
                mode: "range", // Enables range selection
                dateFormat: "d-m-Y", // Format of the displayed date
                showMonths: showMonths, // Show two calendars side by side
              }}
              value={dates}
              onChange={(selectedDates: Date[]) => {
                setDates(selectedDates);
                toggleOpen(selectedDates.length > 0);
              }}
              className="w-full border !border-gray-300 rounded-lg p-2 text-sm text-gray-600"
              placeholder="DD-MM-YYYY – DD-MM-YYYY"
            />
          </div>
          <div className="bg-white px-3 flex items-center justify-between text-gray-600 rounded-md border border-gray-300">
            <span className="font-medium">Status:</span>
            <select
              value={status || ""}
              onChange={(e) => {
                setStatus(e.target.value);
                toggleOpen(true);
              }}
              className="border-none bg-transparent rounded-lg py-1 px-2 focus:ring-0 w-full"
            >
              <option value="all">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
          {!filteredSortedProperties?.length ? (
            <DataNotFound message="Property" />
          ) : (
            <div>
              <div className="relative overflow-x-auto">
                <table
                  className="w-full border-separate min-w-full"
                  style={{ borderSpacing: "0 10px" }}
                >
                  <thead className="text-sm text-[#8B8B8B] font-medium">
                    <tr>
                      <th scope="col" className="py-2 px-3">
                        <div className="flex items-center gap-2.5">#</div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "270px" }}
                        onClick={() => handleSort("title")}
                      >
                        <div className="flex items-center gap-2.5 text-nowrap">
                          Name <img src={UpDown} className="w-2" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "220px" }}
                      >
                        <div className="flex items-center gap-2.5 text-nowrap">
                          Address{" "}
                          <img
                            src={UpDown}
                            className="w-2"
                            onClick={handleAddressSort}
                          />
                        </div>
                      </th>
                      {/* <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "150px" }}
                      >
                        <div className="flex items-center gap-2.5 text-nowrap">
                          Listed by
                        </div>
                      </th> */}
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "130px" }}
                      >
                        <div className="flex items-center gap-2.5 text-nowrap">
                          Price Per Night
                          <img
                            src={UpDown}
                            className="w-2"
                            onClick={() =>
                              handleSort("costs.prices.price_per_night")
                            }
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "140px" }}
                      >
                        <div className="flex items-center gap-2.5 text-nowrap">
                          Status
                          {/* <img src={UpDown} className="w-2" /> */}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-2 px-3"
                        style={{ minWidth: "100px" }}
                      >
                        <div className="flex items-center gap-2.5 text-nowrap">
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {filteredSortedProperties?.map((property, index) => {
                      return (
                        <tr className="bg-white mb-2" key={index}>
                          <td className="py-3 px-3 rounded-l-xl">
                            #️{startUserIndex + index}
                          </td>
                          <td className=" py-3 px-3 ">
                            <div>
                              <div className="flex items-center gap-3">
                                <img
                                  src={property.property_images[0]?.img_url}
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
                          <td className=" py-3 px-3">
                            <span className="text-sm text-[#040404]">
                              {`${property.address.building_no}, ${property.address.street}, ${property.address.city}, ${property.address.country}`}
                            </span>
                          </td>
                          {/* <td className=" py-3 px-3">
                            <span className="text-sm text-[#040404] font-medium">
                              air bnb
                            </span>
                          </td> */}
                          <td className=" py-3 px-3">
                            <span className="text-sm text-[#040404] font-medium">
                              {formatAmountWithCurrency(
                                property.costs.prices.price_per_night || 0,
                                property?.costs?.currency || "AED"
                              )}
                            </span>
                          </td>
                          <td className=" py-3 px-3">
                            <div className="">
                              <ToggleSwitch
                                checked={property.status === "Active"}
                                label={property.status}
                                onChange={() =>
                                  handleToggleStatus(
                                    property._id,
                                    property.status
                                  )
                                }
                                className="*:focus:!shadow-none *:focus:!ring-0 toggleBtn flex items-center"
                              />
                            </div>
                          </td>
                          <td className=" py-3 px-3 text-center rounded-r-xl">
                            <Link
                              to={`/admin/property-details/${property._id}`}
                              className="mx-auto"
                            >
                              <Visibility className="text-primary" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#8B8B8B">
                    Showing {startUserIndex} - {endUserIndex} of{" "}
                    {data?.totalProperties} Properties
                  </p>
                  <Pagination
                    count={data?.totalPages || 1}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#666",
                        "&.Mui-selected": {
                          backgroundColor: "#bb9e6c",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#a68d5f",
                          },
                        },
                        "&:not(.Mui-selected):hover": {
                          backgroundColor: "rgba(187, 158, 108, 0.1)",
                        },
                      },
                    }}
                    shape="circular"
                    size="large"
                    // showFirstButton
                    // showLastButton
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DataHandler>
  );
};

export default PropertyList;
