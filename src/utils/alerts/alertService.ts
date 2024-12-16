import Swal, { SweetAlertOptions } from "sweetalert2";

// A utility function to show a basic alert with Tailwind classes as props
export const showAlert = (
  options: SweetAlertOptions,
  classes?: {
    popup?: string;
    title?: string;
    confirmButton?: string;
  }
) => {
  Swal.fire({
    ...options,
    customClass: {
      popup:
        classes?.popup ||
        "bg-white rounded-lg shadow-lg p-6 border border-gray-200",
      title: classes?.title || "text-lg font-bold text-gray-800",
      confirmButton:
        classes?.confirmButton ||
        "bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600",
    },
  });
};

// A custom method for success alerts with Tailwind classes as props
export const showSuccessAlert = (
  title: string,
  text?: string,
  classes?: {
    popup?: string;
    title?: string;
    confirmButton?: string;
  }
) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "OK",
    customClass: {
      popup:
        classes?.popup ||
        "bg-green-100 border border-green-400 rounded-lg shadow-lg p-6",
      title: classes?.title || "text-green-800 font-bold text-lg",
      confirmButton:
        classes?.confirmButton ||
        "bg-green-500 text-white font-medium py-2 px-4 rounded hover:bg-green-600",
    },
  });
};

// A custom method for error alerts with Tailwind classes as props
export const showErrorAlert = (
  title: string,
  text?: string,
  classes?: {
    popup?: string;
    title?: string;
    confirmButton?: string;
  }
) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "Retry",
    customClass: {
      popup:
        classes?.popup ||
        "bg-red-100 border border-red-400 rounded-lg shadow-lg p-6",
      title: classes?.title || "text-red-800 font-bold text-lg",
      confirmButton:
        classes?.confirmButton ||
        "bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600",
    },
  });
};

// A custom method for confirmation dialog with Tailwind classes as props
export const showConfirmationDialog = async (
  title: string,
  text?: string,
  confirmButtonText: string = "Yes",
  cancelButtonText: string = "No",
  classes?: {
    popup?: string;
    title?: string;
    confirmButton?: string;
    cancelButton?: string;
  }
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      popup: classes?.popup || "bg-gray-100 rounded-lg shadow-lg p-6",
      title: classes?.title || "text-gray-800 font-bold text-lg",
      confirmButton:
        classes?.confirmButton ||
        "bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600",
      cancelButton:
        classes?.cancelButton ||
        "bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-400",
    },
  });
  return result.isConfirmed;
};
