import { listUrl } from "@/section/admin/groups/constant";
import { fetchInstance } from "@/utils/fetch-instance";

export const getAdminGroups = async (page = 1, limit = 10) => {
  try {
    const response = await fetchInstance(
      `${listUrl}?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getAdminGroups: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return { data: result?.data || [], pageCount: result?.pageCount || 1 };
  } catch (error) {
    console.log(
      "getAdminGroups error:",
      error instanceof Error ? error.message : error
    );
    return { data: [], pageCount: 1 };
  }
};

export const getAdminGroupById = async (id: string) => {
  try {
    const response = await fetchInstance(`${listUrl}/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getAdminGroupById: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.log(
      "getAdminGroupById error:",
      error instanceof Error ? error.message : error
    );
  }
};

export const getAdminGroupMessages = async (id: string) => {
  try {
    const response = await fetchInstance(`${listUrl}/${id}/messages`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getAdminGroupMessages: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.data || [];
  } catch (error) {
    console.log(
      "getAdminGroupMessages error:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
};
