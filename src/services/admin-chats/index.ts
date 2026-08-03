import { listUrl, usersUrl } from "@/section/admin/admin-chat/constant";
import { fetchInstance } from "@/utils/fetch-instance";

export const getUserChats = async (userId: string) => {
  try {
    const response = await fetchInstance(`${usersUrl}/${userId}/chats`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getUserChats: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.data || { user: null, chats: [] };
  } catch (error) {
    console.log(
      "getUserChats error:",
      error instanceof Error ? error.message : error
    );
    return { user: null, chats: [] };
  }
};

export const getAdminChatMessages = async (chatId: string) => {
  try {
    const response = await fetchInstance(`${listUrl}/${chatId}/messages`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getAdminChatMessages: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.data || { chat: null, messages: [] };
  } catch (error) {
    console.log(
      "getAdminChatMessages error:",
      error instanceof Error ? error.message : error
    );
    return { chat: null, messages: [] };
  }
};
