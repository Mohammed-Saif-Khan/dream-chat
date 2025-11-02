import AllChat from "./all-chat";
import RecentChat from "./recent-chat";

export default function ChatSidebar() {
  return (
    <div>
      <RecentChat />
      <AllChat />
    </div>
  );
}
