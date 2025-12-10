import { useChatlistStore } from "@/store/chat-list";
import { MessageType } from "@/store/chat/type";
import { useProfileStore } from "@/store/profile";

export const handleChatlistSort = (data: MessageType) => {
  const { updateChatlist } = useChatlistStore.getState();
  const { profile } = useProfileStore.getState();
  if (data?.senderId?._id === profile?._id) {
    updateChatlist(data.senderId._id, data, false);
  }
  updateChatlist(data.senderId._id, data, true);
};
