"use client";
import React from "react";
import Welcome from "./welcome";
import { useSearchParams } from "next/navigation";
import Chat from "./chat";
import ChatLayout from "@/layout/chat-layout";

export default function Home() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiver");

  return (
    <div>
      {receiverId ? (
        <ChatLayout>
          <Chat />
        </ChatLayout>
      ) : (
        <Welcome />
      )}
    </div>
  );
}
