export const dynamic = "force-dynamic";

import { GroupsPageForm } from "@/section/admin/groups";
import { getAdminGroupById } from "@/services/admin-groups";
import { getAdminUsers } from "@/services/admin-users";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [group, { data: users }] = await Promise.all([
    id && id !== "new" ? getAdminGroupById(id) : Promise.resolve(null),
    getAdminUsers(1, 1000),
  ]);

  return (
    <GroupsPageForm
      id={id}
      users={users}
      defaultValues={
        group
          ? {
              name: group.groupName,
              receiverIds: group.participants?.map((p: { _id: string }) => p._id) || [],
              groupAdmin: group.admin?._id || "",
            }
          : undefined
      }
    />
  );
}
