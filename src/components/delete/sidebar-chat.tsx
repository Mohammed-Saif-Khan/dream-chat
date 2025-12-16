"use client";

import AvatarDP from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { chatList, siderBarMenu } from "@/utils/constant";
import { Icon } from "@iconify/react";
import { CheckCheck, EllipsisVertical } from "lucide-react";

export default function SidebarChatDelete() {
  return (
    <div>
      {chatList?.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center justify-between lg:max-w-md bg-background p-5 rounded-md group ring-0 hover:ring-2 ring-primary transition-all duration-300 ease-in-out my-2 cursor-pointer"
          )}
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
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
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
      ))}
    </div>
  );
}
