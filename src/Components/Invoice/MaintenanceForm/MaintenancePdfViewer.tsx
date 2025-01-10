import { PDFViewer } from "@react-pdf/renderer";
import { useNavigate, useParams } from "react-router-dom";
import MaintenanceInvoicePdf from "./MaintenanceInvoicePdf";
import { useFetchMaintenanceById } from "../../../hooks/react-query/revenue";
import DataHandler from "../../ErrorHandleMessage/DataHandler";
import CustomButton from "../../CustomButton/CustomButton";

const MaintenancePdfViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the invoice ID from the route params
  const {
    data: currentInvoice,
    isLoading,
    error,
    isError,
  } = useFetchMaintenanceById({
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
          navigate("/admin/maintenance-invoices", { replace: true });
        }}
      />
      {currentInvoice && (
        <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
          <MaintenanceInvoicePdf invoice={currentInvoice} />
        </PDFViewer>
      )}
    </div>
  );
};

export default MaintenancePdfViewer;
