import { useState, useEffect, useMemo } from "react";
import { User } from "../../types/usersTypes";
import { userFetchQuery } from "../react-query/users-queries";
import { usePropertiesByUser } from "../react-query/properties-query";

interface UseSelectionProps {
  limit?: number;
  initialValues?: {
    selectedValue?: string | number;
    selectedProperty?: string | number;
    selectedMonth?: string;
    selectedUser?: User;
  };
}

export const useSelection = ({
  limit = 500,
  initialValues = {},
}: UseSelectionProps = {}) => {
  const [selectedValue, setSelectedValue] = useState<
    string | number | (string | number)[]
  >(initialValues.selectedValue || "");
  const [selectedProperty, setSelectedProperty] = useState<
    string | number | (string | number)[]
  >(initialValues.selectedProperty || "");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    initialValues.selectedMonth || ""
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(
    initialValues.selectedUser || null
  );

  const [dates, setDates] = useState<Date[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // Fetch users
  const { data, isLoading, isError, error } = userFetchQuery({
    dates,
    searchTerm,
    isDeleted: status,
    limit,
    page,
  });

  // Fetch properties by user
  const {
    data: propertyData,
    isLoading: proIsLoading,
    isError: proIsError,
    error: proError,
  } = usePropertiesByUser(selectedValue || "");

  // Memoize user data for select options
  const userData = useMemo(
    () =>
      data?.data?.map((item: any) => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item._id,
      })) || [],
    [data]
  );

  // Memoize property data for select options
  const propertyDataModified = useMemo(
    () =>
      propertyData?.properties.map((item: any) => ({
        label: item?.title,
        value: item._id,
      })) || [],
    [propertyData]
  );

  // Update selected user whenever selectedValue changes
  useEffect(() => {
    if (selectedValue) {
      setSelectedUser(
        data?.data.find((item: any) => item._id === selectedValue) || null
      );
    }
  }, [selectedValue, data]);

  // Handle value changes for select inputs
  const handleChange = (value: string | number | (string | number)[]) => {
    setSelectedValue(value);
  };

  const handleChangeProperty = (
    value: string | number | (string | number)[]
  ) => {
    setSelectedProperty(value);
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  return {
    selectedValue,
    selectedProperty,
    selectedMonth,
    selectedUser,
    userData,
    propertyDataModified,
    isLoading,
    proIsLoading,
    isError,
    proIsError,
    error,
    proError,
    handleChange,
    handleChangeProperty,
    handleMonthChange,
  };
};
