import { useQuery } from "@tanstack/react-query"
import { fetchPropertyQueries } from "../../services/apiServices"

export const useGetPropertyQueries = ({page, limit}: {page: number, limit: number}) => {
    return useQuery({
        queryKey: ["property-queries", {page, limit}],
        queryFn: () => fetchPropertyQueries(page, limit)
    })
}