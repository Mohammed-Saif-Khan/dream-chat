"use client";
import ChatInputBox from "@/components/chat/chat-input/chat-input-box";
import { Button } from "@/components/ui/button";
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
import { useEmojiTheme } from "@/utils/emoji-icon";
import { fetchInstance } from "@/utils/fetch-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmojiStyle } from "emoji-picker-react";
import {
  AudioLines,
  Image as ImageIcon,
  PlusCircle,
  SendHorizonal,
  Smile,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getArrangeData } from "./constant";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

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
  const isMobile = useIsMobile();
  const emojiTheme = useEmojiTheme();
  const { upsertChat } = useChatlistStore();
  const { reply, setReply } = useMessageStore();
  const typingTimeoutRef = React.useRef<NodeJS.Timeout>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);

  const { handleSubmit, setValue, register, watch } = useForm<messageTyep>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      receiverId,
    },
  });

  const isTyping = watch("message")?.length > 0;

  const handleTyping = () => {
    socket.emit("typing", { senderId, receiverId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop-typing", { senderId, receiverId });
    }, 1500);
  };

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
    if (!isMobile) return;

    const updateHeight = () => {
      if (window?.visualViewport) {
        const height = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(height > 0 ? height : 0);
      }
    };

    window.visualViewport?.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
    };
  }, [isMobile]);

  React.useEffect(() => {
    setValue("receiverId", receiverId);
  }, [receiverId]);

  return (
    <form onSubmit={handleSubmit(onSendMessage)} className="my-2 mb-0 mx-2">
      <div className="flex items-center justify-between gap-2">
        <ChatInputBox
          name="message"
          register={register}
          placeholder="Type a message..."
          onChange={(e) => {
            handleTyping();
            setValue("message", e.target.value, { shouldValidate: true });
          }}
          onFocus={() => {
            if (isMobile && openEmojiPicker) {
              setOpenEmojiPicker(false);
            }
          }}
          replyTo={reply}
          startAddon={[<PlusCircle key="clip" size={20} className="mb-2" />]}
          endAddon={[
            <Popover open={isMobile ? false : undefined}>
              <PopoverTrigger asChild>
                <span
                  onClick={() => {
                    if (isMobile) {
                      if (openEmojiPicker) {
                        setOpenEmojiPicker(false);
                      } else {
                        inputRef.current?.blur();
                        setTimeout(() => {
                          setOpenEmojiPicker(true);
                        }, 150);
                      }
                    }
                  }}
                >
                  <Smile key="simle" size={20} className="mb-2" />
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0 bg-transparent border-0 mx-2 shadow-none">
                <EmojiPicker
                  theme={emojiTheme}
                  autoFocusSearch={false}
                  emojiStyle={EmojiStyle.GOOGLE}
                  previewConfig={{ showPreview: false }}
                  onEmojiClick={(value) => {
                    setValue("message", watch("message") + value?.emoji);
                  }}
                  className="emoji-small"
                />
              </PopoverContent>
            </Popover>,
            <ImageIcon key="imageUpload" size={20} className="mb-2" />,
          ]}
        />
        <Button
          size="icon-lg"
          className="rounded-full mb-3"
          variant={isTyping ? "default" : "outline"}
        >
          {isTyping ? <SendHorizonal className="text-white" /> : <AudioLines />}
        </Button>
      </div>
      <div
        className={cn("w-full mb-2.5", !openEmojiPicker && "hidden")}
        style={{
          height: keyboardHeight || "40vh",
        }}
      >
        <EmojiPicker
          theme={emojiTheme}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.GOOGLE}
          previewConfig={{ showPreview: false }}
          onEmojiClick={(value) => {
            setValue("message", watch("message") + value?.emoji);
          }}
          className="emoji-small w-full!"
        />
      </div>
    </form>
  );
}
