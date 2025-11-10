import { create } from "zustand";

type LogoutStore = {
  logout: boolean;
  setLogout: (value: boolean) => void;
  resetLogout: () => void;
};

export const useLogoutStore = create<LogoutStore>((set) => ({
  logout: false,
  setLogout: (value) => set(() => ({ logout: value })),
  resetLogout: () => set({ logout: false }),
}));
