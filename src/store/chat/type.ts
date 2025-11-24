export type MessageType = {
  message: string;
  receiverId: string;
  senderId: { firstName: string; lastName: string; _id: string };
  time: string;
  _id: string;
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
  editMessageId: (tempId: string, updateMsg: MessageType) => void;
};
