"use client";
import { ProfileType } from "@/types/profile";
import { useSearchParams } from "next/navigation";
import ChatLayout from "./chat";
import Welcome from "./welcome";
import { ExploreUserList } from "@/types/contact";

type HomeProps = {
  profile: ProfileType;
  userList: ExploreUserList[];
};

export default function Home({ profile, userList }: HomeProps) {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiver");
  const selectedUser = userList.find((user) => user?._id === receiverId);

  return (
    <>
      {receiverId ? (
        <ChatLayout selectedUser={selectedUser} />
      ) : (
        <Welcome profile={profile} />
      )}
    </>
  );
}
