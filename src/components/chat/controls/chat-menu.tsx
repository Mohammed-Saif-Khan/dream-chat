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
import {
  Check,
  Clipboard,
  EllipsisVertical,
  Forward,
  HeartIcon,
  Pin,
  Reply,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useChatlistStore } from "@/store/chat-list";
import { fetchInstance } from "@/utils/fetch-instance";
import { Icon } from "@iconify/react";
import React from "react";
import toast from "react-hot-toast";
import { useMessageStore } from "@/store/messages";

type ChatMenuProps = {
  sender: boolean;
  messageId: string;
  receiverId: string;
  createdAt: string | undefined;
  message: string;
  isDelete: boolean | undefined;
  isFavorite: boolean;
  chatId: string | undefined;
  firstName?: string;
  lastName?: string;
};

export default function ChatMenu({
  sender,
  receiverId,
  messageId,
  createdAt,
  message,
  isDelete,
  isFavorite,
  chatId,
  firstName,
  lastName,
}: ChatMenuProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { setReply } = useMessageStore();

  if (!createdAt) return;
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const timeDiff = currentTime - createdTime;
  const HOURS_48 = 48 * 60 * 60 * 1000; // 48 hours
  const canDelete = timeDiff <= HOURS_48;

  const onDelete = async (messageId: string) => {
    try {
      const response = await fetchInstance(`api/v1/message/${messageId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response?.status === 200) {
        const type = result?.delete;
        const prevMessage = result?.lastMessage?.message;
        const { deleteMessage } = useMessageStore.getState();
        const { deleteChatlistMessage } = useChatlistStore.getState();
        deleteMessage(messageId, type);
        deleteChatlistMessage(receiverId, type, prevMessage);
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error((error as Error)?.message, "Failed to Delete message");
    }
  };

  const onFavourites = async () => {
    try {
      const response = await fetchInstance(`api/v1/favourite/${messageId}`, {
        method: "PUT",
        body: JSON.stringify({ chatId: chatId }),
      });
      const result = await response.json();
      if (!response?.ok) {
        toast.error(result?.message || "Failed");
      }
      if (response?.status === 200) {
        const { toggleFavouriteMessage } = useMessageStore.getState();
        toggleFavouriteMessage(messageId);
      }
    } catch (error) {
      console.error((error as Error)?.message, "Failed!");
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Copied!", {
        icon: (
          <Icon
            icon="streamline-flex-color:copy-2-flat"
            width="14"
            height="14"
          />
        ),
      });
    } catch (error) {
      toast.success("Failed to copy!");
    }
  };

  const onReply = () => {
    setReply({
      isDelete: isDelete,
      messageId: messageId,
      message: message,
      senderId: { firstName: firstName, lastName: lastName },
    });
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
          <div>
            <DropdownMenuItem
              onClick={onReply}
              className="group focus:text-primary"
            >
              <Reply className="mr-2 text-muted-foreground group-hover:text-primary" />
              Reply
            </DropdownMenuItem>

            <DropdownMenuItem className="group focus:text-primary">
              <Forward className="mr-2 text-muted-foreground group-hover:text-primary" />
              Forward
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onCopy}
              className="group focus:text-primary"
            >
              <Clipboard className="mr-2 text-muted-foreground group-hover:text-primary" />
              Copy
            </DropdownMenuItem>
            {!isDelete && (
              <DropdownMenuItem
                onClick={onFavourites}
                className="group focus:text-primary"
              >
                <HeartIcon
                  className={cn(
                    "mr-2 text-muted-foreground group-hover:text-primary",
                    isFavorite && "fill-red-500 stroke-red-500"
                  )}
                />
                {isFavorite ? "Remove as Favourite" : "Mark as Favourite"}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="group focus:text-primary">
              <Pin className="mr-2 text-muted-foreground group-hover:text-primary" />
              Pin
            </DropdownMenuItem>

            {sender && (
              <DropdownMenuItem className="group focus:text-primary">
                <Check className="mr-2 text-muted-foreground group-hover:text-primary" />
                Mark as Unread
              </DropdownMenuItem>
            )}

            {sender && canDelete && (
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setOpen(true)}
                className="group"
              >
                <Trash2 className="mr-2 text-destructive group-hover:text-destructive" />
                Delete
              </DropdownMenuItem>
            )}
          </div>
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
