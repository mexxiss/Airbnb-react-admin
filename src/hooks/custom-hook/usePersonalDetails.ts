import { useFormik } from "formik";
import {
  useFetchDetailById,
  useUpdateUserDetails,
} from "../react-query/users-queries";
import { personalDetailsValidationSchema } from "../../utils/validations/editDetailValidationSchema";
import { showToast } from "../../utils/toaster/toastWrapper";
import { fixPhoneNumbers } from "../../utils/common";

export const usePersonalDetails = (
  userId: string,
  onUpdateSuccess: () => void
) => {
  const { data, isLoading, isError, error, refetch } = useFetchDetailById({
    userId: userId || "",
  });

  const { mutate: updateUser } = useUpdateUserDetails();

  const finalData = data?.data;

  const formik = useFormik({
    validationSchema: personalDetailsValidationSchema(),
    initialValues: {
      first_name: finalData?.first_name || "",
      last_name: finalData?.last_name || "",
      email: finalData?.email[0] || "",
      phone: finalData?.phone[0] || "",
      SecEmail: finalData?.email[1] || "",
      country: finalData?.address?.country || "",
      SecNumber: finalData?.phone[1] || "",
      profile_img: finalData?.profile_img || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const updates = {
          ...values,
          address: {
            country: values.country,
          },
          email: [values.email, values.SecEmail].filter(Boolean),
          phone: fixPhoneNumbers(
            [values.phone, values.SecNumber].filter(Boolean)
          ),
        };

        console.log({ updates });

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
        console.error("Failed to update user details:", error);
        showToast("error", "Failed to update details. Please try again.");
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
