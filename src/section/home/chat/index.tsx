"use client";
import { useMessageStore } from "@/store/messages";
import { ExploreUserList } from "@/types/contact";
import { ProfileType } from "@/types/profile";
import Chat from "./chat-area";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";

type ChatLayoutProps = {
  selectedUser: ExploreUserList | undefined;
  receiverId: string;
  senderId: string;
  profile: ProfileType;
  typing: boolean;
};

export default function ChatLayout({
  selectedUser,
  receiverId,
  senderId,
  profile,
  typing,
}: ChatLayoutProps) {
  const { chat, addMessage, editMessage } = useMessageStore();

  return (
    <div className="flex flex-col h-svh w-full">
      <ChatHeader data={selectedUser} chatId={chat?._id} />
      <Chat
        chat={chat}
        chatId={chat?._id}
        senderId={senderId}
        typing={typing}
        receiverId={receiverId}
      />
      <ChatInput
        profile={profile}
        senderId={senderId}
        receiverId={receiverId}
        addMessage={addMessage}
        editMessage={editMessage}
      />
    </div>
  );
}
