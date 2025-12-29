import { cn } from "@/lib/utils";
import { Ban, Check, CheckCheck, Clock } from "lucide-react";
import ChatMenu from "./controls/chat-menu";
import ChatDivider from "./chat-divider";

type ChatBubblePorps = {
  sender: boolean;
  message: string;
  senderName?: string;
  time: string;
  status: string;
  isDelete: boolean | undefined;
  messageId: string;
  receiverId: string;
  deletedAt: string | null;
  createdAt: string | undefined;
  isFavorite: boolean;
  chatId: string | undefined;
  prevCreatedAt?: string;
};

export default function ChatBubble({
  sender,
  message,
  senderName,
  time,
  status,
  isDelete,
  messageId,
  receiverId,
  deletedAt,
  createdAt,
  isFavorite,
  chatId,
  prevCreatedAt,
}: ChatBubblePorps) {
  const isSameDay = (d1?: string, d2?: string) => {
    if (!d1 || !d2) return false;
    return new Date(d1).toDateString() === new Date(d2).toDateString();
  };

  const isToday = (date?: string) => {
    if (!date) return false;
    const today = new Date();
    return new Date(date).toDateString() === today.toDateString();
  };

  return (
    <div>
      <div
        className={cn(
          "flex flex-col items-start mb-4",
          sender && "items-end",
          sender && deletedAt && "hidden"
        )}
      >
        <div
          className={cn(
            "flex items-center h-5",
            sender && "flex-row-reverse mr-4"
          )}
        >
          <p className="text-sm text-foreground">{senderName}</p>
          {/* <Dot size={30} /> */}
          <p className="text-sm text-muted-foreground">{time}</p>
          {sender && !isDelete && (
            <>
              {status === "pending" && (
                <Clock size={14} className="mr-2 opacity-70" />
              )}

              {status === "sent" && (
                <Check size={14} className="mr-2 text-gray-500" />
              )}

              {status === "delivered" && (
                <CheckCheck size={14} className="mr-2" />
              )}

              {status === "read" && (
                <CheckCheck size={14} className="mr-2 text-online" />
              )}
            </>
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-1 select-none",
            sender && "flex-row-reverse"
          )}
        >
          <div
            className={cn(
              "mt-1 p-3 bg-muted md:max-w-[419px] md:w-fit max-w-2xs w-fit rounded-t-xl text-sm tracking-wide",
              sender
                ? "rounded-l-xl bg-primary text-white"
                : "rounded-r-xl bg-gray-200 dark:bg-muted"
            )}
          >
            {isDelete ? (
              <p className="flex items-center gap-2">
                <Ban size={15} />
                This message is Deleted
              </p>
            ) : (
              message
            )}
          </div>
          <ChatMenu
            chatId={chatId}
            sender={sender}
            messageId={messageId}
            receiverId={receiverId}
            createdAt={createdAt}
            message={message}
            isDelete={isDelete}
            isFavorite={isFavorite}
          />
        </div>
      </div>
      {status !== "pending" &&
        !isToday(createdAt) &&
        !isSameDay(createdAt, prevCreatedAt) && (
          <ChatDivider date={createdAt} />
        )}
    </div>
  );
}
