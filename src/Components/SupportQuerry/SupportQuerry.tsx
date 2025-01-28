import { useGetContactSupport } from "../../hooks/react-query/contact-support/useGetContactSupport";
import ErrorHandleMessage from "../ErrorHandleMessage/ErrorHandleMessage";
import Loader from "../Loader/Loader";
import DataNotFound from "../DataNotFound/DataNotFound";
import UserQueries from "./Component/UserQueries";

const SupportQuerry = () => {
    const { data: queries, isLoading, isError, error } = useGetContactSupport();


    if (isLoading) return <Loader />;
    if (isError && error instanceof Error)
        return <ErrorHandleMessage msg={error.message} />;

    return (
        <div>
            <div className="px-6 pt-6 h-[calc(100vh_-_81px)] overflow-y-auto pb-6">
                <h5 className="text-22 text-primary font-bold mb-5">Support Querry</h5>
                <div>
                    {queries?.length === 0 ?
                        <DataNotFound message="Queries" />
                        :
                        <div className="relative overflow-x-auto">
                            <UserQueries queries={queries} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SupportQuerry