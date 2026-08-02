"use client";
import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ExpandDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: ReactTable<TData>;
}

export default function ExpandDataTable<
  TData extends Record<string, unknown>,
  TValue
>({ table, columns }: ExpandDataTableProps<TData, TValue>) {
  const [openRow, setOpenRow] = React.useState<string | null>(null);

  function isImageUrl(url: string | undefined | null) {
    return (
      typeof url === "string" &&
      (url.startsWith("/") ||
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("data:") ||
        url.startsWith("blob:")) &&
      url.match(/\.(jpeg|jpg|gif|png|bmp|webp)$/i) !== null
    );
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-AE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Dubai",
    });
  }

  function getNestedArrayKey<T extends Record<string, unknown>>(
    obj: T
  ): keyof T | null {
    for (const key in obj) {
      const value = obj[key];
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === "object" &&
        !Array.isArray(value[0])
      ) {
        return key as keyof T;
      }
    }
    return null;
  }

  const handleRowClick = (id: string) => {
    setOpenRow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table className="min-w-max w-full">
        <TableHeader>
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup?.headers?.map((header) => (
                <TableHead
                  key={header?.id}
                  className="text-black text-sm font-semibold"
                >
                  {header?.isPlaceholder
                    ? null
                    : flexRender(
                        header?.column?.columnDef?.header,
                        header?.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            [...table.getRowModel().rows].reverse().map((row) => {
              const rowId = String(row.id);
              const isOpen = openRow === rowId;
              const nestedKey = getNestedArrayKey(row.original);
              const nestedArray = nestedKey ? row.original[nestedKey] : [];

              return (
                <React.Fragment key={rowId}>
                  <TableRow
                    onClick={() => handleRowClick(rowId)}
                    className="cursor-pointer"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-sm font-normal text-black"
                      >
                        {isImageUrl(cell.getValue() as string) ? (
                          <Image
                            src={cell.getValue() as string}
                            alt="Image"
                            width={55}
                            height={55}
                            style={{ objectFit: "cover" }}
                          />
                        ) : cell.column.columnDef.cell === undefined &&
                          typeof cell.getValue() === "string" &&
                          (cell.getValue() as string).match(
                            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
                          ) ? (
                          formatDate(cell.getValue() as string)
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={row.getVisibleCells().length}
                      className="p-0 border-none"
                    >
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-[1000px]" : "max-h-0"
                        }`}
                      >
                        {Array.isArray(nestedArray) &&
                        nestedArray.length > 0 ? (
                          <div className="p-4 space-y-6">
                            {/* Nested Table */}
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  {Object.keys(nestedArray[0]).map((key) => (
                                    <TableHead
                                      key={key}
                                      className="text-[#4c4c5c] text-sm font-semibold capitalize"
                                    >
                                      {key}
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {nestedArray.map((item, i) => (
                                  <TableRow key={i}>
                                    {Object.values(item).map((value, j) => (
                                      <TableCell
                                        key={j}
                                        className="text-sm text-[#4c4c5c]"
                                      >
                                        {typeof value === "string" ||
                                        typeof value === "number" ||
                                        typeof value === "boolean"
                                          ? String(value)
                                          : JSON.stringify(value)}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground px-4 py-2">
                            No nested data found.
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
