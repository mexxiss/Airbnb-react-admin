import { CloseOutlined, PhoneOutlined, VisibilityOutlined } from "@mui/icons-material";
import userImg2 from "../../assets/images/userImg2.png";
import EllipsisTooltip from "../EllipsisTooltip/EllipsisTooltip";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SupportQuerry = () => {
    const [showModal, setShowModal] = useState(false);
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
                                            gerenal question
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 w-[400px]">
                                        <span className="text-sm text-text3 text-center">
                                            <EllipsisTooltip width="100%" className="!text-wrap !text-left line-clamp-2" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!" />

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
                                        <button>
                                            <VisibilityOutlined className="!text-xl text-[#bb9e6c]" />
                                        </button>
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
                                            gerenal question
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 w-[400px]">
                                        <span className="text-sm text-text3 text-center">
                                            <EllipsisTooltip width="100%" className="!text-wrap !text-left line-clamp-2" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!" />

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
                                        <Link to="/admin/support/chat">
                                            <VisibilityOutlined className="!text-xl text-[#bb9e6c]" />
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} className="!p-0">
                <Modal.Body className="!p-0">
                    <div className="flex items-center justify-between px-5 py-3">
                        <h6 className="text-lg font-medium text-primary">
                            Reply
                        </h6>
                        <button onClick={() => setShowModal(false)}>
                            <CloseOutlined className="!text-lg" />
                        </button>
                    </div>
                    <div className="px-5 py-4 border-t">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={userImg2}
                                    className="border-2 border-[#E8E1F6] rounded-lg w-12 h-12 object-cover"
                                    alt=""
                                />
                                <div>
                                    <p className="text-lg text-[#040404] font-medium capitalize">
                                        <Link to={`/admin/user/679213726d1fcbe702f0b168`} className=" hover:text-primary duration-300" >inder</Link>
                                    </p>
                                    <p className="text-xs text-text2 font-medium">
                                        inder@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button className="border border-primary text-primary px-4 py-1.5 rounded flex items-center justify-center gap-2 hover:bg-primary hover:text-white duration-300"><PhoneOutlined className="!text-lg" /> Call</button>
                            </div>
                        </div>
                        {/* <div className="mt-6">
                            <div>
                                <p className="text-sm text-text3">
                                    <span className="text-text1 font-medium">Type:</span> General Question
                                </p>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm text-text3">
                                    <span className="text-text1 font-medium">Question:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!
                                </p>
                            </div>
                            <div className="mt-5">
                                <textarea
                                    className="border-2 border-[#E8E1F6] rounded-lg w-full h-20 py-2 px-3 "
                                    placeholder="Write your reply..."
                                />
                            </div>
                            <div className="mt-2 text-end">
                                <button
                                    className="btn1 rounded-full h-10 !px-8 tracking-wider"
                                >
                                    Submit
                                </button>
                            </div>
                        </div> */}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SupportQuerry