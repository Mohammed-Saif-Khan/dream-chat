"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { fetchInstance } from "@/utils/fetch-instance";
import revalidate from "@/utils/revalidate";
import { Table } from "@tanstack/react-table";
import { Trash2Icon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DataTableAdvanceFilter from "./data-table-advance-filter";
import { DataTableViewOptions } from "./data-table-column-toolbar";
import DataTableSelectFilter from "./data-table-select-filter.tsx";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  search?: boolean;
  view?: boolean;
  deleteUrl?: string;
  pathRevalidate: string;
  filter?: boolean;
  toolbar?: React.ReactNode[];
  align?: string;
}

export default function DataTableToolbar<TData>({
  table,
  search,
  view,
  pathRevalidate,
  deleteUrl,
  filter,
  toolbar,
  align = "row",
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = React.useState(false);

  const handleGlobalFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    table.setGlobalFilter(value);
  };

  const allRowIds = table?.getFilteredSelectedRowModel()?.rows?.map((row) => {
    const original = row?.original as
      | { id?: string | number; _id?: string | number }
      | undefined;
    return original?.id ?? original?._id;
  });

  const onDelete = async () => {
    try {
      const response = await fetchInstance(`${deleteUrl}/${allRowIds}`, {
        method: "DELETE",
      });
      if (response?.status === 200) {
        await revalidate(pathRevalidate, "page");
        table.resetRowSelection();
        setOpen(false);
        toast.success("Delete Successfully");
      }
    } catch (error) {
      console.log("Error While Deleting the Product", error);
    }
  };

  const hasSelectFilters = table.getAllColumns().some((col) => {
    const meta = col.columnDef.meta as any;
    return meta?.variant === "multiselect" || meta?.variant === "singleselect";
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        {/* Row 1: Search + Actions */}
        <div className="flex w-full flex-wrap items-start justify-between gap-4">
          {/* Left Section */}
          <div
            className={cn(
              "flex min-w-0 flex-1 gap-3",
              align === "row" ? "flex-row" : "flex-col",
            )}
          >
            {search && (
              <Input
                className="w-full max-w-sm rounded-lg"
                placeholder="Search..."
                value={(table.getState()?.globalFilter as string) ?? ""}
                onChange={handleGlobalFilterChange}
              />
            )}

            {((toolbar && toolbar.length > 0) ||
              filter ||
              hasSelectFilters) && (
              <div className="flex flex-wrap items-center gap-2">
                {toolbar?.map((Component, index) => {
                  if (React.isValidElement(Component)) {
                    return React.cloneElement(
                      Component as React.ReactElement<any>,
                      {
                        table,
                        key: Component.key || index,
                      },
                    );
                  }
                  return (
                    <React.Fragment key={index}>{Component}</React.Fragment>
                  );
                })}

                {filter && <DataTableAdvanceFilter table={table} />}
                <DataTableSelectFilter table={table} />
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex shrink-0 items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                size="sm"
                className="rounded-lg hover:bg-destructive/20 hover:text-destructive"
              >
                <TrashIcon className="mr-2 size-4" />
                Delete ({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            )}

            {view && <DataTableViewOptions table={table} />}
          </div>
        </div>
      </div>
      <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete this item and cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)} variant="outline">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete()} variant="destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
