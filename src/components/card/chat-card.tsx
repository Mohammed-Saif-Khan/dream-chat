"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { siderBarMenu } from "@/utils/constant";
import { EllipsisVertical } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AvatarDP from "../avatar";
import { Badge } from "../ui/badge";
import { useProfileStore } from "@/store/profile";

type ChatCard = {
  src?: string | null;
  fallback: string;
  status: boolean;
  name: string;
  message: string | undefined;
  time: string | undefined;
  unreadCount: number;
  id?: string;
  onClick?: () => void;
  senderId: string | undefined;
};

export default function ChatCard({
  src,
  fallback,
  status,
  name,
  message,
  time,
  unreadCount,
  id,
  senderId,
  onClick,
}: ChatCard) {
  const { profile } = useProfileStore();
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiver");

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start justify-between lg:max-w-md bg-background p-5 rounded-md group ring-0 hover:ring-2 ring-primary transition-all duration-300 ease-in-out my-2 cursor-pointer",
        id === receiverId && "ring-2"
      )}
    >
      <div className="flex items-center gap-2">
        <AvatarDP
          src={src}
          alt="chat-card"
          fallback={fallback}
          avatarSize="w-12 h-12"
          statusbar={status}
        />
        <div>
          <p className="text-base font-semibold text-accent-foreground">
            {name}
          </p>
          <div className={cn("flex items-center gap-2")}>
            <p className={cn("text-sm text-muted-foreground line-clamp-1")}>
              {message}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground text-end mb-1 text-nowrap">
          {time}
        </p>
        <div className="flex items-center justify-end gap-2">
          {unreadCount !== undefined &&
            unreadCount > 0 &&
            senderId !== profile?._id && (
              <Badge className="h-5 min-w-5 rounded-full font-semibold tabular-nums bg-chart-5 py-0.5 px-1 pt-1 text-white">
                {unreadCount}
              </Badge>
            )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical
                width={16}
                height={16}
                className="text-muted-foreground cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              {siderBarMenu?.map((item, index) => {
                const Icon = item?.icon;
                return (
                  <DropdownMenuItem
                    key={`SIDERBAR-MENU-${index}`}
                    className="cursor-pointer focus:text-primary"
                  >
                    <Icon className="focus:text-primary" />
                    {item?.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
