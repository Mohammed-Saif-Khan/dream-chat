"use client";
import LOGO from "@/assets/auth/full-logo.svg";
import SubmitButton from "@/components/button/submit-button";
import TextBox from "@/components/forms/text-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@/hooks/use-navigate";
import {
  forgotPasswordSchema,
  forgotPasswordType,
} from "@/schema/auth/forgot-password";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const { push } = useNavigate();
  const { forgotPassword } = useAuthStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: forgotPasswordType) => {
    await forgotPassword(data, push);
  };

  return (
    <div className="max-w-xl w-full md:p-6 p-2">
      <div className="flex items-center justify-center mb-10 mt-8">
        <Image src={LOGO} width={200} height={28} alt="logo-image" />
      </div>
      <div>
        <Card className="border-none rounded-md outline-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-0.5">
              Forgot Password?
            </CardTitle>
            <p className="text-base text-muted-foreground">
              Enter your email, we will send you a otp to reset your password.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextBox
                name="email"
                placeholder="Enter Email"
                label="Email"
                register={register}
                setValue={setValue}
                errors={errors}
                startAddon={<Mail />}
              />
              <SubmitButton
                size="lg"
                isSubmitting={isSubmitting}
                className="w-full rounded-md my-6"
              >
                Send OTP
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
