export type deleteMessageType = {
  delete: string;
  messageId: string;
  receiverId: string;
  senderId: string;
  lastMessage: { message: string };
};
