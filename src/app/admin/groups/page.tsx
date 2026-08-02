export const dynamic = "force-dynamic";

import { GroupsPageView } from "@/section/admin/groups";
import { getAdminGroups } from "@/services/admin-groups";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const query = await searchParams;
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;

  const { data, pageCount } = await getAdminGroups(page, limit);

  return <GroupsPageView data={data} pageCount={pageCount} />;
}
