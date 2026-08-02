import { DataTable } from "@/components/data-table";
import { AdminGroupRow, columns } from "./columns";
import { deleteUrl, pathRevalidate } from "./constant";

type GroupsListProps = {
  data: AdminGroupRow[];
  pageCount: number;
};

export default function GroupsList({ data, pageCount }: GroupsListProps) {
  return (
    <DataTable<AdminGroupRow, unknown>
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
