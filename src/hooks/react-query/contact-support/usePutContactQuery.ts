import { useMutation } from "@tanstack/react-query";
import { replyContactQuery } from "../../../services/apiServices";
import { showToast } from "../../../utils/toaster/toastWrapper";

export const usePutContactQuery = () => {
    return useMutation({
        mutationFn: ({ id, updates }: { id: string, updates: { status: string, reply: string } }) => replyContactQuery({ id, updates }),
        onSuccess: () => {
            showToast("success", "Query Replied");
        },
        onError: () => {
            showToast("error", "Query reply failed");
        },
    });
};