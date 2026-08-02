"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

type AvatarProps = {
  src?: string | StaticImageData | null;
  alt: string;
  fallback: string;
  avatarSize?: string;
  avatarImage?: string;
  fallbackClass?: string;
  statusbar?: boolean;
  statusbarClass?: string;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
};

export default function AvatarDP({
  src,
  alt,
  fallback,
  avatarSize,
  avatarImage,
  fallbackClass,
  statusbar,
  statusbarClass,
  ...props
}: AvatarProps) {
  // Safely get the URL
  const imageSrc =
    typeof src === "string"
      ? src
      : src && typeof src === "object"
        ? src.src
        : null;

  // Reduce whatever text is passed down to short, visible initials
  const words = fallback?.trim()?.split(/\s+/).filter(Boolean) ?? [];
  const initials =
    words.length > 1
      ? words
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
          .toUpperCase()
      : (fallback?.slice(0, 2) ?? "").toUpperCase();

  return (
    <div {...props} className="relative w-fit">
      <Avatar className={cn("cursor-pointer", avatarSize)}>
        {imageSrc && (
          <AvatarImage src={imageSrc} alt={alt} className={cn(avatarImage)} />
        )}
        <AvatarFallback
          className={cn(
            "bg-muted-foreground/20 text-foreground font-medium",
            fallbackClass,
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      {statusbar && (
        <span
          className={cn(
            "border-white bg-online absolute end-0.5 bottom-0 size-3.5 rounded-full border-2",
            statusbarClass,
          )}
        >
          <span className="sr-only">Busy</span>
        </span>
      )}
    </div>
  );
}
