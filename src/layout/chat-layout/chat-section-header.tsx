import AVATAR_1 from "@/assets/home/avatar-01.jpg";
import AvatarDP from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chatHeaderSetting } from "@/utils/constant";
import { EllipsisVertical, Info, Phone, Search, Video } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="py-2 px-4 bg-background border-b shadow-xs flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AvatarDP
          src={AVATAR_1}
          alt="chat-user"
          fallback="A"
          avatarSize="w-12 h-12"
          statusbar={true}
        />
        <div>
          <p className="text-base font-semibold text-accent-foreground">
            Mark Villiams
          </p>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Search
              size={14}
              className="text-muted-foreground cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Video size={14} className="text-muted-foreground cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Video Call</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Phone size={14} className="text-muted-foreground cursor-pointer" />
          </TooltipTrigger>{" "}
          <TooltipContent>
            <p>Voice Call</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info size={14} className="text-muted-foreground cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Info</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical
              size={14}
              className="text-muted-foreground cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chat Setting</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {chatHeaderSetting?.map((item, index) => {
              const Icon = item?.icon;
              return (
                <DropdownMenuItem
                  key={`CHAT-SETTING-${index}`}
                  className="cursor-pointer focus:text-primary"
                >
                  <Icon className="cursor-pointer focus:text-primary" />{" "}
                  {item?.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
