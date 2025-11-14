"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { format } from "date-fns";
import { Matcher } from "react-day-picker";

type DatePickerBoxProps<T extends FieldValues> = {
  name: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  label?: string;
  labelClass?: string;
  disabled?: boolean | ((date: Date) => boolean);
  placeholder?: string;
  hidden?: Matcher | Matcher[];
};

export default function DatePickerBox<T extends FieldValues>({
  control,
  name,
  label,
  labelClass,
  disabled,
  errors,
  placeholder,
  hidden,
}: DatePickerBoxProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2 mb-3">
      <Controller
        control={control}
        name={name as Path<T>}
        rules={{ required: true }}
        render={({ field }) => (
          <div>
            <Label htmlFor="date" className={cn("mb-2", labelClass)}>
              {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground border-input"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder || "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field?.value}
                  onSelect={(d) => {
                    field.onChange(d);
                    setOpen(false);
                  }}
                  disabled={disabled}
                  hidden={hidden}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            {errors?.[name] && (
              <p className="text-xs font-medium text-red-500 text-start ml-2 mt-1">
                {String(errors[name]?.message)}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
