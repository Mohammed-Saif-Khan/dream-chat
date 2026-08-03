import { DataTable } from "@/components/data-table";
import { ChatUserRow, columns } from "./columns";
import { pathRevalidate } from "./constant";

type ChatUserSelectProps = {
  data: ChatUserRow[];
  pageCount: number;
};

export default function ChatUserSelect({
  data,
  pageCount,
}: ChatUserSelectProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold">Chats</h1>
        <p className="text-sm text-muted-foreground">
          Select a user to see who they have chatted with
        </p>
      </div>
      <DataTable<ChatUserRow, unknown>
        columns={columns}
        data={data}
        search
        pathRevalidate={pathRevalidate}
        pageCount={pageCount}
      />
    </div>
  );
}
