import toast from "react-hot-toast";
import { create } from "zustand";
import { ChatItem, ChatlistStore } from "./type";
import { fetchInstance } from "@/utils/fetch-instance";

export const useChatlistStore = create<ChatlistStore>()((set, get) => {
  return {
    isLoading: false,
    hasError: null,
    chatlist: [],

    getChatlist: async () => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance("api/v1/chat/all-chats");
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

    upsertChat: (chatlistData, inComming = false) => {
      const { chatlist, createChat, updateExistingChat } =
        useChatlistStore.getState();

      const exists = chatlist.some((c) => c?._id === chatlistData.chatId);

      if (exists) {
        updateExistingChat(chatlistData, inComming);
      } else {
        createChat(chatlistData, inComming);
      }
    },

    createChat: (chatlistData, inComming = false) => {
      set((prev) => {
        const chatlist = [...prev.chatlist];

        const lastMessage = {
          _id: chatlistData._id,
          message: chatlistData.message,
          time: chatlistData.time,
          status: chatlistData.status,
          createdAt: chatlistData.createdAt,
          isDeleted: chatlistData.isDeleted,
          deletedAt: chatlistData.deletedAt,
        };

        const participantData = inComming
          ? {
              _id: chatlistData.senderId._id,
              firstName: chatlistData.senderId.firstName,
              lastName: chatlistData.senderId.lastName,
              avatar: chatlistData.avatar ?? null,
            }
          : {
              _id: chatlistData.receiverId._id,
              firstName: chatlistData.receiverId.firstName,
              lastName: chatlistData.receiverId.lastName,
              avatar: chatlistData.receiverAvtar ?? null,
            };

        const newChat: ChatItem = {
          _id: chatlistData.chatId,
          participants: participantData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          unreadCount: inComming ? 1 : 0,
          lastMessage,
        };

        return { chatlist: [newChat, ...chatlist] };
      });
    },

    updateExistingChat: (chatlistData, inComming = false) => {
      set((prev) => {
        const chatlist = [...prev.chatlist];

        const index = chatlist.findIndex((c) => c._id === chatlistData.chatId);

        if (index === -1) return prev;

        const lastMessage = {
          _id: chatlistData._id,
          message: chatlistData.message,
          time: chatlistData.time,
          status: chatlistData.status,
          createdAt: chatlistData.createdAt,
          isDeleted: chatlistData.isDeleted,
          deletedAt: chatlistData.deletedAt,
        };

        const updatedChat: ChatItem = {
          ...chatlist[index],
          lastMessage,
          unreadCount: inComming
            ? (chatlist[index]?.unreadCount || 0) + 1
            : chatlist[index]?.unreadCount,
          updatedAt: new Date().toISOString(),
        };

        chatlist.splice(index, 1);

        return { chatlist: [updatedChat, ...chatlist] };
      });
    },

    resetReadCount: (userId) => {
      set((prev) => {
        const chatlist = [...prev?.chatlist];

        const index = chatlist.findIndex((f) => f.participants._id === userId);

        if (index === -1) return { chatlist };

        chatlist[index] = {
          ...chatlist[index],
          unreadCount: 0,
        };

        return { chatlist };
      });
    },

    deleteChatlistMessage: (userId, type, prevMessage) => {
      set((prev) => {
        if (!prev.chatlist) return prev;
        console.log(prev, "prprprp");
        return {
          ...prev,
          chatlist: prev.chatlist.map((c) => {
            if (c.participants._id !== userId) return c;
            if (!c.lastMessage) return c;
            return {
              ...c,
              unreadCount:
                type === "soft"
                  ? c?.unreadCount
                  : Math.max((c?.unreadCount ?? 0) - 1, 0),
              lastMessage:
                type === "soft"
                  ? {
                      ...c.lastMessage,
                      isDeleted: true,
                    }
                  : {
                      ...c.lastMessage,
                      isDeleted: true,
                      deletedAt: new Date().toISOString(),
                      message: prevMessage,
                    },
            };
          }),
        };
      });
    },
  };
});
