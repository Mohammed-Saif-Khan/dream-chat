import { socket } from "@/socket";
import { useMessageStore } from "@/store/messages";
import { useChatlistStore } from "@/store/chat-list";
import { MessageType } from "@/store/messages/type";
import { deleteMessageType } from "@/types/message";
import { fetchInstance } from "@/utils/fetch-instance";

export const receiveMessageHandler =
  (receiverId: string, addMessage: (message: MessageType) => void) =>
  (data: MessageType) => {
    const { resetReadCount } = useChatlistStore.getState();

    if (data.senderId._id === receiverId) {
      addMessage(data);
      socket.emit("message-read", {
        senderId: data.senderId._id,
        messageId: data._id,
      });
      resetReadCount(data.senderId._id!);
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

export const handleMessageDelete = (data: deleteMessageType) => {
  const type = data?.delete;
  const prevMessage = data?.lastMessage?.message;
  const { deleteMessage } = useMessageStore.getState();
  const { deleteChatlistMessage } = useChatlistStore.getState();
  deleteMessage(data?.messageId, type);
  deleteChatlistMessage(data?.senderId, type, prevMessage);
};

export const readOldMessagesHandler = async (receiverId: string) => {
  if (!receiverId) return;

  try {
    const resposne = await fetchInstance("api/v1/message-read", {
      method: "POST",
      body: JSON.stringify({ senderId: receiverId }),
    });
    if (resposne?.status === 200) {
      const { resetReadCount } = useChatlistStore.getState();
      resetReadCount(receiverId);
    }
  } catch (error) {
    console.error("Failed to mark messages as read:", error);
  }
};
