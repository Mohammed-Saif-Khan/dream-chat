import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CirclePlus, CircleX } from "lucide-react";
import React, { ComponentType, SVGProps } from "react";
import { Options } from ".";

export type MetaPropsOptions = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  options: Options[];
  palcehoder?: string;
};

export type SingleSelectFilterProps = {
  options?: MetaPropsOptions;
  selected?: Options | null;
  onChange?: (value: string | undefined) => void;
};

// Defined outside component to avoid React Compiler re-creating it on every render
function StatusList({
  options,
  selected,
  onSelect,
  onClear,
}: {
  options?: MetaPropsOptions;
  selected?: Options | null;
  onSelect: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <Command>
      <CommandInput placeholder={options?.palcehoder || "Search..."} />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup>
          {options?.options?.map((status) => {
            const OptionIcon = status?.icon;

            return (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={onSelect}
                className="flex items-center gap-2 cursor-pointer capitalize"
              >
                {OptionIcon && <OptionIcon className="w-4 h-4" />}
                {status.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        {selected && (
          <>
            <CommandSeparator />

            <CommandGroup>
              <CommandItem
                onSelect={onClear}
                className="justify-center text-center cursor-pointer"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}

export default function SingleSelectFilter({
  options,
  selected,
  onChange,
}: SingleSelectFilterProps) {
  const [open, setOpen] = React.useState(false);

  const Icon = options?.icon;

  const handleSelect = (value: string) => {
    onChange?.(value);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "gap-0 cursor-pointer text-white",
            selected ? "[&_svg]:!size-4" : "[&_svg]:!size-3.5",
          )}
        >
          {Icon ? (
            selected ? (
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(undefined);
                }}
              >
                <CircleX className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mr-1.5" />
              </div>
            ) : (
              <Icon className="mr-1 h-4 w-4" />
            )
          ) : (
            <CirclePlus className="mr-1 h-4 w-4" />
          )}

          <span className="text-sm mr-2">{options?.label}</span>

          {selected && (
            <div className="flex h-5 items-center space-x-2 text-sm">
              <Separator orientation="vertical" />

              <Badge variant="secondary" className="rounded font-normal">
                {selected.label}
              </Badge>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0" align="start">
        <StatusList
          options={options}
          selected={selected}
          onSelect={handleSelect}
          onClear={() => {
            onChange?.(undefined);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
