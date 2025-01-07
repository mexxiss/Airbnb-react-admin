import { PDFViewer } from "@react-pdf/renderer";
import { useNavigate, useParams } from "react-router-dom";
import FurnishingInvoicePdf from "./FurnishingInvoicePdf";
import CustomButton from "../CustomButton/CustomButton";
import { useFetchFurnishingDataById } from "../../hooks/react-query/revenue/useFetchFurnishingDataById";
import DataHandler from "../ErrorHandleMessage/DataHandler";

const FurnishingPdfViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: currentInvoice,
    isLoading,
    error,
    isError,
  } = useFetchFurnishingDataById({
    id: id || "",
  });

  if (isLoading || isError) {
    return (
      <DataHandler
        loadingStates={[isLoading]}
        errorStates={[{ isError, error }]}
      />
    );
  }

  return (
    <div className="h-screen">
      <CustomButton
        text="Go Back"
        tooltipText="Back to Invoice"
        onClick={() => {
          navigate("/admin/invoices", { replace: true });
        }}
      />
      {currentInvoice && (
        <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
          <FurnishingInvoicePdf invoice={currentInvoice} />
        </PDFViewer>
      )}
    </div>
  );
};

export default FurnishingPdfViewer;
