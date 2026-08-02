import { ColumnDef, Table as ReactTable, Row } from "@tanstack/react-table";
import React from "react";
import ExpandDataTable from "./expand-data-table";
import NormalDataTable from "./normal-data-table";

interface DataTableProps<TData extends Record<string, unknown>, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: ReactTable<TData>;
  expand?: boolean;
  search?: boolean;
  view?: boolean;
  deleteUrl?: string;
  pathRevalidate: string;
  filter?: boolean;
  align?: string;
  toolbar?: React.ReactNode[];
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
}

export default function CustomDataTable<
  TData extends Record<string, unknown>,
  TValue,
>({
  table,
  columns,
  expand,
  search,
  view,
  pathRevalidate,
  deleteUrl,
  filter,
  toolbar,
  align,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  return (
    <div>
      {expand ? (
        <ExpandDataTable<TData, TValue> table={table} columns={columns} />
      ) : (
        <NormalDataTable<TData, TValue>
          table={table}
          align={align}
          columns={columns}
          search={search}
          view={view}
          filter={filter}
          deleteUrl={deleteUrl}
          pathRevalidate={pathRevalidate}
          toolbar={toolbar}
          renderSubComponent={renderSubComponent}
        />
      )}
    </div>
  );
}
