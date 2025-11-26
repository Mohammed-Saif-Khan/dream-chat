"use client";
import TextBox from "@/components/forms/text-box";
import { messageSchema, messageTyep } from "@/schema/message";
import { socket } from "@/socket";
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
  editMessageId: (tempId: string, message: MessageType) => void;
};

export default function ChatInput({
  receiverId,
  senderId,
  profile,
  addMessage,
  editMessageId,
}: ChatInputProps) {
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

      const tempMsg: MessageType = {
        message: data?.message,
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
        editMessageId(tempId, originalMessage);
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
      className="py-4 px-4 bg-background border-t shadow-xs"
    >
      <TextBox
        name="message"
        register={register}
        placeholder="Type a message"
        endVariant="default"
        endSize="icon-sm"
        addOnButtonType="submit"
        startAddon={[
          <Smile key="simle" size={18} />,
          <Paperclip key="clip" size={18} />,
        ]}
        onChange={(e) => {
          handleTyping();
          setValue("message", e.target.value, { shouldValidate: true });
        }}
        autoComplete="off"
        endAddon={<SendHorizontal size={18} className="text-white " />}
        className={{
          input: "bg-gray-200 dark:bg-muted h-12",
          startAddon: "bg-gray-200 dark:bg-muted h-12 rounded-l-sm",
          endAddon: "bg-gray-200 dark:bg-muted h-12 rounded-r-sm",
          fieldSet: "mb-0",
          inputGroup:
            "has-[[data-slot=input-group-control]:focus-visible]:border-none has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-0 shadow-none border-none",
        }}
      />
    </form>
  );
}
