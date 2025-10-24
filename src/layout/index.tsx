import React from "react";
import Menubar from "./menubar";
import Sidebar from "./sidebar";

export default function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-full">
      <Menubar />
      <div className="grid md:grid-cols-12 flex-1 w-full">
        <div className="md:col-span-3 border-r flex flex-col h-screen">
          <Sidebar />
        </div>
        <div className="md:col-span-9 h-screen w-full">{children}</div>
      </div>
    </div>
  );
}
