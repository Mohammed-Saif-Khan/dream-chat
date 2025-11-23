"use client";
import { ExploreUserList } from "@/types/contact";
import Chat from "./chat-area";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import { useChatStore } from "@/store/chat";
import React from "react";
import { socket } from "@/socket";
import { MessageType } from "@/store/chat/type";

type ChatLayoutProps = {
  selectedUser: ExploreUserList | undefined;
  receiverId: string;
  senderId: string;
};

export default function ChatLayout({
  selectedUser,
  receiverId,
  senderId,
}: ChatLayoutProps) {
  const [typing, setTyping] = React.useState<boolean>(false);
  const { getChat, chat, addMessage } = useChatStore();

  React.useEffect(() => {
    const handleTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === receiverId) setTyping(true);
    };
    const handleStopTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === receiverId) setTyping(false);
    };
    const handleReceiveMessage = (data: MessageType) => addMessage(data);

    socket.on("user-typing", handleTyping);
    socket.on("user-stop-typing", handleStopTyping);
    socket.on("receiver-message", handleReceiveMessage);

    return () => {
      socket.off("user-typing", handleTyping);
      socket.off("user-stop-typing", handleStopTyping);
      socket.off("receiver-message", handleReceiveMessage);
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
        receiverId={receiverId}
        senderId={senderId}
        addMessage={addMessage}
      />
    </div>
  );
}
