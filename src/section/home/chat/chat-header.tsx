import AvatarDP from "@/components/avatar";
import ProfileView from "@/components/profile-view";
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
import { useProfilePreviewStore } from "@/store/useProfilePreviewStore";
import { ExploreUserList } from "@/types/contact";
import { chatHeaderSetting } from "@/utils/constant";
import {
  ArrowLeft,
  EllipsisVertical,
  Info,
  Phone,
  Search,
  Video,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import FavouriteSheet from "./sheets/favourite-sheet";
import InfoSheet from "./sheets/info-sheet";

type ChatHeaderProps = {
  data: ExploreUserList | undefined;
  chatId: string | undefined;
};

export default function ChatHeader({ data, chatId }: ChatHeaderProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { openPreview } = useProfilePreviewStore();
  const [favSheet, setFavSheet] = React.useState<boolean>(false);

  return (
    <div className="py-2 px-4 bg-background border-b shadow-xs flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/chat">
          <ArrowLeft size={16} className="flex md:hidden" />
        </Link>
        <div className="flex items-center gap-3">
          <AvatarDP
            src={data?.avatar}
            fallback="A"
            alt="chat-user"
            statusbar={true}
            avatarSize="md:w-12 md:h-12 w-10 h-10"
            statusbarClass="md:size-3.5 size-3"
            onClick={() => openPreview(data?.avatar || "")}
          />
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <p className="md:text-base text-sm font-semibold text-accent-foreground capitalize">
              {data?.user?.firstName} {data?.user?.lastName}
            </p>
            <p className="md:text-sm text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Search
                size={14}
                className="text-muted-foreground cursor-pointer"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild className="hidden md:flex">
            <span>
              <Video
                size={14}
                className="text-muted-foreground cursor-pointer"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Video Call</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild className="hidden md:flex">
            <span>
              <Phone
                size={14}
                className="text-muted-foreground cursor-pointer"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voice Call</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            asChild
            className="hidden md:flex"
            onClick={() => setOpen(true)}
          >
            <span>
              <Info
                size={14}
                className="text-muted-foreground cursor-pointer"
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Info</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
      <InfoSheet
        open={open}
        data={data}
        setOpen={setOpen}
        setFavSheet={setFavSheet}
      />
      <FavouriteSheet
        chatId={chatId}
        favSheet={favSheet}
        setFavSheet={setFavSheet}
      />
    </div>
  );
}
