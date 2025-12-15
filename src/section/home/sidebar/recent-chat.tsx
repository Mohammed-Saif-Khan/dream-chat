"use client";
import { EllipsisVertical, EyeOff, UserRound } from "lucide-react";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import AvatarDP from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecentChatData } from "@/utils/constant";
import "swiper/css";
import "swiper/css/free-mode";

export default function RecentChat() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-foreground">Recent Chats</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <EllipsisVertical
                  width={16}
                  height={16}
                  className="text-muted-foreground cursor-pointer"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                <span>
                  <EyeOff className="focus:text-primary" /> Hide Recent
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:text-primary">
                <span>
                  <UserRound className="focus:text-primary" /> Active Contacts
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView="auto"
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {RecentChatData?.map((item, index) => (
          <SwiperSlide key={index} className="w-auto!">
            <div className="flex items-center flex-col gap-1">
              <AvatarDP
                src={item?.img}
                alt="recent-chat"
                fallback="recent-chat"
                avatarSize="w-12 h-12"
                statusbar={true}
              />
              <p className="text-sm text-muted-foreground hover:text-primary font-normal cursor-pointer">
                {item?.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
