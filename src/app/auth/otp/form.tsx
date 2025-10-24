"use client";
import Image from "next/image";
import React from "react";
import LOGO from "@/assets/auth/full-logo.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@/hooks/use-navigate";
import SubmitButton from "@/components/button/submit-button";

export default function OtpForm() {
  const { push } = useNavigate();

  const [timeLeft, setTimeLeft] = React.useState(9 * 60 + 59);

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="md:max-w-xl w-full md:p-6 p-2">
      <div className="flex items-center justify-center mb-10 mt-8">
        <Image src={LOGO} width={200} height={28} alt="logo-image" />
      </div>
      <div>
        <Card className="border-none rounded-md outline-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-0.5">
              OTP Verification
            </CardTitle>
            <p className="text-base text-muted-foreground">
              We send a code to test@example.com
            </p>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex items-center justify-center">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot className="md:h-14 md:w-14" index={0} />
                    <InputOTPSlot className="md:h-14 md:w-14" index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot className="md:h-14 md:w-14" index={2} />
                    <InputOTPSlot className="md:h-14 md:w-14" index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot className="md:h-14 md:w-14" index={4} />
                    <InputOTPSlot className="md:h-14 md:w-14" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="mt-4 flex items-center justify-center">
                {timeLeft > 0 ? (
                  <p className="text-destructive text-xs font-semibold p-2 tracking-wide bg-[#ffedf0] rounded-sm">
                    Otp will expire in {formatTime(timeLeft)}
                  </p>
                ) : (
                  <p className="text-red-500 text-xs font-semibold p-2 tracking-wide bg-[#ffedf0] rounded-sm">
                    OTP expired. Please resend.
                  </p>
                )}
              </div>
              <SubmitButton
                link="/auth/reset-password"
                size="lg"
                className="w-full rounded mt-4"
              >
                Continue
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
        <p className="md:mt-10 mt-5 text-sm text-center">
          Dont receive an email?{" "}
          <span
            onClick={() => push("/auth/sign-up")}
            className="text-primary hover:underline font-medium cursor-pointer"
          >
            click to resend
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
