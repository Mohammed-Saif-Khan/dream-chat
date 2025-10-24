import React from "react";
import ChatHeader from "./chat-section-header";
import ChatInput from "./chat-section-input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader />
      <ScrollArea className="overflow-y-auto w-full h-full">
        {children} <div className="h-4" />
      </ScrollArea>
      <ChatInput />
    </div>
  );
}
