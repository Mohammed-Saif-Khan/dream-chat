import AVATAR_1 from "@/assets/home/avatar-01.jpg";
import AvatarDP from "@/components/avatar";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { cn } from "@/lib/utils";
import ProfielInfo from "@/section/profile/profile-info";
import { chatHeaderSetting, profileItem } from "@/utils/constant";
import { Icon } from "@iconify/react";
import {
  ArrowRight,
  ChevronRight,
  EllipsisVertical,
  Info,
  MessageCircle,
  Phone,
  Search,
  Video,
} from "lucide-react";
import React from "react";
import { renderIcon } from "./render-icons";
import { useHistoryUI } from "@/hooks/use-back-button";

export default function ChatHeader() {
  const { isOpen, close, open } = useHistoryUI();

  return (
    <div className="py-2 px-4 bg-background border-b shadow-xs flex items-center justify-between">
      <div onClick={() => open(true)} className="flex items-center gap-3">
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
          </TooltipTrigger>
          <TooltipContent>
            <p>Voice Call</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            asChild
            className="hidden md:flex"
            onClick={() => open(true)}
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
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent className="bg-muted flex flex-col md:w-auto w-full">
          <ScrollArea className="h-full chat-scrollarea">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold text-foreground">
                Contact Info
              </SheetTitle>
            </SheetHeader>
            <SheetDescription asChild>
              <div className="p-4">
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
                <div className="flex items-center justify-between gap-4 mb-0">
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
                <div>
                  <ProfielInfo />
                  <div>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Social Profiles
                    </p>
                    <Card className="bg-background rounded-none p-5 shadow-none gap-0 flex-row items-center justify-between">
                      <Icon
                        icon="ic:baseline-facebook"
                        width="20"
                        height="20"
                        className="text-muted-foreground"
                      />
                      <Icon
                        icon="lineicons:instagram"
                        width="20"
                        height="20"
                        className="text-muted-foreground"
                      />
                      <Icon
                        icon="ri:twitter-x-fill"
                        width="20"
                        height="20"
                        className="text-muted-foreground"
                      />
                      <Icon
                        icon="mdi:linkedin"
                        width="20"
                        height="20"
                        className="text-muted-foreground"
                      />
                      <Icon
                        icon="mingcute:youtube-fill"
                        width="20"
                        height="20"
                        className="text-muted-foreground"
                      />
                    </Card>
                  </div>
                  <div className="py-6">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Common Groups
                    </p>
                    <Card className="bg-background rounded-none p-5 shadow-none gap-0 flex-col items-center justify-between">
                      <div className="flex items-center w-full justify-between pb-4 mb-4 border-b cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div>
                            <AvatarDP
                              src={undefined}
                              alt="recent-chat"
                              fallback="CL"
                              avatarSize="w-12 h-12"
                              statusbarClass="size-4.5"
                              fallbackClass="text-white text-base font-semibold bg-indigo-500"
                            />
                          </div>
                          <div>
                            <p className="text-base font-semibold text-foreground">
                              Software Technology
                            </p>
                            <p className="text-sm text-muted-foreground capitalize group-hover:text-primary">
                              12 Members
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-muted-foreground group-hover:text-primary"
                        />
                      </div>
                      <div className="flex items-center w-full justify-between pb-4 mb-3 border-b cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div>
                            <AvatarDP
                              src={undefined}
                              alt="recent-chat"
                              fallback="CL"
                              avatarSize="w-12 h-12"
                              statusbarClass="size-4.5"
                              fallbackClass="text-white text-base font-semibold bg-cyan-500"
                            />
                          </div>
                          <div>
                            <p className="text-base font-semibold text-foreground">
                              Cricket Lovers
                            </p>
                            <p className="text-sm text-muted-foreground capitalize group-hover:text-primary">
                              15 Members
                            </p>
                          </div>
                        </div>

                        <ChevronRight
                          size={14}
                          className="text-muted-foreground group-hover:text-primary"
                        />
                      </div>
                      <p className="text-sm text-indigo-600 hover:underline cursor-pointer flex items-center gap-2">
                        More Groups <ArrowRight size={15} />
                      </p>
                    </Card>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Others
                    </p>
                    <Card className="bg-background rounded-none p-5 shadow-none gap-0">
                      {profileItem?.map((item, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-center w-full justify-between pb-4 mb-4 border-b cursor-pointer group",
                            profileItem.length - 1 === index &&
                              "mb-0 border-0 pb-0"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                                {renderIcon(item.icon)}
                                {item?.label}
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            size={14}
                            className="text-muted-foreground group-hover:text-primary"
                          />
                        </div>
                      ))}
                    </Card>
                  </div>
                </div>
              </div>
            </SheetDescription>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
