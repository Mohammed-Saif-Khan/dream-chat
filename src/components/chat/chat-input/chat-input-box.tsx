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
  ref?: React.Ref<HTMLTextAreaElement> | undefined | null;
  [key: string]: unknown;
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
  ...props
}: ChatInputBoxProps<T>) {
  return (
    <FieldSet className={cn("mb-3 w-full", className.fieldSet)}>
      <Field className="gap-1.5">
        {label && (
          <FieldLabel htmlFor={String(name)} className={className.label}>
            {label}
          </FieldLabel>
        )}
        <div
          className={cn(
            "border overflow-hidden ease-in-out transition-all rounded-3xl w-full bg-background",
          )}
        >
          {replyTo && <ReplyPreview reply={replyTo} />}
          <InputGroup
            className={cn(
              className.inputGroup,
              "items-end border-0 rounded-none pr-1.5 w-full flex", // Added flex and w-full
              replyTo && "rounded-t-none",
            )}
          >
            {/* Start Addons */}
            {startAddon && (
              <InputGroupAddon
                className={cn("flex-none", className.startAddon)}
              >
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
              value={value}
              autoFocus={false}
              placeholder={placeholder}
              // {...(register
              //   ? { ...register(name, { required }), ref: undefined }
              //   : {})}
              {...(register ? { ...register(name, { required }) } : {})}
              onChange={(e) => onChange?.(e)}
              className={cn(
                className.input,
                "min-h-lh max-h-[10lh] resize-none break-all whitespace-pre-wrap", // Added break-all and flex-1
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              {...props}
            />

            {/* End Addons */}
            {endAddon && (
              <InputGroupAddon
                align="inline-end"
                className={cn(
                  "flex items-center justify-center h-9! flex-none",
                  className.endAddon,
                )}
              >
                {React.Children.toArray(endAddon).map((addon, i) => (
                  <InputGroupButton
                    size="icon-sm"
                    key={i}
                    type={addOnButtonType}
                    className="[&_svg]:size-4.5!"
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
