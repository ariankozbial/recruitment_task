import { useCharacters } from "../../../hooks";
import { useRef } from "react";
import { CharactersTable } from "./CharactersTable.tsx";

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

  const showData = data && !isLoading && !isFetching;

  return (
    <div>
      <h1>Rick & Morty characters</h1>
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          placeholder="Filter by name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">unknown</option>
        </select>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleRefresh} disabled={isLoading || isFetching}>
          Refresh
        </button>
      </div>

      {(isLoading || isFetching) && <p>Loading...</p>}

      {isError && <p>{error?.message}</p>}

      {showData && (
        <>
          <CharactersTable characters={data?.results || []} />
          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Prev
            </button>
            <div>
              Page {page} / {data.info.pages}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= data.info.pages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
