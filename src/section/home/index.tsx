"use client";
import ChatLayout from "@/layout/chat-layout";
import { useSearchParams } from "next/navigation";
import Chat from "./chat";
import Welcome from "./welcome";
import { ProfileType } from "@/types/profile";

export default function Home({ profile }: { profile: ProfileType }) {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiver");

  return (
    <div>
      {receiverId ? (
        <ChatLayout>
          <Chat />
        </ChatLayout>
      ) : (
        <Welcome profile={profile} />
      )}
    </div>
  );
}
