import React from "react";
import AuthImageView from "../image-view";
import Success from "./success";

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 h-screen overflow-hidden">
      <div className="bg-[linear-gradient(134.21deg,_#fff_2.18%,_#efebff_74.65%)] h-full flex items-center justify-center">
        <Success />
      </div>
      <div className="hidden md:grid bg-gradient-to-b from-[#6338f6] to-[#3a2190] h-full">
        <AuthImageView />
      </div>
    </div>
  );
}
