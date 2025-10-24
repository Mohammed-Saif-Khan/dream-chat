"use client";
import React from "react";
import { Icon } from "@iconify/react";

export default function FloatingButton() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed md:-bottom-8 bottom-4 right-2 md:-right-6 p-2 items-end justify-end w-24 h-24 md:block flex z-50">
      <div
        onClick={scrollTop}
        className="text-white shadow-xl flex items-center justify-center p-3 rounded-full z-50 absolute bg-primary cursor-pointer"
      >
        <Icon icon="ion:arrow-up-outline" width="18" height="18" />
      </div>
    </div>
  );
}
