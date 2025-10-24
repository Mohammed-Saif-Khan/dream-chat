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
  };
  minLength?: number;
  maxLength?: number;
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
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
}: TextBoxProps<T>) {
  return (
    <FieldSet className="mb-3">
      <Field className="gap-1.5">
        {label && (
          <FieldLabel htmlFor={String(name)} className={className.label}>
            {label}
          </FieldLabel>
        )}
        <InputGroup className={cn(className?.inputGroup)}>
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

          {startAddon && (
            <InputGroupAddon className={className.startAddon}>
              {startAddon}
            </InputGroupAddon>
          )}

          {endAddon && (
            <InputGroupAddon align="inline-end" className={className.endAddon}>
              <InputGroupButton className={className.inputGroupButton}>
                {endAddon}
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        {errors?.[name] && (
          <FieldError>{String(errors[name]?.message)}</FieldError>
        )}
      </Field>
    </FieldSet>
  );
}
