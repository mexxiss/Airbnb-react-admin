import { VisibilityOutlined } from "@mui/icons-material";
import userImg2 from "../../assets/images/userImg2.png";
import EllipsisTooltip from "../EllipsisTooltip/EllipsisTooltip";
import { Link } from "react-router-dom";

const SupportQuerry = () => {
    return (
        <div>
            <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
                <h5 className="text-22 text-primary font-bold mb-5">Support Querry</h5>
                <div>
                    <div className="relative overflow-x-auto">
                        <table
                            className="w-full border-separate min-w-full"
                            style={{ borderSpacing: "0 10px" }}
                        >
                            <thead className="text-sm text-[#8B8B8B] font-medium">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-2 px-3"
                                        style={{ minWidth: "200px" }}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            User
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 px-3"
                                        style={{ minWidth: "200px" }}
                                    >
                                        <div
                                            className="flex items-center gap-2.5"
                                        >
                                            Type
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 px-3"
                                        style={{ minWidth: "200px" }}
                                    >
                                        <div className="flex items-center gap-2.5 line-clamp-1">
                                            Message
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 px-3"
                                        style={{ minWidth: "120px" }}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            Total Queries
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 px-3"
                                        style={{ minWidth: "120px" }}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            Pending
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 px-3"
                                        style={{ minWidth: "120px" }}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            Status
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 px-3"
                                        style={{ minWidth: "60px" }}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            Actions
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="bg-white mb-2">
                                    <td className="py-3 px-3 rounded-l-xl">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={userImg2}
                                                    className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 object-cover"
                                                    alt=""
                                                />
                                                <div>
                                                    <p className="text-sm text-[#040404] font-medium capitalize">
                                                        jagjit
                                                    </p>
                                                    <p className="text-xs text-text2 font-medium">
                                                        jagjit@gmail.com
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            Gerenal Question
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 w-[400px]">
                                        <span className="text-sm text-text3 text-center">
                                            <EllipsisTooltip width="100%" className="!text-wrap !text-left line-clamp-2" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!" />

                                        </span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            3
                                        </span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            0
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-left max-w-[60px]">
                                        <span
                                            className={`text-sm px-2 py-1 rounded bg-green-100 text-green-700`}
                                        >
                                            Done
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                                        <Link to="/admin/support/chat" className="text-[#bb9e6c] hover:text-primaryDark duration-300">
                                            <VisibilityOutlined className="!text-xl " />
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="bg-white mb-2">
                                    <td className="py-3 px-3 rounded-l-xl">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={userImg2}
                                                    className="border-2 border-[#E8E1F6] rounded-lg w-10 h-10 object-cover"
                                                    alt=""
                                                />
                                                <div>
                                                    <p className="text-sm text-[#040404] font-medium">
                                                        inder
                                                    </p>
                                                    <p className="text-xs text-text2 font-medium">
                                                        inder@gmail.com
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            Gerenal Question
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 w-[400px]">
                                        <span className="text-sm text-text3 text-center">
                                            <EllipsisTooltip width="100%" className="!text-wrap !text-left line-clamp-2" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!" />

                                        </span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            15
                                        </span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="text-text3 text-center font-medium">
                                            3
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-left max-w-[60px]">
                                        <span
                                            className={`text-sm px-2 py-1 rounded bg-red-100 text-red-700`}
                                        >
                                            Pending
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                                        <Link to="/admin/support/chat" className="text-[#bb9e6c] hover:text-primaryDark duration-300">
                                            <VisibilityOutlined className="!text-xl " />
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupportQuerry