import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function ReplyPreview() {
  return (
    <div
      className={cn(
        "flex items-stretch bg-gray-200 dark:bg-black rounded-t-sm overflow-hidden animate-slide-up"
      )}
    >
      <div className="w-1 bg-primary shrink-0" />
      <div className="flex-1 px-3 py-3 min-w-0">
        <p className="text-sm text-reply-message truncate">Hello</p>
      </div>
      <button
        type="button"
        className="flex items-center justify-center px-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Cancel reply"
      >
        <X size={18} className="cursor-pointer" />
      </button>
    </div>
  );
}
