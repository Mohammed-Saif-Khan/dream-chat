"use client";

import SubmitButton from "@/components/button/submit-button";
import PasswordBox from "@/components/forms/password-box";
import SelectBox from "@/components/forms/select-box";
import TextBox from "@/components/forms/text-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@/hooks/use-navigate";
import { signUpSchema, SignUpType } from "@/schema/auth/signup";
import { fetchInstance } from "@/utils/fetch-instance";
import revalidate from "@/utils/revalidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { actionUrl, pathRevalidate, roleOptions } from "./constant";

type UsersPageFormProps = {
  id: string;
  defaultValues?: Partial<SignUpType>;
};

export default function UsersPageForm({
  id,
  defaultValues,
}: UsersPageFormProps) {
  const { back } = useNavigate();
  const isEdit = Boolean(id && id !== "new");

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    defaultValues,
  });

  const onSubmit = async (data: SignUpType) => {
    try {
      let method = "POST";
      let url = actionUrl;
      if (id && id !== "new") {
        method = "PUT";
        url = `${actionUrl}/${id}`;
      }
      const response = await fetchInstance(`${url}`, {
        method,
        body: JSON.stringify(data),
      });
      const result = await response?.json();
      if (result?.success) {
        toast.success(result?.message || "Saved successfully");
        await revalidate(pathRevalidate, "page");
        back();
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit User" : "Add User"}</CardTitle>
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
              label="Last Name"
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Enter Last Name"
              startAddon={<User />}
              className={{ fieldSet: "mb-0" }}
            />
            <TextBox
              type="email"
              name="email"
              label="Email"
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Enter Email"
              startAddon={<Mail />}
              className={{ fieldSet: "mb-0" }}
            />
            <TextBox
              name="phone"
              label="Phone"
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Enter Phone Number"
              maxLength={10}
              startAddon={<Phone />}
              className={{ fieldSet: "mb-0" }}
              onChange={(e) =>
                setValue("phone", e.target.value.replace(/[^\d+]/g, ""))
              }
            />
            <SelectBox
              name="role"
              control={control}
              label="Role"
              placeholder="Select role"
              options={roleOptions}
              errors={errors}
            />
            <div />
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
          <SubmitButton
            size="lg"
            isSubmitting={isSubmitting}
            className="w-full rounded my-3"
          >
            {isEdit ? "Update User" : "Create User"}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
