import { useFetchRevenueList } from "../../hooks/react-query/revenue/useFetchRevenueList";
import ReusableTable from "../ReusableTable/ReusableTable";
import { getRevenueColumnsHandler } from "../../utils/columnsHandlers/revenueColumnsHandler";

interface Iprops {
  searchTerm?: string;
}
const RevenueInvoiceList = ({ searchTerm }: Iprops) => {
  const { data, isLoading, isError, error } = useFetchRevenueList(searchTerm);
  const columns = getRevenueColumnsHandler();

  return (
    <ReusableTable
      columnsAlignment="text-left"
      columns={columns}
      data={data?.data || []}
      loadingStates={[isLoading]}
      errorStates={[{ isError, error }]}
      noDataText="Revenue Invoice Data"
    />
  );
};

export default RevenueInvoiceList;
