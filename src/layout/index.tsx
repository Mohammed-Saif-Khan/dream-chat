import React from "react";
import Menubar from "./menubar";
import Sidebar from "./sidebar";
import { ProfileType } from "@/types/profile";
import { cn } from "@/lib/utils";

export default async function WebLayout({
  children,
  pathname,
  profile,
  query,
}: {
  children: React.ReactNode;
  pathname?: string;
  profile: ProfileType;
  query: Record<string, string>;
}) {
  const isChatOpen = Object.keys(query)?.length > 0;

  return (
    <div className="flex w-full xl:flex-row flex-col-reverse">
      <div className={cn(isChatOpen ? "hidden xl:flex" : "flex")}>
        <Menubar profile={profile} />
      </div>
      <div className="grid xl:grid-cols-12 flex-1 w-full">
        <div
          className={cn(
            "xl:col-span-3 border-r flex-col xl:min-h-dvh h-[calc(100dvh-70px)] min-w-[361px] shrink-0",
            isChatOpen ? "hidden xl:flex" : "flex"
          )}
        >
          <Sidebar pathname={pathname} profile={profile} />
        </div>
        <div
          className={cn(
            "xl:col-span-9 xl:grid hidden w-full",
            isChatOpen ? "grid" : "hidden xl:grid"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
