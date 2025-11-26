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
import { fetchInstance } from "@/utils/fetch-instance";
import { stopTypingHandler, typingHandler } from "@/socket/typing";
import {
  deliveredHandler,
  readHandler,
  readOldMessagesHandler,
  receiveMessageHandler,
} from "@/socket/message";

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
  const { getChat, chat, addMessage, editMessageId, updateMessageStatus } =
    useChatStore();

  React.useEffect(() => {
    const handleTyping = typingHandler(receiverId, setTyping);
    const handleStopTyping = stopTypingHandler(receiverId, setTyping);
    const handleReceiveMessage = receiveMessageHandler(receiverId, addMessage);
    const handleBulkDelivered = deliveredHandler(updateMessageStatus);
    const handleReadMessage = readHandler(updateMessageStatus);

    socket.on("user-typing", handleTyping);
    socket.on("user-stop-typing", handleStopTyping);
    socket.on("receiver-message", handleReceiveMessage);
    socket.on("message-delivered", handleBulkDelivered);
    socket.on("message-read", handleReadMessage);

    return () => {
      socket.off("user-typing", handleTyping);
      socket.off("user-stop-typing", handleStopTyping);
      socket.off("receiver-message", handleReceiveMessage);
      socket.off("message-delivered", handleBulkDelivered);
      socket.off("message-read", handleReadMessage);
    };
  }, [receiverId]);

  React.useEffect(() => {
    if (!senderId) return;
    socket.emit("join-room", senderId);
  }, [senderId]);

  React.useEffect(() => {
    readOldMessagesHandler(receiverId);
  }, [receiverId]);

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
