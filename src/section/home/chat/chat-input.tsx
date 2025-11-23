"use client";
import TextBox from "@/components/forms/text-box";
import { messageSchema, messageTyep } from "@/schema/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

type ChatInputProps = {
  receiverId: string;
};

export default function ChatInput({ receiverId }: ChatInputProps) {
  const { handleSubmit, setValue, register, reset } = useForm<messageTyep>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      receiverId,
    },
  });

  const onSendMessage = async (data: messageTyep) => {
    reset({ message: " " });
    console.log(data, "Send Message");
  };

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
          setValue("message", e.target.value, { shouldValidate: true });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(onSendMessage)();
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
