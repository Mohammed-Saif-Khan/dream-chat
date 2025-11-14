import React from "react";
import Menubar from "./menubar";
import Sidebar from "./sidebar";
import { ProfileType } from "@/types/profile";

export default async function WebLayout({
  children,
  pathname,
  profile,
}: {
  children: React.ReactNode;
  pathname?: string;
  profile: ProfileType;
}) {
  return (
    <div className="flex w-full xl:flex-row flex-col-reverse">
      <Menubar profile={profile} />
      <div className="grid lg:grid-cols-12 flex-1 w-full">
        <div className="xl:col-span-3 border-r flex flex-col xl:min-h-dvh h-[calc(100dvh-70px)] min-w-[361px] shrink-0">
          <Sidebar pathname={pathname} profile={profile} />
        </div>
        <div className="xl:col-span-9 xl:block hidden w-full">{children}</div>
      </div>
    </div>
  );
}
