import { cn } from "@/lib/utils";
import { Ban, Check, CheckCheck, Clock, Dot } from "lucide-react";
import ChatMenu from "./controls/chat-menu";
import ChatDivider from "./chat-divider";
import { ReplyMessage } from "@/store/messages/type";

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
  firstName: string;
  lastName: string;
  replyTo: ReplyMessage | null;
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
}: ChatBubblePorps) {
  const isSameDay = (d1?: string, d2?: string) => {
    if (!d1 || !d2) return false;
    return new Date(d1).toDateString() === new Date(d2).toDateString();
  };

  const showDivider =
    createdAt && (!prevCreatedAt || !isSameDay(createdAt, prevCreatedAt));

  return (
    <div>
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
            "flex items-center h-5",
            sender && "flex-row-reverse mr-4"
          )}
        >
          {/* <p className="text-sm text-foreground">{senderName}</p>
          <Dot size={30} /> */}
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
            {replyTo && (
              <div
                className={cn(
                  "mb-2 px-2 py-1.5 rounded-md text-xs cursor-pointer",
                  "border-l-2",
                  sender
                    ? "bg-white/15 border-gray-300 text-white cursor-pointer"
                    : "bg-gray-300/70 dark:bg-gray-700/70 border-primary text-foreground cursor-pointer"
                )}
              >
                {/* <p
                  className={cn(
                    "font-semibold leading-none mb-1",
                    sender ? "text-white/90" : "text-primary"
                  )}
                >
                  {replyTo.senderId?.firstName} {replyTo.senderId?.lastName}
                </p> */}

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
    </div>
  );
}
