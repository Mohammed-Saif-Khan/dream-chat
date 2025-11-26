import { MessageType } from "@/store/chat/type";
import { socket } from "@/socket";
import { fetchInstance } from "@/utils/fetch-instance";

export const receiveMessageHandler =
  (receiverId: string, addMessage: (message: MessageType) => void) =>
  (data: MessageType) => {
    addMessage(data);

    // If the message is from the person we are chatting with → mark as read
    if (data.senderId._id === receiverId) {
      socket.emit("message-read", {
        senderId: data.senderId._id,
        messageId: data._id,
      });
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
    await fetchInstance("api/v1/message-read", {
      method: "POST",
      body: JSON.stringify({ senderId: receiverId }),
    });
  } catch (error) {
    console.error("Failed to mark messages as read:", error);
  }
};
