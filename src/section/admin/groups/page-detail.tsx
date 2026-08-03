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
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "@/hooks/use-navigate";
import { formatDateTimeReadable } from "@/utils/formatDate";
import { toggleGroupMemberRestriction } from "@/services/admin-groups";
import { ArrowLeft } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

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
  restrictedMembers?: string[];
};

type GroupsPageDetailProps = {
  group: GroupDetail;
};

export default function GroupsPageDetail({ group }: GroupsPageDetailProps) {
  const { back } = useNavigate();
  const [restrictedMembers, setRestrictedMembers] = React.useState<string[]>(
    group.restrictedMembers || [],
  );
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const handleToggleRestriction = async (
    memberId: string,
    restricted: boolean,
  ) => {
    setPendingId(memberId);
    const { success } = await toggleGroupMemberRestriction(
      group._id,
      memberId,
      restricted,
    );
    if (success) {
      setRestrictedMembers((prev) =>
        restricted ? [...prev, memberId] : prev.filter((id) => id !== memberId),
      );
      toast.success(
        restricted
          ? "Member restricted from sending messages"
          : "Member restriction removed",
      );
    } else {
      toast.error("Something went wrong");
    }
    setPendingId(null);
  };

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
              {group.participants?.map((member) => {
                const isRestricted = restrictedMembers.includes(member._id);
                return (
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
                      <div>
                        <p className="text-sm font-medium">
                          {member.firstName} {member.lastName}
                        </p>
                        {group.admin?._id === member._id && (
                          <Badge variant="secondary" className="mt-0.5">
                            Group Admin
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isRestricted && (
                        <Badge variant="destructive">Restricted</Badge>
                      )}
                      <Switch
                        checked={isRestricted}
                        disabled={pendingId === member._id}
                        onCheckedChange={(checked) =>
                          handleToggleRestriction(member._id, checked)
                        }
                        aria-label={
                          isRestricted
                            ? "Unrestrict member from sending messages"
                            : "Restrict member from sending messages"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
