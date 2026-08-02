"use client";

import AvatarDP from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import DataTableRowAction from "@/components/data-table/data-table-row-action";
import { getFallbackName } from "@/utils/getFallbackName";
import { formatDateTimeReadable } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { deleteUrl, pathRevalidate } from "./constant";
import { cn } from "@/lib/utils";

export interface AdminUserRow {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  createdAt: string;
  avatar?: string | null;
  [key: string]: unknown;
}

export const columns: ColumnDef<AdminUserRow>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const fallbackName = getFallbackName(
        row.original.firstName,
        row.original.lastName,
      );
      return (
        <div className="flex items-center gap-2">
          <AvatarDP
            src={row.original.avatar}
            avatarSize="size-8"
            alt={fallbackName}
            fallback={fallbackName}
          />
          <span className="font-medium">
            {row.original.firstName} {row.original.lastName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.role === "admin" ? "default" : "secondary"}
        className={cn(row?.original?.role === "admin" && "text-white")}
      >
        {row.original.role === "admin" ? "Admin" : "Standard User"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => formatDateTimeReadable(row.original.createdAt),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowAction
        id={row.original._id}
        deleteUrl={deleteUrl}
        pathRevalidate={pathRevalidate}
        actions={[
          {
            label: "Edit",
            url: `/admin/users/form/${row.original._id}`,
          },
        ]}
      />
    ),
  },
];
