import { listUrl } from "@/section/admin/users/constant";
import { fetchInstance } from "@/utils/fetch-instance";

export const getAdminUsers = async (page = 1, limit = 10) => {
  try {
    const response = await fetchInstance(
      `${listUrl}?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getAdminUsers: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return { data: result?.data || [], pageCount: result?.pageCount || 1 };
  } catch (error) {
    console.log(
      "getAdminUsers error:",
      error instanceof Error ? error.message : error
    );
    return { data: [], pageCount: 1 };
  }
};

export const getAdminUserById = async (id: string) => {
  try {
    const response = await fetchInstance(`${listUrl}/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getAdminUserById: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.log(
      "getAdminUserById error:",
      error instanceof Error ? error.message : error
    );
  }
};
