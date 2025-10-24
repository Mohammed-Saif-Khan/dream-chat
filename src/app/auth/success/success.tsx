import Image from "next/image";
import React from "react";
import LOGO from "@/assets/auth/full-logo.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubmitButton from "@/components/button/submit-button";
import { CheckCheck } from "lucide-react";

export default function Success() {
  return (
    <div className="max-w-xl w-full md:p-6 p-2">
      <div className="flex items-center justify-center mb-10 mt-8">
        <Image src={LOGO} width={200} height={28} alt="logo-image" />
      </div>
      <div>
        <Card className="border-none rounded-md outline-0 gap-2">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="relative flex items-center justify-center">
                {/* Ping effect */}
                {/* <span className="absolute inline-flex h-16 w-16 rounded-full bg-green-200 opacity-75 animate-[ping_2s_ease-in-out_infinite]" /> */}

                {/* Center circle (static dot, optional) */}
                <span className="bg-online text-white size-14 rounded-full flex items-center justify-center">
                  <CheckCheck />
                </span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center">
              All Done!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground text-center">
              Your new password has been successfully saved. Now you can signin
              with your new password
            </p>
            <SubmitButton
              link="/auth/sign-in"
              size="lg"
              className="w-full rounded-md mt-6"
            >
              Back to Sign In
            </SubmitButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
