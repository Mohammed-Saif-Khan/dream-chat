import { ExploreUserList } from "@/types/contact";
import Chat from "./chat-area";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";

type ChatLayoutProps = {
  selectedUser: ExploreUserList | undefined;
  receiverId: string;
};

export default function ChatLayout({
  selectedUser,
  receiverId,
}: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-svh w-full">
      <ChatHeader data={selectedUser} />
      <Chat />
      <ChatInput receiverId={receiverId} />
    </div>
  );
}
