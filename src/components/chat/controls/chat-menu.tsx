import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { messageMenu } from "@/utils/constant";
import { fetchInstance } from "@/utils/fetch-instance";
import toast from "react-hot-toast";
import { useChatStore } from "@/store/chat";
import { useChatlistStore } from "@/store/chat-list";

type ChatMenuProps = {
  sender: boolean;
  messageId?: string;
  receiverId?: string;
};

export default function ChatMenu({
  sender,
  messageId,
  receiverId,
}: ChatMenuProps) {
  const onDelete = async () => {
    try {
      const response = await fetchInstance(`api/v1/message/${messageId}`, {
        method: "DELETE",
      });
      if (response?.status === 200) {
        const result = await response.json();
        console.log(result, "resultresult");
        const { editMessage } = useChatStore.getState();
        const { updateChatlist } = useChatlistStore.getState();
        editMessage(result?.deletedIds?.[0], {
          message: "This Message is Deleted",
          isDeleted: true,
        });
        updateChatlist(
          receiverId!,
          {
            message: "This Message is Deleted",
            isDeleted: true,
          },
          false
        );
      }
    } catch (error) {
      console.error("Something went wrong to delete message", error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = (label: string) => {
    if (label === "Delete") {
      onDelete();
    }
  };

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
                onClick={() => handleDelete(item?.label)}
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
