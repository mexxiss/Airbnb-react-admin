import React, { useState } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePdf";
import { invoiceData, mockInvoice } from "./utils/mock/staticData";
import {
  createInvoice,
  createMonthlyInvoice,
  uploadFile,
} from "../../services/apiServices";
import { Button } from "@mui/material";
import MonthlyInvoicePDFWithTable from "./MonthlyInvoicePDFWithTable";
import { IMonthlyInvoice } from "../../types/invoiceTypes";

const InvoiceGeneratorNew = ({ isEdited = true }: { isEdited?: any }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [invoiceDataHandle, setInvoiceDataHandle] =
    useState<IMonthlyInvoice | null>(null);

  const handleGenerateAndUploadPDF = async () => {
    if (!isEdited) {
      console.error("PDF blob not generated yet.");
      const invoiceMonthalyResponse = await createMonthlyInvoice(mockInvoice);
      setInvoiceDataHandle(invoiceMonthalyResponse?.data);
    }

    if (!blob) {
      console.error("PDF blob not generated yet.");
      return;
    }

    setIsGenerating(true);
    try {
      const file = new File(
        [blob],
        `${invoiceDataHandle?.invoiceDetails?.invoiceNumber}.pdf`,
        {
          type: "application/pdf",
        }
      );

      const uploadResponse = await uploadFile("invoice", file);

      const invoicePayload = {
        url: uploadResponse.imageUrl,
        net_amount_to_pay: mockInvoice?.summary?.totalIncome ?? 0,
        property: invoiceData.id,
        received_amount: invoiceData.subTotal,
        title: `Invoice #${invoiceData.invoiceNumber}`,
        total_amount: invoiceData.totalAmount,
      };

      const invoiceResponse = await createInvoice(invoicePayload);

      console.log(
        "Invoice Created:",
        {
          invoiceDataHandle,
        },
        { invoiceResponse }
      );
    } catch (error) {
      console.error("Error generating/uploading invoice:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Monthly Invoice Generator</h1>
      <BlobProvider
        document={<MonthlyInvoicePDFWithTable invoice={mockInvoice} />}
      >
        {({ blob, loading, error }) => {
          if (error) {
            console.error("Error generating PDF blob:", error);
            return null;
          }

          if (!loading && blob) {
            setBlob(blob);
          }

          return null;
        }}
      </BlobProvider>

      <div className="flex gap-4">
        <Button
          onClick={handleGenerateAndUploadPDF}
          disabled={isGenerating || !blob}
          variant="contained"
          color="primary"
        >
          {isGenerating ? "Generating..." : "Generate & Upload PDF"}
        </Button>

        <a
          href={blob ? URL.createObjectURL(blob) : "#"}
          download={`invoice-${invoiceData.invoiceNumber}.pdf`}
          className={`px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 ${
            !blob ? "disabled:opacity-50 pointer-events-none" : ""
          }`}
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default InvoiceGeneratorNew;
