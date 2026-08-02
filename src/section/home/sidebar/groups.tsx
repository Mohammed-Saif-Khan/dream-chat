"use client";
import ChatCard from "@/components/card/chat-card";
import { useChatlistStore } from "@/store/chat-list";
import React from "react";

export default function Groups() {
  const { chatlist, getChatlist } = useChatlistStore();

  React.useEffect(() => {
    getChatlist();
  }, []);

  const groupChats = chatlist?.filter((item) => item?.isGroup);

  return (
    <div>
      {groupChats?.length ? (
        <div>
          {groupChats.map((item) => (
            <div key={item?._id} className="cursor-pointer">
              <ChatCard
                key={item?._id}
                id={item?._id}
                name={item?.groupName || "Group"}
                src={item?.groupAvatar}
                fallback="G"
                status={false}
                isDelete={item?.lastMessage?.isDeleted}
                deleteAt={item?.lastMessage?.deletedAt}
                time={item?.lastMessage?.time}
                unreadCount={item?.unreadCount}
                message={item?.lastMessage?.message}
                senderId={item?.lastMessage?.senderId}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center mt-6">
          You are not part of any group yet.
        </p>
      )}
    </div>
  );
}
