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

export const toggleGroupMemberRestriction = async (
  groupId: string,
  userId: string,
  restricted: boolean
) => {
  try {
    const response = await fetchInstance(
      `${listUrl}/${groupId}/members/${userId}/restrict`,
      {
        method: "PATCH",
        body: JSON.stringify({ restricted }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch toggleGroupMemberRestriction: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return { success: true, data: result?.data };
  } catch (error) {
    console.log(
      "toggleGroupMemberRestriction error:",
      error instanceof Error ? error.message : error
    );
    return { success: false, data: null };
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
