"use client";

import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed, Lock } from "lucide-react";
import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface PasswordBoxProps<T extends FieldValues> {
  label?: string;
  register?: UseFormRegister<T>;
  required?: boolean;
  setValue?: UseFormSetValue<T>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  errors?: FieldErrors<T>;
  name: Path<T>;
  className?: {
    label?: string;
    input?: string;
    inputGroup?: string;
    fieldSet?: string;
    inputGroupButton?: string;
  };
  minLength?: number;
  maxLength?: number;
}

export default function PasswordBox<T extends FieldValues>({
  label,
  register,
  required,
  setValue,
  onChange,
  value,
  placeholder,
  errors,
  name,
  className = {},
  minLength,
  maxLength,
}: PasswordBoxProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FieldSet className={cn("mb-3", className.fieldSet)}>
      <Field className="gap-1.5">
        {label && (
          <FieldLabel htmlFor={String(name)} className={className.label}>
            {label}
          </FieldLabel>
        )}

        <InputGroup className={cn(className.inputGroup, "rounded-sm")}>
          {/* Left: Lock icon */}
          <InputGroupAddon>
            <InputGroupButton
              variant="ghost"
              size="icon-sm"
              type="button"
              className={cn("cursor-default", className.inputGroupButton)}
              aria-hidden="true"
              tabIndex={-1}
            >
              <Lock className="w-4 h-4 opacity-70" />
            </InputGroupButton>
          </InputGroupAddon>

          {/* Input */}
          <InputGroupInput
            {...(register ? register(name, { required }) : {})}
            onChange={(e) => {
              const trimmedValue = e.target.value.trimStart();

              if (setValue) {
                setValue(name, trimmedValue as PathValue<T, Path<T>>, {
                  shouldValidate: true,
                });
              }

              if (onChange) onChange(e);
            }}
            type={showPassword ? "text" : "password"}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            className={cn(className.input)}
            autoComplete="current-password"
          />

          {/* Right: Eye/EyeOff toggle */}
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={cn("cursor-pointer", className.inputGroupButton)}
            >
              {showPassword ? (
                <Eye className="w-4 h-4 opacity-70" />
              ) : (
                <EyeClosed className="w-4 h-4 opacity-70" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {errors?.[name] && (
          <FieldError className="text-xs">
            {String(errors[name]?.message)}
          </FieldError>
        )}
      </Field>
    </FieldSet>
  );
}
