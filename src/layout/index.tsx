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
    <div className="flex h-screen w-full">
      <Menubar />
      <div className="grid lg:grid-cols-12 flex-1 w-full">
        <div className="lg:col-span-3 border-r flex flex-col h-screen">
          <Sidebar pathname={pathname} profile={profile} />
        </div>
        <div className="lg:col-span-9 lg:block hidden w-full">{children}</div>
      </div>
    </div>
  );
}
