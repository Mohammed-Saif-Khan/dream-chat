import SubmitButton from "@/components/button/submit-button";
import PasswordBox from "@/components/forms/password-box";
import {
  updatePasswordSchema,
  updatePasswordType,
} from "@/schema/update-password";
import { fetchInstance } from "@/utils/fetch-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SecurityFormt() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<updatePasswordType>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: updatePasswordType) => {
    try {
      const response = await fetchInstance("api/v1/update-password", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response?.json();
      if (response?.status === 200) {
        toast.success(result?.message || "Password Update Successfully");
      } else {
        toast.error(result?.message || "Failed to update Password");
      }
    } catch (error) {
      console.log(error, "Password Update failed to submit");
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordBox
        name="oldPassword"
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="Old Password"
      />
      <PasswordBox
        name="newPassword"
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="New Password"
      />
      <PasswordBox
        name="confirmPassword"
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="Confirm Password"
      />
      <SubmitButton
        startIcon={<Save />}
        isSubmitting={isSubmitting}
        className="rounded w-full mt-3"
      >
        Save Changes
      </SubmitButton>
    </form>
  );
}
