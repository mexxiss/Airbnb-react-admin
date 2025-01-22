import { useNavigate } from "react-router-dom";
import { useFetchMaintenanceInvoice } from "../../../hooks/react-query/revenue/useFetchMaintenanceInvoice";
import { columnsHandlerMaintenance } from "../../../utils/columnsHandlers/columnsHandlerMaintenance";
import ReusableTable from "../../ReusableTable/ReusableTable";

interface Iprops {
  searchTerm?: string;
}
const MaintenanceList = ({ searchTerm }: Iprops) => {
  console.log({ searchTerm });
  const navigate = useNavigate();
  const { data, isLoading, error, isError } = useFetchMaintenanceInvoice();
  const columns = columnsHandlerMaintenance(navigate);

  return (
    <ReusableTable
      columns={columns}
      data={data?.data || []}
      loadingStates={[isLoading]}
      errorStates={[{ isError, error }]}
    />
  );
};

export default MaintenanceList;
