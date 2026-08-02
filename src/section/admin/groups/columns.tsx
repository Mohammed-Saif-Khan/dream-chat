"use client";

import AvatarDP from "@/components/avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import DataTableRowAction from "@/components/data-table/data-table-row-action";
import { formatDateTimeReadable } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { deleteUrl, pathRevalidate } from "./constant";

export interface AdminGroupRow {
  _id: string;
  groupName: string;
  groupAvatar?: string | null;
  admin: { _id: string; firstName: string; lastName: string } | null;
  participants: { _id: string; firstName: string; lastName: string }[];
  createdAt: string;
  [key: string]: unknown;
}

export const columns: ColumnDef<AdminGroupRow>[] = [
  {
    id: "name",
    accessorKey: "groupName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <AvatarDP
          src={row.original.groupAvatar}
          avatarSize="size-8"
          alt={row.original.groupName}
          fallback="G"
        />
        <span className="font-medium">{row.original.groupName}</span>
      </div>
    ),
  },
  {
    id: "members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Members" />
    ),
    cell: ({ row }) => `${row.original.participants?.length || 0} members`,
  },
  {
    id: "groupAdmin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Admin" />
    ),
    cell: ({ row }) =>
      row.original.admin
        ? `${row.original.admin.firstName} ${row.original.admin.lastName}`
        : "-",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
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
            label: "View",
            url: `/admin/groups/view/${row.original._id}`,
          },
          {
            label: "Messages",
            url: `/admin/groups/messages/${row.original._id}`,
          },
          {
            label: "Edit",
            url: `/admin/groups/form/${row.original._id}`,
          },
        ]}
      />
    ),
  },
];
