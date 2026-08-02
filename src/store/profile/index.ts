import { fetchInstance } from "@/utils/fetch-instance";
import { create } from "zustand";
import { ProfileStore } from "./type";
import { ProfileType } from "@/types/profile";

export const useProfileStore = create<ProfileStore>()((set, get) => {
  return {
    isLoading: false,
    hasError: null,
    profile: null,

    getProfile: async () => {
      try {
        set({ isLoading: true, hasError: null });
        const { profile } = get();
        if (profile?._id) return;
        const response = await fetchInstance("api/v1/profile");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch getProfile: ${response?.url} ${response.status} ${errorText}`,
          );
        }
        if (response?.status === 200) {
          const result = await response.json();
          set({ isLoading: false, hasError: null, profile: result?.user });
        }
      } catch (error) {
        console.error(
          "getProfile error:",
          error instanceof Error ? error.message : error,
        );
        set({
          hasError: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
          profile: null,
        });
      }
    },

    setProfile: (profile: ProfileType) => set({ profile }),
  };
});
