import { socket } from "@/socket";
import { useChatlistStore } from "@/store/chat-list";
import { MessageType } from "@/store/chat/type";
import { fetchInstance } from "@/utils/fetch-instance";

export const receiveMessageHandler =
  (receiverId: string, addMessage: (message: MessageType) => void) =>
  (data: MessageType) => {
    const { resetReadCount } = useChatlistStore.getState();
    // If the message is from the person we are chatting with → mark as read
    if (data.senderId._id === receiverId) {
      addMessage(data);
      socket.emit("message-read", {
        senderId: data.senderId._id,
        messageId: data._id,
      });
      resetReadCount(data?.senderId?._id);
    }
  };

export const deliveredHandler =
  (updateMessageStatus: (id: string, status: Partial<MessageType>) => void) =>
  ({ messageIds }: { messageIds: string[] }) => {
    messageIds?.forEach((id) => {
      updateMessageStatus(id, { status: "delivered" });
    });
  };

export const readHandler =
  (updateMessageStatus: (id: string, status: Partial<MessageType>) => void) =>
  ({ messageIds }: { messageIds: string[] }) => {
    messageIds?.forEach((id) => {
      updateMessageStatus(id, { status: "read" });
    });
  };

export const readOldMessagesHandler = async (receiverId: string) => {
  if (!receiverId) return;

  try {
    const response = await fetchInstance("api/v1/message-read", {
      method: "POST",
      body: JSON.stringify({ senderId: receiverId }),
    });
    if (response?.status === 200) {
      const { resetReadCount } = useChatlistStore.getState();
      resetReadCount(receiverId);
    }
  } catch (error) {
    console.error("Failed to mark messages as read:", error);
  }
};
