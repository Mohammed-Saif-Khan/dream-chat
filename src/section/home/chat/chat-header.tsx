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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chatHeaderSetting } from "@/utils/constant";
import {
  EllipsisVertical,
  Info,
  MessageCircle,
  Phone,
  PhoneCall,
  Search,
  Video,
} from "lucide-react";
import React from "react";

export default function ChatHeader() {
  const [infoSheet, setInforSheet] = React.useState(false);

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
      <div className="flex items-center gap-3 md:gap-6">
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
          <TooltipTrigger asChild className="hidden md:flex">
            <Video size={14} className="text-muted-foreground cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Video Call</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild className="hidden md:flex">
            <Phone size={14} className="text-muted-foreground cursor-pointer" />
          </TooltipTrigger>{" "}
          <TooltipContent>
            <p>Voice Call</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            asChild
            className="hidden md:flex"
            onClick={() => setInforSheet(true)}
          >
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
      <Sheet open={infoSheet} onOpenChange={setInforSheet}>
        <SheetContent className="bg-muted">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-foreground">
              Contact Info
            </SheetTitle>
            <SheetDescription asChild>
              <div>
                <div className="my-6 flex flex-col items-center justify-center">
                  <AvatarDP
                    src="/home/avatar-01.jpg"
                    alt="recent-chat"
                    fallback="recent-chat"
                    avatarSize="w-22 h-22"
                    statusbarClass="size-4.5"
                    statusbar={true}
                  />
                  <div className="mt-2">
                    <p className="text-base font-semibold text-center text-foreground">
                      Edward Lietz
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last seen at 07:15 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="bg-background w-20 h-16 rounded-sm flex flex-col items-center justify-center">
                    <Phone size={16} className="text-primary" />
                    <p className="mt-2 text-sm text-foreground">Audio</p>
                  </div>

                  <div className="bg-background w-20 h-16 rounded-sm flex flex-col items-center justify-center">
                    <Video size={16} className="text-primary" />
                    <p className="mt-2 text-sm text-foreground">Video</p>
                  </div>

                  <div className="bg-background w-20 h-16 rounded-sm flex flex-col items-center justify-center">
                    <MessageCircle size={16} className="text-primary" />
                    <p className="mt-2 text-sm text-foreground">Chat</p>
                  </div>

                  <div className="bg-background w-20 h-16 rounded-sm flex flex-col items-center justify-center">
                    <Search size={16} className="text-primary" />
                    <p className="mt-2 text-sm text-foreground">Search</p>
                  </div>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
