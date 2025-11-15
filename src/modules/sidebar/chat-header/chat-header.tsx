"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import TextBox from "@/components/forms/text-box";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Plus, Search, Send, Settings } from "lucide-react";
import NewChatDialog from "./new-chat-dialog";
import React from "react";
import InviteDialog from "./invite-dialog";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { cn } from "@/lib/utils";
import { useNavigate } from "@/hooks/use-navigate";

export default function ChatHeader({ heading }: { heading?: string }) {
  const { push } = useNavigate();
  const [newChatDialog, setNewChatDialog] = React.useState<boolean>(false);
  const [inviteDialog, setInviteDialog] = React.useState<boolean>(false);

  return (
    <div className={cn(heading === "profile" ? "hidden" : "block")}>
      <div className="pt-5 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            {heading === "home"
              ? "Chats"
              : capitalizeFirstLetter(heading || "")}
          </h1>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              onClick={() => setNewChatDialog(true)}
              className="rounded-full size-6 cursor-pointer"
            >
              <Plus color="white" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical
                  width={20}
                  height={20}
                  className="text-muted-foreground cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background" align="end">
                <DropdownMenuItem
                  onClick={() => setInviteDialog(true)}
                  className="cursor-pointer focus:text-primary"
                >
                  <Send className="focus:text-primary" />
                  Invite Others
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => push("/settings")}
                  className="cursor-pointer focus:text-primary lg:hidden flex"
                >
                  <Settings className="focus:text-primary" />
                  Setting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-6">
          <TextBox
            name="search"
            placeholder="Search For Contacts or Messages"
            endAddon={<Search />}
            className={{
              input:
                "bg-background dark:bg-background h-12 rounded rounded-r-none",
              endAddon: "bg-background h-12 hover:bg-background rounded-r",
              inputGroup:
                "has-[[data-slot=input-group-control]:focus-visible]:border-none has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-0 shadow-none border-none w-full",
              inputGroupButton: "hover:bg-background bg-background p-0",
            }}
          />
        </div>
      </div>
      <NewChatDialog open={newChatDialog} onClose={setNewChatDialog} />
      <InviteDialog open={inviteDialog} onClose={setInviteDialog} />
    </div>
  );
}
