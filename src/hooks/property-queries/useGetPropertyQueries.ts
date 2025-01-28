import { useQuery } from "@tanstack/react-query"
import { fetchPropertyQueries } from "../../services/apiServices"

export const useGetPropertyQueries = () => {
    return useQuery({
        queryKey: ["property-queries"],
        queryFn: fetchPropertyQueries
    })
}