"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
  TableOptions,
} from "@tanstack/react-table";
import React, { Suspense } from "react";
import CustomDataTable from "./custom-data-table";
import { DataTablePagination } from "./data-table-pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface DataTableProps<TData extends Record<string, unknown>, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: boolean;
  view?: boolean;
  deleteUrl?: string;
  pathRevalidate: string;
  expand?: boolean;
  filter?: boolean;
  toolbar?: React.ReactNode[] | ((table: Table<TData>) => React.ReactNode[]);
  permissions?: {
    canEdit?: boolean;
    canView?: boolean;
    canDelete?: boolean;
    canAdd?: boolean;
  };
  paginationSetting?: {
    pagination?: boolean;
    selectedText?: boolean;
    rowPerPage?: boolean;
    pageNumberof?: boolean;
    navigation?: boolean;
  };
  align?: string;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  initialColumnVisibility?: VisibilityState;
  pageCount?: number;
}

function DataTableInner<TData extends Record<string, unknown>, TValue>({
  search,
  columns,
  data,
  view,
  deleteUrl,
  expand,
  filter,
  toolbar,
  paginationSetting = {
    pagination: true,
    selectedText: true,
    rowPerPage: true,
    pageNumberof: true,
    navigation: true,
  },
  pathRevalidate,
  renderSubComponent,
  permissions,
  align,
  initialColumnVisibility,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    () => {
      const initialFilters: ColumnFiltersState = [];
      const columnIds = new Set(
        columns
          .map((col: any) => {
            if (col.accessorKey && typeof col.accessorKey === "string") {
              return col.accessorKey;
            }
            if (col.id) {
              return col.id;
            }
            return null;
          })
          .filter(Boolean),
      );

      const ignoredKeys = new Set([
        "page",
        "limit",
        "status",
        "fromDate",
        "toDate",
        "startDate",
        "endDate",
        "crewIds",
        "crewId",
        "opType",
        "clientId",
        "clientIdFilter",
        "datePreset",
      ]);

      searchParams.forEach((value, key) => {
        if (!ignoredKeys.has(key) && columnIds.has(key)) {
          initialFilters.push({ id: key, value });
        }
      });
      return initialFilters;
    },
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialColumnVisibility || {});
  const [rowSelection, setRowSelection] = React.useState({});

  const isServerSide = pageCount !== undefined;

  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");

  const pagination = React.useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: limit,
    }),
    [page, limit],
  );

  const onPaginationChange = React.useCallback(
    (updater: any) => {
      const nextState =
        typeof updater === "function" ? updater(pagination) : updater;
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(nextState.pageIndex + 1));
      params.set("limit", String(nextState.pageSize));
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, router, pagination],
  );

  const tableOptions: TableOptions<TData> = {
    data,
    columns,
    enableRowSelection: (row) => row.original.status !== "FINAL_STATUS",
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSubRows: (row) => row.subMenus as TData[] | undefined,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowCanExpand: () => true,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      permissions,
    },
  };

  if (isServerSide) {
    tableOptions.manualPagination = true;
    tableOptions.pageCount = pageCount;
    tableOptions.onPaginationChange = onPaginationChange;
    if (tableOptions.state) {
      tableOptions.state.pagination = pagination;
    }
  } else {
    tableOptions.getPaginationRowModel = getPaginationRowModel();
  }

  const table = useReactTable<TData>(tableOptions);

  // const visibleRows = table.getFilteredRowModel().rows;
  // const hasComplaintStatusColumn = columns.some(
  //   (col: any) =>
  //     col.accessorKey === "complaintStatus" || col.id === "complaintStatus",
  // );

  // React.useEffect(() => {
  //   if (!hasComplaintStatusColumn) return;
  //   const hasSent = visibleRows.some(
  //     (row) => (row.original as any).invoiceStatus === "Sent",
  //   );
  //   setColumnVisibility((prev) => {
  //     if (prev.complaintStatus === hasSent) return prev;
  //     return {
  //       ...prev,
  //       complaintStatus: hasSent,
  //     };
  //   });
  // }, [visibleRows, hasComplaintStatusColumn]);

  return (
    <div>
      <CustomDataTable<TData, TValue>
        align={align}
        table={table}
        columns={columns}
        expand={expand}
        search={search}
        view={view}
        filter={filter}
        deleteUrl={deleteUrl}
        toolbar={typeof toolbar === "function" ? toolbar(table) : toolbar}
        pathRevalidate={pathRevalidate}
        renderSubComponent={renderSubComponent}
      />
      {paginationSetting?.pagination &&
        table?.getRowModel().rows?.length > 0 && (
          <DataTablePagination
            table={table}
            paginationSetting={paginationSetting}
          />
        )}
    </div>
  );
}

export function DataTable<TData extends Record<string, unknown>, TValue>(
  props: DataTableProps<TData, TValue>,
) {
  return (
    <Suspense fallback={null}>
      <DataTableInner<TData, TValue> {...props} />
    </Suspense>
  );
}
