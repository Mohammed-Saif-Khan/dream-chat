import { cn } from "@/lib/utils";
import { useMessageStore } from "@/store/messages";
import { ReplyMessage } from "@/store/messages/type";
import { X } from "lucide-react";

export default function ReplyPreview({ reply }: { reply: ReplyMessage }) {
  const { setReply } = useMessageStore();

  const onCloseReply = () => {
    setReply(null);
  };

  return (
    <div
      className={cn(
        "flex items-stretch bg-gray-200 dark:bg-black rounded-t-sm overflow-hidden animate-reply-slide-in"
      )}
    >
      <div className="w-1 bg-primary shrink-0" />
      <div className="flex-1 px-3 py-3 w-0">
        <p className="text-sm truncate whitespace-nowrap">
          {reply?.isDelete ? "This message is Deleted" : reply?.message}
        </p>
      </div>
      <button
        type="button"
        onClick={onCloseReply}
        className="flex items-center justify-center px-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Cancel reply"
      >
        <X size={16} className="cursor-pointer" />
      </button>
    </div>
  );
}
