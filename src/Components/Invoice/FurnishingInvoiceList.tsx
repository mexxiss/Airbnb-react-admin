import { useFetchFurnishingInvoice } from "../../hooks/react-query/revenue";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../ReusableTable/ReusableTable";
import { columnsHandlerFurnishing } from "../../utils/columnsHandlers/columnsHandlerFurnishing";

interface Iprops {
  searchTerm?: string;
}
const FurnishingInvoiceList = ({ searchTerm }: Iprops) => {
  const navigate = useNavigate();
  const columns = columnsHandlerFurnishing(navigate);
  const { data, isLoading, error, isError } =
    useFetchFurnishingInvoice(searchTerm);

  return (
    <ReusableTable
      columns={columns}
      data={data?.data || []}
      loadingStates={[isLoading]}
      errorStates={[{ isError, error }]}
      noDataText="Furnishing Invoice Data"
    />
  );
};

export default FurnishingInvoiceList;
