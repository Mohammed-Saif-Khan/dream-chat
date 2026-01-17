import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import NewChatDialog from "@/modules/sidebar/chat-header/new-chat-dialog";
import { ReplyMessage } from "@/store/messages/type";
import { iconAnimation, useEmojiTheme } from "@/utils/emoji-icon";
import { renderEmojiText } from "@/utils/render-emoji-text";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import {
  Ban,
  Check,
  CheckCheck,
  Clock,
  Redo2,
  Smile,
  Undo2,
} from "lucide-react";
import React, { SetStateAction } from "react";
import { Badge } from "../ui/badge";
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
  setReactions: React.Dispatch<SetStateAction<Record<string, string>>>;
  reactions: Record<string, string>;
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
  setReactions,
  reactions,
}: ChatBubblePorps) {
  const emojiTheme = useEmojiTheme();
  const [forwardOpen, setForwardOpen] = React.useState<boolean>(false);
  const [emojiOpen, setEmojiOpen] = React.useState<boolean>(false);

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
          sender && deletedAt && "hidden",
        )}
      >
        <div
          className={cn(
            "flex items-center h-5 px-4",
            sender && "flex-row-reverse mr-4",
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
            "flex items-center gap-1.5 select-none px-4 pb-1 group",
            sender && "flex-row-reverse",
            highlight === messageId && "bg-primary/10 w-full pb-1",
          )}
        >
          <div className="relative">
            <div
              id={messageId}
              className={cn(
                "mt-1 p-3 md:max-w-104.75 md:w-fit max-w-2xs w-fit rounded-t-xl text-sm tracking-wide transition-colors",
                sender
                  ? "rounded-l-xl bg-primary text-white"
                  : "rounded-r-xl bg-gray-200 dark:bg-muted",
              )}
            >
              {replyTo && (
                <div
                  onClick={() => handleScroll(replyTo._id)}
                  className={cn(
                    "mb-2 px-2 py-1.5 rounded-md text-xs cursor-pointer border-l-2",
                    sender
                      ? "bg-white/15 border-gray-300 text-white"
                      : "bg-gray-300/70 dark:bg-gray-700/70 border-primary text-foreground",
                  )}
                >
                  <p
                    className={cn(
                      "truncate",
                      sender ? "text-white/80" : "text-foreground/80",
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
                <p className="text-sm">{renderEmojiText(message)}</p>
              )}
            </div>
            {reactions[messageId] && (
              <div className={cn("absolute rounded-full", sender && "right-0")}>
                <Badge variant="outline" className="h-5 min-w-5 px-1">
                  {reactions[messageId]}
                </Badge>
              </div>
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
            setForwardOpen={setForwardOpen}
          />

          <div className="mx-1 md:flex hidden">
            {sender ? (
              <Undo2
                size={16}
                onClick={() => setForwardOpen(true)}
                className={cn("cursor-pointer")}
              />
            ) : (
              <Redo2
                size={16}
                onClick={() => setForwardOpen(true)}
                className={cn("cursor-pointer")}
              />
            )}
          </div>

          <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
            <PopoverTrigger>
              <Smile
                size={16}
                onClick={() => setEmojiOpen(true)}
                className={cn(
                  "cursor-pointer mx-1",
                  "opacity-0 scale-90",
                  "group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto",
                  iconAnimation(emojiOpen),
                  sender && "scale-x-[-1]",
                )}
              />
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="center"
              className="w-fit p-0 bg-transparent border-0 mx-2"
            >
              <EmojiPicker
                reactionsDefaultOpen={true}
                theme={emojiTheme}
                emojiStyle={EmojiStyle.GOOGLE}
                previewConfig={{ showPreview: false }}
                onEmojiClick={(value) => {
                  setReactions((prev) => ({
                    ...prev,
                    [messageId]: value?.emoji,
                  }));
                  setEmojiOpen(false);
                }}
                className="emoji-small"
              />
            </PopoverContent>
          </Popover>

          {forwardOpen && (
            <NewChatDialog
              title="Forward"
              buttonTitle="Send"
              open={forwardOpen}
              onClose={setForwardOpen}
              messageId={messageId}
              receiverId={receiverId}
            />
          )}
        </div>
      </div>
    </>
  );
}
