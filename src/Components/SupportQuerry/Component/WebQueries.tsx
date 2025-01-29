import { CloseOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useState } from 'react'
import EllipsisTooltip from '../../EllipsisTooltip/EllipsisTooltip'
import { Modal } from 'flowbite-react'
import { contactQueries } from '../../../types/contactQueries'

const WebQueries = ({ queries }: {queries?: contactQueries[]}) => {
    const [showModal, setShowModal] = useState(false);
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
                                Number
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
                                Subject
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
                    {queries?.map((query: contactQueries, index: number) => (
                        <tr key={index} className="bg-white mb-2">
                            <td className="py-3 px-3 rounded-l-xl">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-[#040404] font-medium capitalize">
                                                {query?.user.first_name} {query?.user.last_name}
                                            </p>
                                            <p className="text-xs text-text2 font-medium">
                                                {query?.user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-3">
                                <span className="text-text3 text-center font-medium">
                                    {query?.user.phone}
                                </span>
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
                            <td className="py-3 px-3 text-left max-w-[60px]">
                                <span
                                    className={`text-sm px-2 py-1 rounded ${query?.pendingCount === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                >
                                    {query?.pendingCount === 0 ? 'Done' : 'Pending'}
                                </span>
                            </td>
                            <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                                <button onClick={() => setShowModal(true)} className="text-[#bb9e6c] hover:text-primaryDark duration-300">
                                    <VisibilityOutlined className="!text-xl " />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <Modal show={showModal} onClose={() => setShowModal(false)} className="!p-0">
                <Modal.Body className="!p-0">
                    <div className="flex items-center justify-between px-5 py-3">
                        <h6 className="text-lg font-medium text-primary">
                            Query
                        </h6>
                        <button onClick={() => setShowModal(false)}>
                            <CloseOutlined className="!text-lg" />
                        </button>
                    </div>
                    <div className="px-5 py-4 border-t">
                        <div className="">
                            <div>
                                <p className="text-sm lg:text-base text-text3">
                                    <span className="text-text1 font-medium">Subject:</span> General Question
                                </p>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm lg:text-base text-text3">
                                    <span className="text-text1 font-medium">Message:</span> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nostrum explicabo distinctio modi quos nisi ipsum ratione laborum obcaecati ea veniam, vitae autem, iure quisquam dolores nulla asperiores magni omnis!
                                </p>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <button
                                    className="btn1 rounded-full h-10 !px-8 tracking-wider"
                                >
                                    Call
                                </button>
                                <button
                                    className="btn1 rounded-full h-10 !px-8 tracking-wider"
                                >
                                    Mail
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WebQueries