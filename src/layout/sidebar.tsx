import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "@/modules/sidebar/chat-header/chat-header";
import ChatSidebar from "@/section/home/sidebar";
import SettingSidebar from "@/section/settings";
import React from "react";

export default function Sidebar({ pathname }: { pathname?: string }) {
  const renderSidebar = (pathname: string) => {
    switch (pathname) {
      case "home":
        return <ChatSidebar />;
      case "settings":
        return <SettingSidebar />;
      default:
        <ChatSidebar />;
        break;
    }
  };

  return (
    <div className="w-full h-full bg-muted flex flex-col overflow-hidden">
      <ChatHeader heading={pathname} />
      <div className="flex flex-col overflow-hidden">
        <ScrollArea className="overflow-y-auto">
          <div className="flex-1 overflow-y-auto pt-5 px-5">
            {renderSidebar(pathname || "")}
            <div className="h-4" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
