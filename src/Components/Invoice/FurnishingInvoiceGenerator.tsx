import React, { useState } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import FurnishingInvoicePdf from "./FurnishingInvoicePdf";
import { createInvoice, uploadFile } from "../../services/apiServices";
import { IconButton, Tooltip } from "@mui/material";
import { FurnishingResponseInvoice } from "../../types/furnishingTypes";
import CustomButton from "../CustomButton/CustomButton";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DeleteOutline } from "@mui/icons-material";

interface IFurnishingInvoiceGenerator {
  isUseIcons?: boolean;
  invoiceData?: FurnishingResponseInvoice;
}
const FurnishingInvoiceGenerator = ({
  invoiceData,
  isUseIcons = true,
}: IFurnishingInvoiceGenerator) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);

  const handleGenerateAndUploadPDF = async () => {
    if (!blob) {
      console.error("PDF blob not generated yet.");
      return;
    }

    setIsGenerating(true);
    try {
      const file = new File([blob], `${invoiceData?.invoiceNumber}.pdf`, {
        type: "application/pdf",
      });

      const uploadResponse = await uploadFile("furnishing", file);

      const invoicePayload = {
        url: uploadResponse.imageUrl,
        statement_type: "furnishing",
        net_amount_to_pay: invoiceData?.receivedAmount ?? 0,
        property:
          typeof invoiceData?.property_id === "string"
            ? invoiceData.property_id
            : "",
        received_amount: invoiceData?.receivedAmount ?? 0,
        title: `Invoice #${invoiceData?.invoiceNumber}`,
        total_amount: invoiceData?.totalFurnishingCost ?? 0,
      };

      await createInvoice(invoicePayload);
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
    anchor.download = `invoice-${invoiceData?.invoiceNumber}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="">
      <BlobProvider document={<FurnishingInvoicePdf invoice={invoiceData!} />}>
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

      <div className="flex gap-2">
        {isUseIcons ? (
          <Tooltip title={"View Invoice PDF"}>
            <Link
              to={`/invoice/furnishing-pdf-view/${invoiceData?._id}`}
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
            to={`/invoice/furnishing-pdf-view/${invoiceData?._id}`}
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
            download={`invoice-${invoiceData?.invoiceNumber}.pdf`}
            className={` bg-gray-600 text-white rounded-lg hover:bg-gray-700 ${!blob ? "disabled:opacity-50 pointer-events-none" : ""
              }`}
          >
            Download PDF
          </a>
        )}
        <Tooltip title="Download">
          <span>
            <IconButton
              sx={{ p: { xs: 0, sm: 0.5 } }}
              disabled={!blob} // Disable the button if the blob is not available
              className="!text-red-400 !text-lg hover:text-red-600 duration-300"
            >
              <DeleteOutline
                sx={{
                  fontSize: { xs: 14, sm: 18 },
                }}
              />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default FurnishingInvoiceGenerator;
