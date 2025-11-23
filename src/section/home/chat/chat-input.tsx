"use client";
import TextBox from "@/components/forms/text-box";
import { messageSchema, messageTyep } from "@/schema/message";
import { socket } from "@/socket";
import { MessageType } from "@/store/chat/type";
import { fetchInstance } from "@/utils/fetch-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ChatInputProps = {
  receiverId: string;
  senderId: string;
  addMessage: (message: MessageType) => void;
};

export default function ChatInput({
  receiverId,
  senderId,
  addMessage,
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

  const { handleSubmit, setValue, register, reset } = useForm<messageTyep>({
    resolver: zodResolver(messageSchema),
  });

  const onSendMessage = async (data: messageTyep) => {
    try {
      socket.emit("stop-typing", { receiverId });
      reset({ message: " " });
      const response = await fetchInstance("api/v1/message", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response?.json();
      if (response?.status === 200) {
        addMessage(result?.data);
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
        startAddon={[
          <Smile key="simle" size={18} />,
          <Paperclip key="clip" size={18} />,
        ]}
        onChange={(e) => {
          handleTyping();
          setValue("message", e.target.value, { shouldValidate: true });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(onSendMessage)();
            socket.emit("stop-typing", { receiverId });
          }
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
