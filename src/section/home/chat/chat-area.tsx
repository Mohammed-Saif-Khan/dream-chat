"use client";
import ChatBubble from "@/components/chat/chat-bubble";
import TypingIndicator from "@/components/chat/typing-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatType } from "@/store/chat/type";
// import getName from "@/utils/getName";
import React from "react";

type ChatProps = {
  chat: ChatType | null;
  senderId: string;
  typing: boolean;
  receiverId: string;
};

export default function Chat({
  chat,
  senderId,
  receiverId,
  typing,
}: ChatProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, typing]);

  return (
    <ScrollArea className="flex-1 overflow-y-auto h-[calc(100dvh - 95px)] bg-[url(/home/dark-background.png)] chat-scrollarea">
      <div className="p-5 px-4 block">
        {chat?.message?.map(
          (msg) => (
            console.log(msg, "masdfme"),
            (
              <ChatBubble
                messageId={msg?._id}
                key={`CHAT-MESSAGE-${msg?._id}`}
                sender={msg?.senderId?._id === senderId}
                receiverId={receiverId}
                isDelete={msg?.isDeleted}
                message={msg?.message}
                time={msg?.time}
                status={msg?.status}
                deletedAt={msg?.deletedAt}
                createdAt={msg?.createdAt}
                isFavorite={msg?.isFavorite}
                // senderName={getName(msg?.senderId, senderId)}
              />
            )
          )
        )}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            typing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <TypingIndicator />
        </div>
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
