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
}: AvatarProps) {
  // Safely get the URL
  const imageSrc =
    typeof src === "string"
      ? src
      : src && typeof src === "object"
      ? src.src
      : null;

  return (
    <div className="relative w-fit">
      <Avatar className={cn("cursor-pointer", avatarSize)}>
        {imageSrc && (
          <AvatarImage src={imageSrc} alt={alt} className={cn(avatarImage)} />
        )}
        <AvatarFallback className={cn(fallbackClass)}>
          {fallback}
        </AvatarFallback>
      </Avatar>

      {statusbar && (
        <span
          className={cn(
            "border-background bg-online absolute end-0.5 bottom-0 size-3.5 rounded-full border-2",
            statusbarClass
          )}
        >
          <span className="sr-only">Busy</span>
        </span>
      )}
    </div>
  );
}
