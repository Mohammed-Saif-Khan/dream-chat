"use client";

import AvatarDP from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import DataTableRowAction from "@/components/data-table/data-table-row-action";
import { getFallbackName } from "@/utils/getFallbackName";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { pathRevalidate } from "./constant";

export interface ChatUserRow {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  avatar?: string | null;
  [key: string]: unknown;
}

export const columns: ColumnDef<ChatUserRow>[] = [
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
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowAction
        id={row.original._id}
        pathRevalidate={pathRevalidate}
        isDelete={false}
        actions={[
          {
            label: "View Chats",
            url: `/admin/admin-chat/${row.original._id}`,
          },
        ]}
      />
    ),
  },
];
