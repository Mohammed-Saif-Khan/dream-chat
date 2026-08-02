export const dynamic = "force-dynamic";

import { UsersPageForm } from "@/section/admin/users";
import { getAdminUserById } from "@/services/admin-users";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = id && id !== "new" ? await getAdminUserById(id) : null;

  return (
    <UsersPageForm
      id={id}
      defaultValues={
        user
          ? {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              role: user.role,
            }
          : undefined
      }
    />
  );
}
