"use client";
import ChatBubble from "@/components/chat/chat-bubble";
import TypingIndicator from "@/components/chat/typing-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Participant } from "@/store/chat-list/type";
import { ChatType } from "@/store/messages/type";

// import getName from "@/utils/getName";
import React from "react";

type ChatProps = {
  chat: ChatType | null;
  senderId: string;
  typing: boolean;
  receiverId: string;
  chatId: string | undefined;
  isGroup?: boolean;
  groupParticipants?: Participant[];
};

export default function Chat({
  chat,
  chatId,
  senderId,
  receiverId,
  typing,
  isGroup,
  groupParticipants,
}: ChatProps) {
  const [highlight, setHighlight] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const participantsById = React.useMemo(() => {
    const map = new Map<string, Participant>();
    groupParticipants?.forEach((p) => map.set(p._id, p));
    return map;
  }, [groupParticipants]);

  React.useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.message?.length, typing]);

  return (
    <ScrollArea className="flex-1 overflow-y-auto h-[calc(100dvh - 95px)] bg-[url(/home/dark-background.png)] chat-scrollarea p-2">
      <div className="block">
        {chat?.message?.map((msg, index) => (
          <ChatBubble
            key={`CHAT-MESSAGE-${msg?._id}`}
            chatId={chatId}
            messageId={msg?._id}
            highlight={highlight}
            setHighlight={setHighlight}
            firstName={msg?.senderId?.firstName}
            lastName={msg?.senderId?.lastName}
            sender={msg?.senderId?._id === senderId}
            receiverId={receiverId}
            isDelete={msg?.isDeleted}
            message={msg?.message}
            time={msg?.time}
            status={msg?.status}
            deletedAt={msg?.deletedAt}
            createdAt={msg?.createdAt}
            prevCreatedAt={chat?.message[index - 1]?.createdAt}
            isFavorite={msg?.isFavorite}
            replyTo={msg?.replyTo}
            reactions={msg?.reactions?.map((r) => ({
              ...r,
              avatar: participantsById.get(r.user?._id)?.avatar,
            }))}
            currentUserId={senderId}
            isGroup={isGroup}
            avatar={participantsById.get(msg?.senderId?._id)?.avatar}
            excludedNames={msg?.excludedFor
              ?.map((id) => {
                const participant = participantsById.get(id);
                return participant
                  ? `${participant.firstName} ${participant.lastName}`.trim()
                  : null;
              })
              .filter((name): name is string => Boolean(name))}
            // senderName={getName(msg?.senderId, senderId)}
          />
        ))}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out p-4",
            typing ? "block translate-y-0" : "hidden",
          )}
        >
          <TypingIndicator />
        </div>
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
