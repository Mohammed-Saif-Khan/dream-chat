"use client";
import ChatBubble from "@/components/chat/chat-bubble";
import TypingIndicator from "@/components/chat/typing-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatType } from "@/store/messages/type";

// import getName from "@/utils/getName";
import React from "react";

type ChatProps = {
  chat: ChatType | null;
  senderId: string;
  typing: boolean;
  receiverId: string;
  chatId: string | undefined;
};

export default function Chat({
  chat,
  chatId,
  senderId,
  receiverId,
  typing,
}: ChatProps) {
  const [highlight, setHighlight] = React.useState<string | null>(null);
  const [reactions, setReactions] = React.useState<Record<string, string>>({});
  const scrollRef = React.useRef<HTMLDivElement>(null);

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
            setReactions={setReactions}
            reactions={reactions}
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
