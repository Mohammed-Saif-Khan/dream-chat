import ChatHeader from "@/modules/sidebar/chat-header/chat-header";
import ChatSidebar from "@/modules/sidebar/chat-sidebar";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-full h-full bg-muted flex flex-col overflow-hidden">
      <ChatHeader />
      <ChatSidebar />
    </div>
  );
}
