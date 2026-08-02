import { fetchInstance } from "@/utils/fetch-instance";
import toast from "react-hot-toast";
import { create } from "zustand";
import { ChatStore } from "./type";

export const useMessageStore = create<ChatStore>()((set) => {
  return {
    isLoading: false,
    hasError: null,
    chat: null,
    reply: null,

    getMessages: async (id: string) => {
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

    deleteMessage: (messageId, type) => {
      set((prev) => {
        if (!prev.chat) return prev;

        return {
          ...prev,
          chat: {
            ...prev.chat,
            message: prev.chat.message.map((msg) =>
              msg._id === messageId
                ? {
                    ...msg,
                    ...(type === "soft"
                      ? { isDeleted: true }
                      : { deletedAt: new Date().toISOString() }),
                  }
                : msg
            ),
          },
        };
      });
    },

    toggleFavouriteMessage: (messageId: string) => {
      set((state) => {
        if (!state.chat) return state;

        return {
          ...state,
          chat: {
            ...state.chat,
            message: state.chat.message.map((msg) =>
              msg._id === messageId
                ? { ...msg, isFavorite: !msg.isFavorite }
                : msg
            ),
          },
        };
      });
    },

    setMessageReactions: (messageId, reactions) => {
      set((state) => {
        if (!state.chat) return state;

        return {
          ...state,
          chat: {
            ...state.chat,
            message: state.chat.message.map((msg) =>
              msg._id === messageId ? { ...msg, reactions } : msg
            ),
          },
        };
      });
    },

    setReply: (reply) => set({ reply }),
  };
});
