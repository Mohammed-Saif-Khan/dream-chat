"use client";
import LOGO from "@/assets/auth/full-logo.svg";
import SubmitButton from "@/components/button/submit-button";
import PasswordBox from "@/components/forms/password-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@/hooks/use-navigate";
import {
  resetPasswordSchema,
  resetPasswordType,
} from "@/schema/auth/reset-password";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

export default function ResetPasswordForm() {
  const { push } = useNavigate();
  const { resetPassword } = useAuthStore();
  const resetToken = localStorage?.getItem("resetPassword");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: resetPasswordType) => {
    await resetPassword(data, push);
  };

  React.useEffect(() => {
    if (resetToken) return setValue("token", resetToken);
  }, [resetToken]);

  return (
    <div className="w-full md:max-w-xl md:p-6 p-2">
      <div className="flex items-center justify-center mb-10 mt-8">
        <Image src={LOGO} width={200} height={28} alt="logo-image" />
      </div>
      <div>
        <Card className="border-none rounded-md outline-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-0.5">
              Set New Password
            </CardTitle>
            <p className="text-base text-muted-foreground">
              Your new password must be different from previous passwords.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <PasswordBox
                name="password"
                label="New Password"
                register={register}
                setValue={setValue}
                errors={errors}
                placeholder="Enter New Password"
              />
              <PasswordBox
                name="confirmPassword"
                label="Confirm Password"
                register={register}
                setValue={setValue}
                errors={errors}
                placeholder="Enter Confirm Password"
              />
              <SubmitButton
                size="lg"
                isSubmitting={isSubmitting}
                className="w-full rounded my-3"
              >
                Reset Password
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
        <p className="md:mt-10 mt-5 text-sm text-center">
          Back to{" "}
          <span
            onClick={() => push("/auth/sign-in")}
            className="text-primary hover:underline font-medium cursor-pointer"
          >
            Sign In
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
