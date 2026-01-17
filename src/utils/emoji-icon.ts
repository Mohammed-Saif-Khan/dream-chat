import { cn } from "@/lib/utils";

export const iconAnimation = (active: boolean) =>
  cn(
    "transition-all duration-200 ease-out",
    active
      ? "opacity-100 scale-100 pointer-events-auto"
      : "opacity-0 scale-90 pointer-events-none"
  );
