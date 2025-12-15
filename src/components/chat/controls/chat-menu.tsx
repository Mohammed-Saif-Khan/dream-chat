import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { messageMenu } from "@/utils/constant";
import { EllipsisVertical } from "lucide-react";
import React from "react";

type ChatMenuProps = {
  sender: boolean;
  messageId?: string;
  receiverId?: string;
};

export default function ChatMenu({ sender }: ChatMenuProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <span>
            <EllipsisVertical size={16} className="cursor-pointer" />
          </span>
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
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-foreground bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
