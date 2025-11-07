"use client";
import FACEBOOK from "@/assets/auth/facebook.svg";
import LOGO from "@/assets/auth/full-logo.svg";
import SubmitButton from "@/components/button/submit-button";
import PasswordBox from "@/components/forms/password-box";
import TextBox from "@/components/forms/text-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { useNavigate } from "@/hooks/use-navigate";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { User } from "lucide-react";
import Image from "next/image";

export default function SignInForm() {
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
              Welcome!
            </CardTitle>
            <p className="text-base text-muted-foreground">
              Sign in to see what you&apos;ve missed.
            </p>
          </CardHeader>
          <CardContent>
            <form>
              <TextBox
                name="username"
                placeholder="Enter User Name"
                label="User Name"
                startAddon={<User />}
              />
              <PasswordBox
                name="username"
                label="Password"
                placeholder="Enter  Password"
                className={{ fieldSet: "mb-2" }}
              />
              <FieldLabel
                onClick={() => push("/auth/forgot-password")}
                className={cn(
                  "mb-2 ml-auto text-sm underline-offset-4 hover:underline cursor-pointer flex items-center justify-end text-primary"
                )}
              >
                Forgot Password?
              </FieldLabel>
              <SubmitButton
                link="/home"
                size="lg"
                className="w-full rounded my-3"
              >
                Sign In
              </SubmitButton>
              <div>
                <div className="flex items-center my-6">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="px-4 text-primary text-sm font-medium">
                    Or sign in with
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
          Don&apos;t have an account ?{" "}
          <span
            onClick={() => push("/auth/sign-up")}
            className="text-primary hover:underline font-medium cursor-pointer"
          >
            Sign Up
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
