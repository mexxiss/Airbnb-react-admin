import { useFetchRevenueList } from "../../hooks/react-query/revenue/useFetchRevenueList";
import ReusableTable from "../ReusableTable/ReusableTable";
import { getRevenueColumnsHandler } from "../../utils/columnsHandlers/revenueColumnsHandler";

interface Iprops {
  searchTerm?: string;
}
const RevenueInvoiceList = ({ searchTerm }: Iprops) => {
  console.log("revenue", { searchTerm });

  const { data, isLoading, isError, error } = useFetchRevenueList();
  const columns = getRevenueColumnsHandler();

  return (
    <ReusableTable
      columnsAlignment="text-left"
      columns={columns}
      data={data?.data || []}
      loadingStates={[isLoading]}
      errorStates={[{ isError, error }]}
    />
  );
};

export default RevenueInvoiceList;
