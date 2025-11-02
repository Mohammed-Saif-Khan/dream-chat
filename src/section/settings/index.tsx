/* eslint-disable jsx-a11y/alt-text */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Ban,
  Image,
  KeyRound,
  LogOut,
  Trash,
  User,
  VolumeOff,
  Waypoints,
} from "lucide-react";
import React from "react";
import PersonalInfo from "./account/personal-info";
import SocialsProfiles from "./account/socials-profiles";
import DeleteAccountDialog from "./others/delete-account";
import LogoutDialog from "./others/logout";
import MuteBlockedUserDialog from "./others/mute-blocked-user";
import SecurityFormt from "./security/security-form";

export type muteBlockType = {
  open: boolean;
  type: string | null;
};

export default function SettingSidebar() {
  const [muteblockDialog, setMuteBlockDialog] = React.useState<muteBlockType>({
    open: false,
    type: null,
  });
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [logout, setLogout] = React.useState<boolean>(false);

  return (
    <div>
      {/* Account */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground mb-2">Account</h1>
        <Accordion
          type="multiple"
          defaultValue={["item-1"]}
          className="bg-background py-1 px-4 rounded-sm mb-6"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold">
              <div className="flex items-center gap-2">
                <User size={14} /> Profile Info
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PersonalInfo />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Waypoints size={14} /> Social Profiles
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SocialsProfiles />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Security */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground mb-2">Security</h1>
        <Accordion
          type="single"
          collapsible
          className="bg-background py-1 px-4 rounded-sm"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold">
              <div className="flex items-center gap-2">
                <KeyRound size={14} /> Password
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SecurityFormt />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Chat */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground mb-2">Chat</h1>
        <Accordion
          type="single"
          collapsible
          className="bg-background py-1 px-4 rounded-sm"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold">
              <div className="flex items-center gap-2">
                <Image size={14} /> Background Images
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Others */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground mb-2">Others</h1>
        <Accordion
          type="single"
          collapsible
          className="bg-background py-1 px-4 rounded-sm"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger
              onClick={() => setMuteBlockDialog({ open: true, type: "block" })}
              collapseIcon={false}
              className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold"
            >
              <div className="flex items-center gap-2">
                <Ban size={14} /> Blocked User
              </div>
            </AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              onClick={() => setMuteBlockDialog({ open: true, type: "mute" })}
              collapseIcon={false}
              className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold"
            >
              <div className="flex items-center gap-2">
                <VolumeOff size={14} /> Mute Users
              </div>
            </AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger
              collapseIcon={false}
              onClick={() => setDeleteDialog(true)}
              className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold"
            >
              <div className="flex items-center gap-2">
                <Trash size={14} /> Delete Account
              </div>
            </AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger
              collapseIcon={false}
              onClick={() => setLogout(true)}
              className="cursor-pointer hover:no-underline text-sm text-muted-foreground font-semibold"
            >
              <div className="flex items-center gap-2">
                <LogOut size={14} /> Logout
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Mute or block dialog */}
      <MuteBlockedUserDialog
        open={muteblockDialog}
        onClose={setMuteBlockDialog}
      />
      <DeleteAccountDialog open={deleteDialog} onClose={setDeleteDialog} />
      <LogoutDialog open={logout} onClose={setLogout} />
    </div>
  );
}
