import { useChatlistStore } from "@/store/chat-list";
import { MessageType } from "@/store/chat/type";

export const handleChatlistSort = (data: MessageType) => {
  const { updateChatlist } = useChatlistStore.getState();
  updateChatlist(data.senderId._id, data, true);
};
