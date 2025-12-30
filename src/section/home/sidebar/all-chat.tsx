"use client";
import ChatCard from "@/components/card/chat-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { socket } from "@/socket";
import { handleChatlistSort } from "@/socket/chatlist";
import { deliveredHandler, handleMessageDelete } from "@/socket/message";
import { useMessageStore } from "@/store/messages";
import { useChatlistStore } from "@/store/chat-list";
import { Funnel } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AllChat() {
  const { chatlist, getChatlist } = useChatlistStore();
  const { updateMessageStatus } = useMessageStore();

  React.useEffect(() => {
    const handleBulkDelivered = deliveredHandler(updateMessageStatus);

    socket.on("receiver-message", handleChatlistSort);
    socket.on("message-delivered", handleBulkDelivered);
    socket.on("message-delete", handleMessageDelete);

    return () => {
      socket.off("receive-message", handleChatlistSort);
      socket.off("message-delivered", handleBulkDelivered);
      socket.off("message-delete", handleMessageDelete);
    };
  }, []);

  React.useEffect(() => {
    getChatlist();
  }, []);

  return (
    <div className="pt-5 pb-3.5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-foreground">All Chats</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                <Funnel
                  width={16}
                  height={16}
                  className="text-muted-foreground cursor-pointer"
                />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                All Chats
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                Favourites Chats
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                Trash
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {chatlist?.map((item) => (
        <Link key={item?._id} href={`?receiver=${item?.participants?._id}`}>
          <ChatCard
            id={item?.participants?._id}
            name={`${item?.participants?.firstName} ${item?.participants?.lastName}`}
            src={item?.participants?.avatar}
            fallback="M"
            status={true}
            isDelete={item?.lastMessage?.isDeleted}
            deleteAt={item?.lastMessage?.deletedAt}
            time={item?.lastMessage?.time}
            unreadCount={item?.unreadCount}
            message={item?.lastMessage?.message}
            senderId={item?.lastMessage?.senderId}
          />
        </Link>
      ))}
    </div>
  );
}
