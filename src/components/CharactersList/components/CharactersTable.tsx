import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Character } from "../../../types.ts";
import { useNavigate } from "@tanstack/react-router";

export const CharactersTable = ({
  characters,
}: {
  characters: Character[];
}) => {
  const navigate = useNavigate();
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
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
