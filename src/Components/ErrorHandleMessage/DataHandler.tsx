import React from "react";
import ErrorHandleMessage from "./ErrorHandleMessage";
import Loader from "../Loader/Loader";

interface DataHandlerProps {
  loadingStates: boolean[];
  errorStates: Array<{ isError: boolean; error?: unknown }>;
  children?: React.ReactNode;
}

const DataHandler: React.FC<DataHandlerProps> = ({
  loadingStates,
  errorStates,
  children,
}) => {
  const isLoading = loadingStates.some((state) => state); // At least one is loading
  const firstError = errorStates.find((state) => state.isError)?.error; // First error encountered

  if (isLoading) return <Loader />;
  if (firstError instanceof Error)
    return <ErrorHandleMessage msg={firstError.message} />;

  return <>{children}</>;
};

export default DataHandler;
