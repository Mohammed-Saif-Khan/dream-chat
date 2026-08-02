export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { GroupsPageDetail } from "@/section/admin/groups";
import { getAdminGroupById } from "@/services/admin-groups";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const group = await getAdminGroupById(id);

  if (!group) {
    notFound();
  }

  return <GroupsPageDetail group={group} />;
}
