import { fetchInstance } from "@/utils/fetch-instance";

export const getProfile = async () => {
  try {
    const response = await fetchInstance("api/v1/profile");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getProfile: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return await result?.user;
  } catch (error) {
    console.error(
      "getProfile error:",
      error instanceof Error ? error.message : error
    );
  }
};
