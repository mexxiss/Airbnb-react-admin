import { useFetchFurnishingInvoice } from "../../hooks/react-query/revenue";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../ReusableTable/ReusableTable";
import { columnsHandlerFurnishing } from "../../utils/columnsHandlers/columnsHandlerFurnishing";

const FurnishingInvoiceList = () => {
  const navigate = useNavigate();
  const columns = columnsHandlerFurnishing(navigate);
  const { data, isLoading, error, isError } = useFetchFurnishingInvoice();

  return (
    <ReusableTable
      columns={columns}
      data={data?.data || []}
      loadingStates={[isLoading]}
      errorStates={[{ isError, error }]}
    />
  );
};

export default FurnishingInvoiceList;
