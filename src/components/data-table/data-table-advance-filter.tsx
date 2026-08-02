import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { Check, ChevronsUpDown, ListFilter, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DataTableAdvanceFilterProps<TData> {
  table: Table<TData>;
}

export default function DataTableAdvanceFilter<TData>({
  table,
}: DataTableAdvanceFilterProps<TData>) {
  const [filters, setFilters] = React.useState<
    { column: string | null; value: string }[]
  >([{ column: null, value: "" }]);

  const handleResetFilters = () => {
    setFilters([{ column: null, value: "" }]);
    table.resetColumnFilters();
  };

  const handleApplyFilters = () => {
    table.resetColumnFilters();
    filters.forEach((f) => {
      if (f.column) {
        table.getColumn(f.column)?.setFilterValue(f.value || undefined);
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ListFilter className="mr-2" />
          Advance Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-full max-w-[var(--radix-popover-content-available-width)] flex-col gap-3.5 p-4 sm:min-w-[500px] rounded-lg"
      >
        <div className="flex flex-col gap-1">
          <h4 className="font-medium leading-none text-sm">Filters</h4>
        </div>

        {/* Filter rows */}
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Column select */}
            <FieldContent<TData>
              table={table}
              selectedColumn={filter.column}
              onSelectColumn={(col) =>
                setFilters((prev) =>
                  prev.map((f, i) => (i === index ? { ...f, column: col } : f)),
                )
              }
            />

            {/* <SelectContentFilter /> */}

            {/* Value input */}
            <TextFilter
              value={filter.value}
              onChange={(val) =>
                setFilters((prev) =>
                  prev.map((f, i) => (i === index ? { ...f, value: val } : f)),
                )
              }
              disabled={!filter.column}
            />

            {/* Delete row */}
            <DeleteIcon
              onClick={() =>
                setFilters((prev) => prev.filter((_, i) => i !== index))
              }
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="space-x-3 mt-2">
          <Button
            size="sm"
            className="rounded-lg"
            onClick={() =>
              setFilters((prev) => [...prev, { column: null, value: "" }])
            }
          >
            Add Filter
          </Button>
          <Button
            disabled={filters?.length === 0 ? true : false}
            size="sm"
            className="rounded-lg"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ---------- Field Selector ----------
interface FieldContentProps<TData> {
  table: Table<TData>;
  selectedColumn: string | null;
  onSelectColumn: (columnId: string) => void;
}

type ColumnMeta = {
  variant?: string;
  label?: string;
  filter?: boolean;
};

export function FieldContent<TData>({
  table,
  selectedColumn,
  onSelectColumn,
}: FieldContentProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter(
      (col) =>
        col.getCanHide() &&
        col.columnDef.enableColumnFilter !== false &&
        ((col.columnDef.meta as ColumnMeta)?.label || col.columnDef.header) &&
        col.id !== "actions",
    )
    .map((col) => ({
      id: col.id,
      title:
        (col.columnDef.meta as ColumnMeta)?.label ??
        String(col.columnDef.header),
    }));
  return (
    <div className="flex items-center max-h-[300px] gap-2 overflow-y-auto p-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-32 h-8 justify-between rounded text-sm font-normal",
              selectedColumn ? "text-black" : "text-muted-foreground",
            )}
          >
            {selectedColumn
              ? columns.find((c) => c.id === selectedColumn)?.title
              : "Select"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0">
          <Command>
            <CommandInput placeholder="Search fields..." className="h-9" />
            <CommandList>
              <CommandEmpty>No field found.</CommandEmpty>
              <CommandGroup>
                {columns.map((col) => (
                  <CommandItem
                    key={col.id}
                    onSelect={() => onSelectColumn(col.id)}
                    className="flex justify-between items-center"
                  >
                    {col.title}
                    {selectedColumn === col.id && <Check />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// export function SelectContentFilter() {
//   return (
//     <Select>
//       <SelectTrigger
//         size="sm"
//         className="w-32 h-8 justify-between rounded text-sm font-normal cursor-pointer"
//       >
//         <SelectValue placeholder="Select a fruit" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Fruits</SelectLabel>
//           <SelectItem value="apple">Apple</SelectItem>
//           <SelectItem value="banana">Banana</SelectItem>
//           <SelectItem value="blueberry">Blueberry</SelectItem>
//           <SelectItem value="grapes">Grapes</SelectItem>
//           <SelectItem value="pineapple">Pineapple</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }

// ---------- Text Input ----------
interface TextFilterProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export function TextFilter({ value, onChange, disabled }: TextFilterProps) {
  return (
    <Input
      placeholder="Enter the value..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-32 h-8 rounded min-w-52 flex-1 mx-1"
    />
  );
}

// ---------- Delete Icon ----------
export function DeleteIcon({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="size-8 rounded hover:!bg-red-500 hover:text-white"
      onClick={onClick}
    >
      <Trash2 />
    </Button>
  );
}
