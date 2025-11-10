import { forgotPasswordType } from "@/schema/auth/forgot-password";
import { loginType } from "@/schema/auth/login";
import { otpType } from "@/schema/auth/otp";
import { resetPasswordType } from "@/schema/auth/reset-password";
import { SignUpType } from "@/schema/auth/signup";

export type StateType = {
  isLoading: boolean;
  hasError: Error | null;
};

type PushFn = (path: string) => void;

export type AuthStore = StateType & {
  signup: (data: SignUpType, push: PushFn) => Promise<void>;
  login: (data: loginType, push: PushFn) => Promise<void>;
  forgotPassword: (data: forgotPasswordType, push: PushFn) => Promise<void>;
  otpVerify: (data: otpType, push: PushFn) => Promise<void>;
  resetPassword: (data: resetPasswordType, push: PushFn) => Promise<void>;
  logout: (replace: PushFn) => Promise<void>;
};
