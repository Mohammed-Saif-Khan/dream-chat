"use client";

import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import React from "react";

interface TextBoxProps<T extends FieldValues> {
  label?: string;
  type?: string;
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
    startAddon?: string;
    endAddon?: string;
    inputGroup?: string;
    inputGroupButton?: string;
    fieldSet?: string;
  };
  minLength?: number;
  maxLength?: number;
  startAddon?: React.ReactNode | React.ReactNode[];
  endAddon?: React.ReactNode | React.ReactNode[];
  startVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  startSize?: "sm" | "icon-sm" | "xs" | "icon-xs" | null | undefined;
  endVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  endSize?: "sm" | "icon-sm" | "xs" | "icon-xs" | null | undefined;
}

export default function TextBox<T extends FieldValues>({
  label,
  type = "text",
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
  startAddon,
  endAddon,
  startVariant,
  startSize,
  endVariant,
  endSize,
}: TextBoxProps<T>) {
  const renderAddons = (
    addons: React.ReactNode | React.ReactNode[],
    position: "start" | "end"
  ) => {
    if (!addons) return null;

    const variant = position === "start" ? startVariant : endVariant;
    const size = position === "start" ? startSize : endSize;
    const addonClass =
      position === "start" ? className.startAddon : className.endAddon;

    return (
      <InputGroupAddon
        align={position === "end" ? "inline-end" : undefined}
        className={addonClass}
      >
        {React.Children.toArray(addons).map((addon, index) => (
          <InputGroupButton
            key={index}
            variant={variant}
            size={size}
            className={cn("transition-colors", className.inputGroupButton)}
          >
            {addon}
          </InputGroupButton>
        ))}
      </InputGroupAddon>
    );
  };

  return (
    <FieldSet className={cn("mb-3", className.fieldSet)}>
      <Field className="gap-1.5">
        {label && (
          <FieldLabel htmlFor={String(name)} className={className.label}>
            {label}
          </FieldLabel>
        )}

        <InputGroup className={cn(className.inputGroup, "rounded-sm")}>
          {renderAddons(startAddon, "start")}

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
            type={type}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            className={cn(className.input)}
          />

          {renderAddons(endAddon, "end")}
        </InputGroup>

        {errors?.[name] && (
          <FieldError>{String(errors[name]?.message)}</FieldError>
        )}
      </Field>
    </FieldSet>
  );
}
