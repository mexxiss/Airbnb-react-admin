import { IconButton } from "@mui/material";
import UpDown from "../../assets/icons/UpDown.png";
import trashIcon from "../../assets/icons/trashIcon.png";
import { useFetchFurnishingInvoice } from "../../hooks/react-query/revenue";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ActionButtonGroup from "../ActionButtonGroup/ActionButtonGroup";
import DeleteIcon from "../../assets/dynamic-icons/DeleteIcon";
import { useNavigate } from "react-router-dom";

// Status classes mapping
const statusClasses = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-700",
};

// Define reusable column structure
const getColumnsHandler = (navigate: (path: string) => void) => [
  {
    key: "invoiceNumber",
    label: "Invoice No.",
    minWidth: "270px",
  },
  {
    key: "statementPeriod",
    label: "Statement Period",
    minWidth: "150px",
  },
  {
    key: "receivedAmount",
    label: "Received Amount",
    minWidth: "150px",
  },
  {
    key: "totalFurnishingCost",
    label: "Total Furni... Cost",
    minWidth: "150px",
  },
  {
    key: "amountOwedToFP",
    label: "Balance",
    minWidth: "150px",
  },
  {
    key: "status",
    label: "Status",
    minWidth: "100px",
    render: (value: keyof typeof statusClasses) => (
      <span
        className={`text-sm px-2 py-1 rounded ${statusClasses[value] || ""}`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    minWidth: "100px",
    render: (rowData: any) => {
      const handleView = () => {
        navigate(`/admin/invoice/furnishing-details/${rowData._id}`);
      };

      const handleEdit = () => {
        navigate(`/admin/invoice/furnishing-details/edit/${rowData._id}`);
      };

      return (
        <ActionButtonGroup
          icons={[
            { icon: <VisibilityIcon />, onClick: handleView, xs: 14, sm: 18 },
            { icon: <EditIcon />, onClick: handleEdit, xs: 14, sm: 18 },
          ]}
          gap={8}
        />
      );
    },
  },
];

const FurnishingInvoiceList = () => {
  const navigate = useNavigate();
  const columns = getColumnsHandler(navigate);
  const { data, isLoading, error, isError } = useFetchFurnishingInvoice();

  if (isLoading || isError) {
    return (
      <DataHandler
        loadingStates={[isLoading]}
        errorStates={[{ isError, error }]}
      />
    );
  }

  return (
    <table
      className="w-full border-separate min-w-full"
      style={{ borderSpacing: "0 10px" }}
    >
      <thead className="text-sm text-[#8B8B8B] font-medium">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className="py-2 px-3"
              style={{ minWidth: col.minWidth }}
            >
              <div className="flex items-center gap-2.5">{col.label}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.data?.map((item: any, index: number) => (
          <tr className="bg-white mb-2" key={item._id || index}>
            {columns.map((col) => (
              <td
                key={col.key}
                className={`py-3 px-3 ${
                  index === 0 && col.key === "invoiceNumber" ? "rounded-l" : ""
                } ${
                  index === data.data.length - 1 && col.key === "actions"
                    ? "rounded-r"
                    : ""
                }`}
              >
                {col.render ? (
                  col.render(item[col.key] || item)
                ) : (
                  <span className="text-sm text-[#040404]">
                    {item[col.key]}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FurnishingInvoiceList;
