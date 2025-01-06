import UpDown from "../../assets/icons/UpDown.png";
import { useFetchRevenueList } from "../../hooks/react-query/revenue/useFetchRevenueList";
import DataHandler from "../ErrorHandleMessage/DataHandler";
import { IMonthlyInvoice } from "../../types/invoiceTypes";
import { formatDate } from "../../utils/common";
import MonthlyInvoiceGenerator from "./MonthlyInvoiceGenerator";

const statusClasses = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
    Draft: "bg-gray-100 text-gray-700",
};
const RevenueInvoiceList = () => {
    const { data, isLoading, isError, error } = useFetchRevenueList();
    if (isLoading || isError) {
        return (
            <DataHandler
                loadingStates={[isLoading]}
                errorStates={[{ isError, error }]}
            />
        );
    }

    const invoices: IMonthlyInvoice[] = data.data || [];

    return (
        <>
            <table className="w-full border-separate min-w-full"
                style={{ borderSpacing: "0 10px" }}>

                <thead className="text-sm text-[#8B8B8B] font-medium">
                    <tr>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "270px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Customer
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "150px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Invoice
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "150px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Date
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "140px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Invoice Period
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "140px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Net Due
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "100px" }}
                        >
                            <div className="flex items-center gap-2.5">Actions</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr
                            key={invoice._id}
                            className="bg-white mb-2"
                        >
                            <td className="py-2 px-3 rounded-l">
                                <div className="font-medium text-gray-900">
                                    {invoice?.companyDetails?.name}
                                </div>
                            </td>
                            <td className="py-2 px-3">
                                {invoice?.invoiceDetails?.invoiceNumber}
                            </td>
                            <td className="py-2 px-3">
                                {formatDate(invoice?.invoiceDetails?.date || "")}
                            </td>
                            <td className="py-2 px-3">
                                {invoice?.invoiceDetails?.statementPeriod}
                            </td>
                            <td className="py-2 px-3">
                                ${invoice?.summary?.netAmountDue?.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-right rounded-l">
                                <MonthlyInvoiceGenerator
                                    invoiceData={invoice}
                                    isUseIcons={true}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default RevenueInvoiceList