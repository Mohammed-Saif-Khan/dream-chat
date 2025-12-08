import { useChatlistStore } from "@/store/chat-list";
import { MessageType } from "@/store/chat/type";

export const handleChatlistSort = (data: MessageType) => {
  const { updateChatlist } = useChatlistStore.getState();
  const lastMessage = {
    _id: data?._id,
    message: data?.message,
    time: data?.time,
    status: data?.status,
    createdAt: data?.createdAt,
  };
  updateChatlist(data?.senderId?._id, lastMessage, true);
};
