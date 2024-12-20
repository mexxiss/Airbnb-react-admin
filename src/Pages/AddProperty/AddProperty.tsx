import { ArrowBack, MenuOutlined } from "@mui/icons-material";
import userImg from "../../assets/images/userImg.png";
import { useContext, useState } from "react";
import { DashboardContext } from "../../ContextApi";
import "./AddProperties.css";
import { useNavigate, useParams } from "react-router-dom";
import PropertyDetails from "../../Components/AddProperty/PropertyDetails/PropertyDetails";
import Amenities from "../../Components/AddProperty/Amenities/Amenities";
import AddPhotos from "../../Components/AddProperty/AddPhotos/AddPhotos";
import AddAddress from "../../Components/AddProperty/AddAddress/AddAddress";
import { useFormik } from "formik";
import useCreatePropertyStoreNew from "../../store/useCreatePropertyStoreNew";

interface DashboardContextType {
  setIsActiveMobileMenu: (isActive: boolean) => void;
}
const AddProperty = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const {
    handleChange,
    resetPropertyState,
    property_details,
    costs,
    address,
    title,
    description,
  } = useCreatePropertyStoreNew();

  console.log({ property_details });

  // const formik = useFormik({
  //   initialValues: initialPropertyValues,
  //   validationSchema: validationPropertySchema,
  //   onSubmit: async (values) => {
  //     try {
  //       Object.entries(values).forEach(([key, value]) => {
  //         handleChange(key as keyof typeof values, value);
  //       });
  //       console.log({ values });
  //     } catch (error) {
  //       console.error("Failed to update user details:", error);
  //       alert("Failed to update details. Please try again.");
  //     }
  //   },
  // });

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
  const { setIsActiveMobileMenu } = useContext(
    DashboardContext
  ) as DashboardContextType;

  return (
    <div className="addProperty">
      <div className="px-6 lg:px-10 py-[32px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden hover:text-primary active:text-primary"
            onClick={() => setIsActiveMobileMenu(true)}
          >
            <MenuOutlined className="!text-3xl" />
          </button>
          <h5 className="text-22 text-primary font-bold">Add Property</h5>
        </div>
        <div className="flex items-center gap-6">
          <button className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 overflow-hidden">
            <img src={userImg} className="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 h-[calc(100vh_-_110px)] overflow-y-auto pb-10">
        {/* Property Details */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  currentStep === 1
                    ? navigate(`/admin/user/${id}/add-property`)
                    : setCurrentStep(
                        currentStep === 2 ? 1 : currentStep === 4 ? 3 : 2
                      )
                }
                className="btn1 flex items-center justify-center !rounded !px-4 !h-8"
              >
                <ArrowBack className="!text-xl" />
              </button>
              <h6 className="text-lg text-primary font-semibold">
                {currentStep === 1
                  ? "Property Details"
                  : currentStep === 2
                  ? "Amenities"
                  : currentStep === 3
                  ? "Add Photos"
                  : "Address"}
              </h6>
            </div>
            <div>
              <span className="uppercase text-xs opacity-60">
                {currentStep === 1
                  ? "Step 1 of 4"
                  : currentStep === 2
                  ? "Step 2 of 4"
                  : currentStep === 3
                  ? "Step 3 of 4"
                  : "Step 4 of 4"}
              </span>
            </div>
          </div>
          <div className="mt-6">{renderStepContent(currentStep)}</div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
