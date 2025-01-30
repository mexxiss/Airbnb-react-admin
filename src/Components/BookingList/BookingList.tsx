import { CloseOutlined, KeyboardArrowLeftOutlined, VisibilityOutlined } from '@mui/icons-material'
import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useGetBookings } from '../../hooks/react-query/bookings/useGetBookings'
import { Link, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import ErrorHandleMessage from '../ErrorHandleMessage/ErrorHandleMessage'
import { Pagination as MuiPagination } from "@mui/material";
import EllipsisTooltip from '../EllipsisTooltip/EllipsisTooltip'
import NoDataImg from "../../assets/images/No_data.png";

interface Booking {
    book_details: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        guests: number;
        promo_code: string;
    };
    access_card_keys: string;
    source: string;
    checkin_date: string;
    checkout_date: string;
    nights_count: number;
    reservationCode: string;
    cost_details: {
        net_charges: number;
        stay_charges: number;
        tourism_tax: number;
        vat_tax: number;
    };
}
const BookingList = () => {
    const [openModal, setOpenModal] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const { property } = useParams()

    useEffect(() => {
        if (openModal) {
            setTimeout(() => setIsVisible(true), 100);
        } else {
            setIsVisible(false);
        }
    }, [openModal]);

    const { data: bookings, isLoading, isError, error } = useGetBookings({ page: currentPage, limit: limit, property: property || '' });

    if (isLoading) return <Loader />;
    if (isError && error instanceof Error)
        return <ErrorHandleMessage msg={error.message} />;
    console.log(bookings);

    const startUserIndex = (currentPage - 1) * limit + 1;
    const endUserIndex = Math.min(
        currentPage * limit,
        bookings.totalCount || 0
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };
    return (
        <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
            <div className="flex items-center justify-between border-b border-primary pb-5 mb-5">
                <div className='flex items-center gap-2'>
                    <Link to="/admin/properties">
                        <KeyboardArrowLeftOutlined className="!text-3xl" />
                    </Link><h5 className="text-22 text-primary font-bold">{bookings.property_name} </h5>
                </div>
                <Link
                    to={`/admin/property-details/${property}`}
                    className="btn1 flex items-center justify-center"
                >
                    View Property
                </Link>
            </div>
            <div className="mt-5">

                {bookings.bookings?.length === 0 ?
                    <div className="w-full relative z-10 flex flex-col items-center justify-center pt-10">
                        <img src={NoDataImg} className="max-w-[400px]" />
                        <p className="text-2xl sm:text-3xl text-gray-500 font-medium">
                            No Booking Yet!
                        </p>
                    </div>
                    :
                    <div>
                        <div className='mb-4'>
                            <p className='text-text3 text-lg font-medium'>Booking List {bookings.bookings?.length !== 0 && <span>({bookings.bookings?.length})</span>}</p>
                        </div>
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
                                            style={{ minWidth: "30px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                #
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-2 px-3"
                                            style={{ minWidth: "120px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                Reservation
                                            </div>
                                        </th>
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
                                            style={{ minWidth: "120px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                Number
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-2 px-3"
                                            style={{ minWidth: "120px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                Source
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-2 px-3"
                                            style={{ minWidth: "120px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                Check-in
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-2 px-3"
                                            style={{ minWidth: "120px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                Check-out
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-2 px-3"
                                            style={{ minWidth: "120px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                Nights
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-2 px-3"
                                            style={{ minWidth: "120px" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                Price
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
                                    {bookings?.bookings?.map((booking: Booking, index: number) => (
                                        <tr className="bg-white mb-2" key={index}>
                                            <td className="py-3 px-3 rounded-l-xl">
                                                <span className="text-text3 text-center font-medium">
                                                    #{index + 1}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="text-text3 text-center font-medium text-sm">
                                                    <EllipsisTooltip title={booking.reservationCode} width='150px' />
                                                </span>
                                            </td>
                                            <td className="py-3 px-3 ">
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <p className="text-sm text-[#040404] font-medium capitalize">
                                                                {booking.book_details?.first_name} {booking.book_details?.last_name}
                                                            </p>
                                                            <p className="text-xs text-text2 font-medium">
                                                                {booking.book_details?.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="text-text3 text-center font-medium">
                                                    {booking.book_details?.phone_number}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="text-text3 text-center font-medium">
                                                    {booking.source}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="text-text3 text-center font-medium">
                                                    {new Date(booking.checkin_date).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="text-text3 text-center font-medium">
                                                    {new Date(booking.checkout_date).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="text-text3 text-center font-medium">
                                                    {booking.source === "owner" ? Math.ceil((new Date(booking.checkout_date).getTime() - new Date(booking.checkin_date).getTime()) / (1000 * 60 * 60 * 24)) : booking.nights_count}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="text-text3 text-center font-medium">
                                                    {booking.cost_details?.net_charges || 0}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                                                <button className="text-[#bb9e6c] hover:text-primaryDark duration-300" onClick={() => { setOpenModal(true); setSelectedBooking(booking) }}>
                                                    <VisibilityOutlined className="!text-xl " />
                                                </button>
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
                                    {bookings?.totalCount} queries
                                </p>
                                <div className="flex overflow-x-auto sm:justify-end">
                                    <MuiPagination
                                        count={bookings?.totalPages || 1}
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
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}
                className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <Modal.Body className=''>
                    <div className='flex items-center justify-between'>
                        <h4 className="text-2xl font-medium text-primary">Booking Details</h4>
                        <button className="" onClick={() => setOpenModal(false)}><CloseOutlined className="!text-xl" /></button>
                    </div>
                    <div className="">
                        <div className='mt-5'>
                            <h6 className="uppercase text-gray-600 font-medium tracking-wide">
                                {selectedBooking?.source === "owner" ? "Block Stay Details" : "Guest Details"}
                            </h6>
                            <hr className="border-primary my-2" />
                            <div>
                                <ul className="flex flex-col gap-1">
                                    <li className="flex items-center justify-between text-gray-700">
                                        <span>Name:</span>
                                        <span className="font-medium">{selectedBooking?.book_details?.first_name} {selectedBooking?.book_details?.last_name}</span>
                                    </li>
                                    <li className="flex items-center justify-between text-gray-700">
                                        <span>Email:</span>
                                        <span className="font-medium">{selectedBooking?.book_details?.email}</span>
                                    </li>
                                    <li className="flex items-center justify-between text-gray-700">
                                        <span>Phone:</span>
                                        <span className="font-medium">{selectedBooking?.book_details?.phone_number}</span>
                                    </li>
                                    {selectedBooking?.source !== "owner" &&
                                        <><li className="flex items-center justify-between text-gray-700">
                                            <span>Guest:</span>
                                            <span className="font-medium">{selectedBooking?.book_details?.guests}</span>
                                        </li>
                                            <li className="flex items-center justify-between text-gray-700">
                                                <span>Promo Code:</span>
                                                <span className="font-medium">{selectedBooking?.book_details?.promo_code || "-"}</span>
                                            </li>
                                        </>
                                    }
                                </ul>
                                {selectedBooking?.source === "owner" &&
                                    <div className='mt-3'>
                                        <p className='text-text3'>* {selectedBooking.access_card_keys}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mt-5">
                            <h6 className="uppercase text-gray-600 font-medium tracking-wide">Reservation</h6>
                            <hr className="border-primary my-2" />
                            <ul className="flex flex-col gap-1">
                                <li className="flex items-center justify-between text-gray-700">
                                    <span>Reservation:</span>
                                    <span className="font-medium">{selectedBooking?.reservationCode}</span>
                                </li>
                                <li className="flex items-center justify-between text-gray-700">
                                    <span>Check-in:</span>
                                    <span className="font-medium">{new Date(selectedBooking?.checkin_date || '').toLocaleDateString()}</span>
                                </li>
                                <li className="flex items-center justify-between text-gray-700">
                                    <span>Check-out:</span>
                                    <span className="font-medium">{new Date(selectedBooking?.checkin_date || '').toLocaleDateString()}</span>
                                </li>
                                <li className="flex items-center justify-between text-gray-700">
                                    <span>Nights:</span>
                                    <span className="font-medium">{selectedBooking?.source === "owner" ? Math.ceil((new Date(selectedBooking?.checkout_date).getTime() - new Date(selectedBooking?.checkin_date).getTime()) / (1000 * 60 * 60 * 24)) : selectedBooking?.nights_count}</span>
                                </li>
                                <li className="flex items-center justify-between text-gray-700">
                                    <span>Source:</span>
                                    <span className="font-medium">{selectedBooking?.source}</span>
                                </li>
                            </ul>
                        </div>
                        {selectedBooking?.source !== "owner" &&
                            <div className="mt-5">
                                <h6 className="uppercase text-gray-600 font-medium tracking-wide">Finances</h6>
                                <hr className="border-primary my-2" />
                                <ul className="flex flex-col gap-1">
                                    <li className="flex items-center justify-between text-gray-700">
                                        <span>Stay Charges:</span>
                                        <span className="font-medium">{selectedBooking?.cost_details.stay_charges}</span>
                                    </li>
                                    <li className="flex items-center justify-between text-gray-700">
                                        <span>Tourism Tax:</span>
                                        <span className="font-medium">{selectedBooking?.cost_details.tourism_tax}</span>
                                    </li>
                                    <li className="flex items-center justify-between text-gray-700">
                                        <span>VAT Tax:</span>
                                        <span className="font-medium">{selectedBooking?.cost_details.vat_tax}</span>
                                    </li>
                                    <li className="flex items-center justify-between text-gray-700 text-xl">
                                        <span>Total Amount:</span>
                                        <span className="font-medium">{selectedBooking?.cost_details.net_charges || 0}</span>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default BookingList