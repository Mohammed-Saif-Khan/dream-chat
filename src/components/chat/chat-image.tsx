import { cn } from "@/lib/utils";
import { CheckCheck, Dot } from "lucide-react";
import React from "react";
import ChatMenu from "./controls/chat-menu";
import Image, { StaticImageData } from "next/image";

type ChatImageProps = {
  sender: boolean;
  senderName?: string;
  imgSrc: string | StaticImageData;
};

export default function ChatImage({
  sender,
  senderName,
  imgSrc,
}: ChatImageProps) {
  return (
    <div
      className={cn("flex flex-col items-start mb-4", sender && "items-end")}
    >
      <div
        className={cn("flex items-center h-5", sender && "flex-row-reverse")}
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
            "mt-1 p-3 bg-muted md:max-w-[419px] w-fit rounded-t-xl text-sm tracking-wide",
            sender
              ? "rounded-l-xl bg-primary text-white"
              : "rounded-r-xl bg-gray-200 dark:bg-muted"
          )}
        >
          <Image
            src={imgSrc}
            alt="message-alt"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-md max-w-[300px] h-auto"
          />
        </div>
        <ChatMenu sender={sender} />
      </div>
    </div>
  );
}
