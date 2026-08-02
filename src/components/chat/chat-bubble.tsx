import AvatarDP from "@/components/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLongPress } from "@/hooks/use-long-press";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import NewChatDialog from "@/modules/sidebar/chat-header/new-chat-dialog";
import { useMessageStore } from "@/store/messages";
import { MessageReaction, ReplyMessage } from "@/store/messages/type";
import { fetchInstance } from "@/utils/fetch-instance";
import { iconAnimation, useEmojiTheme } from "@/utils/emoji-icon";
import { renderEmojiText } from "@/utils/render-emoji-text";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import {
  Ban,
  Check,
  CheckCheck,
  Clock,
  EyeOff,
  Redo2,
  Smile,
  Undo2,
} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import ChatDivider from "./chat-divider";
import ChatMenu from "./controls/chat-menu";

const SENDER_NAME_COLORS = [
  "text-rose-500",
  "text-emerald-500",
  "text-sky-500",
  "text-amber-500",
  "text-violet-500",
  "text-pink-500",
  "text-teal-500",
  "text-orange-500",
];

const getSenderColor = (key: string) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  return SENDER_NAME_COLORS[Math.abs(hash) % SENDER_NAME_COLORS.length];
};

type ReactionWithAvatar = MessageReaction & { avatar?: string | null };

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
  reactions?: ReactionWithAvatar[];
  currentUserId: string;
  isGroup?: boolean;
  avatar?: string | null;
  excludedNames?: string[];
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
  reactions,
  currentUserId,
  isGroup,
  avatar,
  excludedNames,
}: ChatBubblePorps) {
  const isSmall = useIsMobile();
  const showSenderInfo = !!isGroup && !sender;
  const senderColor = getSenderColor(`${firstName}${lastName}`);
  const emojiTheme = useEmojiTheme();
  const setMessageReactions = useMessageStore((s) => s.setMessageReactions);
  const [emojiOpen, setEmojiOpen] = React.useState<boolean>(false);
  const [forwardOpen, setForwardOpen] = React.useState<boolean>(false);
  const [pressHighlight, setPressHighlight] = React.useState<boolean>(false);

  const reactionGroups = React.useMemo(() => {
    const map = new Map<
      string,
      {
        emoji: string;
        count: number;
        mine: boolean;
        reactors: { id: string; name: string; avatar?: string | null }[];
      }
    >();

    reactions?.forEach((r) => {
      const isMe = r.user?._id === currentUserId;
      const reactor = {
        id: r.user?._id,
        name: isMe
          ? "You"
          : `${r.user?.firstName ?? ""} ${r.user?.lastName ?? ""}`.trim(),
        avatar: r.avatar,
      };
      const existing = map.get(r.emoji);
      if (existing) {
        existing.count += 1;
        existing.mine = existing.mine || isMe;
        existing.reactors.push(reactor);
      } else {
        map.set(r.emoji, {
          emoji: r.emoji,
          count: 1,
          mine: isMe,
          reactors: [reactor],
        });
      }
    });

    return Array.from(map.values());
  }, [reactions, currentUserId]);

  const handleReact = async (emoji: string) => {
    try {
      const response = await fetchInstance(
        `api/v1/message/${messageId}/reaction`,
        {
          method: "POST",
          body: JSON.stringify({ emoji }),
        },
      );
      const result = await response.json();

      if (response?.status === 200) {
        setMessageReactions(messageId, result?.data?.reactions);
      } else {
        toast.error(result?.message || "Failed to react");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const longPressHandlers = useLongPress({
    onLongPress: () => {
      setPressHighlight(true);
      setEmojiOpen(true);
    },
  });

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
            "flex items-center gap-1.5 select-none md:px-4 pb-1 group",
            sender && "flex-row-reverse",
            (highlight === messageId || pressHighlight) &&
              "bg-primary/10 w-full pb-1",
          )}
        >
          {showSenderInfo && (
            <AvatarDP
              src={avatar}
              alt={firstName}
              fallback={`${firstName} ${lastName}`}
              avatarSize="w-7 h-7 self-end mb-1"
            />
          )}
          <div className="relative">
            <div
              id={messageId}
              {...longPressHandlers}
              className={cn(
                "mt-1 p-3 md:max-w-104.75 md:w-fit max-w-2xs w-fit rounded-t-xl text-sm tracking-wide transition-colors",
                sender
                  ? "rounded-l-xl bg-primary text-white"
                  : "rounded-r-xl bg-gray-200 dark:bg-muted",
              )}
            >
              {showSenderInfo && (
                <p className={cn("text-xs font-semibold mb-1", senderColor)}>
                  {firstName} {lastName}
                </p>
              )}
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
                  {replyTo?.isDeleted ? (
                    <p className="flex items-center gap-2">
                      <Ban size={15} />
                      This message is Deleted
                    </p>
                  ) : (
                    <p
                      className={cn(
                        "truncate",
                        sender ? "text-white/80" : "text-foreground/80",
                      )}
                    >
                      {replyTo.message}
                    </p>
                  )}
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
              {sender && !isDelete && !!excludedNames?.length && (
                <p
                  className={cn(
                    "mt-1.5 pt-1.5 border-t flex items-center gap-1 text-[11px]",
                    "border-white/20 text-white/70",
                  )}
                  title={`Hidden from ${excludedNames.join(", ")}`}
                >
                  <EyeOff size={11} className="shrink-0" />
                  <span className="truncate">
                    Hidden from {excludedNames.join(", ")}
                  </span>
                </p>
              )}
            </div>
            {reactionGroups.length > 0 && (
              <div
                className={cn(
                  "absolute -bottom-2.5 flex items-center gap-1",
                  sender ? "right-0" : "left-0",
                )}
              >
                {reactionGroups.map((group) => (
                  <Tooltip key={group.emoji}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => handleReact(group.emoji)}
                        className={cn(
                          "h-6 px-1.5 flex items-center gap-0.5 rounded-full border bg-background shadow-sm text-xs leading-none cursor-pointer",
                          group.mine && "border-primary",
                        )}
                      >
                        <span>{group.emoji}</span>
                        {group.count > 1 && (
                          <span className="text-[10px] text-muted-foreground">
                            {group.count}
                          </span>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1.5">
                      <div className="flex flex-col gap-1.5">
                        {group.reactors.map((reactor) => (
                          <div
                            key={reactor.id}
                            className="flex items-center gap-1.5"
                          >
                            <AvatarDP
                              src={reactor.avatar}
                              alt={reactor.name}
                              fallback={reactor.name}
                              avatarSize="w-4.5 h-4.5"
                            />
                            <span className="text-xs">
                              {reactor.name} reacted {group.emoji}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
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

          <Popover
            open={emojiOpen}
            onOpenChange={(open) => {
              console.log(open, "lkdoe");
              setEmojiOpen(open);
              if (!open) {
                setPressHighlight(false);
              }
            }}
          >
            <PopoverTrigger>
              <Smile
                size={16}
                onClick={() => setEmojiOpen(true)}
                className={cn(
                  "cursor-pointer mx-1 hidden md:flex",
                  "opacity-0 scale-90",
                  "group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto",
                  iconAnimation(emojiOpen),
                  sender && "scale-x-[-1]",
                )}
              />
            </PopoverTrigger>
            <PopoverContent
              side={isSmall ? "top" : "right"}
              align="center"
              className={cn(
                "w-fit p-0 bg-transparent border-0 mx-2 shadow-none",
                isSmall && "mb-6",
              )}
            >
              <EmojiPicker
                reactionsDefaultOpen={true}
                theme={emojiTheme}
                emojiStyle={EmojiStyle.GOOGLE}
                previewConfig={{ showPreview: false }}
                onEmojiClick={(value) => {
                  handleReact(value?.emoji);
                  setEmojiOpen(false);
                  setPressHighlight(false);
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
