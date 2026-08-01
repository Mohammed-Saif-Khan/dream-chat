import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ChatHeader from "@/modules/sidebar/chat-header/chat-header";
import Explore from "@/section/explore";
import ChatSidebar from "@/section/home/sidebar";
import Groups from "@/section/home/sidebar/groups";
import ProfileSidebar from "@/section/profile";
import SettingSidebar from "@/section/settings";
import { ExploreUserList } from "@/types/contact";

type SidebarProps = {
  pathname?: string;
  userList: ExploreUserList[];
};

export default function Sidebar({ pathname, userList }: SidebarProps) {
  const renderSidebar = (pathname: string, userList: ExploreUserList[]) => {
    switch (pathname) {
      case "chat":
        return <ChatSidebar />;
      case "settings":
        return <SettingSidebar />;
      case "profile":
        return <ProfileSidebar />;
      case "groups":
        return <Groups data={userList} />;
      case "explore":
        return <Explore userList={userList} />;
      default:
        return <ChatSidebar />;
    }
  };

  return (
    <div className="w-full h-full bg-muted flex flex-col overflow-hidden">
      <ChatHeader heading={pathname} />
      <div className="flex flex-col overflow-hidden">
        <ScrollArea className="overflow-y-auto chat-scrollarea">
          <div
            className={cn(
              "flex-1 overflow-y-auto",
              pathname === "chat" ? "pt-0 px-4" : "pt-5 px-4",
            )}
          >
            {renderSidebar(pathname || "", userList)}
            <div className="xl:h-4" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
