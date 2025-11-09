"use client";
import SubmitButton from "@/components/button/submit-button";
import DatePickerBox from "@/components/forms/date-picker-box";
import SelectBox from "@/components/forms/select-box";
import TextArea from "@/components/forms/text-area";
import TextBox from "@/components/forms/text-box";
import { Map, Save, User } from "lucide-react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import AvatarUpload from "./avatar-upload";

interface PersonalInfoProps<T extends FieldValues> {
  control: Control<T>;
  register?: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  errors?: FieldErrors<T>;
  isSubmitting?: boolean;
}

export default function PersonalInfo<T extends FieldValues>({
  control,
  register,
  setValue,
  errors,
  isSubmitting,
}: PersonalInfoProps<T>) {
  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <AvatarUpload />
      </div>
      <TextBox
        name={"firstName" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="First Name"
        endAddon={<User />}
      />
      <TextBox
        name={"lastName" as Path<T>}
        register={register}
        setValue={setValue}
        errors={errors}
        placeholder="Last Name"
        endAddon={<User />}
      />
      <SelectBox
        name={"gender" as Path<T>}
        setValue={setValue}
        errors={errors}
        placeholder="Gender"
        selectLabel="Select Gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <DatePickerBox
        control={control}
        errors={errors}
        name={"dob" as Path<T>}
        placeholder="Date of Birth"
      />
      <TextBox
        name={"country" as Path<T>}
        setValue={setValue}
        errors={errors}
        placeholder="Country"
        endAddon={<Map />}
      />
      <TextArea
        register={register}
        name={"about" as Path<T>}
        setValue={setValue}
        errors={errors}
        placeholder="About"
        rows={32}
      />
      <SubmitButton
        form="profileForm"
        startIcon={<Save />}
        isSubmitting={isSubmitting}
        className="mt-3 w-full rounded"
      >
        Save Changes
      </SubmitButton>
    </div>
  );
}
