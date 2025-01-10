import React, { useState } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import MaintenanceInvoicePdf from "./MaintenanceInvoicePdf";
import { IconButton, Tooltip } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { MaintenanceResponseValues } from "../../../types/maintenanceTypes";
import { createInvoice, uploadFile } from "../../../services/apiServices";
import CustomButton from "../../CustomButton/CustomButton";

interface IMaintenanceInvoiceGenerator {
  isUseIcons?: boolean;
  invoiceData?: MaintenanceResponseValues;
}

const MaintenanceInvoiceGenerator = ({
  invoiceData,
  isUseIcons = true,
}: IMaintenanceInvoiceGenerator) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);

  const handleGenerateAndUploadPDF = async () => {
    if (!blob) {
      console.error("PDF blob not generated yet.");
      return;
    }

    setIsGenerating(true);
    try {
      const file = new File([blob], `${invoiceData?.taxInvoiceNumber}.pdf`, {
        type: "application/pdf",
      });

      const uploadResponse = await uploadFile("maintenance", file);

      const invoicePayload = {
        url: uploadResponse.imageUrl,
        statement_type: "maintenance",
        net_amount_to_pay: invoiceData?.receivedAmount ?? 0,
        property:
          typeof invoiceData?.property_id._id === "string"
            ? invoiceData.property_id._id
            : "",
        received_amount: invoiceData?.receivedAmount ?? 0,
        title: `${invoiceData?.taxInvoiceNumber}`,
        total_amount: invoiceData?.totalMaintenceCost ?? 0,
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
    anchor.download = `invoice-${invoiceData?.taxInvoiceNumber}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div className="">
      <BlobProvider document={<MaintenanceInvoicePdf invoice={invoiceData!} />}>
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
              to={`/invoice/maintenance-pdf-view/${invoiceData?._id}`}
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
            to={`/invoice/maintenance-pdf-view/${invoiceData?._id}`}
            target="_blank"
          >
            View PDF
          </Link>
        )}

        {isUseIcons ? (
          <Tooltip
            title={isGenerating ? "Generating..." : "Generate Statement "}
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
            text={isGenerating ? "Generating..." : "Generate Statement "}
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
            download={`invoice-${invoiceData?.taxInvoiceNumber}.pdf`}
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

export default MaintenanceInvoiceGenerator;
