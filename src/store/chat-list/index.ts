import { fetchInstance } from "@/utils/fetch";
import toast from "react-hot-toast";
import { create } from "zustand";
import { ChatItem, ChatlistStore, LastMessage } from "./type";

export const useChatlistStore = create<ChatlistStore>()((set) => {
  return {
    isLoading: false,
    hasError: null,
    chatlist: [],

    getChatlist: async () => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance("api/v1/chat/all-chats", {
          auth: true,
          csr: true,
        });
        const result = await response.json();

        if (response?.status === 200) {
          set({ isLoading: false, chatlist: result?.chatlist });
        } else {
          set({
            isLoading: false,
            hasError: result?.message || "Failed to chat list",
          });
        }
      } catch (error) {
        toast.error("Unexpected error occurred");
        set({ hasError: error as Error, isLoading: false });
      }
    },

    updateChatlist: (receiverId, message, inComming = false) => {
      const lastMessage = {
        _id: message._id,
        message: message.message,
        time: message.time,
        status: message.status,
        createdAt: message.createdAt,
        isDeleted: message?.isDeleted,
        deletedAt: message?.deletedAt,
      };

      set((prev) => {
        const chatlist = [...prev.chatlist];

        const index = chatlist.findIndex(
          (f) => f.participants._id === receiverId
        );

        if (index !== -1) {
          const updatedChat: ChatItem = {
            ...chatlist[index],
            lastMessage,
            unreadCount: inComming
              ? (chatlist[index].unreadCount || 0) + 1
              : chatlist[index].unreadCount,
            updatedAt: new Date().toISOString(),
          };

          chatlist.splice(index, 1);
          return { chatlist: [updatedChat, ...chatlist] };
        }

        const newChat: ChatItem = {
          _id: message.chatId,
          participants: {
            _id: message.senderId._id,
            firstName: message.senderId.firstName,
            lastName: message.senderId.lastName,
            avatar: message.avatar ?? null,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          unreadCount: inComming ? 1 : 0,
          lastMessage,
        };

        return { chatlist: [newChat, ...chatlist] };
      });
    },

    resetReadCount: (userId: string) => {
      set((prev) => {
        const chatlist = [...prev.chatlist];

        const index = chatlist.findIndex((f) => f.participants._id === userId);

        if (index === -1) return { chatlist };

        chatlist[index] = {
          ...chatlist[index],
          unreadCount: 0,
        };

        return { chatlist };
      });
    },
  };
});
