import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { messageMenu } from "@/utils/constant";

type ChatMenuProps = {
  sender: boolean;
};

export default function ChatMenu({ sender }: ChatMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <EllipsisVertical size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {messageMenu
          ?.filter((item) => {
            if (sender && item.label === "Mark as Unread") return false;
            if (!sender && item.label === "Delete") return false;
            return true;
          })
          .map((item, index) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                variant={item?.label === "Delete" ? "destructive" : "default"}
                key={index}
                className="focus:text-primary"
              >
                <Icon className="focus:text-primary mr-2" />
                {item.label}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
