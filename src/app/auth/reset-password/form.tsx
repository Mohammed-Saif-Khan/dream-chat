"use client";
import LOGO from "@/assets/auth/full-logo.svg";
import SubmitButton from "@/components/button/submit-button";
import PasswordBox from "@/components/forms/password-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@/hooks/use-navigate";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function ResetPasswordForm() {
  const { push } = useNavigate();

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
            <form>
              <PasswordBox name="username" label="New Password" />
              <PasswordBox name="username" label="Confirm Password" />
              <SubmitButton
                link="/auth/success"
                size="lg"
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
