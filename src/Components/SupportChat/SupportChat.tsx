
import { Link, useSearchParams } from "react-router-dom";
import { CloseOutlined, KeyboardArrowLeftOutlined } from "@mui/icons-material";
import EllipsisTooltip from "../EllipsisTooltip/EllipsisTooltip";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useGetContactSupportByUser } from "../../hooks/react-query/contact-support/useGetContactQueriesByUser";
const SupportChat = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchParams] = useSearchParams();

    const user = searchParams.get('user') || '';
    const {data, isLoading, isError, error} = useGetContactSupportByUser(user);
    console.log(data);
    
    return (
        <div>
            <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <Link to="/admin/support"><KeyboardArrowLeftOutlined className="!text-3xl" /></Link>
                        <h5 className="text-22 text-primary font-bold">Inder Queries (1)</h5>
                    </div>
                    <Link to={`/admin/user/679213726d1fcbe702f0b168`} className="btn1 flex items-center justify-center">View Profile</Link>
                </div>
                <div className="">
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
                                            Created At
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
                                        <span className="text-text3 text-center font-medium">
                                            Gerenal Question
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 w-[400px]">
                                        <span className="text-sm text-text3 text-center">
                                            <EllipsisTooltip width="100%" className="!text-wrap !text-left line-clamp-2" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!" />

                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-left max-w-[60px]">
                                        <span className="text-sm text-text3">12-07-2025</span>
                                    </td>
                                    <td className="py-3 px-3 text-left max-w-[60px]">
                                        <span
                                            className={`text-sm px-2 py-1 rounded bg-red-100 text-red-700`}
                                        >
                                            Pending
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                                        <button onClick={() => setShowModal(true)} className="text-primary hover:text-primaryDark duration-300 font-medium">
                                            Reply
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                            <div className="">
                                <div>
                                    <p className="text-sm lg:text-base text-text3">
                                        <span className="text-text1 font-medium">Type:</span> General Question
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm lg:text-base text-text3">
                                        <span className="text-text1 font-medium">Question:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!
                                    </p>
                                </div>
                                <div className="mt-5">
                                    <textarea
                                        className="border-2 border-[#E8E1F6] rounded-lg w-full py-2 px-3 resize-none"
                                        placeholder="Write your reply..."
                                        rows={3}
                                    />
                                </div>
                                <div className="mt-2 text-end">
                                    <button
                                        className="btn1 rounded-full h-10 !px-8 tracking-wider"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* User Chat */}
                {/* <div className="border border-border1 rounded-lg bg-white">
                    <div className="flex items-center justify-between px-4 py-3">
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
                        <div className="flex items-center gap-2">
                            <button className="border border-primary text-primary w-9 h-9 rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white duration-300"><PhoneOutlined className="!text-lg" /></button>
                            <button className="border border-primary text-primary w-9 h-9 rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white duration-300"><EmailOutlined className="!text-lg" /></button>
                        </div>
                    </div>
                    <hr className="border-border1" />
                    <div className="px-4 py-4 h-[calc(100vh-306px)] overflow-auto">
                        <div className="flex flex-col gap-3">
                            <div className="max-w-[85%] xs:max-w-[70%] sm:max-w-[50%] lg:max-w-[45%] mr-auto">
                                <p className="text-xs flex items-center justify-between mb-1 text-text3"><span>Inder</span><span>12-07-2025</span></p>
                                <div className="rounded-md bg-gray-100 p-3">
                                    <div className="">
                                        <p className="text-sm text-text3">
                                            <span className="text-text1 font-medium">Type:</span> General Question
                                        </p>
                                        <p className="text-sm text-text3 mt-1">
                                            <span className="text-text1 font-medium">Question:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio ...<button className="underline text-red-500 font-medium">Read More</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-[85%] xs:max-w-[70%] sm:max-w-[50%] lg:max-w-[45%] mr-auto">
                                <p className="text-xs flex items-center justify-between mb-1 text-text3"><span>Inder</span><span>12-07-2025</span></p>
                                <div className="rounded-md bg-gray-100 p-3">
                                    <div className="">
                                        <p className="text-sm text-text3">
                                            <span className="text-text1 font-medium">Type:</span> General Question
                                        </p>
                                        <p className="text-sm text-text3 mt-1">
                                            <span className="text-text1 font-medium">Question:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio ...<button className="underline text-red-500 font-medium">Read More</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-[85%] xs:max-w-[70%] sm:max-w-[50%] lg:max-w-[45%] ml-auto">
                                <p className="text-xs flex items-center justify-between mb-1 text-text3"><span>Admin</span><span>12-07-2025</span></p>
                                <div className="rounded-md bg-green-100 p-3">
                                    <div className="">
                                        <p className="text-sm text-text3 mt-1">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" border-t border-border1 py-3 px-4">
                        <div className="flex items-center gap-2">
                            <input type="text" className="p-0 border-none focus:ring-0 w-full" placeholder="Write a message..." />
                            <div className="flex items-center gap-2">
                                <button className="bg-primary text-white py-1 px-3 rounded ">Send</button>
                                <div>
                                    <label htmlFor="file" ><AttachFileOutlined /></label>
                                    <input type="file" id="file" hidden />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div >
    )
}

export default SupportChat