import { fetchInstance } from "@/utils/fetch-instance";

export const getProfile = async () => {
  const response = await fetchInstance("api/v1/profile");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch getProfile: ${response?.url} ${response.status} ${errorText}`
    );
  }
  const result = await response.json();
  return result?.user;
};
