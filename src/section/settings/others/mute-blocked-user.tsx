"use client";
import AvatarDP from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { newChatData } from "@/utils/constant";
import { SearchIcon } from "lucide-react";
import { muteBlockType } from "..";

type MuteBlockedUserDialogProps = {
  open: muteBlockType;
  onClose: React.Dispatch<React.SetStateAction<muteBlockType>>;
};

export default function MuteBlockedUserDialog({
  open,
  onClose,
}: MuteBlockedUserDialogProps) {
  return (
    <Dialog
      open={open?.open}
      onOpenChange={(value) => onClose({ open: value, type: open?.type })}
    >
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {open?.type === "block" ? "Blocked Users" : "Muted Users"}
          </DialogTitle>

          <DialogDescription
            asChild
            className="mt-5 w-full flex-grow overflow-y-auto"
          >
            <div className="w-full">
              <ButtonGroup className="w-full mb-4">
                <Input placeholder="Search..." className="text-foreground" />
                <Button variant="outline" aria-label="Search">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
              <div>
                <p className="text-base font-medium text-foreground mb-3">
                  Users
                </p>
                <ScrollArea className="h-[calc(80vh-200px)] pr-2">
                  {newChatData?.map((item, index) => (
                    <div
                      key={`NEW-CHAT-${index}`}
                      className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-md p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950 my-4"
                    >
                      <div className="flex items-center gap-2 font-normal">
                        <AvatarDP
                          src={item?.img}
                          alt="recent-chat"
                          fallback="recent-chat"
                          avatarSize="w-12 h-12"
                        />
                        <div>
                          <p className="text-base font-semibold text-accent-foreground">
                            {item?.name}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {item?.work}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-sm">
                        {open?.type === "block" ? "Unblock" : "Unmute"}
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
