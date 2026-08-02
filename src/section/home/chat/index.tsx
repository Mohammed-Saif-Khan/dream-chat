"use client";
import { Participant } from "@/store/chat-list/type";
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
  isGroup?: boolean;
  isGroupAdmin?: boolean;
  groupParticipants?: Participant[];
  onGroupAvatarUpdated?: () => void;
};

export default function ChatLayout({
  selectedUser,
  receiverId,
  senderId,
  profile,
  typing,
  isGroup,
  isGroupAdmin,
  groupParticipants,
  onGroupAvatarUpdated,
}: ChatLayoutProps) {
  const { chat, addMessage, editMessage } = useMessageStore();

  return (
    <div className="flex flex-col h-svh w-full">
      <ChatHeader
        data={selectedUser}
        chatId={chat?._id}
        isGroup={isGroup}
        isGroupAdmin={isGroupAdmin}
        groupId={isGroup ? receiverId : undefined}
        onGroupAvatarUpdated={onGroupAvatarUpdated}
      />
      <Chat
        chat={chat}
        chatId={chat?._id}
        senderId={senderId}
        typing={typing}
        receiverId={receiverId}
        isGroup={isGroup}
        groupParticipants={groupParticipants}
      />
      <ChatInput
        profile={profile}
        senderId={senderId}
        receiverId={receiverId}
        isGroup={isGroup}
        groupParticipants={groupParticipants}
        addMessage={addMessage}
        editMessage={editMessage}
      />
    </div>
  );
}
