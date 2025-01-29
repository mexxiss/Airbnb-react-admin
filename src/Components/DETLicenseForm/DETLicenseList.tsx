import React, { useEffect, useRef, useState } from "react";
import { useToggle } from "../../hooks/custom-hook/useToggle";
import { LicenseRequestPayload } from "../../types/licenseTypes";
import { useFetchQueryLicense } from "../../hooks/react-query/create-license/useFetchQueryLicense";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { filterAndSortLicenses } from "./utils/filterAndSortLicenses";
import { IconButton, Pagination as MuiPagination } from "@mui/material";
import searchIcon from "../../assets/icons/searchIcon.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Clear } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataNotFound from "../DataNotFound/DataNotFound";
import Flatpickr from "react-flatpickr";
import EditIcon from "@mui/icons-material/Edit";

const statusClasses: Record<string, string> = {
  paid: "text-sm px-2 py-1 rounded bg-green-100 text-green-700",
  unpaid: "text-sm px-2 py-1 rounded bg-red-100 text-red-700",
  pending: "text-sm px-2 py-1 rounded bg-yellow-100 text-yellow-700",
  expired: "text-sm px-2 py-1 rounded bg-gray-100 text-gray-700",
};

const DETLicenseList = () => {
  const refComp = useRef<Flatpickr | null>(null);
  const [isOpen, toggleOpen] = useToggle();
  const [dates, setDates] = useState<Date[]>([]);
  const [showMonths, setShowMonths] = useState(2);
  const [licensesList, setLicensesList] = useState<LicenseRequestPayload[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useFetchQueryLicense({
    dates,
    searchTerm,
    status: status,
    limit,
    page: currentPage,
  });

  useEffect(() => {
    const updateShowMonths = () =>
      setShowMonths(window.innerWidth < 768 ? 1 : 2);
    updateShowMonths();
    window.addEventListener("resize", updateShowMonths);
    return () => window.removeEventListener("resize", updateShowMonths);
  }, []);

  useEffect(() => {
    if (data) setLicensesList(data?.data?.licenses || []);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSort = (field: string) => {
    setSortField(field);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleClear = () => {
    toggleOpen(false);
    setSearchTerm("");
    setDates([]);
    setStatus("");
    setCurrentPage(1);
    refComp.current?.flatpickr?.clear();
  };

  const filteredLicenses = filterAndSortLicenses({
    licensesList,
    searchTerm,
    sortField,
    sortOrder,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const startUserIndex = (currentPage - 1) * limit + 1;
  const endUserIndex = Math.min(
    currentPage * limit,
    data?.data?.totalLicenses || 0
  );

  return (
    <DataHandler loadingStates={[isLoading]} errorStates={[{ isError, error }]}>
      <div>
        <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading Licenses</p>
          ) : (
            <div>
              <div className="flex items-center justify-between border-b border-[#00858e5e] pb-5">
                <h5 className="text-22 text-primary font-bold">
                  License Lists
                </h5>

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
              <div className="flex items-center justify-between mt-5">
                <p className="text-lg text-[#040404] font-medium">
                  Total Licenses{" "}
                  {!filteredLicenses?.length ? (
                    ""
                  ) : (
                    <span>({data?.data?.totalLicenses})</span>
                  )}
                </p>
                <Link
                  to={"/admin/create-license"}
                  className="btn1 flex items-center justify-center"
                >
                  Add License
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
                  <span className="font-medium">Status:</span>
                  <select
                    value={status || ""}
                    className="border-none bg-transparent rounded-lg py-1 px-2 focus:ring-0 w-full"
                    onChange={(e) => {
                      setStatus(e.target.value);
                      toggleOpen(true);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">unpaid</option>
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
                {!filteredLicenses?.length ? (
                  <DataNotFound message="license" />
                ) : (
                  <>
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
                              onClick={() => handleSort("licenseNumber")}
                            >
                              <div className="flex items-center gap-2.5">
                                License Number{" "}
                                {sortField === "licenseNumber" &&
                                  (sortOrder === "asc" ? "↑" : "↓")}
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="py-2 px-3"
                              style={{ minWidth: "150px" }}
                            >
                              <div
                                className="flex items-center gap-2.5"
                                onClick={() => handleSort("price")}
                              >
                                Price{" "}
                                {sortField === "price" &&
                                  (sortOrder === "asc" ? "↑" : "↓")}
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="py-2 px-3"
                              style={{ minWidth: "150px" }}
                            >
                              <div
                                className="flex items-center gap-2.5"
                                onClick={() => handleSort("issueDate")}
                              >
                                Issue Date{" "}
                                {sortField === "issueDate" &&
                                  (sortOrder === "asc" ? "↑" : "↓")}
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="py-2 px-3"
                              style={{ minWidth: "130px" }}
                              onClick={() => handleSort("expiryDate")}
                            >
                              <div className="flex items-center gap-2.5">
                                Expiry Date{" "}
                                {sortField === "expiryDate" &&
                                  (sortOrder === "asc" ? "↑" : "↓")}
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="py-2 px-3"
                              style={{ minWidth: "100px" }}
                            >
                              <div className="flex items-center gap-2.5">
                                Status
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLicenses?.map((license, i) => (
                            <tr className="bg-white mb-2" key={license?._id}>
                              <td className="py-3 px-3 rounded-l-xl">
                                #️{startUserIndex + i}
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-sm text-[#040404] flex flex-col">
                                  {license?.licenseNumber || "N/A"}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-sm text-[#040404] flex flex-col">
                                  {license?.price || "N/A"}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-sm text-[#040404] text-center">
                                  {new Date(
                                    license?.issueDate || ""
                                  )?.toLocaleDateString() || "N/A"}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-sm text-[#040404]">
                                  {new Date(
                                    license?.expiryDate || ""
                                  )?.toLocaleDateString() || "N/A"}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={
                                    statusClasses[license.status] ||
                                    "text-sm px-2 py-1 rounded bg-gray-100 text-gray-700"
                                  }
                                >
                                  {license.status}
                                </span>
                              </td>

                              <td className="py-3 px-3 text-center rounded-r-xl flex gap-1">
                                <Link
                                  to={`/admin/view-license/${license?._id}`}
                                >
                                  <IconButton>
                                    <VisibilityIcon className="text-[#bb9e6c]" />
                                  </IconButton>
                                </Link>
                                <Link
                                  to={`/admin/edit-license/${license?._id}`}
                                >
                                  <IconButton>
                                    <EditIcon className="text-[#bb9e6c]" />
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
                          {data?.data?.totalLicenses} users
                        </p>
                        <div className="flex overflow-x-auto sm:justify-end">
                          <MuiPagination
                            count={data?.data?.totalPages || 1}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="circular"
                            size="large"
                            // showFirstButton
                            // showLastButton
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
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DataHandler>
  );
};

export default DETLicenseList;
