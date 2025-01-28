import { useQuery } from "@tanstack/react-query"
import { fetchQueriesByUser } from "../../../services/apiServices"

export const useGetContactSupportByUser = (user: string) => {
    return useQuery({
        queryKey: ["contact-support", user],
        queryFn: () => fetchQueriesByUser(user),
        enabled: !!user
    })
}