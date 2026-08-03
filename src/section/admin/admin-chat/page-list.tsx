"use client";

import AvatarDP from "@/components/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@/hooks/use-navigate";
import { formatDateTimeReadable } from "@/utils/formatDate";
import { getFallbackName } from "@/utils/getFallbackName";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";

type ChatUser = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

type UserChat = {
  _id: string;
  createdAt: string;
  otherUser: ChatUser | null;
};

type ChatListProps = {
  user: ChatUser;
  chats: UserChat[];
};

export default function ChatList({ user, chats }: ChatListProps) {
  const { back } = useNavigate();
  const userName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

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
              src={user?.avatar}
              avatarSize="size-10"
              alt={userName}
              fallback={getFallbackName(user?.firstName, user?.lastName)}
            />
            <div>
              <CardTitle className="text-lg">{userName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {chats.length} conversation{chats.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100dvh-320px)] min-h-72 rounded-md border p-3">
            {chats.length ? (
              <div className="flex flex-col gap-2">
                {chats.map((chat) => {
                  const otherName = chat.otherUser
                    ? `${chat.otherUser.firstName} ${chat.otherUser.lastName}`
                    : "Unknown user";

                  return (
                    <Link
                      key={chat._id}
                      href={`/admin/admin-chat/${user._id}/${chat._id}`}
                      className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <AvatarDP
                        src={chat.otherUser?.avatar}
                        avatarSize="size-9"
                        alt={otherName}
                        fallback={getFallbackName(
                          chat.otherUser?.firstName,
                          chat.otherUser?.lastName
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {otherName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Started {formatDateTimeReadable(chat.createdAt)}
                        </p>
                      </div>
                      <MessageSquare className="size-4 text-muted-foreground shrink-0" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                This user has no conversations yet.
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
