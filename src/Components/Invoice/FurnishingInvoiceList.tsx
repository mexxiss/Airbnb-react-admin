import UpDown from "../../assets/icons/UpDown.png";
import trashIcon from "../../assets/icons/trashIcon.png";

const statusClasses = {
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Overdue: "bg-red-100 text-red-700",
    Draft: "bg-gray-100 text-gray-700",
};

const FurnishingInvoiceList = () => {
    return (
        <>
            <table
                className="w-full border-separate min-w-full"
                style={{ borderSpacing: "0 10px" }}
            >
                <thead className="text-sm text-[#8B8B8B] font-medium">
                    <tr>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "270px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Invoice No.
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "150px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Statment Period
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "150px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Total Amount
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "150px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Balance
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="py-2 px-3"
                            style={{ minWidth: "140px" }}
                        >
                            <div className="flex items-center gap-2.5">
                                Status
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
                <tbody className="">
                    <tr className="bg-white mb-2" >
                        <td className=" py-3 px-3 rounded-l">
                            <span className="text-sm text-[#040404]">
                                Rw- fdg546789
                            </span>
                        </td>
                        <td className=" py-3 px-3">
                            <span className="text-sm text-[#040404]">
                                Aug 2024
                            </span>
                        </td>
                        <td className=" py-3 px-3">
                            <span className="text-sm text-[#040404]">
                                1234567
                            </span>
                        </td>
                        <td className=" py-3 px-3">
                            <span className="text-sm text-[#040404]">12</span>
                        </td>
                        <td className=" py-3 px-3">
                            <span className={`text-sm  px-2 py-1 rounded ${statusClasses["Paid"]}`}>Paid</span>
                        </td>
                        <td className=" py-3 px-3 text-center rounded-r">
                            <button className="mx-auto">
                                <img src={trashIcon} alt="" className="w-4 grayImg" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default FurnishingInvoiceList