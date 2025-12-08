import { fetchInstance } from "@/utils/fetch";
import toast from "react-hot-toast";
import { create } from "zustand";
import { ChatlistStore } from "./type";

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

    updateChatlist: (receiverId, lastMessage, inComming = false) => {
      set((prev) => {
        const chatlist = [...prev?.chatlist];

        const index = chatlist?.findIndex(
          (f) => f?.participants?._id === receiverId
        );

        if (index === -1) return { chatlist };

        const updatedChat = {
          ...chatlist[index],
          lastMessage,
          unreadCount: inComming
            ? (chatlist[index]?.unreadCount || 0) + 1
            : chatlist[index]?.unreadCount,
        };

        chatlist.splice(index, 1);
        chatlist.unshift(updatedChat);

        return { chatlist };
      });
    },

    resetReadCount: (userId: string) => {
      set((prev) => {
        const chatlist = [...prev?.chatlist];

        const index = chatlist?.findIndex(
          (f) => f?.participants?._id === userId
        );

        chatlist[index] = {
          ...chatlist[index],
          unreadCount: 0,
        };

        return { chatlist };
      });
    },
  };
});
