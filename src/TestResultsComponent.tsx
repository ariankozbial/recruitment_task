import { useState } from "react";
import { useCharacters } from "./hooks";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Character } from "./api/types.ts";

export default function TestResultsComponent() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError, error } = useCharacters(page, name, status);

  const handleClear = () => {
    setPage(1);
    setName("");
    setStatus("");
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
          onChange={(e) => setName(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
                <tr key={row.id}>
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
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Prev
            </button>

            <div>
              Page {page} / {data.info.pages}
            </div>

            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={page >= data.info.pages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
