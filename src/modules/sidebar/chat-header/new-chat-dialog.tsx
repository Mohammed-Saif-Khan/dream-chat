import AvatarDP from "@/components/avatar";
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
import { newChatData } from "@/utils/constant";
import { SearchIcon } from "lucide-react";
import React from "react";

type NewChatDialogProps = {
  open: boolean;
  onClose: (open: boolean) => void;
};

const NewChatDialog = ({ open, onClose }: NewChatDialogProps) => {
  console.log("RE-rendering");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-start">New Chat</DialogTitle>

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
                <p className="text-base text-start font-medium text-foreground mb-3">
                  Contacts
                </p>
                <ScrollArea className="pr-2">
                  {newChatData?.map((item, index) => (
                    <Label
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
                      <Checkbox
                        id="toggle-2"
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      />
                    </Label>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-wrap w-full">
          <DialogClose asChild className="w-full">
            <Button size="lg" variant="outline" className="rounded-sm w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            type="submit"
            className="text-white rounded-sm w-full"
          >
            Start Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(NewChatDialog);
