import { useCharacters } from "./hooks";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Character } from "./api/types.ts";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  page: number;
  name: string;
  status: string;
  onPageChange: (page: number) => void;
  onNameChange: (name: string) => void;
  onStatusChange: (status: string) => void;
};

const TestResultsComponent = ({
  page,
  name,
  status,
  onPageChange,
  onNameChange,
  onStatusChange,
}: Props) => {
  const { data, isLoading, isError, error } = useCharacters(page, name, status);

  const handleClear = () => {
    onPageChange(1);
    onNameChange("");
    onStatusChange("");
  };

  const columnHelper = createColumnHelper<Character>();

  const columns = [
    columnHelper.accessor("image", {
      header: "Avatar",
      cell: (info) => <img src={info.getValue()} alt="avatar" width={50} />,
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("species", {
      header: "Species",
    }),
  ];

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <div>
      <h1>Rick & Morty — characters</h1>

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
          onChange={(e) => onNameChange(e.target.value)}
        />

        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">Any status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">unknown</option>
        </select>

        <button onClick={handleClear}>Clear</button>
      </div>

      {isLoading && <p>Loading...</p>}

      {isError && <p style={{ color: "red" }}>Error: {error?.message}</p>}

      {data && (
        <>
          <table border={1} cellPadding={5} cellSpacing={0}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() =>
                    navigate({
                      to: "/characters/$characterId",
                      params: { characterId: row.original.id.toString() },
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
              Prev
            </button>

            <div>
              Page {page} / {data.info.pages}
            </div>

            <button
              onClick={() => onPageChange(page + 1)}
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

export default TestResultsComponent;
