import { Table } from "@tanstack/react-table";
import React, { ComponentType, SVGProps } from "react";
import MultiSelectFilter from "./multi-select-filter";
import SingleSelectFilter from "./single-select-filter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DataTableSelectFilterProps<TData> {
  table: Table<TData>;
}

export type ColumnMeta = {
  variant?: string;
  label?: string;
};

export type Options = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type ColumnMetaOption = {
  label: string;
  options: Options[];
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  autoOptionsFromKey?: string;
};

export default function DataTableSelectFilter<TData>({
  table,
}: DataTableSelectFilterProps<TData>) {
  const multiSelectFilter = table
    .getAllColumns()
    .filter(
      (col) => (col.columnDef.meta as ColumnMeta)?.variant === "multiselect",
    );

  const singleSelectFilter = table
    .getAllColumns()
    .filter(
      (col) => (col.columnDef.meta as ColumnMeta)?.variant === "singleselect",
    );

  const isAnyFilterActive = table.getState().columnFilters.length > 0;

  const handleReset = () => {
    table.resetColumnFilters();
  };

  return (
    <div className="flex items-center gap-2">
      {/* Single Select Filters */}
      {singleSelectFilter.map((column) => {
        const meta = column.columnDef.meta as ColumnMetaOption;

        if (!meta) return null;

        let options = meta.options || [];

        // Auto-generate options if required
        if (meta.autoOptionsFromKey) {
          const rawValues = table
            .getPreFilteredRowModel()
            .rows.map((row) => {
              // First try the flat key on row.original (active users path)
              const fromOriginal =
                row.original[meta.autoOptionsFromKey as keyof TData];
              if (fromOriginal !== undefined && fromOriginal !== null) {
                return fromOriginal;
              }
              // Fallback: use the column's accessor value (works for accessorFn / nested data)
              const col = table
                .getAllColumns()
                .find((c) => c.id === meta.autoOptionsFromKey);
              return col ? row.getValue(col.id) : undefined;
            });

          const values = Array.from(
            new Set(rawValues.filter((v) => v !== undefined && v !== null)),
          );

          options = values.map((v) => ({
            label: String(v),
            value: String(v),
          }));
        }

        const filterValue = column.getFilterValue();

        const selected =
          options.find(
            (option) => String(option.value) === String(filterValue),
          ) || null;

        return (
          <SingleSelectFilter
            key={column.id}
            options={{
              label: meta.label,
              options,
              icon: meta.icon,
            }}
            selected={selected}
            onChange={(value) => {
              column.setFilterValue(value);
            }}
          />
        );
      })}

      {/* Multi Select Filters */}
      {multiSelectFilter.map((column) => {
        const meta = column.columnDef.meta as ColumnMetaOption;

        if (!meta) return null;

        let options = meta.options || [];

        if (meta.autoOptionsFromKey) {
          const rawValues = table
            .getPreFilteredRowModel()
            .rows.map((row) => {
              const fromOriginal =
                row.original[meta.autoOptionsFromKey as keyof TData];
              if (fromOriginal !== undefined && fromOriginal !== null) {
                return fromOriginal;
              }
              const col = table
                .getAllColumns()
                .find((c) => c.id === meta.autoOptionsFromKey);
              return col ? row.getValue(col.id) : undefined;
            });

          const values = Array.from(
            new Set(rawValues.filter((v) => v !== undefined && v !== null)),
          );

          options = values.map((v) => ({
            label: String(v),
            value: String(v),
          }));
        }

        const filterValue = column.getFilterValue();
        const selectedValues = Array.isArray(filterValue) ? filterValue : [];

        return (
          <MultiSelectFilter
            key={column.id}
            options={{
              label: meta.label,
              options,
              icon: meta.icon,
            }}
            selected={selectedValues}
            onChange={(value) => {
              column.setFilterValue(value.length ? value : undefined);
            }}
          />
        );
      })}

      {/* Reset Button */}
      {isAnyFilterActive && (
        <Button
          variant="outline"
          onClick={handleReset}
          className="gap-2 border-dashed border-gray-300 cursor-pointer"
        >
          <X className="h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
