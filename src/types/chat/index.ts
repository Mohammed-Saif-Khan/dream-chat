export interface ChatMessagePayload {
  _id: string;
  chatId: string;
  message: string;
  time: string;
  status: "sent" | "delivered" | "read";
  isDeleted: boolean;
  deletedAt: string | null;
  avatar: string | null;
  receiverAvtar: string | null;
  senderId: { firstName: string; lastName: string; _id: string };
  receiverId: { firstName: string; lastName: string; _id: string };
  createdAt: string;
  updatedAt: string;
}
