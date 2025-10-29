import React from "react";

type ChatDividerProps = {
  date: string;
};

export default function ChatDivider({ date }: ChatDividerProps) {
  return (
    <div className="relative inline-flex items-center justify-center w-full">
      <hr className="h-0.5 my-4 bg-gray-200 border-0 rounded-sm dark:bg-gray-700 w-full" />
      <div className="absolute px-4 -translate-x-1/2 bg-gray-200 left-1/2 dark:bg-gray-900 rounded-full text-sm font-semibold">
        {date}
      </div>
    </div>
  );
}
