"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

import { cn } from "@/lib/utils";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { CheckCheck, Dot } from "lucide-react";
import ChatMenu from "./controls/chat-menu";

type VdieoPlayerProps = {
  sender: boolean;
  senderName?: string;
};

export default function VideoPlayer({ sender, senderName }: VdieoPlayerProps) {
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
        <p className="text-sm text-foreground">{sender ? "You" : senderName}</p>
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
              ? "rounded-l-xl text-white"
              : "rounded-r-xl bg-gray-200 dark:bg-muted"
          )}
        >
          <MediaPlayer
            src={{
              src: "https://files.vidstack.io/sprite-fight/720p.mp4",
              type: "video/mp4",
            }}
            playsInline
            aspectRatio="16/9"
            title="Sprite Fight"
            crossOrigin
            streamType="on-demand"
            viewType="video"
          >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
        <ChatMenu sender={sender} />
      </div>
    </div>
  );
}
