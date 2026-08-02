import SubmitButton from "@/components/button/submit-button";
import { Plus } from "lucide-react";
import { AdminUserRow } from "./columns";
import UsersList from "./page-list";

type UsersPageViewProps = {
  data: AdminUserRow[];
  pageCount: number;
};

export default function UsersPageView({ data, pageCount }: UsersPageViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage admin and standard user accounts
          </p>
        </div>
        <SubmitButton
          type="button"
          link="/admin/users/form/new"
          startIcon={<Plus className="size-4" />}
          className="rounded-md"
        >
          Add User
        </SubmitButton>
      </div>
      <UsersList data={data} pageCount={pageCount} />
    </div>
  );
}
