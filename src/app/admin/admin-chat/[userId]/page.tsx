export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ChatList } from "@/section/admin/admin-chat";
import { getUserChats } from "@/services/admin-chats";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const { user, chats } = await getUserChats(userId);

  if (!user) {
    notFound();
  }

  return <ChatList user={user} chats={chats} />;
}
