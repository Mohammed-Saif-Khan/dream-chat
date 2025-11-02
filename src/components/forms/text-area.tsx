"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface TextAreaProps<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  rows?: 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80;
  name: keyof T;
  register?: UseFormRegister<T>;
  required?: boolean;
  errors?: FieldErrors<T>;
  labelClass?: string;
  setValue?: UseFormSetValue<T>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function TextArea<T extends FieldValues>({
  label,
  placeholder,
  rows = 16,
  name,
  register,
  required,
  errors,
  labelClass,
  setValue,
  onChange,
}: TextAreaProps<T>) {
  return (
    <div className="my-0 w-full">
      <Label className={cn("mb-2", labelClass)}>{label}</Label>
      <Textarea
        {...(register ? register(name as Path<T>, { required }) : {})}
        placeholder={placeholder}
        className={cn("w-full", {
          "min-h-16": rows === 16,
          "min-h-20": rows === 20,
          "min-h-24": rows === 24,
          "min-h-32": rows === 32,
          "min-h-40": rows === 40,
          "min-h-48": rows === 48,
          "min-h-64": rows === 64,
          "min-h-80": rows === 80,
        })}
        onChange={(e) => {
          const trimmedValue = e.target.value.trimStart();
          setValue?.(name as Path<T>, trimmedValue as PathValue<T, Path<T>>, {
            shouldValidate: true,
          });
          if (onChange) onChange(e);
        }}
      />
      {errors?.[name] && (
        <p className="text-xs font-medium text-red-500 text-start ml-2 mt-1">
          {typeof errors[name]?.message === "string" && errors[name]?.message}
        </p>
      )}
    </div>
  );
}
