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
import {
  Check,
  Clipboard,
  EllipsisVertical,
  Forward,
  Heart,
  Pin,
  Reply,
  Trash2,
} from "lucide-react";
import React from "react";

type ChatMenuProps = {
  sender: boolean;
  messageId: string;
  receiverId: string;
  createdAt: string | undefined;
};

export default function ChatMenu({
  sender,
  receiverId,
  messageId,
  createdAt,
}: ChatMenuProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  if (!createdAt) return;
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const timeDiff = currentTime - createdTime;
  const HOURS_48 = 48 * 60 * 60 * 1000; // 48 hours
  const canDelete = timeDiff <= HOURS_48;

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
          <div>
            <DropdownMenuItem className="group focus:text-primary">
              <Reply className="mr-2 text-muted-foreground group-hover:text-primary" />
              Reply
            </DropdownMenuItem>

            <DropdownMenuItem className="group focus:text-primary">
              <Forward className="mr-2 text-muted-foreground group-hover:text-primary" />
              Forward
            </DropdownMenuItem>

            <DropdownMenuItem className="group focus:text-primary">
              <Clipboard className="mr-2 text-muted-foreground group-hover:text-primary" />
              Copy
            </DropdownMenuItem>

            <DropdownMenuItem className="group focus:text-primary">
              <Heart className="mr-2 text-muted-foreground group-hover:text-primary" />
              Mark as Favourite
            </DropdownMenuItem>

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
