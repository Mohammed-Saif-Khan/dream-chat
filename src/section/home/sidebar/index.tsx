"use client";
import dynamic from "next/dynamic";

const AllChat = dynamic(() => import("./all-chat"), { ssr: false });

export default function ChatSidebar() {
  return (
    <div>
      {/* <RecentChat /> */}
      <AllChat />
    </div>
  );
}
