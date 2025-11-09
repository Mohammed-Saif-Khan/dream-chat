import SubmitButton from "@/components/button/submit-button";
import TextBox from "@/components/forms/text-box";
import { Icon } from "@iconify/react";
import { Save } from "lucide-react";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface SocialsProfilesProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  errors?: FieldErrors<T>;
  isSubmitting?: boolean;
}

export default function SocialsProfiles<T extends FieldValues>({
  register,
  setValue,
  errors,
  isSubmitting,
}: SocialsProfilesProps<T>) {
  return (
    <div>
      <TextBox
        name={"facebook" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="Facebook"
        endAddon={<Icon icon="ic:baseline-facebook" width="24" height="24" />}
      />
      <TextBox
        name={"google" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="Google"
        endAddon={<Icon icon="mdi:google" width="24" height="24" />}
      />
      <TextBox
        name={"x" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="X"
        endAddon={<Icon icon="ri:twitter-x-fill" width="24" height="24" />}
      />
      <TextBox
        name={"linkedin" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="Linkedin"
        endAddon={<Icon icon="mdi:linkedin" width="24" height="24" />}
      />
      <TextBox
        name={"youtube" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="YouTube"
        endAddon={<Icon icon="mingcute:youtube-fill" width="24" height="24" />}
      />
      <TextBox
        name={"others" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="Other"
        endAddon={<Icon icon="mdi:internet" width="24" height="24" />}
      />

      <SubmitButton
        form="socialForm"
        type="submit"
        startIcon={<Save />}
        isSubmitting={isSubmitting}
        className="rounded w-full"
      >
        Save Changes
      </SubmitButton>
    </div>
  );
}
