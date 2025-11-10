"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, ChevronDownIcon, CircleX, Loader2, Plus } from "lucide-react";

// ---------------- TYPES ----------------
type Option = {
  label: string;
  value: string | number;
};

//  Base props
type BaseProps<T extends FieldValues> = {
  name: string;
  control?: Control<T>;
  errors?: FieldErrors<T>;
  label?: string;
  labelClass?: string;
  placeholder?: string;
  selectLabel?: string;
  options: Option[];
  placeholderColor?: string;
  search?: boolean;
  multiSelect?: boolean;
  customOption?: boolean;
  onValueChange?: (val: string) => void;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: {
    selectGroup?: string;
    label?: string;
    selectTriggerClass?: string;
  };
};

//  Conditional type for `setValue`
type SelectBoxProps<T extends FieldValues> =
  | (BaseProps<T> & {
      search?: false;
      multiSelect?: false;
      customOption?: false;
      setValue?: never;
    })
  | (BaseProps<T> & {
      search?: true;
      multiSelect?: true;
      customOption?: true;
      setValue: UseFormSetValue<T>;
    });

export default function SelectBox<T extends FieldValues>({
  control,
  name,
  labelClass,
  label,
  placeholder,
  selectLabel,
  options: initialOptions,
  errors,
  search,
  setValue,
  className = {},
  multiSelect,
  customOption,
  placeholderColor,
  onValueChange,
  value,
  disabled,
  loading,
}: SelectBoxProps<T>) {
  const [options, setOptions] = React.useState(initialOptions);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    setOptions((prev) => {
      const newValues = initialOptions.map((o) => String(o.value));
      const customOnes = prev.filter(
        (o) => !newValues.includes(String(o.value))
      );
      return [...initialOptions, ...customOnes];
    });
  }, [initialOptions]);

  // ---------------- MULTI SELECT ----------------
  if (multiSelect) {
    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => {
          const values: (string | number)[] = Array.isArray(field.value)
            ? field.value
            : [];

          const toggleValue = (val: string | number) => {
            const newValues = values.includes(val)
              ? values.filter((v) => v !== val)
              : [...values, val];
            setValue(name as Path<T>, newValues as unknown as T[typeof name]);
          };

          return (
            <div className="w-full mt-4">
              {label && (
                <Label className={cn("mb-2", labelClass)}>{label}</Label>
              )}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "w-full min-h-[38px] flex items-center flex-wrap gap-1 px-2 py-1 rounded-lg border border-input cursor-pointer",
                      values.length === 0 && "text-muted-foreground"
                    )}
                  >
                    {values.length > 0 ? (
                      values.map((val, i) => {
                        const label =
                          options.find((f) => f.value === val)?.label || val;
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-1 px-2 py-1 bg-slate-200 text-xs rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {label}
                            <CircleX
                              size={14}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleValue(val);
                              }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <span
                        className={cn(
                          "text-muted-foreground pl-1 text-sm mt-0.5"
                        )}
                      >
                        {placeholder || "Select option"}
                      </span>
                    )}
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  className="p-0 overflow-visible"
                  style={{
                    width: "var(--radix-popover-trigger-width)",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {loading ? (
                    <div className="flex justify-center items-center py-4">
                      <Loader2 className="animate-spin mr-2 h-5 w-5 text-muted-foreground" />
                    </div>
                  ) : (
                    <Command>
                      {search && (
                        <CommandInput
                          placeholder={`Search ${label || "option"}...`}
                          className="h-9"
                          value={searchTerm}
                          onValueChange={setSearchTerm}
                        />
                      )}
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup
                          heading={options?.length > 0 && selectLabel}
                        >
                          {filteredOptions.map((item) => (
                            <CommandItem
                              key={item.value}
                              onSelect={() => toggleValue(item.value)}
                            >
                              {item.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  values.includes(item.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}

                          {customOption &&
                            searchTerm &&
                            !options.some(
                              (opt) =>
                                opt.label.toLowerCase() ===
                                searchTerm.toLowerCase()
                            ) && (
                              <CommandItem
                                onSelect={() => {
                                  const newOption = {
                                    label: searchTerm,
                                    value: searchTerm,
                                  };
                                  setOptions([...options, newOption]);
                                  toggleValue(searchTerm);
                                  setSearchTerm("");
                                }}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add &quot;{searchTerm}&quot;
                              </CommandItem>
                            )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  )}
                </PopoverContent>
              </Popover>
              {errors?.[name] && (
                <p className="text-xs font-medium text-red-500 text-start ml-2 mt-1">
                  {String(errors[name]?.message)}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  }

  // ---------------- SINGLE SELECT WITH SEARCH ----------------
  if (search) {
    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => {
          const value = field.value as string | number | undefined;

          return (
            <div className="w-full mt-4">
              {label && (
                <Label className={cn("mb-2", labelClass)}>{label}</Label>
              )}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between border border-input",
                      !value && "text-muted-foreground"
                    )}
                  >
                    {value
                      ? options.find(
                          (opt) => String(opt.value) === String(value)
                        )?.label
                      : placeholder || "Select option"}
                    <ChevronDownIcon className="size-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  className="p-0 overflow-visible"
                  style={{
                    width: "var(--radix-popover-trigger-width)",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {loading ? (
                    <div className="flex justify-center items-center py-4">
                      <Loader2 className="animate-spin mr-2 h-5 w-5 text-muted-foreground" />
                    </div>
                  ) : (
                    <Command>
                      <CommandInput
                        placeholder={`Search ${label || "option"}...`}
                        className="h-9"
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                      />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup
                          heading={options?.length > 0 && selectLabel}
                        >
                          {filteredOptions.map((item) => (
                            <CommandItem
                              key={item.value}
                              onSelect={() => {
                                setValue(
                                  name as Path<T>,
                                  item.value as unknown as T[typeof name]
                                );
                                setOpen(false);
                              }}
                            >
                              {item.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  String(item.value) === String(value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}

                          {customOption &&
                            searchTerm &&
                            !options.some(
                              (opt) =>
                                opt.label.toLowerCase() ===
                                searchTerm.toLowerCase()
                            ) && (
                              <CommandItem
                                onSelect={() => {
                                  const newOption = {
                                    label: searchTerm,
                                    value: searchTerm,
                                  };
                                  setOptions([...options, newOption]);
                                  setValue(
                                    name as Path<T>,
                                    searchTerm as unknown as T[typeof name]
                                  );
                                  setSearchTerm("");
                                  setOpen(false);
                                }}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add &quot;{searchTerm}&quot;
                              </CommandItem>
                            )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  )}
                </PopoverContent>
              </Popover>
              {errors?.[name] && (
                <p className="text-xs font-medium text-red-500 text-start ml-2 mt-1">
                  {String(errors[name]?.message)}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  }

  // ---------------- CONTROL SELECT BOX ----------------

  if (control) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <div className={cn("w-full mb-3", className?.selectGroup)}>
            {label && (
              <Label className={cn("mb-2", className?.label)}>{label}</Label>
            )}
            <Select value={field.value}>
              <SelectTrigger
                className={cn(
                  "w-full cursor-pointer",
                  `data-[placeholder]:${placeholderColor}`,
                  className?.selectTriggerClass
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
                  {loading ? (
                    <SelectItem disabled value="loading">
                      <Loader2 className="animate-spin mr-2" />
                    </SelectItem>
                  ) : options.length > 0 ? (
                    options.map((item) => (
                      <SelectItem
                        key={String(item.value)}
                        value={String(item.value)}
                        className="cursor-pointer"
                      >
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="no-option">
                      No option found
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.[name] && (
              <p className="text-xs font-medium text-red-500 text-start ml-2 mt-1">
                {String(errors[name]?.message)}
              </p>
            )}
          </div>
        )}
      />
    );
  }

  // ---------------- REGULAR SELECT BOX ----------------

  return (
    <div className="w-full mb-1">
      {label && <Label className={cn("mb-2", labelClass)}>{label}</Label>}
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={cn(
            "w-full cursor-pointer",
            `data-[placeholder]:${placeholderColor}`
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
            {options.length > 0 ? (
              options.map((item) => (
                <SelectItem
                  key={String(item.value)}
                  value={String(item.value)}
                  className="cursor-pointer dark:hover:bg-primary"
                >
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="no-option">
                No option found
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
