"use client";

import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  asc?: string;
  desc?: string;
  dropdown?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  asc = "Asc",
  desc = "Desc",
  dropdown = false,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const isSorted = column.getIsSorted();

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    column.toggleSorting(isSorted === "asc");
  };

  if (!dropdown) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={handleSort}
        >
          <span>{title}</span>
          {isSorted === "desc" ? (
            <ArrowDown className="ml-2 h-3.5 w-3.5" />
          ) : (
            <ArrowUp className="ml-2 h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-3.5 w-3.5" />
            ) : isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-3.5 w-3.5" />
            ) : (
              <ChevronsUpDown className="ml-2 h-3.5 w-3.5" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70 mr-2" />
            {asc}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70 mr-2" />
            {desc}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70 mr-2" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
