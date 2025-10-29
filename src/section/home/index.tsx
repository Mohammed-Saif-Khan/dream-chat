"use client";
import ChatLayout from "@/layout/chat-layout";
import { useSearchParams } from "next/navigation";
import Chat from "./chat";
import Welcome from "./welcome";

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
