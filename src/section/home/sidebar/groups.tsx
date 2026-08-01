"use client";
import AvatarDP from "@/components/avatar";
import SubmitButton from "@/components/button/submit-button";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExploreUserList } from "@/types/contact";
import { SearchIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type GroupsProps = {
  data?: ExploreUserList[];
};

export default function Groups({ data }: GroupsProps) {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <div>
      <Attachment
        onClick={() => setOpen(true)}
        className="w-full rounded-sm border-none bg-background hover:outline-2 hover:cursor-pointer"
      >
        <AttachmentMedia>
          <UsersIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Start a Group Chat</AttachmentTitle>
          <AttachmentDescription>Tap to select members</AttachmentDescription>
        </AttachmentContent>
      </Attachment>

      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent className="flex flex-col dialog-full-width">
          <DialogHeader>
            <DialogTitle className="text-start">Create A Group</DialogTitle>
            <DialogDescription
              asChild
              className="mt-5 w-full grow overflow-y-auto"
            >
              <div className="w-full">
                <ButtonGroup className="w-full mb-4">
                  <Input placeholder="Search..." className="text-foreground" />
                  <Button variant="outline" aria-label="Search">
                    <SearchIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </DialogDescription>
          </DialogHeader>
          <form>
            <div>
              <ScrollArea className="pr-2 md:h-90 sm:h-[calc(100dvh-250px)] h-[calc(100dvh-300px)]">
                {data?.map((item, index) => (
                  <Controller
                    key={index}
                    control={control}
                    name="receiverIds"
                    render={({ field }) => (
                      <Label
                        key={`NEW-CHAT-${index}`}
                        className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-md p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950 my-4"
                      >
                        <div className="flex items-center gap-2 font-normal">
                          <AvatarDP
                            src={item?.avatar}
                            alt="recent-chat"
                            fallback="recent-chat"
                            avatarSize="w-12 h-12"
                          />
                          <div>
                            <p className="text-base font-semibold text-accent-foreground">
                              {item?.user?.firstName} {item?.user?.lastName}
                            </p>
                          </div>
                        </div>
                        <Checkbox
                          id="toggle-2"
                          checked={field.value?.includes(item._id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setValue("receiverIds", [
                                ...(field.value || []),
                                item._id,
                              ]);
                            } else {
                              setValue(
                                "receiverIds",
                                field.value.filter(
                                  (id: string) => id !== item._id,
                                ),
                              );
                            }
                          }}
                          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                      </Label>
                    )}
                  />
                ))}
              </ScrollArea>
            </div>
            <DialogFooter className="flex flex-wrap w-full">
              <DialogClose asChild>
                <Button size="lg" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <SubmitButton
                isSubmitting={isSubmitting}
                size="lg"
                type="submit"
                className="text-white rounded-sm w-full"
              >
                Create Group
              </SubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
