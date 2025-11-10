import { fetchInstance } from "@/utils/fetch-instance";
import { redirect } from "next/navigation";

export const getProfile = async () => {
  try {
    const response = await fetchInstance("api/v1/profile");
    if (!response.ok) {
      if (response?.status === 401) {
        redirect("/auth/sign-in");
      }
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch getProfile: ${response?.url} ${response.status} ${errorText}`
      );
    }
    const result = await response.json();
    return result?.user;
  } catch (error) {
    console.log(
      "getProfile error:",
      error instanceof Error ? error.message : error
    );
  }
};
