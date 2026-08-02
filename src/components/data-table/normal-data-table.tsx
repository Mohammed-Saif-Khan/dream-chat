import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  Table as ReactTable,
  Row,
} from "@tanstack/react-table";
import Image from "next/image";
import DataTableToolbar from "./data-table-toolbar";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: ReactTable<TData>;
  search?: boolean;
  view?: boolean;
  deleteUrl?: string;
  pathRevalidate: string;
  expand?: boolean;
  export?: boolean;
  filter?: boolean;
  align?: string;
  toolbar?: React.ReactNode[];
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
}

export default function CustomDataTable<TData, TValue>({
  table,
  columns,
  search,
  view,
  filter,
  deleteUrl,
  pathRevalidate,
  toolbar,
  align,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
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

  function formatDate(dateString: string): React.ReactNode {
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat("en-AE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Dubai",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("en-AE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dubai",
    }).format(date);

    return (
      <div className="flex flex-col">
        <span className="text-sm">{formattedDate}</span>
        <span className="text-xs text-muted-foreground">{formattedTime}</span>
      </div>
    );
  }

  return (
    <div>
      <div className={cn(search && view && "my-1")}>
        <DataTableToolbar
          align={align}
          table={table}
          search={search}
          view={view}
          filter={filter}
          deleteUrl={deleteUrl}
          toolbar={toolbar}
          pathRevalidate={pathRevalidate}
        />
      </div>
      <div className="rounded-lg border overflow-x-auto w-full">
        <Table className="min-w-max w-full">
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow
                key={headerGroup?.id}
                className="bg-primary hover:bg-primary"
              >
                {headerGroup?.headers?.map((header) => (
                  <TableHead
                    key={header?.id}
                    className="text-sm font-semibold text-white"
                  >
                    {header?.isPlaceholder
                      ? null
                      : flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row?.getIsSelected() && "selected"}
                    className={cn(
                      (row.original as any).isCancel &&
                        "opacity-60 bg-red-500/5 dark:bg-red-500/10 line-through text-muted-foreground decoration-red-500/70",
                    )}
                  >
                    {row?.getVisibleCells().map((cell) => (
                      <TableCell key={cell?.id} className="text-sm font-normal">
                        {isImageUrl(cell?.getValue() as string) ? (
                          <Image
                            src={cell?.getValue() as string}
                            alt="Image"
                            width={55}
                            height={55}
                            objectFit="cover"
                          />
                        ) : cell.column.columnDef.cell === undefined &&
                          typeof cell.getValue() === "string" &&
                          (cell.getValue() as string).match(
                            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
                          ) ? (
                          formatDate(cell?.getValue() as string)
                        ) : (
                          flexRender(
                            cell?.column?.columnDef?.cell,
                            cell?.getContext(),
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* EXPANDED SUB-ROW (Only renders if row is expanded and prop is provided) */}
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow>
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="p-0 bg-muted/20"
                      >
                        {renderSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
