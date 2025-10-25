import React from "react";
import ChatHeader from "./chat-section-header";
import ChatInput from "./chat-section-input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen w-full">
      <ChatHeader />
      <ScrollArea className="flex-1 bg-[url(/home/bg-01.png)]">
        {children} <div className="h-4" />
      </ScrollArea>
      <ChatInput />
    </div>
  );
}
