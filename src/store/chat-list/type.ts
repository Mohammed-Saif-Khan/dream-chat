import { ChatMessagePayload } from "@/types/chat";

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
  createdAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
  senderId?: string;
}

export interface ChatItem {
  _id?: string;
  participants: Participant;
  createdAt?: string;
  updatedAt?: string;
  unreadCount: number;
  lastMessage: LastMessage | null;
}

export type StateType = {
  isLoading: boolean;
  hasError: Error | null;
  chatlist: ChatItem[];
};

export type ChatlistStore = StateType & {
  getChatlist: () => Promise<void>;
  upsertChat: (data: ChatMessagePayload, inComming?: boolean) => void;
  createChat: (data: ChatMessagePayload, inComming?: boolean) => void;
  updateExistingChat: (data: ChatMessagePayload, inComming?: boolean) => void;
  resetReadCount: (userId: string) => void;
  deleteChatlistMessage: (
    userId: string,
    type: string,
    prevMessage: string
  ) => void;
};
