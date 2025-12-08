import { MessageType } from "../chat/type";

export interface Participant {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface LastMessage {
  _id: string;
  message: string;
  time: string;
  status: "sent" | "delivered" | "read" | string;
  createdAt?: string;
}

export interface ChatItem {
  _id: string;
  participants: Participant;
  createdAt: string;
  updatedAt: string;
  __v: number;
  unreadCount: number;
  lastMessage: LastMessage | null;
}

export type StateType = {
  isLoading: boolean;
  hasError: Error | null;
  chatlist: ChatItem[] | [];
};

export type ChatlistStore = StateType & {
  getChatlist: () => Promise<void>;
  updateChatlist: (
    receiverId: string,
    lastMessage: LastMessage,
    inComming: boolean
  ) => void;
  resetReadCount: (userId: string) => void;
};
