import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import axios from "axios";
import InvoicePDF from "./InvoicePdf";
import { invoiceData } from "./utils/mock/staticData";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { createInvoice, uploadFile } from "../../services/apiServices";

const InvoiceGeneratorNew = () => {
  const handleUploadAndCreateInvoice = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, `${invoiceData.invoiceNumber}.pdf`);

      const uploadResponse = await uploadFile(
        "invoice",
        formData as unknown as File
      );

      // Create the invoice on the server

      await createInvoice({
        url: uploadResponse.imageUrl,
        net_amount_to_pay: invoiceData.totalAmount,
        property: invoiceData.id,
        received_amount: invoiceData.subTotal,
        title: "hi",
        total_amount: invoiceData.totalAmount,
      });
      console.log("Invoice uploaded and created successfully!");
    } catch (error) {
      console.error("Error during upload or invoice creation:", error);
    }
  };

  return (
    <BlobProvider
      document={<InvoicePDF invoice={invoiceData} currentStatus={"paid"} />}
    >
      {({ blob, url, loading }) => (
        <Tooltip title="Download">
          <IconButton
            onClick={() => {
              if (blob) {
                handleUploadAndCreateInvoice(blob);
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <DownloadIcon />
            )}
          </IconButton>
        </Tooltip>
      )}
    </BlobProvider>
  );
};

export default InvoiceGeneratorNew;
