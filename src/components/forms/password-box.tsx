"use client";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface PasswordBoxProps<T extends FieldValues> {
  label?: string;
  labelClass?: string;
  register?: UseFormRegister<T>;
  required?: boolean;
  setValue?: UseFormSetValue<T>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  errors?: FieldErrors<T>;
  name: Path<T>;
  className?: {
    label?: string;
    input?: string;
    startAddon?: string;
    endAddon?: string;
  };
  forgotPassword?: {
    position: "up" | "down";
    side?: "start" | "end";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
  };
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  autoComplete?: string;
}

export default function PasswordBox<T extends FieldValues>({
  label,
  register,
  required,
  setValue,
  onChange,
  placeholder,
  errors,
  name,
  className = {},
  forgotPassword,
  startAddon,
  endAddon,
  autoComplete,
}: PasswordBoxProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FieldSet className="mb-4">
      <Field className="gap-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <FieldLabel htmlFor={String(name)} className={cn(className?.label)}>
              {label}
            </FieldLabel>
          )}
          {forgotPassword?.position === "up" && (
            <FieldLabel
              onClick={forgotPassword?.onClick}
              className={cn(
                "mb-2 ml-auto inline text-sm underline-offset-4 hover:underline cursor-pointer",
                forgotPassword?.className,
                forgotPassword?.side === "end" && "text-end"
              )}
            >
              Forgot Password?
            </FieldLabel>
          )}
        </div>
        <InputGroup>
          {startAddon && (
            <InputGroupAddon className={className?.startAddon}>
              {startAddon}
            </InputGroupAddon>
          )}

          <InputGroupInput
            type={showPassword ? "text" : "password"}
            {...(register ? register(name, { required }) : {})}
            onChange={(e) => {
              const trimmedValue = e.target.value.trimStart();
              setValue?.(name, trimmedValue as PathValue<T, Path<T>>, {
                shouldValidate: true,
              });
              if (onChange) onChange(e);
            }}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={cn("tracking-widest", className?.input)}
          />

          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="cursor-pointer" />
              ) : (
                <EyeClosed className="cursor-pointer" />
              )}
            </InputGroupButton>
            {endAddon}
          </InputGroupAddon>
        </InputGroup>
        {forgotPassword?.position === "down" && (
          <FieldLabel
            onClick={forgotPassword?.onClick}
            className={cn(
              "mb-2 ml-auto inline text-sm underline-offset-4 hover:underline cursor-pointer",
              forgotPassword?.className,
              forgotPassword?.side === "end" && "text-end"
            )}
          >
            Forgot Password?
          </FieldLabel>
        )}
        {errors?.[name] && (
          <FieldError>{String(errors[name]?.message)}</FieldError>
        )}
      </Field>
    </FieldSet>
  );
}
