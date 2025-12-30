import { MessageType, ReplyMessage } from "@/store/messages/type";

type FavMessage = {
  _id: string;
  message: string;
  isFavorite: boolean;
  status: "sent" | "delivered" | "read";
  senderId: {
    _id: string;
    firstName: string;
    lastName: string;
    profile: { avatar: string };
  };
  receiverId: {
    _id: string;
    firstName: string;
    lastName: string;
    profile: { avatar: string };
  };
  replyTo: ReplyMessage | null;
  time: string; // "09:10 PM"
  createdAt: string; // ISO string
  updatedAt: string; // ISO string};
};

export type favouriteType = {
  _id: string;
  user: string;
  chat: string;
  createdAt: string;
  message: FavMessage;
  updatedAt: string;
};
