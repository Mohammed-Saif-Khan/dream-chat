"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  children?: React.ReactNode;
  className?: string;
  isSubmitting?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  link?: string;
  loader?: boolean;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  side?: "start" | "center" | "end";
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  className,
  isSubmitting = false,
  startIcon,
  endIcon,
  onClick,
  type = "submit",
  link,
  loader,
  variant,
  size,
  side,
  target,
}) => {
  return (
    <div className={cn(side && `flex items-center justify-${side}`)}>
      {link ? (
        <Link href={link} target={target}>
          <Button
            size={size}
            type={type}
            onClick={onClick}
            variant={variant}
            disabled={isSubmitting || loader}
            className={twMerge(
              "text-white cursor-pointer flex items-center gap-2",
              className
            )}
          >
            <span className="flex items-center gap-x-2">
              {isSubmitting && <Loader2 className="animate-spin mr-2" />}
              {startIcon && <span>{startIcon}</span>}
              <span>{children}</span>
              {endIcon && <span>{endIcon}</span>}
            </span>
          </Button>
        </Link>
      ) : (
        <Button
          size={size}
          type={type}
          onClick={onClick}
          variant={variant}
          disabled={isSubmitting || loader}
          className={twMerge(
            "text-white cursor-pointer flex items-center gap-2",
            className
          )}
        >
          <span className="flex items-center gap-x-2">
            {isSubmitting && <Loader2 className="animate-spin mr-2" />}
            {startIcon && <span>{startIcon}</span>}
            <span>{children}</span>
            {endIcon && <span>{endIcon}</span>}
          </span>
        </Button>
      )}
    </div>
  );
};

export default SubmitButton;
