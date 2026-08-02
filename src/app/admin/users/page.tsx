export const dynamic = "force-dynamic";

import { getAdminUsers } from "@/services/admin-users";
import { UsersPageView } from "@/section/admin/users";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const query = await searchParams;
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;

  const { data, pageCount } = await getAdminUsers(page, limit);

  return <UsersPageView data={data} pageCount={pageCount} />;
}
