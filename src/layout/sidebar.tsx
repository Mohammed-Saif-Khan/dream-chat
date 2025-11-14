import { ScrollArea } from "@/components/ui/scroll-area";
import ChatHeader from "@/modules/sidebar/chat-header/chat-header";
import ChatSidebar from "@/section/home/sidebar";
import ProfileSidebar from "@/section/profile";
import SettingSidebar from "@/section/settings";
import { ProfileType } from "@/types/profile";
import React from "react";

type SidebarProps = {
  pathname?: string;
  profile: ProfileType;
};

export default function Sidebar({ pathname, profile }: SidebarProps) {
  const renderSidebar = (pathname: string, profile: ProfileType) => {
    switch (pathname) {
      case "chat":
        return <ChatSidebar />;
      case "settings":
        return <SettingSidebar profile={profile} />;
      case "profile":
        return <ProfileSidebar profile={profile} />;
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
          <div className="flex-1 overflow-y-auto pt-5 px-4">
            {renderSidebar(pathname || "", profile)}
            <div className="xl:h-4" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
