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
import { cn } from "@/lib/utils";
import { ContactUserList } from "@/types/contact";
import { formatReadableDate } from "@/utils/formatDate";
import { Icon } from "@iconify/react";
import {
  CalendarDays,
  Mail,
  MessageSquareText,
  Phone,
  Video,
} from "lucide-react";
import { useState } from "react";

type DialogProps = {
  open: boolean;
  data: ContactUserList | null;
};

export default function ContactDetail({ data }: { data: ContactUserList[] }) {
  const [open, setOpen] = useState<DialogProps>({
    open: false,
    data: null,
  });

  console.log(data, "asdfwee");

  return (
    <div>
      {data &&
        data?.length > 0 &&
        data?.map((item, index) => (
          <div
            key={index}
            onClick={() => setOpen({ open: true, data: item })}
            className="flex items-center justify-between lg:max-w-md bg-background p-5 rounded-md group ring-0 hover:ring-2 ring-primary transition-all duration-300 ease-in-out my-2 cursor-pointer"
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
      <Dialog
        open={open?.open}
        onOpenChange={() => setOpen((prev) => ({ ...prev, open: false }))}
      >
        <DialogContent className="h-dvh min-w-full md:h-auto md:min-w-lg overflow-auto md:rounded-lg rounded-none">
          <DialogHeader>
            <DialogTitle>Contact Detail</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="flex items-center flex-wrap justify-between p-4 border-2 my-5 rounded-sm gap-3">
                  <div className="flex items-center gap-3">
                    <AvatarDP
                      src={open?.data?.avatar}
                      alt="recent-chat"
                      fallback="recent-chat"
                      avatarSize="w-12 h-12"
                      statusbar={true}
                    />
                    <div>
                      <p className="md:text-base text-sm font-semibold text-foreground text-start">
                        {open?.data?.user?.firstName}
                      </p>
                      <p className="md:text-sm text-xs text-muted-foreground text-start">
                        {open?.data?.about}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-3">
                    <Button
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
                    {open?.data?.dob && (
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
                          {formatReadableDate(open?.data?.dob)}
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
                        {open?.data?.user?.phone}
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
                        {open?.data?.user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                {(open?.data?.facebook ||
                  open?.data?.linkedin ||
                  open?.data?.youtube ||
                  open?.data?.x ||
                  open?.data?.instagram ||
                  open?.data?.youtube) && (
                  <div className="border-2 rounded-sm">
                    <div className="p-4 border-b-2">
                      <p className="text-base font-semibold text-foreground">
                        Social Information
                      </p>
                    </div>

                    <div className="p-4 space-y-2">
                      {open?.data?.facebook && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="iconoir:facebook"
                              width="15"
                              height="15"
                              className="text-black"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              Facebook
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {open?.data?.facebook}
                          </p>
                        </div>
                      )}
                      {open?.data?.x && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="pajamas:twitter"
                              width="12"
                              height="12"
                              className="text-black"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              X
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {open?.data?.x}
                          </p>
                        </div>
                      )}

                      {open?.data?.linkedin && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="mingcute:linkedin-line"
                              width="16"
                              height="16"
                              className="text-black"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              Linkedin
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {open?.data?.linkedin}
                          </p>
                        </div>
                      )}

                      {open?.data?.instagram && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="iconoir:instagram"
                              width="15"
                              height="15"
                              className="text-black"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              Instagram
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {open?.data?.instagram}
                          </p>
                        </div>
                      )}

                      {open?.data?.youtube && (
                        <div className="grid md:grid-cols-2 grid-cols-1 items-center">
                          <div className="flex items-center gap-1.5">
                            <Icon
                              icon="iconoir:youtube"
                              width="15"
                              height="15"
                              className="text-black"
                            />
                            <p className="text-sm dark:text-muted-foreground text-foreground">
                              YouTube
                            </p>
                          </div>
                          <p className="text-sm font-medium text-foreground text-start">
                            {open?.data?.youtube}
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
