"use client";

import AvatarDP from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { chatList } from "@/utils/constant";
import { Icon } from "@iconify/react";
import { CheckCheck, EllipsisVertical, Funnel } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AllChat() {
  return (
    <div className="pt-5 px-5 pb-3.5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-foreground">All Chats</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Funnel
                width={16}
                height={16}
                className="text-muted-foreground cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                All Chats
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                Favourites Chats
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                Trash
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {chatList?.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between lg:max-w-md bg-background p-5 rounded-md group ring-0 hover:ring-2 ring-primary transition-all duration-300 ease-in-out my-2 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <AvatarDP
              src={item?.avatar}
              alt="recent-chat"
              fallback="recent-chat"
              avatarSize="w-12 h-12"
              statusbar={item?.online}
            />
            <div>
              <p className="text-base font-semibold text-accent-foreground">
                {item?.name}
              </p>

              {item?.typing && (
                <div className="flex items-center gap-1">
                  <p className="text-sm text-muted-foreground">is typing</p>
                  <span className="flex space-x-1 mt-2">
                    <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounceDot delay-[0ms]"></span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounceDot delay-[150ms]"></span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full animate-bounceDot delay-[300ms]"></span>
                  </span>
                </div>
              )}

              <div className={cn("flex items-center gap-2")}>
                {item?.icon && (
                  <item.icon
                    className={cn(
                      item?.message === "Incoming Video Call"
                        ? "text-online"
                        : item?.message === "Missed Video Call"
                        ? "text-red-500"
                        : "text-muted-foreground"
                    )}
                    width={14}
                    height={14}
                  />
                )}
                <p
                  className={cn(
                    "text-sm",
                    item?.message === "Incoming Video Call"
                      ? "text-online"
                      : item?.message === "Missed Video Call"
                      ? "text-red-500"
                      : "text-muted-foreground"
                  )}
                >
                  {item?.message}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground text-end mb-1">
              {item?.time}
            </p>

            <div className="flex items-center justify-end gap-2">
              {item?.pin && (
                <Icon
                  icon="tabler:pin"
                  width="14"
                  height="14"
                  className="text-muted-foreground"
                />
              )}
              {item?.delivered && (
                <CheckCheck size={14} className="text-online" />
              )}
              {item?.unreadCount && (
                <Badge className="h-5 min-w-5 rounded-full font-semibold tabular-nums bg-chart-5 py-0.5 px-1 pt-1 text-white">
                  {item?.unreadCount}
                </Badge>
              )}
              <EllipsisVertical
                width={16}
                height={16}
                className="text-muted-foreground cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
