"use client";
import { create } from "zustand";

type ProfilePreviewState = {
  open: boolean;
  image: string;
  openPreview: (img: string) => void;
  closePreview: () => void;
};

export const useProfilePreviewStore = create<ProfilePreviewState>((set) => ({
  open: false,
  image: "",

  openPreview: (img) =>
    set({
      open: true,
      image: img,
    }),

  closePreview: () => {
    set((state) => ({
      ...state,
      open: false,
    }));
  },
}));
