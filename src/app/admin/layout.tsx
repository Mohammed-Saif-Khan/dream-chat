import AdminLayout from "@/layout/admin";
import { getProfile } from "@/services/profile";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return <AdminLayout profile={profile}>{children}</AdminLayout>;
}
