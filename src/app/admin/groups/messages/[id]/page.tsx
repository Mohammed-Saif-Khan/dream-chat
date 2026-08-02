export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { GroupsPageMessages } from "@/section/admin/groups";
import {
  getAdminGroupById,
  getAdminGroupMessages,
} from "@/services/admin-groups";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [group, messages] = await Promise.all([
    getAdminGroupById(id),
    getAdminGroupMessages(id),
  ]);

  if (!group) {
    notFound();
  }

  return (
    <GroupsPageMessages
      groupName={group.groupName}
      groupAvatar={group.groupAvatar}
      messages={messages}
    />
  );
}
