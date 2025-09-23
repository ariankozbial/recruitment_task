import { useNavigate, useSearch } from "@tanstack/react-router";

export const useCharactersListSearch = () => {
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });

  const { page, name, status } = search;

  const setSearch = (next: Partial<typeof search>) => {
    navigate({
      search: (old) => ({ ...old, ...next }),
      replace: true,
    });
  };

  const handlePageChange = (page: number) => {
    setSearch({ page });
  };

  const handleNameChange = (name: string) => {
    setSearch({ page: 1, name });
  };

  const handleStatusChange = (status: string) => {
    setSearch({ page: 1, status });
  };

  const handleClear = () => {
    setSearch({
      page: 1,
      name: "",
      status: "",
    });
  };

  return {
    page,
    name,
    status,
    handlePageChange,
    handleNameChange,
    handleStatusChange,
    handleClear,
  };
};
