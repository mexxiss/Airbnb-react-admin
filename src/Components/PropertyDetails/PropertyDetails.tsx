import { Close, KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material";
import locationPin from "../../assets/icons/locationPin.png"
import bed from "../../assets/icons/bed.png"
import bath from "../../assets/icons/bath.png"
import room from "../../assets/icons/room.png"
import guest from "../../assets/icons/guest.png"
import mapBg from "../../assets/images/mapBg.png"
import img1 from "../../assets/images/img1.png"
import Slider from "react-slick";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();

    // Use your custom hook to fetch property data

    // Slider reference
    const sliderRef = useRef<Slider | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        // add class instead style
        document.body.classList.add("lg:overflow-hidden")
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove("lg:overflow-hidden")
    };

    const Prev = () => {
        sliderRef.current?.slickPrev();
    };

    const Next = () => {
        sliderRef.current?.slickNext();
    };

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
                <div className="propertyDetail">
                    <div>
                        <ul className="flex items-center gap-1">
                            <li><Link to="/admin/properties" className="text-text2 hover:text-text1 hover:underline">Back</Link></li>
                            <li><span><KeyboardArrowRightOutlined className="!text-lg text-text2" /></span></li>
                            <li><p className="text-primary max-w-[180px] text-nowrap text-ellipsis overflow-hidden">Lorem ipsum dolor sit amet.</p></li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <div className="hidden lg:grid grid-cols-2 h-[350px] xl:h-[400px] gap-3 xl:gap-5">
                            {/* First Image */}
                            <div className="h-[350px] xl:h-[400px] rounded-2xl overflow-hidden">
                                <img src={img1} alt="Property" className="h-full w-full object-cover" />
                            </div>

                            {/* Next Images in Grid */}
                            <div className="grid grid-cols-2 gap-3 xl:gap-5 h-[350px] xl:h-[400px]">
                                <div className="h-full rounded-2xl overflow-hidden">
                                    <img src={img1} className="h-full w-full object-cover" />
                                </div>
                                <div className="h-full rounded-2xl overflow-hidden">
                                    <img src={img1} className="h-full w-full object-cover" />
                                </div>
                                <div className="h-full rounded-2xl overflow-hidden">
                                    <img src={img1} className="h-full w-full object-cover" />
                                </div>

                                {/* "View All Photos" Overlay */}
                                <div className="h-full rounded-2xl overflow-hidden relative cursor-pointer">
                                    <img src={img1} alt="Property" className="h-full w-full object-cover" />
                                    <div className="absolute top-0 left-0 w-full h-full bg-[#151F2580] flex items-center justify-center flex-col" onClick={openModal}>
                                        <p className="text-xl font-semibold text-white">4+</p>
                                        <p className="text-white">View all photos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div className="hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 lg:flex items-center justify-center z-50">
                            <div className="relative w-3/4 max-w-4xl">
                                <button
                                    className="absolute top-2 right-2 bg-primary text-white z-10 w-9 h-9 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 duration-300"
                                    onClick={closeModal}
                                >
                                    <Close className="@text-xl" />
                                </button>
                                <div className="slider relative">
                                    <button className="absolute top-1/2 -left-12 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10 bg-primary rounded-full opacity-70 text-white hover:opacity-100 duration-300" onClick={Prev}><KeyboardArrowLeftOutlined /></button>
                                    <button className="absolute top-1/2 -right-12 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10 bg-primary rounded-full opacity-70 text-white hover:opacity-100 duration-300" onClick={Next}><KeyboardArrowRightOutlined /></button>
                                    <Slider {...settings} ref={sliderRef}>
                                        <div className="h-[500px]">
                                            <img src={img1} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="h-[500px]">
                                            <img src={img1} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="h-[500px]">
                                            <img src={img1} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="h-[500px]">
                                            <img src={img1} className="h-full w-full object-cover" />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="slider lg:hidden relative">
                        <button className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10 bg-primary rounded-full opacity-70 text-white hover:opacity-100 duration-300" onClick={Prev}><KeyboardArrowLeftOutlined /></button>
                        <button className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 flex items-center justify-center z-10 bg-primary rounded-full opacity-70 text-white hover:opacity-100 duration-300" onClick={Next}><KeyboardArrowRightOutlined /></button>
                        <Slider {...settings} ref={sliderRef}>
                            <div className="h-[300px] sm:h-[400px]">
                                <img src={img1} className="h-full w-full object-cover" />
                            </div>
                            <div className="h-[300px] sm:h-[400px]">
                                <img src={img1} className="h-full w-full object-cover" />
                            </div>
                            <div className="h-[300px] sm:h-[400px]">
                                <img src={img1} className="h-full w-full object-cover" />
                            </div>
                            <div className="h-[300px] sm:h-[400px]">
                                <img src={img1} className="h-full w-full object-cover" />
                            </div>
                        </Slider>
                    </div>
                    <div className="mt-6 sm:mt-10">
                        <div>
                            <div className="lg:flex gap-10 relative">
                                <div className="w-full">
                                    <div>
                                        <div className="mb-8 text-[#1F1607]">
                                            <h5 className="text-lg md:text-xl lg:text-2xl font-medium leading-6 mb-2">Lorem ipsum dolor sit amet.</h5>
                                            <p className="flex items-start gap-2 mt-1 "><img src={locationPin} className="w-2.5 md:w-3 mt-1 md:mt-1.5" /><span className="text-sm md:text-base text-[#717171] w-full">Lorem, ipsum dolor sit amet consectetur adipisicing.</span></p>
                                        </div>
                                        <div className="mb-8 lg:hidden">
                                            {/* <BookingDetails property={property} /> */}
                                        </div>
                                        <div className="mb-4">
                                            <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
                                                <div className="flex items-center gap-2">
                                                    <img src={guest} className="w-6" />
                                                    <span>1 Guests</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img src={bed} className="w-6" />
                                                    <span>2 Beds</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img src={room} className="w-6" />
                                                    <span>2 Rooms</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img src={bath} className="w-6" />
                                                    <span>2 Bath</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[#1F1607]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. At soluta eligendi ex quisquam blanditiis repellendus porro earum libero.</p>
                                        </div>
                                        {/* <div className="mt-5">
                                        <p className="text-[#1F1607]">Additional perks include:</p>
                                        <ul className="list-disc pl-5 text-[#1F1607] mt-2">
                                            <li>Free self-parking and valet parking</li>
                                            <li>Buffet breakfast (surcharge), express check-in and a 24-hour front desk</li>
                                            <li>A front desk safe, a reception hall and luggage storage</li>
                                        </ul>
                                    </div> */}
                                        <hr className="my-6 border-[#C3C3C3]" />
                                        <div className="flex flex-col xs:flex-row gap-8">
                                            <div>
                                                <p className="text-[#1F1607] font-medium text-lg">Check in and out</p>
                                                <ul className="text-[#1F1607] mt-2">
                                                    <li>Check in: 11/2/2222</li>
                                                    <li>Check out: 11/2/2222</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-[#1F1607] font-medium text-lg">Prices</p>
                                                <ul className="text-[#1F1607] mt-2">
                                                    <li>Weekly discount: 11%</li>
                                                    <li>Monthly discount: 11%</li>
                                                    <li>Security Deposit: AED 1111</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <hr className="my-6 border-[#C3C3C3]" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xl md:text-2xl font-medium">Important Information</h4>

                                <div className="grid md:grid-cols-2 gap-6 mt-4">
                                    <div className="text-[#1F1607]">
                                        <h6 className="text-lg font-medium mb-1">Staying Rules</h6>
                                        <p className="text-sm md:text-base mb-4">
                                            The damage deposit will be taken at arrival and returned 7 - 14 days after checkout, subject to a damage inspection of the property.
                                        </p>
                                        {/* <p className="text-sm md:text-base mb-4">{property?.staying_rules}</p> */}
                                        <h6 className="text-lg font-medium mb-1 mt-4">Security Deposit</h6>
                                        <p className="text-sm md:text-base mb-4">
                                            The damage deposit will be taken at arrival and returned 7 - 14 days after checkout, subject to a damage inspection of the property.
                                        </p>
                                        {/* <p className="text-sm md:text-base mb-4">
                                        The damage deposit will be taken at arrival and returned 7 - 14 days after checkout, subject to a damage inspection of the property.
                                    </p> */}
                                        <h6 className="text-lg font-medium mb-1 mt-4">Cancellation Policy</h6>
                                        <p className="text-sm md:text-base mb-4">
                                            The damage deposit will be taken at arrival and returned 7 - 14 days after checkout, subject to a damage inspection of the property.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-6 border-[#C3C3C3]" />
                            <div>
                                <h4 className="text-xl md:text-2xl font-medium">Amenities</h4>
                                <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-5">

                                    <li className="flex flex-col items-center justify-center gap-1">
                                        <img src={bed} className="w-6 sm:w-8" alt="bed" />
                                        <span className="text-sm md:text-base">bed</span>
                                    </li>

                                    <li className="flex items-end justify-center">
                                        <button className="text-primary underline text-sm md:text-base">
                                            View all amenities
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10">
                                <div className="h-[400px] rounded-3xl overflow-hidden">
                                    <img src={mapBg} className="h-full w-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PropertyDetails