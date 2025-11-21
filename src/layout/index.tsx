import React from "react";
import Menubar from "./menubar";
import Sidebar from "./sidebar";
import { ProfileType } from "@/types/profile";
import { cn } from "@/lib/utils";
import { ExploreUserList } from "@/types/contact";

export default async function WebLayout({
  children,
  pathname,
  profile,
  query,
  userList,
}: {
  children: React.ReactNode;
  pathname?: string;
  profile: ProfileType;
  query: Record<string, string>;
  userList: ExploreUserList[];
}) {
  const isChatOpen = Object.keys(query)?.length > 0;

  return (
    <div className="flex w-full md:flex-row flex-col-reverse">
      <div className={cn(isChatOpen ? "hidden md:flex" : "flex")}>
        <Menubar profile={profile} />
      </div>
      <div className="flex w-full">
        <div
          className={cn(
            "md:col-span-3 border-r flex-col md:min-h-dvh h-[calc(100dvh-70px)] md:min-w-[361px] md:max-w-[361px] md:w-[361px] w-full shrink-0",
            isChatOpen ? "hidden md:flex" : "flex"
          )}
        >
          <Sidebar pathname={pathname} profile={profile} userList={userList} />
        </div>
        <div className={cn("w-full", isChatOpen ? "flex" : "hidden md:flex")}>
          {children}
        </div>
      </div>
    </div>
  );
}
