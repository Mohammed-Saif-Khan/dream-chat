import { fetchInstance } from "@/utils/fetch-instance";
import { nextCookies } from "@/utils/next-cookies";
import { redirect } from "next/navigation";

export const getProfile = async () => {
  const response = await fetchInstance("api/v1/profile");
  if (!response.ok) {
    if (response?.status === 401) {
      await nextCookies("token", undefined, "delete");
      redirect("/auth/sign-in");
    }
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch getProfile: ${response?.url} ${response.status} ${errorText}`
    );
  }
  const result = await response.json();
  return result?.user;
};
