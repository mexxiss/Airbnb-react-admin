import { MenuOutlined } from '@mui/icons-material'
import userImg from "../../assets/images/userImg.png";
import property from "../../assets/images/property.png";
import { useContext } from 'react';
import { DashboardContext } from '../../ContextApi';

interface DashboardContextType {
    setIsActiveMobileMenu: (isActive: boolean) => void;
}
const UserDetails = () => {
    const { setIsActiveMobileMenu } = useContext(
        DashboardContext
    ) as DashboardContextType;
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
                    <h5 className="text-22 text-primary font-bold">User Details</h5>
                </div>
                <div className="flex items-center gap-6">
                    <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
                        <img src={userImg} className="w-full h-full object-cover" alt="" />
                    </button>
                </div>
            </div>

            <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
                {/* User Details */}
                <div>
                    <h6 className="text-lg text-primary font-semibold">Personal Details</h6>
                    <div className='mt-3'>
                        <form action="">
                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        First Name
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter First Name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Last Name
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Last Name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Email
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Address
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Address"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Phone Number
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Phone Number"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Secondary Email
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Secondary Email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Secondary Phone Number
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Secondary Phone Number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bank Details */}
                <div className='mt-10'>
                    <h6 className="text-lg text-primary font-semibold">Bank Details</h6>
                    <div className='mt-3'>
                        <form action="">
                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Account Name
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Account Name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Bank Name
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Bank Name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Currency
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Currency"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        IBAN
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter IBAN"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Account Number
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Account Number"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[15px] text-[#5d5d5d]">
                                        Bank Address
                                    </label>
                                    <div className="border-[#8B8B8B] border rounded relative py-2 mt-1 bg-white">
                                        <input
                                            type="text"
                                            className="py-0 leading-4 text-[#040404] placeholder:text-[#8B8B8B] border-none w-full"
                                            placeholder="Enter Bank Address"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Listed properties */}
                <div className='mt-10'>
                    <h6 className="text-lg text-primary font-semibold">Listed Properties (10)</h6>
                    <div className='grid xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 mt-5 gap-4'>
                        <div className="border border-primary flex flex-col gap-2 sm:gap-3 relative">
                            <a className="absolute w-full h-full" href="/user-panel/calender"></a>
                            <div className="">
                                <img src={property} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full ">
                                <div className="px-2 pb-2 sm:pb-3 w-full">
                                    <div>
                                        <h6 className="sm:text-lg md:text-xl text-gray-800 w-[calc(100%_-_10px)] text-nowrap overflow-hidden text-ellipsis">My New Property</h6>
                                    </div>
                                    <hr className="w-full my-2 sm:my-3 border-primary border-opacity-50" /><div className="flex items-center justify-between">
                                        <span className="text-gray-500 text-sm tracking-wide">Studio</span><div className="text-sm flex items-center gap-1 text-primary"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium !text-lg css-q7mezt" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckCircleIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"></path></svg>Active</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails