"use client";
import ChatInputBox from "@/components/chat/chat-input/chat-input-box";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { messageSchema, messageTyep } from "@/schema/message";
import { socket } from "@/socket";
import { useChatlistStore } from "@/store/chat-list";
import { useMessageStore } from "@/store/messages";
import { MessageType } from "@/store/messages/type";
import { ProfileType } from "@/types/profile";
import { fetchInstance } from "@/utils/fetch-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { Paperclip, SendHorizontal, SmilePlus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getArrangeData } from "./constant";
import { useTheme } from "next-themes";
import { useEmojiTheme } from "@/utils/emoji-icon";

type ChatInputProps = {
  receiverId: string;
  senderId: string;
  profile: ProfileType;
  addMessage: (message: MessageType) => void;
  editMessage: (tempId: string, message: MessageType) => void;
};

export default function ChatInput({
  receiverId,
  senderId,
  profile,
  addMessage,
  editMessage,
}: ChatInputProps) {
  const emojiTheme = useEmojiTheme();
  const { reply, setReply } = useMessageStore();
  const { upsertChat } = useChatlistStore();
  const typingTimeoutRef = React.useRef<NodeJS.Timeout>(null);

  const handleTyping = () => {
    socket.emit("typing", { senderId, receiverId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { senderId, receiverId });
    }, 1500);
  };

  const { handleSubmit, setValue, register, watch } = useForm<messageTyep>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      receiverId,
    },
  });

  const onSendMessage = async (data: messageTyep) => {
    try {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const tempMsg = getArrangeData(
        data,
        profile,
        senderId,
        receiverId,
        time,
        reply,
      );

      socket.emit("stop-typing", { receiverId });
      addMessage(tempMsg);
      setValue("message", "");
      setReply(null);

      const finalData = {
        ...data,
        time,
        replyTo: reply?._id,
      };

      const response = await fetchInstance("api/v1/message", {
        method: "POST",
        body: JSON.stringify(finalData),
      });
      const result = await response?.json();
      if (response?.status === 200) {
        const tempId = tempMsg?._id;
        const originalMessage = result?.data;
        editMessage(tempId, originalMessage);
        upsertChat(originalMessage);
      } else {
        toast.error(result?.message || "Failed to send Messgae");
      }
    } catch (error) {
      console.error("Something went wrong while sending message", error);
      toast.error("Something went wrong");
    }
  };

  React.useEffect(() => {
    setValue("receiverId", receiverId);
  }, [receiverId]);

  return (
    <form
      onSubmit={handleSubmit(onSendMessage)}
      className="py-4 pb-0 px-4 bg-background border-t shadow-xs"
    >
      <ChatInputBox
        name="message"
        register={register}
        placeholder="Type a message..."
        onChange={(e) => {
          handleTyping();
          setValue("message", e.target.value, { shouldValidate: true });
        }}
        replyTo={reply}
        startAddon={[
          <Paperclip key="clip" size={20} className="mb-2" />,
          <Popover>
            <PopoverTrigger asChild>
              <span>
                <SmilePlus key="simle" size={20} className="mb-2" />
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 bg-transparent border-0 mx-2">
              <EmojiPicker
                theme={emojiTheme}
                emojiStyle={EmojiStyle.GOOGLE}
                previewConfig={{ showPreview: false }}
                onEmojiClick={(value) => {
                  setValue("message", watch("message") + value?.emoji);
                }}
                className="emoji-small"
              />
            </PopoverContent>
          </Popover>,
        ]}
        endAddon={<SendHorizontal size={20} />}
        addOnButtonType="submit"
      />
    </form>
  );
}
