"use client";
import { useChatStore } from "@/store/chat";
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
  const { chat, addMessage, editMessage } = useChatStore();

  return (
    <div className="flex flex-col h-svh w-full">
      <ChatHeader data={selectedUser} />
      <Chat chat={chat} senderId={senderId} typing={typing} />
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
