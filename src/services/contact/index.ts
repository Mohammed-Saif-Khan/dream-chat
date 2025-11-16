import { fetchInstance } from "@/utils/fetch-instance";

export const getUserContactList = async () => {
  try {
    const response = await fetchInstance("api/v1/users");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getUserContactList: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.allUsers;
  } catch (error) {
    console.log(
      "getUserContactList error:",
      error instanceof Error ? error.message : error
    );
  }
};
