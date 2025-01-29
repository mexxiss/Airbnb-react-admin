import { useQuery } from "@tanstack/react-query"
import { fetchContactSupportQueries } from "../../../services/apiServices"

export const useGetContactSupport = () => {
    return useQuery({
        queryKey: ["contact-support"],
        queryFn: fetchContactSupportQueries
    })
}