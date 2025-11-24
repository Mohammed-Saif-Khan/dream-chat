"use client";
import { ExploreUserList } from "@/types/contact";
import Chat from "./chat-area";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import { useChatStore } from "@/store/chat";
import React from "react";
import { socket } from "@/socket";
import { MessageType } from "@/store/chat/type";
import { ProfileType } from "@/types/profile";

type ChatLayoutProps = {
  selectedUser: ExploreUserList | undefined;
  receiverId: string;
  senderId: string;
  profile: ProfileType;
};

export default function ChatLayout({
  selectedUser,
  receiverId,
  senderId,
  profile,
}: ChatLayoutProps) {
  const [typing, setTyping] = React.useState<boolean>(false);
  const { getChat, chat, addMessage, editMessageId } = useChatStore();

  React.useEffect(() => {
    const handleTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === receiverId) setTyping(true);
    };
    const handleStopTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === receiverId) setTyping(false);
    };
    const handleReceiveMessage = (data: MessageType) => addMessage(data);
    const handleReceiverMessageEditId = ({
      tempId,
      originalMessage,
    }: {
      tempId: string;
      originalMessage: MessageType;
    }) => editMessageId(tempId, originalMessage);

    socket.on("user-typing", handleTyping);
    socket.on("user-stop-typing", handleStopTyping);
    socket.on("receiver-message", handleReceiveMessage);
    socket.on("receiver-message-edit-id", handleReceiverMessageEditId);

    return () => {
      socket.off("user-typing", handleTyping);
      socket.off("user-stop-typing", handleStopTyping);
      socket.off("receiver-message", handleReceiveMessage);
      socket.off("receiver-message-edit-id", handleReceiverMessageEditId);
    };
  }, []);

  React.useEffect(() => {
    if (!senderId) return;
    socket.emit("join-room", senderId);
  }, [senderId]);

  React.useEffect(() => {
    useChatStore.setState({ chat: null });
    if (receiverId) getChat(receiverId);
  }, [receiverId]);

  return (
    <div className="flex flex-col h-svh w-full">
      <ChatHeader data={selectedUser} />
      <Chat chat={chat} senderId={senderId} typing={typing} />
      <ChatInput
        profile={profile}
        senderId={senderId}
        receiverId={receiverId}
        addMessage={addMessage}
        editMessageId={editMessageId}
      />
    </div>
  );
}
