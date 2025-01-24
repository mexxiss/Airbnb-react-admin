import { useFormik } from "formik";
import {
  useFetchDetailById,
  useUpdateUserDetails,
} from "../react-query/users-queries";
import { addressValidationSchema } from "../../utils/validations/editDetailValidationSchema";
import { showToast } from "../../utils/toaster/toastWrapper";

export const useAddressDetails = (
  userId: string,
  onUpdateSuccess: () => void
) => {
  const { data, isLoading, isError, error, refetch } = useFetchDetailById({
    userId: userId || "",
  });

  const { mutate: updateUser } = useUpdateUserDetails();

  const finalData = data?.data;

  const formik = useFormik({
    validationSchema: addressValidationSchema(),
    initialValues: {
      building_no: finalData?.address?.building_no || "",
      street: finalData?.address?.street || "",
      city: finalData?.address?.city || "",
      area: finalData?.address?.area || "",
      landmark: finalData?.address?.landmark || "",
      country: finalData?.address?.country || "",
      pincode: finalData?.address?.pincode || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const updates = {
          address: {
            ...values,
          },
        };

        if (!userId) {
          showToast("error", "User ID is missing or undefined");
          return;
        }

        updateUser(
          { id: userId, data: updates },
          {
            onSuccess: () => {
              formik.resetForm({ values });
              refetch();
              onUpdateSuccess();
            },
          }
        );
      } catch (error) {
        console.error("Failed to update address details:", error);
        showToast("error", "Failed to update address. Please try again.");
      }
    },
  });

  return {
    formik,
    finalData,
    isLoading,
    isError,
    error,
  };
};
