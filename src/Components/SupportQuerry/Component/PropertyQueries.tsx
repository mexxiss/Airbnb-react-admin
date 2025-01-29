import { CloseOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { Modal } from 'flowbite-react'
import { useGetPropertyQueries } from '../../../hooks/property-queries/useGetPropertyQueries'
import ErrorHandleMessage from '../../ErrorHandleMessage/ErrorHandleMessage'
import Loader from '../../Loader/Loader';
import { Pagination as MuiPagination } from "@mui/material";
import { propertyQuery } from '../../../types/propertyQuery'
import DataNotFound from '../../DataNotFound/DataNotFound'
import { getRelativeTime } from '../../../utils/common'

const PropertyQueries = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState<propertyQuery | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data: queries, isLoading, isError, error } = useGetPropertyQueries({ page: currentPage, limit: limit });
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
                                    style={{ minWidth: "300px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        User
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "220px" }}
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
                                    style={{ minWidth: "200px" }}
                                >
                                    <div className="flex items-center gap-2.5 line-clamp-1">
                                        Message
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "20px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        Created At
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="py-2 px-3"
                                    style={{ minWidth: "20px" }}
                                >
                                    <div className="flex items-center gap-2.5">
                                        Actions
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {queries?.queries?.map((query: propertyQuery, index: number) => (
                                <tr key={index} className="bg-white mb-2">
                                    <td className="py-3 px-3 rounded-l-xl">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <p className="text-sm text-[#040404] font-medium capitalize">
                                                        {query?.full_name}
                                                    </p>
                                                    <p className="text-xs text-text2 font-medium">
                                                        {query?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            {query?.phone}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 w-[400px]">
                                        <span className="text-sm text-text3 line-clamp-2">
                                            {query.message}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 w-[400px]">
                                        <span className="text-sm text-text3 line-clamp-2">
                                            {getRelativeTime(query.createdAt)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                                        <button onClick={() => { setShowModal(true); setSelectedQuery(query) }} className="text-[#bb9e6c] hover:text-primaryDark duration-300">
                                            <VisibilityOutlined className="!text-xl " />
                                        </button>
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


            <Modal show={showModal} onClose={() => setShowModal(false)} className="!p-0">
                <Modal.Body className="!p-0">
                    <div className="flex items-center justify-between px-5 py-3">
                        <h6 className="text-lg font-medium text-primary">
                            Property Query
                        </h6>
                        <button onClick={() => setShowModal(false)}>
                            <CloseOutlined className="!text-lg" />
                        </button>
                    </div>
                    <div className="px-5 py-4 border-t">
                        <div className="">
                            <div className="mt-2">
                                <p className="text-sm lg:text-base text-text3">
                                    <span className="text-text1 font-medium">Message:</span> {selectedQuery?.message}
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <button
                                    className="btn1 rounded-full h-10 !px-8 tracking-wider"
                                    onClick={() => { window.location.href = `tel:${selectedQuery?.phone}`; setShowModal(false) }}
                                >
                                    Call
                                </button>
                                <button
                                    className="btn1 rounded-full h-10 !px-8 tracking-wider"
                                    onClick={() => { if (selectedQuery?.email) window.location.href = `mailto:${selectedQuery.email}`; setShowModal(false) }}
                                >
                                    Mail
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PropertyQueries