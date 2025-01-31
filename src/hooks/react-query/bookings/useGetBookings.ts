import { useQuery } from "@tanstack/react-query"
import { getAllBookings } from "../../../services/apiServices"

export const useGetBookings = ({ page, limit, property }: { page: number, limit: number, property: string }) => {
    return useQuery({
        queryKey: ["get-bookings", { page, limit, property }],
        queryFn: () => getAllBookings(page, limit, property)
    })
}