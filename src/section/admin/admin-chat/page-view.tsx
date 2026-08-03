"use client";

import AvatarDP from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@/hooks/use-navigate";
import { cn } from "@/lib/utils";
import { getFallbackName } from "@/utils/getFallbackName";
import { ArrowLeft, Ban, EyeOff } from "lucide-react";

type ChatMember = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

type AdminMessage = {
  _id: string;
  message: string;
  time: string;
  createdAt: string;
  isDeleted: boolean;
  deletedAt: string | null;
  senderId: ChatMember | null;
  excludedFor?: ChatMember[];
  replyTo?: {
    _id: string;
    message: string;
    isDeleted: boolean;
    senderId?: ChatMember | null;
  } | null;
  reactions?: { user: ChatMember; emoji: string }[];
};

type ChatViewProps = {
  otherUser: ChatMember | null;
  messages: AdminMessage[];
};

export default function ChatView({ otherUser, messages }: ChatViewProps) {
  const { back } = useNavigate();
  const chatTitle = otherUser
    ? `${otherUser.firstName} ${otherUser.lastName}`
    : "Unknown user";

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => back()}
        className="w-fit cursor-pointer"
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <AvatarDP
              src={otherUser?.avatar}
              avatarSize="size-10"
              alt={chatTitle}
              fallback={getFallbackName(
                otherUser?.firstName,
                otherUser?.lastName
              )}
            />
            <div>
              <CardTitle className="text-lg">{chatTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {messages.length} messages · admin view (includes deleted &
                hidden messages)
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100dvh-320px)] min-h-72 rounded-md border p-3">
            {messages.length ? (
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div key={msg._id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <AvatarDP
                        src={msg.senderId?.avatar}
                        avatarSize="size-6"
                        alt={`${msg.senderId?.firstName} ${msg.senderId?.lastName}`}
                        fallback={getFallbackName(
                          msg.senderId?.firstName,
                          msg.senderId?.lastName
                        )}
                      />
                      <p className="text-sm font-medium">
                        {msg.senderId
                          ? `${msg.senderId.firstName} ${msg.senderId.lastName}`
                          : "Unknown user"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {msg.time}
                      </p>
                    </div>

                    <div className="ml-8 flex flex-col gap-1">
                      {msg.replyTo && (
                        <div className="text-xs px-2 py-1 rounded-md border-l-2 border-primary bg-muted/50 w-fit max-w-md truncate">
                          {msg.replyTo.isDeleted
                            ? "This message was deleted"
                            : `${msg.replyTo.senderId?.firstName || ""}: ${msg.replyTo.message}`}
                        </div>
                      )}

                      <div
                        className={cn(
                          "text-sm p-2.5 rounded-md w-fit max-w-md",
                          msg.isDeleted
                            ? "italic text-muted-foreground bg-muted/40"
                            : "bg-muted",
                        )}
                      >
                        {msg.isDeleted ? (
                          <span className="flex items-center gap-1.5">
                            <Ban size={13} />
                            This message was deleted
                          </span>
                        ) : (
                          msg.message
                        )}
                      </div>

                      {!!msg.reactions?.length && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {msg.reactions.map((r, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                              title={`${r.user?.firstName || ""} ${r.user?.lastName || ""}`}
                            >
                              {r.emoji}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {!!msg.excludedFor?.length && (
                        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <EyeOff size={11} />
                          Hidden from{" "}
                          {msg.excludedFor
                            .map((u) => `${u.firstName} ${u.lastName}`)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                No messages in this chat yet.
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
