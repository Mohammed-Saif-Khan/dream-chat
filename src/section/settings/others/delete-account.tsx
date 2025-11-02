import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import React from "react";

type DeleteAccountDialogProps = {
  open: boolean;
  onClose: (open: boolean) => void;
};

export default function DeleteAccountDialog({
  open,
  onClose,
}: DeleteAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Delete Account
          </DialogTitle>
          <DialogDescription asChild>
            <div className="pt-4">
              <p className="text-base font-medium text-foreground">
                Are you sure you want to delete your account?
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                This action is irreversible and all your data will be
                permanently deleted.
              </p>

              <ul className="my-4 space-y-3">
                {[
                  "Delete your account info and profile photo",
                  "Delete you from all dreamschat groups",
                  "Delete your message history on this phone and your iCloud backup",
                ].map((item, index) => (
                  <li
                    key={`DELETE-INFO-${index}`}
                    className="flex items-center text-sm text-foreground"
                  >
                    <ChevronRight className="text-primary mr-2 h-4 w-4" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-3 mt-4">
                <Checkbox id="terms" />
                <Label
                  htmlFor="terms"
                  className="leading-5 text-sm text-foreground"
                >
                  I understand that deleting my account is irreversible and all
                  my data will be permanently deleted.
                </Label>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-3 pt-6">
          <Button
            variant="outline"
            onClick={() => onClose(false)}
            className="w-32"
          >
            Cancel
          </Button>
          <Button className="bg-[#7E3AF2] hover:bg-[#6c2de5] w-32 text-white">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
