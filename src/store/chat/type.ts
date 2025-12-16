export type MessageType = {
  chatId?: string;
  avatar?: string;
  message: string;
  senderId: { firstName: string; lastName: string; _id: string };
  receiverId: { firstName: string; lastName: string; _id: string };
  time: string;
  status: "pending" | "sent" | "delivered" | "read" | string;
  _id: string;
  createdAt?: string;
  isDeleted: boolean;
  deletedAt: string | null;
  receiverAvtar: string;
};

export type ChatType = {
  message: MessageType[];
  participants: string[];
  _id: string;
};

export type StateType = {
  isLoading: boolean;
  hasError: Error | null;
  chat: ChatType | null;
};

export type ChatStore = StateType & {
  getChat: (id: string) => Promise<void>;
  addMessage: (message: MessageType) => void;
  editMessage: (tempId: string, updateMsg: any) => void;
  updateMessageStatus: (id: string, status: Partial<MessageType>) => void;
  deleteMessage: (messageId: string, type: string) => void;
};
