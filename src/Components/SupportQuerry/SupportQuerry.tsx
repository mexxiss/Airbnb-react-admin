import userImg2 from "../../assets/images/userImg2.png";

const SupportQuerry = () => {
    return (
        <div>
            <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-10">
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
                                        <div className="flex items-center gap-2.5">
                                            Email
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
                                        style={{ minWidth: "100px" }}
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
                                    <td className="py-3 px-3 text-center rounded-r-xl flex gap-1">
                                        <button>
                                                {/* <VisibilityIcon className="text-[#bb9e6c]" /> */}
                                        </button>
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