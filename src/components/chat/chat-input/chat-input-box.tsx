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
import ReplyPreview from "./reply-preview";
import { ReplyMessage } from "@/store/messages/type";

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
  replyTo?: ReplyMessage | null;
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
  replyTo,
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
        <div
          className={cn(
            "border overflow-hidden ease-in-out transition-all rounded-sm",
          )}
        >
          {replyTo && <ReplyPreview reply={replyTo} />}
          <InputGroup
            className={cn(
              className.inputGroup,
              "items-end border-0 rounded-none",
              replyTo && "rounded-t-none",
            )}
          >
            {/* Start Addons */}
            {startAddon && (
              <InputGroupAddon className={className.startAddon}>
                {React.Children.toArray(startAddon).map((addon, i) => (
                  <InputGroupButton
                    key={i}
                    type="button"
                    className="[&_svg]:size-4.5!"
                  >
                    {addon}
                  </InputGroupButton>
                ))}
              </InputGroupAddon>
            )}

            {/* Textarea */}
            <InputGroupTextarea
              autoFocus={false}
              {...(register ? register(name, { required }) : {})}
              onChange={(e) => onChange?.(e)}
              value={value}
              placeholder={placeholder}
              className={cn(className.input, "min-h-lh max-h-[5lh]")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />

            {/* End Addons */}
            {endAddon && (
              <InputGroupAddon
                align="inline-end"
                className={className.endAddon}
              >
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
        </div>

        {errors?.[name] && (
          <FieldError className="text-xs">
            {String(errors[name]?.message)}
          </FieldError>
        )}
      </Field>
    </FieldSet>
  );
}
