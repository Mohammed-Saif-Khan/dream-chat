"use client";
import { socket } from "@/socket";
import {
  deliveredHandler,
  handleMessageDelete,
  readHandler,
  readOldMessagesHandler,
  receiveMessageHandler,
} from "@/socket/message";
import { stopTypingHandler, typingHandler } from "@/socket/typing";
import { useMessageStore } from "@/store/messages";
import { ExploreUserList } from "@/types/contact";
import { ProfileType } from "@/types/profile";
import { useSearchParams } from "next/navigation";
import React from "react";
import ChatLayout from "./chat";
import Welcome from "./welcome";

type HomeProps = {
  profile: ProfileType;
  userList: ExploreUserList[];
};

export default function Home({ profile, userList }: HomeProps) {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiver");
  const selectedUser = userList.find((u) => u?.user?._id === receiverId);
  const senderId = profile?._id;

  const [typing, setTyping] = React.useState<boolean>(false);
  const { getMessages, addMessage, updateMessageStatus } = useMessageStore();

  React.useEffect(() => {
    if (!receiverId) return;
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
    socket.on("message-delete", handleMessageDelete);

    return () => {
      socket.off("user-typing", handleTyping);
      socket.off("user-stop-typing", handleStopTyping);
      socket.off("receiver-message", handleReceiveMessage);
      socket.off("message-delivered", handleBulkDelivered);
      socket.off("message-read", handleReadMessage);
      socket.off("message-delete", handleMessageDelete);
    };
  }, [receiverId]);

  React.useEffect(() => {
    if (!senderId) return;
    socket.emit("join-room", senderId);
  }, [senderId]);

  React.useEffect(() => {
    if (!receiverId) return;
    readOldMessagesHandler(receiverId);
  }, [receiverId]);

  React.useEffect(() => {
    useMessageStore.setState({ chat: null });
    if (receiverId) getMessages(receiverId);
  }, [receiverId]);

  return (
    <>
      {receiverId ? (
        <ChatLayout
          selectedUser={selectedUser}
          senderId={senderId}
          receiverId={receiverId}
          profile={profile}
          typing={typing}
        />
      ) : (
        <Welcome profile={profile} />
      )}
    </>
  );
}
