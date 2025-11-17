import TextBox from "@/components/forms/text-box";
import { Paperclip, SendHorizontal, Smile } from "lucide-react";
import React from "react";

export default function ChatInput() {
  return (
    <div className="py-4 px-4 bg-background border-t shadow-xs">
      <TextBox
        name="search"
        placeholder="Type a message"
        startAddon={[
          <Smile key="simle" size={18} />,
          <Paperclip key="clip" size={18} />,
        ]}
        endVariant="default"
        endSize="icon-sm"
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
    </div>
  );
}
