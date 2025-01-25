import { useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { BlobProvider } from "@react-pdf/renderer";
import { uploadFile } from "../../services/apiServices";
import MonthlyInvoicePDFWithTable from "./MonthlyInvoicePDFWithTable";
import { IMonthlyInvoice } from "../../types/invoiceTypes";
import CustomButton from "../CustomButton/CustomButton";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DeleteOutline } from "@mui/icons-material";
import {
  useCreateInvoice,
  useDeleteStatement,
} from "../../hooks/react-query/statement";
import { showConfirmationDialog } from "../../utils/alerts/alertService";

interface IMonthlyInvoiceGenerator {
  isUseIcons?: boolean;
  invoiceData?: IMonthlyInvoice;
  refatch?: () => void;
}
const MonthlyInvoiceGenerator = ({
  invoiceData,
  isUseIcons = false,
  refatch,
}: IMonthlyInvoiceGenerator) => {
  const neWObj = { ...invoiceData } as IMonthlyInvoice;

  const [isGenerating, setIsGenerating] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const { mutate: createInvoiceMutation, isPending: isPendingCreate } =
    useCreateInvoice();
  const { mutate: deleteStatement, isPending } = useDeleteStatement();

  const handleCreateInvoice = async (invoiceData: any) => {
    const isConfirmed = await showConfirmationDialog(
      `Do you want to proceed with generating the statement for user panel, ${neWObj?.companyDetails?.name}?`,
      "",
      "Proceed",
      "Go Back"
    );

    if (isConfirmed) {
      createInvoiceMutation(
        { invoiceData },
        {
          onSuccess: () => {
            refatch && refatch();
          },
        }
      );
    }
  };

  const handleDeleteStatement = async (title: string) => {
    const isConfirmed = await showConfirmationDialog(
      `Are you sure you want to delete the generated invoice from the user panel, ${
        neWObj?.companyDetails?.name || ""
      }?`,
      "",
      "Yes",
      "No"
    );

    if (isConfirmed) {
      deleteStatement(
        { title },
        {
          onSuccess: () => {
            refatch && refatch();
          },
        }
      );
    }
  };

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
        title: invoiceData?.invoiceDetails?.invoiceNumber ?? "",
        total_amount: invoiceData?.summary?.totalIncome ?? 0,
      };

      handleCreateInvoice(invoicePayload);
    } catch (error) {
      console.error("Error generating/uploading invoice:", error);
    } finally {
      setIsGenerating(false);
      // showToast("success", "Statement Genrated Successfully!");
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

        {/* DownLoad Button */}
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

        {/* Genrate  Button */}
        {isUseIcons ? (
          <div>
            {invoiceData?.isStatementGenrated ? (
              <>
                {isPending ? (
                  <IconButton sx={{ p: { xs: 0, sm: 0.5 } }} disabled={!blob}>
                    <CircularProgress size={14} />
                  </IconButton>
                ) : (
                  <Tooltip title="Delete Statement">
                    <span>
                      <IconButton
                        onClick={() =>
                          handleDeleteStatement(
                            invoiceData?.invoiceDetails?.invoiceNumber || ""
                          )
                        }
                        sx={{ p: { xs: 0, sm: 0.5 } }}
                        disabled={!blob}
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
                )}
              </>
            ) : (
              <>
                {isGenerating || isPendingCreate ? (
                  <IconButton sx={{ p: { xs: 0, sm: 0.5 } }} disabled={!blob}>
                    <CircularProgress size={14} />
                  </IconButton>
                ) : (
                  <Tooltip
                    title={
                      isGenerating ? "Generating..." : "Generate Statment "
                    }
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
                )}
              </>
            )}
          </div>
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
      </div>
    </div>
  );
};

export default MonthlyInvoiceGenerator;
