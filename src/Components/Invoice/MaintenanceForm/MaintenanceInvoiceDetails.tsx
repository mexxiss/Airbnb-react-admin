import React, { useContext } from 'react'
import ComponentHeader from '../../ComponentHeader/ComponentHeader'
import { DashboardContext } from '../../../ContextApi';
import userImg from "../../../assets/images/userImg.png";
import property from "../../../assets/images/property.png";
import { Link } from 'react-router-dom';
import { KeyboardArrowLeftOutlined } from '@mui/icons-material';

interface DashboardContextType {
    setIsActiveMobileMenu: (isActive: boolean) => void;
}
const MaintenanceInvoiceDetails = () => {
    const { setIsActiveMobileMenu } = useContext(
        DashboardContext
    ) as DashboardContextType;
    return (
        <div>
            <ComponentHeader
                title="Invoice Details"
                linkText="Invoice List"
                linkTo="/admin/invoices"
                userImage={userImg}
                onMenuClick={() => setIsActiveMobileMenu(true)}
            />

            <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
                <div className="">
                    <div className="">
                        <Link
                            to="/admin/invoices"
                            className="w-max flex items-center justify-center uppercase text-2xl font-medium"
                        >
                            <KeyboardArrowLeftOutlined className="text-gray-600" />{" "}
                            qwertyuio
                        </Link>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="p-8 rounded-2xl shadow-lg bg-white">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h5 className="text-2xl font-bold text-gray-500">Logo</h5>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className="bg-primary bg-opacity-15 text-primary py-2 px-3 rounded-full text-xs font-medium">
                                            TECHNICAL SERVICES
                                        </span>
                                        <p className="text-lg font-medium">
                                            INV-FURNISHING-UAXXUB
                                        </p>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-x-6 gap-y-8">
                                    <div>
                                        <div className="text-gray-800 text-sm">
                                            <p className="font-semibold">
                                                Amandeep Sekhon
                                            </p>
                                            <p className="mt-1">P.O. Box 109426 Dubai</p>
                                            <div className="flex mt-1 gap-2">
                                                <span className="font-medium">Phone:</span>
                                                <p className=""> +919803486900</p>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <span className="font-medium">Date:</span>
                                                <p className="">
                                                    2025/01/06
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-800 text-sm">
                                            <div className="flex gap-2">
                                                <span className="font-medium">Client Name:</span>
                                                <p className="">inder</p>
                                            </div>
                                            <div className="flex mt-1 gap-2">
                                                <span className="font-medium">Month:</span>
                                                <p className="">2025-01</p>
                                            </div>
                                            <div className="flex mt-1 gap-2">
                                                <span className="font-medium">Property:</span>
                                                <p className="">FURNISHED VILLA|READY TO MOVE|4 CHEQUES</p>
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
                                                <th
                                                    colSpan={2}
                                                    className="py-3 text-left px-3 min-w-[450px]"
                                                >
                                                    Essential Works*
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table className='w-full border border-primary border-collapse'>
                                                        <thead>
                                                            <th className="border border-primary px-4 py-2" colSpan={2}>
                                                                Item / Service
                                                            </th>
                                                            <th className="w-max text-nowrap border border-primary px-4 py-2">Quantity</th>
                                                            <th className="w-max text-nowrapborder border-primary px-4 py-2">Price/unit</th>
                                                            <th className="w-max text-nowrap border border-primary px-4 py-2">Price/Summary</th>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={2} className="border border-primary px-4 py-2">Masson Works</td>
                                                                <td className="border border-primary px-4 py-2 text-center">2</td>
                                                                <td className="border border-primary px-4 py-2 text-center">49.00</td>
                                                                <td className="border border-primary px-4 py-2 text-center">98.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className='text-right px-4 py-2 font-semibold'>Sub Total</td>
                                                                <td className='border border-primary text-right px-4 py-2 font-semibold'>98.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className='text-right px-4 py-2 font-semibold'>Vat 5%</td>
                                                                <td className='border border-primary text-right px-4 py-2 font-semibold'>4.90</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className='text-right px-4 py-2 font-semibold'>Total</td>
                                                                <td className='border border-primary text-right px-4 py-2 font-semibold'>102.90</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className='text-right px-4 py-2 font-semibold'>Recieved Amount</td>
                                                                <td className='border border-primary text-right px-4 py-2 font-semibold'>102.90</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className='text-right px-4 py-2 font-semibold'>TOTAL AMOUNT OWED TO FP</td>
                                                                <td className='border border-primary text-right px-4 py-2 font-semibold'>0.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="mt-10">
                                <div>
                                    <h6 className='font-semibold'>BANK DETAILS</h6>
                                    <div className='mt-2'>
                                        <div className="flex gap-2 text-sm mt-0.5">
                                            <span className="font-medium">Account Name: </span>
                                            <p className="">Frank Porter Vacation Homes Rental LLC</p>
                                        </div>
                                        <div className="flex gap-2 text-sm mt-0.5">
                                            <span className="font-medium">Account Number: </span>
                                            <p className="">0553194976001</p>
                                        </div>
                                        <div className="flex gap-2 text-sm mt-0.5">
                                            <span className="font-medium">Bank: </span>
                                            <p className="">National Bank of Ras Al Khaimah</p>
                                        </div>
                                        <div className="flex gap-2 text-sm mt-0.5">
                                            <span className="font-medium">IBAN:</span>
                                            <p className="">AE400400000553194976001
                                            </p>
                                        </div>
                                        <div className="flex gap-2 text-sm mt-0.5">
                                            <span className="font-medium">SWIFT CODE: </span>
                                            <p className="">NRAKAEAK
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h4 className='font-semibold'>Essential Works Photos (1/2)</h4>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <div className='border border-primary p-2 rounded bg-primary bg-opacity-10'>
                                        <img src={property} className='w-full object-contain max-h-[260px]' />
                                        <p className='text-center text-sm mt-2'>Lorem, ipsum dolor.</p>
                                    </div>
                                    <div className='border border-primary p-2 rounded bg-primary bg-opacity-10'>
                                        <img src={property} className='w-full object-contain max-h-[260px]' />
                                        <p className='text-center text-sm mt-2'>Lorem, ipsum dolor.</p>
                                    </div>
                                    <div className='border border-primary p-2 rounded bg-primary bg-opacity-10'>
                                        <img src={property} className='w-full object-contain max-h-[260px]' />
                                        <p className='text-center text-sm mt-2'>Lorem, ipsum dolor.</p>
                                    </div>
                                    <div className='border border-primary p-2 rounded bg-primary bg-opacity-10'>
                                        <img src={property} className='w-full object-contain max-h-[260px]' />
                                        <p className='text-center text-sm mt-2'>Lorem, ipsum dolor.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-14">
                                <div className="text-gray-800 text-sm font-medium">
                                    <p>Kind regards,</p>
                                    <p>Mexxstates</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="bg-primary bg-opacity-15 text-primary py-2 px-3 text-sm font-medium">
                                    <Link to="https://www.frankporter.com/">
                                        www.frankporter.com
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MaintenanceInvoiceDetails