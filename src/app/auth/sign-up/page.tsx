import React from "react";
import AuthImageView from "../image-view";
import SignUpForm from "./form";
import "@/styles/signup.css";

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 h-screen overflow-hidden">
      <div className="bg-[linear-gradient(134.21deg,_#fff_2.18%,_#efebff_74.65%)] h-full overflow-y-scroll custom-scrollbar">
        <SignUpForm />
      </div>
      <div className="hidden md:grid bg-gradient-to-b from-[#6338f6] to-[#3a2190] h-full">
        <AuthImageView />
      </div>
    </div>
  );
}
