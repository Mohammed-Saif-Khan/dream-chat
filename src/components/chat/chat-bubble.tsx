import { cn } from "@/lib/utils";
import { ReplyMessage } from "@/store/messages/type";
import { Ban, Check, CheckCheck, Clock, EllipsisVertical } from "lucide-react";
import ChatDivider from "./chat-divider";
import ChatMenu from "./controls/chat-menu";

type ChatBubblePorps = {
  sender: boolean;
  message: string;
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
  firstName: string;
  lastName: string;
  replyTo: ReplyMessage | null;
  highlight: string | null;
  setHighlight: (id: string | null) => void;
};

export default function ChatBubble({
  sender,
  message,
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
  firstName,
  lastName,
  replyTo,
  highlight,
  setHighlight,
}: ChatBubblePorps) {
  const isSameDay = (d1?: string, d2?: string) => {
    if (!d1 || !d2) return false;
    return new Date(d1).toDateString() === new Date(d2).toDateString();
  };

  const showDivider =
    createdAt && (!prevCreatedAt || !isSameDay(createdAt, prevCreatedAt));

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setHighlight(id);

    setTimeout(() => {
      setHighlight(null);
    }, 1200);
  };

  return (
    <>
      {showDivider && <ChatDivider date={createdAt} />}

      <div
        className={cn(
          "flex flex-col items-start mb-4",
          sender && "items-end",
          sender && deletedAt && "hidden"
        )}
      >
        <div
          className={cn(
            "flex items-center h-5 px-4",
            sender && "flex-row-reverse mr-4"
          )}
        >
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
            "flex items-center gap-1 select-none px-4 pb-1",
            sender && "flex-row-reverse",
            highlight === messageId && "bg-primary/10 w-full pb-1"
          )}
        >
          <div
            id={messageId}
            className={cn(
              "mt-1 p-3 md:max-w-104.75 md:w-fit max-w-2xs w-fit rounded-t-xl text-sm tracking-wide transition-colors",
              sender
                ? "rounded-l-xl bg-primary text-white"
                : "rounded-r-xl bg-gray-200 dark:bg-muted"
            )}
          >
            {replyTo && (
              <div
                onClick={() => handleScroll(replyTo._id)}
                className={cn(
                  "mb-2 px-2 py-1.5 rounded-md text-xs cursor-pointer border-l-2",
                  sender
                    ? "bg-white/15 border-gray-300 text-white"
                    : "bg-gray-300/70 dark:bg-gray-700/70 border-primary text-foreground"
                )}
              >
                <p
                  className={cn(
                    "truncate",
                    sender ? "text-white/80" : "text-foreground/80"
                  )}
                >
                  {replyTo.message}
                </p>
              </div>
            )}
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
            firstName={firstName}
            lastName={lastName}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </>
  );
}
