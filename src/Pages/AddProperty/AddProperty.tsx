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

const AddProperty = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
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

  return (
    <div className="addProperty">
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
        <h5 className="text-22 text-primary font-bold mb-5">Add Property</h5>
        {/* Property Details */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  currentStep === 1
                    ? navigate(
                      // `/admin/user/${id}/add-property`
                      -1
                    )
                    : setCurrentStep(
                      currentStep === 2 ? 1 : currentStep === 4 ? 3 : 2
                    )
                }
                className=""
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
