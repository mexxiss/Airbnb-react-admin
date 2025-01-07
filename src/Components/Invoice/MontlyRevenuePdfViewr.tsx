import { PDFViewer } from "@react-pdf/renderer";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import MonthlyInvoicePDFWithTable from "./MonthlyInvoicePDFWithTable";
import { useFetchRevenueList } from "../../hooks/react-query/revenue";
import { IMonthlyInvoice } from "../../types/invoiceTypes";

const MontlyRevenuePdfViewr = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetchRevenueList();

  if (isLoading) {
    return <DataHandler loadingStates={[isLoading]} errorStates={[]} />;
  }

  if (isError || !data) {
    return (
      <DataHandler
        loadingStates={[]}
        errorStates={[{ isError: true, error: error || new Error("No data") }]}
      />
    );
  }

  const invoiceObj = data?.data?.find(
    (invoice: IMonthlyInvoice) => invoice._id === id
  );

  if (!invoiceObj) {
    return (
      <DataHandler
        loadingStates={[]}
        errorStates={[{ isError: true, error: new Error("Invoice not found") }]}
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
      <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
        <MonthlyInvoicePDFWithTable invoice={invoiceObj} />
      </PDFViewer>
    </div>
  );
};

export default MontlyRevenuePdfViewr;
