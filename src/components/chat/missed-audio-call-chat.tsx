import { cn } from "@/lib/utils";
import { CheckCheck, Dot, PhoneCall } from "lucide-react";
import ChatMenu from "./controls/chat-menu";

type MissedAudioCallProps = {
  sender: boolean;
  senderName?: string;
};

export default function MissedAudioCall({
  sender,
  senderName,
}: MissedAudioCallProps) {
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
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-3 rounded-full">
              <PhoneCall size={22} className="text-white" />
            </div>
            <div>
              <p className="text-base font-medium">Missed Audio Call</p>
            </div>
          </div>
        </div>
        <ChatMenu sender={sender} />
      </div>
    </div>
  );
}
