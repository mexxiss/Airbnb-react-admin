import { useState, useEffect, useMemo } from "react";
import { User } from "../../types/usersTypes";
import { userFetchQuery } from "../react-query/users-queries";
import { usePropertiesByUser } from "../react-query/properties-query";

interface UseSelectionProps {
  limit?: number;
}

export const useSelection = ({ limit = 500 }: UseSelectionProps = {}) => {
  const [selectedValue, setSelectedValue] = useState<
    string | number | (string | number)[]
  >("");
  const [selectedProperty, setSelectedProperty] = useState<
    string | number | (string | number)[]
  >("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = userFetchQuery({
    dates,
    searchTerm,
    isDeleted: status,
    limit,
    page,
  });

  const {
    data: propertyData,
    isLoading: proIsLoading,
    isError: proIsError,
    error: proError,
  } = usePropertiesByUser(selectedValue || "");

  const userData = useMemo(
    () =>
      data?.data?.map((item: any) => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item._id,
      })) || [],
    [data]
  );

  const propertyDataModified = useMemo(
    () =>
      propertyData?.properties.map((item: any) => ({
        label: item?.title,
        value: item._id,
      })) || [],
    [propertyData]
  );

  useEffect(() => {
    if (selectedValue) {
      setSelectedUser(
        data?.data.find((item: any) => item._id === selectedValue) || null
      );
    }
  }, [selectedValue, data]);

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
