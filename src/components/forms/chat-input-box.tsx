"use client";

import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import React from "react";

interface ChatInputBoxProps<T extends FieldValues> {
  label?: string;
  register?: UseFormRegister<T>;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
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
  startAddon?: React.ReactNode | React.ReactNode[];
  endAddon?: React.ReactNode | React.ReactNode[];
  addOnButtonType?: "submit" | "reset" | "button";
}

export default function ChatInputBox<T extends FieldValues>({
  label,
  register,
  required,
  onChange,
  value,
  placeholder,
  errors,
  name,
  className = {},
  startAddon,
  endAddon,
  addOnButtonType,
}: ChatInputBoxProps<T>) {
  return (
    <FieldSet className={cn("mb-3", className.fieldSet)}>
      <Field className="gap-1.5">
        {label && (
          <FieldLabel htmlFor={String(name)} className={className.label}>
            {label}
          </FieldLabel>
        )}

        <InputGroup
          className={cn(className.inputGroup, "rounded-sm items-end")}
        >
          {/* Start Addons */}
          {startAddon && (
            <InputGroupAddon className={className.startAddon}>
              {React.Children.toArray(startAddon).map((addon, i) => (
                <InputGroupButton key={i} type={addOnButtonType}>
                  {addon}
                </InputGroupButton>
              ))}
            </InputGroupAddon>
          )}

          {/* Textarea */}
          <InputGroupTextarea
            {...(register ? register(name, { required }) : {})}
            onChange={(e) => onChange?.(e)}
            value={value}
            placeholder={placeholder}
            className={cn(className.input, "min-h-lh max-h-[5lh] pb-2")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
          />

          {/* End Addons */}
          {endAddon && (
            <InputGroupAddon align="inline-end" className={className.endAddon}>
              {React.Children.toArray(endAddon).map((addon, i) => (
                <InputGroupButton
                  key={i}
                  type={addOnButtonType}
                  className="bg-primary text-white hover:bg-primary/90 h-full"
                >
                  {addon}
                </InputGroupButton>
              ))}
            </InputGroupAddon>
          )}
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
