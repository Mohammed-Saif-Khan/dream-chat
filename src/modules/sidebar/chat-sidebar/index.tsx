import { ScrollArea } from "@/components/ui/scroll-area";
import AllChat from "./all-chat";
import RecentChat from "./recent-chat";

export default function ChatSidebar() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <ScrollArea className="flex-1 overflow-y-auto">
        <RecentChat />
        <AllChat />
        <div className="h-4" />
      </ScrollArea>
    </div>
  );
}
