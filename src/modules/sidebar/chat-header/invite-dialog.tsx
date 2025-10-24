import TextBox from "@/components/forms/text-box";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import TextArea from "../../../components/forms/text-area";

type InviteDialogProps = {
  open: boolean;
  onClose: (open: boolean) => void;
};

const InviteDialog = ({ open, onClose }: InviteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="mb-10">Invite Others</DialogTitle>

          <DialogDescription
            asChild
            className="w-full flex-grow overflow-y-auto"
          >
            <form>
              <TextBox name="send" label="Email Address" />
              <TextArea
                name="invitationMessage"
                label="Invitation Message"
                rows={32}
              />
            </form>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-wrap w-full">
          <Button
            size="lg"
            type="submit"
            className="text-white rounded-sm w-full"
          >
            Send Invitation
          </Button>
          <DialogClose asChild className="w-full">
            <Button size="lg" variant="outline" className="rounded-sm w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(InviteDialog);
