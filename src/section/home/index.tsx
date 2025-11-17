"use client";
import { ProfileType } from "@/types/profile";
import { useSearchParams } from "next/navigation";
import ChatLayout from "./chat";
import Welcome from "./welcome";

export default function Home({ profile }: { profile: ProfileType }) {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiver");

  return <>{receiverId ? <ChatLayout /> : <Welcome profile={profile} />}</>;
}
