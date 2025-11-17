import { fetchInstance } from "@/utils/fetch-instance";

export const getUserExploreList = async () => {
  try {
    const response = await fetchInstance("api/v1/users");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getUserExploreList: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.allUsers;
  } catch (error) {
    console.log(
      "getUserExploreList error:",
      error instanceof Error ? error.message : error
    );
  }
};
