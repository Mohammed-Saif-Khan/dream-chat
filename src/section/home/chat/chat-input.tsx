"use client";
import ChatInputBox from "@/components/forms/chat-input-box";
import { messageSchema, messageTyep } from "@/schema/message";
import { socket } from "@/socket";
import { useChatlistStore } from "@/store/chat-list";
import { MessageType } from "@/store/chat/type";
import { ProfileType } from "@/types/profile";
import { fetchInstance } from "@/utils/fetch-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

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
  const { updateChatlist } = useChatlistStore();
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

  const { handleSubmit, setValue, register } = useForm<messageTyep>({
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

      const tempMsg: any = {
        message: data?.message,
        isDeleted: false,
        deletedAt: null,
        receiverId,
        senderId: {
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          _id: senderId,
        },
        time,
        status: "pending",
        _id: uuidv4(),
      };

      socket.emit("stop-typing", { receiverId });
      addMessage(tempMsg);
      setValue("message", "");

      const finalData = {
        ...data,
        time,
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
        updateChatlist(
          originalMessage?.receiverId?._id,
          originalMessage,
          false
        );
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
        startAddon={[
          <Smile key="simle" size={20} />,
          <Paperclip key="clip" size={20} />,
        ]}
        endAddon={<SendHorizontal size={20} />}
        addOnButtonType="submit"
      />
    </form>
  );
}
