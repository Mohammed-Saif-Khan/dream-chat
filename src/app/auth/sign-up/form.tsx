"use client";
import React from "react";
import LOGO from "@/assets/auth/full-logo.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import TextBox from "@/components/forms/text-box";
import { Lock, Mail, Phone, User } from "lucide-react";
import PasswordBox from "@/components/forms/password-box";
import SubmitButton from "@/components/button/submit-button";
import { Icon } from "@iconify/react";
import FACEBOOK from "@/assets/auth/facebook.svg";
import { useNavigate } from "@/hooks/use-navigate";

export default function SignUpForm() {
  const { push } = useNavigate();

  return (
    <div className="mx-auto md:max-w-xl md:p-6 p-2">
      <div className="flex items-center justify-center mb-10 mt-8">
        <Image src={LOGO} width={200} height={28} alt="logo-image" />
      </div>
      <div>
        <Card className="border-none rounded-md outline-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-0.5">
              Register
            </CardTitle>
            <p className="text-base text-muted-foreground">
              Sign up to share moments with friends!
            </p>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid md:grid-cols-2 gap-2">
                <TextBox
                  name="firstName"
                  placeholder="Enter First Name"
                  label="First Name"
                  startAddon={<User />}
                />
                <TextBox
                  name="lastNames"
                  placeholder="Enter Last Name"
                  label="Last Name"
                  startAddon={<User />}
                />
                <div className="md:col-span-2">
                  <TextBox
                    name="email"
                    placeholder="Enter Email"
                    label="Email"
                    startAddon={<Mail />}
                  />
                  <TextBox
                    name="phone"
                    placeholder="Enter Phone Number"
                    label="Phone"
                    startAddon={<Phone />}
                  />
                </div>
                <TextBox
                  name="userName"
                  placeholder="Enter User Name"
                  label="User Name"
                  startAddon={<User />}
                />
                <PasswordBox
                  name="username"
                  label="Password"
                  autoComplete="off"
                  startAddon={<Lock />}
                />
              </div>
              <SubmitButton size="lg" className="w-full rounded my-3">
                Sign In
              </SubmitButton>
              <div>
                <div className="flex items-center my-6">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="px-4 text-primary text-sm font-medium">
                    Or sign up with
                  </span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
              </div>
              <div className="flex items-center w-full gap-1">
                <div className="w-full">
                  <SubmitButton
                    size="lg"
                    variant="outline"
                    className="text-foreground font-medium text-base w-full rounded [&_svg]:!size-6"
                    startIcon={
                      <Icon
                        icon="flat-color-icons:google"
                        width="48"
                        height="48"
                      />
                    }
                  >
                    Google
                  </SubmitButton>
                </div>
                <div className="w-full">
                  <SubmitButton
                    size="lg"
                    variant="outline"
                    className="text-foreground font-medium text-base w-full rounded [&_svg]:!size-6"
                    startIcon={
                      <Image
                        src={FACEBOOK}
                        width={25}
                        height={25}
                        alt="facebook"
                      />
                    }
                  >
                    Facebook
                  </SubmitButton>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <p className="md:mt-10 mt-5 text-sm text-center">
          Already have a account?{" "}
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
