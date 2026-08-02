import { DataTable } from "@/components/data-table";
import { AdminUserRow, columns } from "./columns";
import { deleteUrl, pathRevalidate } from "./constant";

type UsersListProps = {
  data: AdminUserRow[];
  pageCount: number;
};

export default function UsersList({ data, pageCount }: UsersListProps) {
  return (
    <DataTable<AdminUserRow, unknown>
      columns={columns}
      data={data}
      search
      view
      deleteUrl={deleteUrl}
      pathRevalidate={pathRevalidate}
      pageCount={pageCount}
    />
  );
}
