import { useNavigate, useSearch } from "@tanstack/react-router";
import TestResultsComponent from "./TestResultsComponent.tsx";

const TestResultsWrapper = () => {
  const navigate = useNavigate({ from: "/" });
  const search = useSearch({ from: "/" });

  const { page, name, status } = search;

  const setSearch = (next: Partial<typeof search>) => {
    navigate({
      search: (old) => ({ ...old, ...next }),
      replace: true,
    });
  };

  return (
    <TestResultsComponent
      page={page}
      name={name}
      status={status}
      onPageChange={(p) => setSearch({ page: p })}
      onNameChange={(n) => setSearch({ page: 1, name: n })}
      onStatusChange={(s) => setSearch({ page: 1, status: s })}
    />
  );
};

export default TestResultsWrapper;
