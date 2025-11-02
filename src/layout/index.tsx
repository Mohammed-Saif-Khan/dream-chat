import React from "react";
import Menubar from "./menubar";
import Sidebar from "./sidebar";

export default async function WebLayout({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname?: string;
}) {
  return (
    <div className="flex h-screen w-full">
      <Menubar />
      <div className="grid lg:grid-cols-12 flex-1 w-full">
        <div className="lg:col-span-3 border-r flex flex-col h-screen">
          <Sidebar pathname={pathname} />
        </div>
        <div className="lg:col-span-9 lg:block hidden w-full">{children}</div>
      </div>
    </div>
  );
}
