import React from "react";
import ChatHeader from "./chat-section-header";
import ChatInput from "./chat-section-input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-svh w-full">
      <ChatHeader />
      <ScrollArea className="flex-1 overflow-y-auto h-[calc(100dvh - 95px)] bg-[url(/home/bg-01.png)]">
        {children}
      </ScrollArea>
      <ChatInput />
    </div>
  );
}
