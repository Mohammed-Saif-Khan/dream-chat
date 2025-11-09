import { fetchInstance } from "@/utils/fetch-instance";
import toast from "react-hot-toast";
import { create } from "zustand";
import { AuthStore } from "./type";
import { nextCookies } from "@/utils/next-cookies";

export const useAuthStore = create<AuthStore>()((set) => {
  return {
    isLoading: false,
    hasError: null,

    signup: async (data, push) => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance("api/v1/signup", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response?.json();
        if (response?.status === 201) {
          toast.success(result?.message || "Signup Successfully");
          set({ isLoading: false });
          push("/auth/sign-in");
        } else {
          toast.error(result?.message || "Signup Failed");
        }
      } catch (error) {
        toast.error("Unexpected error occurred");
        set({ hasError: error as Error, isLoading: false });
      }
    },

    login: async (data, push) => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance("api/v1/login", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response?.json();
        if (response?.status === 200) {
          await nextCookies("token", result?.accessToken, "set");
          toast.success(result?.message || "Login Successfully");
          set({ isLoading: false });
          if (result?.hasProfile) {
            push("/chat");
          } else {
            push("/settings");
          }
        } else {
          toast.error(result?.message || "Login Failed");
        }
      } catch (error) {
        toast.error("Unexpected error occurred");
        set({ hasError: error as Error, isLoading: false });
      }
    },

    forgotPassword: async (data, push) => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance("api/v1/forgot-password", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response?.json();
        if (response?.status === 200) {
          toast.success(result?.message || "OTP Sent Successfully");
          localStorage.setItem("resetPassword", result?.data);
          set({ isLoading: false });
          push("/auth/otp");
        } else {
          toast.error(result?.message || "OTP Failed to sent");
        }
      } catch (error) {
        toast.error("Unexpected error occurred");
        set({ hasError: error as Error, isLoading: false });
      }
    },

    otpVerify: async (data, push) => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance("api/v1/otp", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response?.json();
        if (response?.status === 200) {
          toast.success(result?.message || "OTP Verified");
          set({ isLoading: false });
          push("/auth/reset-password");
        } else {
          toast.error(result?.message || "OTP Verification Failed");
        }
      } catch (error) {
        toast.error("Unexpected error occurred");
        set({ hasError: error as Error, isLoading: false });
      }
    },

    resetPassword: async (data, push) => {
      try {
        set({ isLoading: true, hasError: null });
        const response = await fetchInstance("api/v1/reset-password", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const result = await response?.json();
        if (response?.status === 200) {
          toast.success(result?.message || "Password Reset Successfully");
          set({ isLoading: false });
          push("/auth/success");
        } else {
          toast.error(result?.message || "Password Failed Reset");
        }
      } catch (error) {
        toast.error("Unexpected error occurred");
        set({ hasError: error as Error, isLoading: false });
      }
    },
  };
});
