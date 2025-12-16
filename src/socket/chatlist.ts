import { useChatlistStore } from "@/store/chat-list";
import { ChatMessagePayload } from "@/types/chat";

export const handleChatlistSort = (data: ChatMessagePayload) => {
  const { upsertChat } = useChatlistStore.getState();
  upsertChat(data, true);
};
