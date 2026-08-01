import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import * as React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputGroupAddon } from "../ui/input-group";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";

type Option = {
  label: string;
  value: string;
  group?: string;
  icon?: React.ReactNode;
  description?: string;
};

type OptionGroup = {
  value: string;
  items: Option[];
};

interface SelectComboxProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  control?: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  isLoading?: boolean;
  description?: string;
  showClear?: boolean;
  showSelectedIcon?: boolean;
  showGroupInLabel?: boolean;
  required?: boolean;
}

function groupOptions(options: Option[]): OptionGroup[] {
  const map = new Map<string, Option[]>();
  for (const option of options) {
    const key = option.group ?? "";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(option);
  }
  return Array.from(map.entries()).map(([value, items]) => ({
    value,
    items,
  }));
}

function formatOptionLabel(option: Option, showGroup?: boolean) {
  if (showGroup && option.group) {
    return `${option.label} (${option.group})`;
  }
  return option.label;
}

function renderOptionItem(option: Option) {
  return (
    <ComboboxItem
      key={option.value}
      value={option}
      className="cursor-pointer data-highlighted:bg-primary"
    >
      <Item size="xs" className="p-0">
        {option.icon && (
          <span className="flex items-center justify-center shrink-0 [&>svg]:size-4">
            {option.icon}
          </span>
        )}
        <ItemContent>
          <ItemTitle className="whitespace-nowrap">{option.label}</ItemTitle>
          {option.description && (
            <ItemDescription>{option.description}</ItemDescription>
          )}
        </ItemContent>
      </Item>
    </ComboboxItem>
  );
}

function FlatOptionsList() {
  return (
    <ComboboxList>{(option: Option) => renderOptionItem(option)}</ComboboxList>
  );
}

function GroupedOptionsList({ groups }: { groups: OptionGroup[] }) {
  return (
    <ComboboxList>
      {(group: OptionGroup, index: number) => (
        <ComboboxGroup key={group.value} items={group.items}>
          <ComboboxLabel>{group.value}</ComboboxLabel>
          <ComboboxCollection>
            {(option: Option) => renderOptionItem(option)}
          </ComboboxCollection>
          {index < groups.length - 1 && <ComboboxSeparator />}
        </ComboboxGroup>
      )}
    </ComboboxList>
  );
}

export default function SelectCombox<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  errors,
  disabled,
  isLoading,
  description,
  showClear,
  showSelectedIcon,
  showGroupInLabel,
  required,
  ...props
}: SelectComboxProps<T>) {
  const hasGroups = options.some((option) => option.group);
  const groupedItems = React.useMemo(
    () => (hasGroups ? groupOptions(options) : []),
    [options, hasGroups],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOption =
          options.find((option) => option.value === field.value) ?? null;
        return (
          <Field data-invalid={errors?.[name] ? true : false}>
            <FieldLabel>
              {label}
              {required && (
                <span className="text-destructive font-medium">*</span>
              )}
            </FieldLabel>
            <Combobox
              autoHighlight
              value={selectedOption}
              items={hasGroups ? groupedItems : options}
              disabled={disabled}
              itemToStringValue={(option: Option) =>
                formatOptionLabel(option, showGroupInLabel)
              }
              itemToStringLabel={(option: Option) =>
                formatOptionLabel(option, showGroupInLabel)
              }
              onValueChange={(selectedItem: { value: string } | null) => {
                if (selectedItem) {
                  field.onChange(selectedItem?.value ?? "");
                } else {
                  field.onChange("");
                }
              }}
            >
              {showSelectedIcon && selectedOption?.icon ? (
                <ComboboxInput
                  showClear={showClear}
                  onBlur={field.onBlur}
                  placeholder={placeholder}
                  aria-required={required}
                  aria-invalid={errors?.[name] ? "true" : "false"}
                  {...props}
                >
                  <InputGroupAddon>{selectedOption.icon}</InputGroupAddon>
                </ComboboxInput>
              ) : (
                <ComboboxInput
                  showClear={showClear}
                  onBlur={field.onBlur}
                  placeholder={placeholder}
                  aria-required={required}
                  aria-invalid={errors?.[name] ? "true" : "false"}
                  {...props}
                />
              )}
              <ComboboxContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    {hasGroups ? (
                      <GroupedOptionsList groups={groupedItems} />
                    ) : (
                      <FlatOptionsList />
                    )}
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {description && !errors?.[name] && (
              <FieldDescription className="text-xs">
                {description}
              </FieldDescription>
            )}
            {errors?.[name] && (
              <FieldError className="text-xs">
                {String(errors[name]?.message)}
              </FieldError>
            )}
          </Field>
        );
      }}
    />
  );
}
