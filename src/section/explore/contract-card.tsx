"use client";
import AvatarDP from "@/components/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHistoryUI } from "@/hooks/use-back-button";
import { useNavigate } from "@/hooks/use-navigate";
import { cn } from "@/lib/utils";
import { ExploreUserList } from "@/types/contact";
import { formatReadableDate } from "@/utils/formatDate";
import { Icon } from "@iconify/react";
import {
  CalendarDays,
  Mail,
  MessageSquareText,
  Phone,
  Video,
} from "lucide-react";
import React from "react";

export default function ExploreDetail({ data }: { data: ExploreUserList[] }) {
  const { push } = useNavigate();
  const { isOpen, payload, open, close, isClose } =
    useHistoryUI<ExploreUserList>();

  return (
    <div>
      {data &&
        data?.length > 0 &&
        data?.map((item, index) => (
          <div
            key={index}
            onClick={() => open(item)}
            className="flex items-center justify-between lg:max-w-md bg-background p-5 rounded-md group ring-0 hover:ring-2 ring-primary transition-all duration-300 ease-in-out my-4 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <AvatarDP
                src={item?.avatar}
                alt="recent-chat"
                fallback="recent-chat"
                avatarSize="w-12 h-12"
                statusbar={true}
              />
              <div>
                <p className="text-base font-semibold text-accent-foreground capitalize">
                  {item?.user?.firstName} {item?.user?.lastName}
                </p>
                <div className={cn("flex items-center gap-2")}>
                  <p className={cn("text-sm text-muted-foreground")}>
                    {item?.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="dialog-full-width">
          <DialogHeader>
            <DialogTitle>Contact Detail</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="flex items-center flex-wrap justify-between p-4 border-2 my-5 rounded-sm gap-3">
                  <div className="flex items-center gap-3">
                    <AvatarDP
                      src={payload?.avatar}
                      alt="recent-chat"
                      fallback="recent-chat"
                      avatarSize="w-12 h-12"
                      statusbar={true}
                    />
                    <div>
                      <p className="md:text-base text-sm font-semibold text-foreground text-start">
                        {payload?.user?.firstName}
                      </p>
                      <p className="md:text-sm text-xs text-muted-foreground text-start">
                        {payload?.about}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-3">
                    <Button
                      onClick={() => {
                        push(`?receiver=${payload?._id}`);
                        isClose();
                      }}
                      variant="outline"
                      size="icon-sm"
                      className="rounded-full [&_svg]:size-3.5!"
                    >
                      <MessageSquareText />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="rounded-full [&_svg]:size-3.5!"
                    >
                      <Phone />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="rounded-full [&_svg]:size-3.5!"
                    >
                      <Video />
                    </Button>
                  </div>
                </div>
                <div className="border-2 rounded-sm mb-5">
                  <div className="p-4 border-b-2">
                    <p className="text-base font-semibold text-foreground">
                      Personal Information
                    </p>
                  </div>
                  <div className="p-4 space-y-2">
                    {payload?.dob && (
                      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-1">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays
                            size={14}
                            className="dark:text-muted-foreground text-foreground"
                          />
                          <p className="text-sm dark:text-muted-foreground text-foreground">
                            Date of Birth
                          </p>
                        </div>
                        <p className="text-sm font-medium text-foreground text-start">
                          {formatReadableDate(payload?.dob)}
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-1">
                      <div className="flex items-center gap-1.5">
                        <Phone
                          size={14}
                          className="dark:text-muted-foreground text-foreground"
                        />
                        <p className="text-sm dark:text-muted-foreground text-foreground">
                          Phone Number
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground text-start">
                        {payload?.user?.phone}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-0">
                      <div className="flex items-center gap-1.5">
                        <Mail
                          size={14}
                          className="dark:text-muted-foreground text-foreground"
                        />
                        <p className="text-sm dark:text-muted-foreground text-foreground">
                          Email
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground text-start">
                        {payload?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                {(payload?.facebook ||
                  payload?.linkedin ||
                  payload?.youtube ||
                  payload?.x ||
                  payload?.instagram ||
                  payload?.youtube) && (
                  <div className="border-2 rounded-sm">
                    <div className="p-4 border-b-2">
                      <p className="text-base font-semibold text-foreground">
                        Social Information
                      </p>
                    </div>

                    <div className="p-4 space-y-2">
                      {payload?.facebook && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="iconoir:facebook"
                              width="15"
                              height="15"
                              className="dark:text-muted-foreground text-foreground"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              Facebook
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {payload?.facebook}
                          </p>
                        </div>
                      )}
                      {payload?.x && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="pajamas:twitter"
                              width="12"
                              height="12"
                              className="dark:text-muted-foreground text-foreground"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              X
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {payload?.x}
                          </p>
                        </div>
                      )}

                      {payload?.linkedin && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="mingcute:linkedin-line"
                              width="16"
                              height="16"
                              className="dark:text-muted-foreground text-foreground"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              Linkedin
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {payload?.linkedin}
                          </p>
                        </div>
                      )}

                      {payload?.instagram && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="iconoir:instagram"
                              width="15"
                              height="15"
                              className="dark:text-muted-foreground text-foreground"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              Instagram
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {payload?.instagram}
                          </p>
                        </div>
                      )}

                      {payload?.youtube && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="iconoir:youtube"
                              width="15"
                              height="15"
                              className="dark:text-muted-foreground text-foreground"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              YouTube
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {payload.youtube}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
