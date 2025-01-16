import { useState } from "react";
import searchIcon from "../../../assets/icons/searchIcon.png";
import { Accordion, Modal } from "flowbite-react";
import { CloseOutlined } from "@mui/icons-material";
const Faq = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            <div className=" px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
                <div className="flex items-center justify-between border-b border-[#00858e5e] pb-5 mb-5">
                    <h5 className="text-22 text-primary font-bold">FAQs</h5>
                    <div className="flex items-center gap-3">
                        <div className="relative bg-white rounded-lg py-1.5 pl-10 pr-5">
                            <input
                                type="text"
                                placeholder="Search"
                                className="p-0 placeholder:text-[#4E307A80] text-[#4E307A80] text-sm border-none lg:min-w-[350px]"
                            />
                            <img
                                src={searchIcon}
                                className="w-4 brightness-75 absolute left-4 top-1/2 -translate-y-1/2"
                                alt=""
                            />
                        </div>
                        <button className="text-sm py-2 px-5 rounded-full text-white border border-primary bg-primary hover:bg-[#00858ed0] duration-300" onClick={() => setOpenModal(true)}>Add FAQ</button>
                    </div>
                </div>
                <div>
                    <div className="">
                        <Accordion collapseAll>
                            {Array(3).fill(0).map((i) => (
                                <Accordion.Panel className="">
                                    <Accordion.Title className="bg-white hover:bg-white py-4 px-3">What is Flowbite?</Accordion.Title>
                                    <Accordion.Content className="">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
                                            dropdowns, modals, navbars, and more.
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Check out this guide to learn how to&nbsp;
                                            <a
                                                href="https://flowbite.com/docs/getting-started/introduction/"
                                                className="text-cyan-600 hover:underline dark:text-cyan-500"
                                            >
                                                get started&nbsp;
                                            </a>
                                            and start developing websites even faster with components on top of Tailwind CSS.
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Body>
                    <div className="flex items-center justify-between" >
                        <h6 className="text-xl text-primary font-bold">ADD FAQ</h6>
                        <button className="flex items-center justify-center" onClick={() => setOpenModal(false)}><CloseOutlined className="!text-xl" /></button>
                    </div>
                    <div className="mt-4">
                        <form action="">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="ques">Question</label>
                                    <input type="text" className="rounded" placeholder="Write Question" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="ques">Answer</label>
                                    <textarea name="" id="" rows={4} className="resize-none rounded" placeholder="Write Answer"></textarea>
                                </div>
                                <div className="text-end">
                                    <button className="text-sm py-2 px-6 rounded-full text-white border border-primary bg-primary hover:bg-[#00858ed0] duration-300" onClick={() => setOpenModal(false)}>SAVE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default Faq;