import { fetchInstance } from "@/utils/fetch-instance";

export const getUserDetails = async (userId: string) => {
  try {
    const response = await fetchInstance(`api/v1/users/${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getUserDetails: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    console.log("userDetail Success", result);
    // return result?.user;
  } catch (error) {
    console.log(
      "getUserDetails error:",
      error instanceof Error ? error.message : error
    );
  }
};
