import { Link, useSearchParams } from "react-router-dom";
import { KeyboardArrowLeftOutlined } from "@mui/icons-material";
import EllipsisTooltip from "../EllipsisTooltip/EllipsisTooltip";
import { useEffect, useState } from "react";
import { useGetContactSupportByUser } from "../../hooks/react-query/contact-support/useGetContactQueriesByUser";
import { getRelativeTime } from "../../utils/common";
import Loader from "../Loader/Loader";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import ContactSupportReply from "../Modals/ContactSupportReply";
import { Query } from "../../types/contactQueries";
import useUserContactQueriesStore from "../../store/useUserContactQueriesStore";

const SupportChat = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();

  const user = searchParams.get("id") || "";
  const user_name = searchParams.get("name") || "";
  const { setQueries, queries } = useUserContactQueriesStore();

  const { data, isLoading, isError, error } = useGetContactSupportByUser(user);
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  useEffect(() => {
    if (data) {
      setQueries(data);
    }
  }, [data, setQueries]);

  if (isLoading) return <Loader />;
  if (isError && error instanceof Error)
    return <ErrorHandleMessage msg={error.message} />;

  if (queries?.length === 0) {
    return (
      <div className="flex justify-center items-center text-sm font-medium text-gray-500 py-12">
        No queries found.
      </div>
    );
  }

  return (
    <div>
      <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Link to="/admin/support">
              <KeyboardArrowLeftOutlined className="!text-3xl" />
            </Link>
            <h5 className="text-22 text-primary font-bold">
              {user_name} Queries ({queries?.length})
            </h5>
          </div>
          <Link
            to={`/admin/user/${user}`}
            className="btn1 flex items-center justify-center"
          >
            View Profile
          </Link>
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
                    <div className="flex items-center gap-2.5">Type</div>
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
                    <div className="flex items-center gap-2.5">Created At</div>
                  </th>
                  <th
                    scope="col"
                    className="py-2 px-3"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="flex items-center gap-2.5">Status</div>
                  </th>
                  <th
                    scope="col"
                    className="py-2 px-3"
                    style={{ minWidth: "60px" }}
                  >
                    <div className="flex items-center gap-2.5">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {queries?.map((query: any, index: number) => (
                  <tr key={index} className="bg-white mb-2">
                    <td className="py-3 px-3 rounded-l-xl">
                      <span className="text-text3 text-center font-medium">
                        {query.question_type}
                      </span>
                    </td>
                    <td className="py-3 px-3 w-[400px]">
                      <span className="text-sm text-text3 text-center">
                        <EllipsisTooltip
                          width="100%"
                          className="!text-wrap !text-left line-clamp-2"
                          title={query.message}
                        />
                      </span>
                    </td>
                    <td className="py-3 px-3 text-left max-w-[60px]">
                      <span className="text-sm text-text3">
                        {getRelativeTime(query?.createdAt)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-left max-w-[60px]">
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          query?.status === "Pending"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {query?.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 rounded-r-xl text-left max-w-[60px]">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setSelectedQuery(query);
                        }}
                        className="text-primary hover:text-primaryDark duration-300 font-medium"
                      >
                        {query?.status === "Pending" ? "Reply" : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ContactSupportReply
          showModal={showModal}
          setShowModal={setShowModal}
          query={selectedQuery}
        />
      </div>
    </div>
  );
};

export default SupportChat;
