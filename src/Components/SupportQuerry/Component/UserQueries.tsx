import { VisibilityOutlined } from "@mui/icons-material"
import { contactQueries } from "../../../types/contactQueries"
import { Link } from "react-router-dom"
import { useGetContactSupport } from "../../../hooks/react-query/contact-support/useGetContactSupport";
import ErrorHandleMessage from "../../ErrorHandleMessage/ErrorHandleMessage";
import Loader from "../../Loader/Loader";
import DataNotFound from "../../DataNotFound/DataNotFound";
import { useState } from "react";
import { Pagination as MuiPagination } from "@mui/material";

const UserQueries = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const { data: queries, isLoading, isError, error } = useGetContactSupport({page: currentPage, limit: limit});

    const startUserIndex = (currentPage - 1) * limit + 1;
    const endUserIndex = Math.min(
        currentPage * limit,
        queries?.totalCount || 0
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    if (isLoading) return <Loader />;
    if (isError && error instanceof Error)
        return <ErrorHandleMessage msg={error.message} />;

    return (
        <>
            {queries?.length === 0 ?
                <DataNotFound message="Queries" />
                :
                <div className="relative overflow-x-auto">
                    <table
                        className="w-full border-separate min-w-full"
                        style={{ borderSpacing: "0 10px" }}
                    >
                        <thead className="text-sm text-[#8B8B8B] font-medium">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "200px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        User
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "200px" }}
                                >
                                    <div
                                        className="flex items-center gap-2.5"
                                    >
                                        Number
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "120px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        Total Queries
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "120px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        Pending
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "120px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        Status
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "60px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        Actions
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {queries?.queries?.map((query: contactQueries, index: number) => (
                                <tr key={index} className="bg-white mb-2">
                                    <td className="py-3 px-3 rounded-l-xl">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={query?.user?.profile_img}
                                                    className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 object-cover"
                                                    alt=""
                                                />
                                                <div>
                                                    <p className="text-sm text-[#040404] font-medium capitalize">
                                                        {query?.user?.first_name} {query?.user?.last_name}
                                                    </p>
                                                    <p className="text-xs text-text2 font-medium">
                                                        {query?.user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            {query?.user?.phone}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            {query?.count}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            {query?.pendingCount}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-left max-w-[60px]">
                                        <span
                                            className={`text-sm px-2 py-1 rounded ${query?.pendingCount === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                        >
                                            {query?.pendingCount === 0 ? 'Done' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                                        <Link to={`/admin/support/chat?name=${query?.user?.first_name} ${query?.user?.last_name}&id=${query.user?._id}`} className="text-[#bb9e6c] hover:text-primaryDark duration-300">
                                            <VisibilityOutlined className="!text-xl " />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-[#8B8B8B]">
                                Showing {startUserIndex} - {endUserIndex} of{" "}
                                {queries?.totalCount} queries
                            </p>
                            <div className="flex overflow-x-auto sm:justify-end">
                                <MuiPagination
                                    count={queries?.totalPages || 1}
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
                </div>
            }
        </>
    )
}

export default UserQueries