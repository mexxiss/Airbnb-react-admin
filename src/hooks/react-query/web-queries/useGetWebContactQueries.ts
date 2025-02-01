import { useQuery } from "@tanstack/react-query"
import { getWebContactQueries } from "../../../services/apiServices"

export const useGetWebContactQueries = ({page, limit}: {page: number, limit: number}) => {
    return useQuery({
        queryKey: ["contact-support", {page, limit}],
        queryFn: () => getWebContactQueries(page, limit),
        enabled: !!page,
    })
}