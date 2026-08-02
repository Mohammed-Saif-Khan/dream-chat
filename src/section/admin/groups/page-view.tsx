import SubmitButton from "@/components/button/submit-button";
import { Plus } from "lucide-react";
import { AdminGroupRow } from "./columns";
import GroupsList from "./page-list";

type GroupsPageViewProps = {
  data: AdminGroupRow[];
  pageCount: number;
};

export default function GroupsPageView({
  data,
  pageCount,
}: GroupsPageViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Groups</h1>
          <p className="text-sm text-muted-foreground">
            Create group chats and choose who becomes the group admin
          </p>
        </div>
        <SubmitButton
          type="button"
          link="/admin/groups/form/new"
          startIcon={<Plus className="size-4" />}
          className="rounded-md"
        >
          Add Group
        </SubmitButton>
      </div>
      <GroupsList data={data} pageCount={pageCount} />
    </div>
  );
}
