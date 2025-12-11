export type MessageType = {
  chatId?: string;
  avatar?: string;
  message: string;
  receiverId: string;
  senderId: { firstName: string; lastName: string; _id: string };
  time: string;
  status: "pending" | "sent" | "delivered" | "read" | string;
  _id: string;
  createdAt?: string;
  isDeleted: boolean;
  deletedAt: string | null;
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
  editMessage: (tempId: string, updateMsg: MessageType) => void;
  updateMessageStatus: (id: string, status: Partial<MessageType>) => void;
};
