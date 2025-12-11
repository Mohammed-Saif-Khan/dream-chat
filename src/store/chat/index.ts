import { fetchInstance } from "@/utils/fetch-instance";
import toast from "react-hot-toast";
import { create } from "zustand";
import { ChatStore } from "./type";

export const useChatStore = create<ChatStore>()((set) => {
  return {
    isLoading: false,
    hasError: null,
    chat: null,

    getChat: async (id: string) => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance(`api/v1/chat/${id}`);
        const result = await response.json();
        if (response?.status === 200) {
          set({ isLoading: false, hasError: null, chat: result?.data });
        } else {
          set({
            isLoading: false,
            hasError: result?.message || "Failed to load messages",
          });
        }
      } catch (error) {
        toast.error("Unexpected error occurred");
        set({ hasError: error as Error, isLoading: false });
      }
    },

    addMessage: (message: any) => {
      set((prev) => ({
        ...prev,
        chat: {
          ...prev.chat!,
          message: [...(prev.chat?.message || []), message],
        },
      }));
    },

    editMessage: (tempId, updateMsg) => {
      set((state) => ({
        ...state,
        chat: {
          ...state.chat!,
          message: (state?.chat?.message || []).map((msg) => {
            if (msg?._id === tempId) {
              return {
                ...msg,
                ...updateMsg,
              };
            }
            return msg;
          }),
        },
      }));
    },

    updateMessageStatus: (id, status) => {
      set((prev) => ({
        ...prev,
        chat: {
          ...prev.chat!,
          message: [...(prev?.chat?.message || [])].map((msg) => {
            if (msg?._id === id) {
              return {
                ...msg,
                ...status,
              };
            }
            return msg;
          }),
        },
      }));
    },
  };
});
