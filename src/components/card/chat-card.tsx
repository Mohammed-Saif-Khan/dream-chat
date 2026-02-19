"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { siderBarMenu } from "@/utils/constant";
import { Ban, EllipsisVertical } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AvatarDP from "../avatar";
import { Badge } from "../ui/badge";
import { useProfilePreviewStore } from "@/store/useProfilePreviewStore";
import { useNavigate } from "@/hooks/use-navigate";

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
  isDelete: boolean | undefined;
  deleteAt: string | null | undefined;
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
  onClick,
  isDelete,
  deleteAt,
}: ChatCard) {
  const { push } = useNavigate();
  const searchParams = useSearchParams();
  const { openPreview } = useProfilePreviewStore();
  const receiverId = searchParams.get("receiver");

  return (
    <div>
      <div
        onClick={() => {
          if (id) {
            push(`?receiver=${id}`);
          }
        }}
        className={cn(
          "flex items-start justify-between lg:max-w-md bg-background p-5 rounded-md group ring-0 hover:ring-2 ring-primary transition-all duration-300 ease-in-out my-2 cursor-pointer",
          id === receiverId && "ring-2",
        )}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <div>
            <AvatarDP
              src={src}
              alt="chat-card"
              fallback={fallback}
              avatarSize="w-12 h-12"
              statusbar={status}
              onClick={(e) => {
                e?.stopPropagation();
                openPreview(src || "");
              }}
            />
          </div>
          <div className="cursor-pointer">
            <p className="text-base font-semibold text-accent-foreground">
              {name}
            </p>
            <div className={cn("flex items-center gap-2")}>
              {isDelete && !deleteAt ? (
                <p
                  className={cn(
                    "text-sm text-muted-foreground line-clamp-1 flex items-center gap-1",
                  )}
                >
                  <Ban size={14} /> This message is Deleted
                </p>
              ) : (
                <p className={cn("text-sm text-muted-foreground line-clamp-1")}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground text-end mb-1 text-nowrap">
            {time}
          </p>
          <div className="flex items-center justify-end gap-2">
            {unreadCount !== undefined && unreadCount > 0 && (
              <Badge className="h-5 min-w-5 rounded-full font-semibold tabular-nums bg-chart-5 py-0.5 px-1 pt-1 text-white">
                {unreadCount}
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span>
                  <EllipsisVertical
                    width={16}
                    height={16}
                    className="text-muted-foreground cursor-pointer"
                  />
                </span>
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
    </div>
  );
}
