"use client";

import AvatarDP from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hooks/use-navigate";
import { formatDateTimeReadable } from "@/utils/formatDate";
import { ArrowLeft } from "lucide-react";

type GroupMember = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

type GroupDetail = {
  _id: string;
  groupName: string;
  groupAvatar?: string | null;
  createdAt: string;
  admin: GroupMember | null;
  participants: GroupMember[];
};

type GroupsPageDetailProps = {
  group: GroupDetail;
};

export default function GroupsPageDetail({ group }: GroupsPageDetailProps) {
  const { back } = useNavigate();

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
              src={group.groupAvatar}
              avatarSize="size-14"
              alt={group.groupName}
              fallback="G"
            />
            <div>
              <CardTitle className="text-lg">{group.groupName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Created {formatDateTimeReadable(group.createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-md border p-3">
            <div className="flex items-center gap-3">
              <AvatarDP
                src={group.admin?.avatar}
                avatarSize="size-10"
                alt={`${group.admin?.firstName} ${group.admin?.lastName}`}
                fallback={`${group.admin?.firstName || ""} ${group.admin?.lastName || ""}`}
              />
              <div>
                <p className="text-sm font-medium">
                  {group.admin
                    ? `${group.admin.firstName} ${group.admin.lastName}`
                    : "No admin assigned"}
                </p>
                <p className="text-xs text-muted-foreground">Group Admin</p>
              </div>
            </div>
            <Badge>Admin</Badge>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">
              Members ({group.participants?.length || 0})
            </p>
            <ScrollArea className="h-72 rounded-md border p-2">
              {group.participants?.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center justify-between gap-3 rounded-md p-3 my-1"
                >
                  <div className="flex items-center gap-2">
                    <AvatarDP
                      src={member.avatar}
                      avatarSize="size-8"
                      alt={`${member.firstName} ${member.lastName}`}
                      fallback={`${member.firstName} ${member.lastName}`}
                    />
                    <p className="text-sm font-medium">
                      {member.firstName} {member.lastName}
                    </p>
                  </div>
                  {group.admin?._id === member._id && (
                    <Badge variant="secondary">Group Admin</Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
