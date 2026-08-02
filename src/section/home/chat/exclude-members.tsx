"use client";
import AvatarDP from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Participant } from "@/store/chat-list/type";
import { SearchIcon, UserRoundX } from "lucide-react";
import React from "react";

type ExcludeMembersProps = {
  members: Participant[] | undefined;
  senderId: string;
  excludeIds: string[];
  setExcludeIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ExcludeMembers({
  members,
  senderId,
  excludeIds,
  setExcludeIds,
}: ExcludeMembersProps) {
  const [search, setSearch] = React.useState("");

  const others = members?.filter((member) => member?._id !== senderId) ?? [];

  const filtered = others.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  const toggle = (id: string) => {
    setExcludeIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  if (!others.length) return null;

  return (
    <Popover onOpenChange={(open) => !open && setSearch("")}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon-lg"
          variant="default"
          className="relative cursor-pointer inline-flex rounded-full mb-3 bg-orange-500 hover:bg-orange-500 text-white"
        >
          <UserRoundX size={20} className="transition-transform duration-200" />
          {excludeIds.length > 0 && (
            <span
              className="absolute -top-2 -right-2 flex items-center justify-center
                   size-4 rounded-full bg-destructive text-white text-[10px]
                   font-semibold leading-none
                   ring-2 ring-background
                   animate-pulse"
            >
              {excludeIds.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start" side="top">
        <p className="text-xs text-muted-foreground px-2 pb-2">
          Hide this message from
        </p>
        {others.length > 5 && (
          <ButtonGroup className="w-full mb-2 px-0.5">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              className="text-foreground h-8 text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Search"
            >
              <SearchIcon size={14} />
            </Button>
          </ButtonGroup>
        )}
        <div className="max-h-64 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No members found
            </p>
          )}
          {filtered.map((member) => (
            <Label
              key={member._id}
              className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-md p-2 cursor-pointer"
            >
              <div className="flex items-center gap-2 font-normal">
                <AvatarDP
                  src={member.avatar}
                  alt={member.firstName}
                  fallback={`${member.firstName} ${member.lastName}`}
                  avatarSize="w-8 h-8"
                />
                <p className="text-sm">
                  {member.firstName} {member.lastName}
                </p>
              </div>
              <Checkbox
                checked={excludeIds.includes(member._id)}
                onCheckedChange={() => toggle(member._id)}
              />
            </Label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
