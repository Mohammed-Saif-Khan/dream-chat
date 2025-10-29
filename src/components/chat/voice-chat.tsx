import React from "react";
import ChatMenu from "./controls/chat-menu";
import { cn } from "@/lib/utils";
import { CheckCheck, Dot } from "lucide-react";

type VoiceChatProps = {
  sender: boolean;
  senderName?: string;
  audioSrc: string;
};

export default function VoiceChat({
  sender,
  senderName,
  audioSrc,
}: VoiceChatProps) {
  return (
    <div>
      <div
        className={cn("flex flex-col items-start mb-4", sender && "items-end")}
      >
        <div
          className={cn(
            "flex items-center h-5 ml-4",
            sender && "flex-row-reverse mr-6"
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
          className={cn(
            "flex items-center gap-1",
            sender && "flex-row-reverse"
          )}
        >
          <div
            className={cn(
              "mt-0 p-3 md:max-w-[419px] w-fit rounded-t-xl text-sm tracking-wide"
            )}
          >
            <audio controls className="rounded-lg">
              <source src={audioSrc} type="audio/mpeg" />
            </audio>
          </div>
          <ChatMenu sender={sender} />
        </div>
      </div>
    </div>
  );
}
