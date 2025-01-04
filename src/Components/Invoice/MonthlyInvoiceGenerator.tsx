import React, { useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { BlobProvider } from "@react-pdf/renderer";
import { createInvoice, uploadFile } from "../../services/apiServices";
import MonthlyInvoicePDFWithTable from "./MonthlyInvoicePDFWithTable";
import { IMonthlyInvoice } from "../../types/invoiceTypes";
import CustomButton from "../CustomButton/CustomButton";
import { IconButton, Tooltip } from "@mui/material";

interface IMonthlyInvoiceGenerator {
  isUseIcons?: boolean;
  invoiceData?: IMonthlyInvoice;
}
const MonthlyInvoiceGenerator = ({
  invoiceData,
  isUseIcons = false,
}: IMonthlyInvoiceGenerator) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);

  const handleGenerateAndUploadPDF = async () => {
    if (!blob) {
      console.error("PDF blob not generated yet.");
      return;
    }

    setIsGenerating(true);
    try {
      const file = new File(
        [blob],
        `${invoiceData?.invoiceDetails?.invoiceNumber}.pdf`,
        {
          type: "application/pdf",
        }
      );

      const uploadResponse = await uploadFile("invoice", file);

      const invoicePayload = {
        url: uploadResponse.imageUrl,
        net_amount_to_pay: invoiceData?.summary?.totalIncome ?? 0,
        property: invoiceData?.property_id ?? "",
        received_amount: invoiceData?.summary?.netAmountDue ?? 0,
        title: `Invoice #${invoiceData?.invoiceDetails?.invoiceNumber}`,
        total_amount: invoiceData?.summary?.totalIncome ?? 0,
      };

      const invoiceResponse = await createInvoice(invoicePayload);

      console.log("Invoice Created:", { invoiceResponse });
    } catch (error) {
      console.error("Error generating/uploading invoice:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!blob) {
      console.error("Blob is not available for download.");
      return;
    }
    const downloadUrl = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = `invoice-${invoiceData?.invoiceDetails?.invoiceNumber}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="p-6">
      <BlobProvider
        document={<MonthlyInvoicePDFWithTable invoice={invoiceData!} />}
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
        {isUseIcons ? (
          <Tooltip
            title={isGenerating ? "Generating..." : "Generate Statment "}
          >
            <IconButton onClick={handleGenerateAndUploadPDF}>
              <NoteAddIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <CustomButton
            isDisabled={isGenerating || !blob}
            isLoading={isGenerating}
            isTooltip={false}
            text={isGenerating ? "Generating..." : "Generate Statment "}
            tooltipText="Tooltip content"
            onClick={handleGenerateAndUploadPDF}
            className="bg-primary text-white text-sm rounded-lg hover:bg-primary-dark"
          />
        )}

        {isUseIcons ? (
          <Tooltip title="Download">
            <span>
              <IconButton
                onClick={handleDownload}
                disabled={!blob} // Disable the button if the blob is not available
                color="primary"
              >
                <DownloadForOfflineIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <a
            href={blob ? URL.createObjectURL(blob) : "#"}
            download={`invoice-${invoiceData?.invoiceDetails?.invoiceNumber}.pdf`}
            className={` bg-gray-600 text-white rounded-lg hover:bg-gray-700 ${
              !blob ? "disabled:opacity-50 pointer-events-none" : ""
            }`}
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default MonthlyInvoiceGenerator;
