export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { ChatView } from "@/section/admin/admin-chat";
import { getAdminChatMessages } from "@/services/admin-chats";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string; chatId: string }>;
}) {
  const { userId, chatId } = await params;
  const { chat, messages } = await getAdminChatMessages(chatId);

  if (!chat) {
    notFound();
  }

  const otherUser =
    (chat.participants || []).find(
      (p: { _id: string }) => String(p._id) !== userId
    ) || null;

  return <ChatView otherUser={otherUser} messages={messages} />;
}
