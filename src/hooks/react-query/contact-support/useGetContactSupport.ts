import { useQuery } from "@tanstack/react-query"
import { fetchContactSupportQueries } from "../../../services/apiServices"

export const useGetContactSupport = ({page, limit}: {page: number, limit: number}) => {
    return useQuery({
        queryKey: ["contact-support", {page, limit}],
        queryFn: () => fetchContactSupportQueries(page, limit)
    })
}