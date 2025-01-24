import React from "react";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import DataNotFound from "../DataNotFound/DataNotFound";

interface ColumnConfig {
  key: string;
  label: string;
  minWidth?: string;
  render?: (rowData: any) => React.ReactNode;
}

interface TableProps {
  columnsAlignment?: string;
  columns: ColumnConfig[];
  data: any[];
  loadingStates?: boolean[];
  errorStates?: { isError: boolean; error: any }[];
  noDataText?: string;
}

const ReusableTable: React.FC<TableProps> = ({
  columnsAlignment = "text-center",
  columns,
  data,
  loadingStates = [],
  errorStates = [],
  noDataText,
}) => {
  return (
    <DataHandler loadingStates={loadingStates} errorStates={errorStates}>
      <div className="relative overflow-x-auto">
        <table
          className="w-full border-separate min-w-full"
          style={{ borderSpacing: "0 10px" }}
        >
          {!data.length ? (
            <DataNotFound message={noDataText || ""} />
          ) : (
            <>
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
                {data.map((item, index) => (
                  <tr className="bg-white mb-2" key={item?._id || index}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`py-3 px-3 !text-left ${columnsAlignment} ${index === 0 && col.key === "invoiceNumber"
                          ? "rounded-l"
                          : ""
                          } ${index === data.length - 1 && col.key === "actions"
                            ? "rounded-r"
                            : ""
                          }`}
                      >
                        {col?.render
                          ? col.render(item[col.key] || item)
                          : item[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </DataHandler>
  );
};

export default ReusableTable;
