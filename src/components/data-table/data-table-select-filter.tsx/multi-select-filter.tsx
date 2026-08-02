import React, { ComponentType, SVGProps } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Options } from ".";
import { CirclePlus, CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";

export type MetaPropsOptions = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  options: Options[];
  palcehoder?: string;
};

export type MultiSelectFilterProps = {
  options?: MetaPropsOptions;
  selected?: string[];
  onChange?: (value: string[]) => void;
};

// Defined outside component to avoid React Compiler re-creating it on every render
function StatusList({
  options,
  selected,
  onSelect,
  onClear,
}: {
  options?: MetaPropsOptions;
  selected?: string[];
  onSelect: (val: string) => void;
  onClear: () => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options?.options?.map((status) => {
            const Icon = status?.icon;
            return (
              <CommandItem
                key={status?.value}
                value={status?.value}
                onSelect={() => onSelect(status?.value)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={status?.value}
                    checked={selected?.includes(status?.value)}
                    className="pointer-events-none"
                  />
                  <Label
                    htmlFor={status?.value}
                    className="text-sm font-normal flex items-center gap-2 pointer-events-none"
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    )}
                    {status.label}
                  </Label>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
        {selected && selected?.length > 0 && (
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

export default function MultiSelectFilter({
  options,
  selected,
  onChange,
}: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const Icon = options?.icon;

  const handleSetValue = (val: string) => {
    let newSelect: string[] = [];

    if (selected?.includes(val)) {
      newSelect = selected?.filter((item) => item !== val);
    } else {
      newSelect = [...(selected || []), val];
    }

    onChange?.(newSelect);
  };

  // Get label names of selected values
  const selectedLabels = options?.options
    ?.filter((opt) => selected?.includes(opt.value))
    .map((opt) => opt.label);

  const renderBadges = () => {
    if (!selectedLabels || selectedLabels.length === 0) return null;

    if (selectedLabels.length > 2) {
      return (
        <Badge
          variant="secondary"
          className="rounded font-normal ml-2 text-white"
        >
          {selectedLabels.length} selected
        </Badge>
      );
    }

    return (
      <div className="flex gap-1 ml-2">
        {selectedLabels.map((label) => (
          <Badge
            key={label}
            variant="secondary"
            className="rounded font-normal text-white"
          >
            {label}
          </Badge>
        ))}
      </div>
    );
  };

  // DESKTOP (Popover)
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "border-dashed border-gray-300 gap-0",
              selected?.length ? "[&_svg]:!size-4" : "[&_svg]:!size-3.5",
            )}
          >
            {Icon ? (
              selected && selected?.length > 0 ? (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange?.([]);
                    setOpen(false);
                  }}
                >
                  <CircleX className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mr-1.5" />
                </div>
              ) : (
                <Icon className="mr-2 h-4 w-4" />
              )
            ) : (
              <CirclePlus className="mr-2 h-4 w-4" />
            )}
            <span className="text-sm mr-2">{options?.label}</span>
            {selected && selected?.length > 0 && (
              <div className="flex h-5 items-center space-x-2 text-sm">
                <Separator orientation="vertical" />
                {renderBadges()}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            options={options}
            selected={selected}
            onSelect={handleSetValue}
            onClear={() => onChange?.([])}
          />
        </PopoverContent>
      </Popover>
    );
  }

  // MOBILE (Drawer)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start gap-0">
          {Icon ? (
            <Icon className="mr-2 h-4 w-4" />
          ) : (
            <CirclePlus className="mr-2 h-4 w-4" />
          )}
          <span className="text-sm">{options?.label}</span>
          {renderBadges()}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            options={options}
            selected={selected}
            onSelect={handleSetValue}
            onClear={() => onChange?.([])}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
