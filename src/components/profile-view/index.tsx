"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProfilePreviewStore } from "@/store/useProfilePreviewStore";
import Image from "next/image";

export default function ProfileView() {
  const { open, image, closePreview } = useProfilePreviewStore();

  return (
    <Dialog open={open} onOpenChange={closePreview}>
      <DialogContent
        showCloseButton={false}
        className="border-0 w-fit p-0 rounded-full"
      >
        <DialogTitle className="sr-only">Profile Preview</DialogTitle>
        <Image
          src={image || ""}
          width={300}
          height={300}
          alt="Avatar"
          className="rounded-full"
        />
      </DialogContent>
    </Dialog>
  );
}
