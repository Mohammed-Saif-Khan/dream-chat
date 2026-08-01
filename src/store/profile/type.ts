import { ProfileType } from "@/types/profile";

export type StateType = {
  isLoading: boolean;
  hasError: Error | null;
  profile: ProfileType | null;
};

export type ProfileStore = StateType & {
  getProfile: (force?: boolean) => Promise<void>;
  setProfile: (profile: ProfileType) => void;
};
