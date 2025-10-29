import { cn } from "@/lib/utils";
import { CheckCheck, Dot, Download, Files } from "lucide-react";
import React from "react";
import ChatMenu from "./controls/chat-menu";

type DocuChatProps = {
  sender: boolean;
  senderName?: string;
};

export default function DocuChat({ sender, senderName }: DocuChatProps) {
  return (
    <div
      className={cn("flex flex-col items-start mb-4", sender && "items-end")}
    >
      <div
        className={cn(
          "flex items-center h-5",
          sender && "flex-row-reverse mr-4"
        )}
      >
        <p className="text-sm text-foreground">
          {senderName ? "Edward Lietz" : "You"}
        </p>
        <Dot size={30} />
        <p className="text-sm text-muted-foreground">02:39 PM</p>
        {sender && (
          <CheckCheck
            size={14}
            className={cn("text-online ml-2", sender && "mr-2")}
          />
        )}
      </div>
      <div
        className={cn("flex items-center gap-1", sender && "flex-row-reverse")}
      >
        <div
          className={cn(
            "mt-1 p-3 bg-muted md:max-w-[419px] w-fit rounded-t-xl text-sm tracking-wide flex items-center gap-x-8",
            sender
              ? "rounded-l-xl bg-primary text-white"
              : "rounded-r-xl bg-gray-200 dark:bg-muted"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full">
              <Files className="text-primary dark:text-black" />
            </div>
            <div>
              <p className="text-base font-medium">Ecommerce.zip</p>
              <p className="text-xs font-medium">14.23 KB</p>
            </div>
          </div>
          <div className="m-2 bg-white rounded-md p-1">
            <Download
              size={16}
              className="text-primary dark:text-black cursor-pointer"
            />
          </div>
        </div>
        <ChatMenu sender={sender} />
      </div>
    </div>
  );
}
