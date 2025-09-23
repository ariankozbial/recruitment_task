import { useCharacters } from "../../../hooks";
import { useRef } from "react";

type UseCharactersDataProps = {
  page: number;
  name: string;
  status: string;
};

export const useCharactersData = ({
  page,
  name,
  status,
}: UseCharactersDataProps) => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useCharacters(page, name, status);

  const debounceRef = useRef<number | undefined>(undefined);

  const handleRefresh = () => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      refetch();
    }, 500);
  };

  return {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    handleRefresh,
  };
};
