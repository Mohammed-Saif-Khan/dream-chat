import Image from "next/image";
import React from "react";
import EMOJI_1 from "@/assets/auth/emoji-01.svg";
import AvatarDP from "@/components/avatar";
import AVATAR_2 from "@/assets/auth/avatar-05.jpg";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Send } from "lucide-react";

export default function Welcome() {
  return (
    <div className="bg-[url(/home/bg-01.png)] w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center gap-3 p-2.5 bg-background shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] rounded-full w-fit">
          <AvatarDP
            src={AVATAR_2}
            fallback="M"
            alt="avatar-user"
            avatarSize="w-8 h-8"
          />
          <p className="text-base font-semibold">Welcome! Salom </p>
          <Image
            src={EMOJI_1}
            width={19}
            height={19}
            alt="emoji-image_4"
            className="top-8 left-6"
          />
        </div>

        <div className="mt-3 text-center">
          <p className="text-base text-muted-foreground mb-6">
            Choose a person or group to start chat with them.
          </p>
          <div className="space-x-3">
            <Button className="rounded-sm text-white">
              <MessageSquarePlus />
              Start Chat
            </Button>
            <Button className="rounded-sm text-white">
              <Send />
              Invite Friends
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
