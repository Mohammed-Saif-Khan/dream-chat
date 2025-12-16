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
import { useChatStore } from "@/store/chat";
import { useChatlistStore } from "@/store/chat-list";
import { messageMenu } from "@/utils/constant";
import { fetchInstance } from "@/utils/fetch-instance";
import { EllipsisVertical } from "lucide-react";
import React from "react";

type ChatMenuProps = {
  sender: boolean;
  messageId: string;
  receiverId: string;
};

export default function ChatMenu({
  sender,
  receiverId,
  messageId,
}: ChatMenuProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const onDelete = async (messageId: string) => {
    const response = await fetchInstance(`api/v1/message/${messageId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (response?.status === 200) {
      const type = result?.delete;
      const prevMessage = result?.lastMessage?.message;
      const { deleteMessage } = useChatStore.getState();
      const { deleteChatlistMessage } = useChatlistStore.getState();
      deleteMessage(messageId, type);
      deleteChatlistMessage(receiverId, type, prevMessage);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
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
                  onClick={() => item?.label === "Delete" && setOpen(true)}
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
            <AlertDialogAction
              onClick={() => onDelete(messageId)}
              className="text-foreground bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
