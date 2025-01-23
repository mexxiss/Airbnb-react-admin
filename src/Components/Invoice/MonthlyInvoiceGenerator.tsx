import React, { useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { BlobProvider } from "@react-pdf/renderer";
import { createInvoice, uploadFile } from "../../services/apiServices";
import MonthlyInvoicePDFWithTable from "./MonthlyInvoicePDFWithTable";
import { IMonthlyInvoice } from "../../types/invoiceTypes";
import CustomButton from "../CustomButton/CustomButton";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { showToast } from "../../utils/toaster/toastWrapper";

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
        statement_type: "revenue",
        net_amount_to_pay: invoiceData?.summary?.totalIncome ?? 0,
        property: invoiceData?.property_id ?? "",
        received_amount: invoiceData?.summary?.netAmountDue ?? 0,
        title: `Invoice #${invoiceData?.invoiceDetails?.invoiceNumber}`,
        total_amount: invoiceData?.summary?.totalIncome ?? 0,
      };

      await createInvoice(invoicePayload);
    } catch (error) {
      console.error("Error generating/uploading invoice:", error);
    } finally {
      setIsGenerating(false);
      showToast("success", "Statement Genrated Successfully!");
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
    <div className="">
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
          <Tooltip title={"View Invoice PDF"}>
            <Link
              to={`/invoice/monthly-revenue-pdf-view/${invoiceData?._id}`}
              target="_blank"
            >
              <VisibilityIcon
                sx={{
                  fontSize: { xs: 14, sm: 18 },
                }}
              />
            </Link>
          </Tooltip>
        ) : (
          <Link
            to={`/invoice/monthly-revenue-pdf-view/${invoiceData?._id}`}
            target="_blank"
          >
            View PDF
          </Link>
        )}

        {isUseIcons ? (
          <Tooltip
            title={isGenerating ? "Generating..." : "Generate Statment "}
          >
            <IconButton
              onClick={handleGenerateAndUploadPDF}
              sx={{ p: { xs: 0, sm: 0.5 } }}
            >
              <NoteAddIcon
                sx={{
                  fontSize: { xs: 14, sm: 18 },
                }}
              />
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
                sx={{ p: { xs: 0, sm: 0.5 } }}
                onClick={handleDownload}
                disabled={!blob} // Disable the button if the blob is not available
                color="primary"
              >
                <DownloadForOfflineIcon
                  sx={{
                    fontSize: { xs: 14, sm: 18 },
                  }}
                />
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
