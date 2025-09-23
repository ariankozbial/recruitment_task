import { CharactersTable } from "./CharactersTable.tsx";
import { useCharactersData } from "../hooks";
import { Filters } from "./Filters.tsx";
import { Pagination } from "./Pagination.tsx";

type Props = {
  page: number;
  name: string;
  status: string;
  handlePageChange: (page: number) => void;
  handleNameChange: (name: string) => void;
  handleStatusChange: (status: string) => void;
  handleClear: () => void;
};

export const CharactersList = ({
  page,
  name,
  status,
  handlePageChange,
  handleNameChange,
  handleStatusChange,
  handleClear,
}: Props) => {
  const { data, isLoading, isError, error, isFetching, handleRefresh } =
    useCharactersData({ page, name, status });

  const showData = data && !isLoading && !isFetching;

  return (
    <div>
      <h1>Rick & Morty characters</h1>

      <Filters
        name={name}
        status={status}
        handleNameChange={handleNameChange}
        handleStatusChange={handleStatusChange}
        handleClear={handleClear}
        handleRefresh={handleRefresh}
        refreshButtonDisabled={isLoading || isFetching}
      />

      {(isLoading || isFetching) && <p>Loading...</p>}

      {isError && <p>{error?.message}</p>}

      {showData && (
        <>
          <CharactersTable characters={data?.results || []} />

          <Pagination
            page={page}
            handlePageChange={handlePageChange}
            pagesCount={data.info.pages}
          />
        </>
      )}
    </div>
  );
};
