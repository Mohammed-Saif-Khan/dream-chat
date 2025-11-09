"use client";
import FACEBOOK from "@/assets/auth/facebook.svg";
import LOGO from "@/assets/auth/full-logo.svg";
import SubmitButton from "@/components/button/submit-button";
import PasswordBox from "@/components/forms/password-box";
import TextBox from "@/components/forms/text-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@/hooks/use-navigate";
import { signUpSchema, SignUpType } from "@/schema/auth/signup";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const { push } = useNavigate();
  const { signup } = useAuthStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const onSubmit = async (data: SignUpType) => {
    await signup(data, push);
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-3">
                <TextBox
                  name="firstName"
                  label="First Name"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  placeholder="Enter First Name"
                  startAddon={<User />}
                  className={{ fieldSet: "mb-0" }}
                />
                <TextBox
                  name="lastName"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  placeholder="Enter Last Name"
                  label="Last Name"
                  startAddon={<User />}
                  className={{ fieldSet: "mb-0" }}
                />

                <TextBox
                  name="email"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  placeholder="Enter Email"
                  label="Email"
                  startAddon={<Mail />}
                  className={{ fieldSet: "mb-0" }}
                />
                <TextBox
                  name="phone"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                  placeholder="Enter Phone Number"
                  label="Phone"
                  maxLength={10}
                  startAddon={<Phone />}
                  className={{ fieldSet: "mb-0" }}
                  onChange={(e) =>
                    setValue("phone", e.target.value.replace(/[^\d+]/g, ""))
                  }
                />
                <div className="col-span-2">
                  <PasswordBox
                    name="password"
                    label="Password"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    placeholder="Enter Password"
                  />
                  <PasswordBox
                    name="confirmPassword"
                    label="Confirm Password"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    placeholder="Retype Password"
                  />
                </div>
              </div>
              <SubmitButton
                size="lg"
                isSubmitting={isSubmitting}
                className="w-full rounded my-3"
              >
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
                    type="button"
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
                    type="button"
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
