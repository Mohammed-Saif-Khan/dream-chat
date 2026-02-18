import SheetSlide from "@/components/sheet-slide";
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Phone,
  Search,
  Video,
} from "lucide-react";
import React, { SetStateAction } from "react";
import { renderIcon } from "../render-icons";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { profileItem } from "@/utils/constant";
import AvatarDP from "@/components/avatar";
import { Icon } from "@iconify/react";
import ProfielInfo from "@/section/profile/profile-info";
import { ExploreUserList } from "@/types/contact";
import { useProfilePreviewStore } from "@/store/useProfilePreviewStore";

type InfoSheetType = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  data: ExploreUserList | undefined;
  setFavSheet: React.Dispatch<SetStateAction<boolean>>;
};

export default function InfoSheet({
  open,
  setOpen,
  data,
  setFavSheet,
}: InfoSheetType) {
  const { openPreview } = useProfilePreviewStore();
  return (
    <SheetSlide open={open} onOpenChange={setOpen} title="Contact Info">
      <div className="p-4">
        <div className="mb-6 flex flex-col items-center justify-center">
          <AvatarDP
            src={data?.avatar}
            alt="recent-chat"
            fallback="recent-chat"
            avatarSize="w-22 h-22"
            statusbarClass="size-4.5"
            statusbar={true}
            onClick={() => openPreview(data?.avatar || "")}
          />
          <div className="mt-2">
            <p className="text-base font-semibold text-center text-foreground capitalize">
              {data?.user?.firstName} {data?.user?.lastName}
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
          <ProfielInfo data={data} />
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
          <div className="pb-5">
            <p className="text-lg font-semibold text-foreground mb-2">Others</p>
            <Card className="bg-background rounded-none p-5 shadow-none gap-0">
              {profileItem?.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    item?.label === "Favourites" && setFavSheet(true)
                  }
                  className={cn(
                    "flex items-center w-full justify-between pb-4 mb-4 border-b cursor-pointer group",
                    profileItem.length - 1 === index && "mb-0 border-0 pb-0",
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
    </SheetSlide>
  );
}
