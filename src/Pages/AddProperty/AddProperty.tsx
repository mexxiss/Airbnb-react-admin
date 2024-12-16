import { KeyboardArrowLeftOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/AddProperty/Sidebar/Sidebar";
import PropertyDetails from "../../Components/AddProperty/PropertyDetails/PropertyDetails";
import "./AddProperties.css";
import Amenities from "../../Components/AddProperty/Amenities/Amenities";
import AddPhotos from "../../Components/AddProperty/AddPhotos/AddPhotos";
import AddAddress from "../../Components/AddProperty/AddAddress/AddAddress";

const AddProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStickyActive, setIsStickyActive] = useState(false);
  const navigate = useNavigate();

  const renderStepContent = (step: any) => {
    switch (step) {
      case 1:
        return <PropertyDetails setCurrentStep={setCurrentStep} />;
      case 2:
        return <Amenities setCurrentStep={setCurrentStep} />;
      case 3:
        return <AddPhotos setCurrentStep={setCurrentStep} />;
      case 4:
        return <AddAddress setCurrentStep={setCurrentStep} />;
      default:
        return <PropertyDetails setCurrentStep={setCurrentStep} />;
    }
  };

  useEffect(() => {
    const handleScrollOrResize = () => {
      const windowWidth = window.innerWidth;
      const currentScrollY = window.scrollY;

      if (windowWidth > 576) {
        if (currentScrollY > 125) {
          setIsStickyActive(true);
        } else {
          setIsStickyActive(false);
        }
      } else {
        setIsStickyActive(true);
      }
    };

    handleScrollOrResize();

    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen addProperty">
      <div className="px-4 sm:px-6 xl:container mx-auto">
        <div className="border-b border-[#BCE6E0] py-6 hidden sm:block">
          <h5 className="text-[22px] text-[#3B4251] font-medium">
            Add Property
          </h5>
        </div>
        <div className={`my-5 hidden sm:block`}>
          <button
            className="flex items-center lg:text-xl text-[#454545] font-medium"
            onClick={() =>
              currentStep === 1
                ? navigate("/admin/properties")
                : setCurrentStep(
                    currentStep === 2 ? 1 : currentStep === 4 ? 3 : 2
                  )
            }
          >
            <KeyboardArrowLeftOutlined className="lg:!text-[26px]" />{" "}
            <span>Back</span>
          </button>
        </div>
        <div
          className={`duration-300  fixed w-full z-10 left-0 top-0 py-3 bg-white shadow-md sm:px-6 px-4 flex lg:hidden items-center justify-between ${
            isStickyActive ? "" : "-translate-y-full"
          }`}
        >
          <button
            className="flex items-center lg:text-xl text-[#454545] font-medium"
            onClick={() =>
              currentStep === 1
                ? navigate("/")
                : setCurrentStep(
                    currentStep === 2 ? 1 : currentStep === 4 ? 3 : 2
                  )
            }
          >
            <KeyboardArrowLeftOutlined className="lg:!text-[26px]" />{" "}
            <span>Back</span>
          </button>
          <span className={`text-primary font-medium text-lg `}>
            {currentStep === 1
              ? "Property Details"
              : currentStep === 2
              ? "Amenities"
              : currentStep === 3
              ? "Add Photos"
              : "Address"}
          </span>
          <span className="text-xs uppercase text-[#8B8B8B]">
            {currentStep === 1
              ? "Step 1 of 4"
              : currentStep === 2
              ? "Step 2 of 4"
              : currentStep === 3
              ? "Step 3 of 4"
              : "Step 4 of 4"}
          </span>
        </div>
        <div className={`lg:flex ${isStickyActive && "pt-20 sm:pt-[40px]"}`}>
          <div
            className={`lg:min-w-[264px] lg:max-w-[264px] hidden sm:block ${
              isStickyActive && "!hidden !lg:block"
            }`}
          >
            <Sidebar currentStep={currentStep} />
          </div>
          <div className="lg:pl-16 w-full sm:mt-10 lg:mt-0">
            <div className="lg:h-[calc(100vh_-_176px)] lg:pr-5 overflow-auto">
              {renderStepContent(currentStep)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
