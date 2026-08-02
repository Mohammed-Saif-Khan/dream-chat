"use client";
import SubmitButton from "@/components/button/submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { fetchInstance } from "@/utils/fetch-instance";
import { Camera } from "lucide-react";
import React from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

type CroppedArea = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type GroupAvatarUploadProps = {
  chatId: string;
  src?: string | null;
  fallback?: string;
  avatarSize?: string;
  onUploaded?: (url: string) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; //max 5mb

export default function GroupAvatarUpload({
  chatId,
  src,
  fallback = "G",
  avatarSize = "md:w-12 md:h-12 w-10 h-10",
  onUploaded,
}: GroupAvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = React.useState<string>("");
  const [openCrop, setOpenCrop] = React.useState<boolean>(false);
  const [crop, setCrop] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    React.useState<CroppedArea | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleAvatarClick = () => inputRef?.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    e.target.value = "";

    const validImageFile =
      file && typeof file.type === "string" && file.type.startsWith("image/");
    const overSize = file && file?.size > MAX_FILE_SIZE;

    if (!validImageFile) {
      toast.error("Please upload only image files");
      return;
    }

    if (overSize) {
      toast.error("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setOpenCrop(true);
    };
    reader.readAsDataURL(file);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

  const getCroppedImg = async (
    src: string,
    area: CroppedArea,
  ): Promise<string | null> => {
    const image = await createImage(src);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const size = Math.min(area.width, area.height);
    canvas.width = size;
    canvas.height = size;

    ctx.drawImage(image, area.x, area.y, size, size, 0, 0, size, size);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  const handleCropComplete = (
    _croppedArea: CroppedArea,
    croppedPixels: CroppedArea,
  ) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);

    if (!croppedImg) return;
    const blob = await fetch(croppedImg).then((res) => res.blob());
    const avatarFile = new File([blob], "group-avatar.jpg");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const response = await fetchInstance(
        `api/v1/chat/group/${chatId}/avatar`,
        {
          method: "PATCH",
          body: formData,
        },
      );
      const result = await response.json();

      if (response?.status === 200) {
        onUploaded?.(result?.groupAvatar);
        setOpenCrop(false);
      } else {
        toast.error(result?.message || "Failed to update group avatar");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative cursor-pointer shrink-0">
      <Avatar onClick={handleAvatarClick} className={cn(avatarSize)}>
        {src && <AvatarImage src={src} className="object-cover" />}
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span className="bg-white absolute end-0 bottom-0 flex items-center justify-center size-4 rounded-full border-2 border-white">
        <Camera className="text-primary size-2.5" />
      </span>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <Dialog open={openCrop} onOpenChange={setOpenCrop}>
        <DialogContent className="sm:max-w-100 h-100 flex flex-col">
          <DialogTitle>Update Group Photo</DialogTitle>
          <div className="relative flex-1 bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
          <DialogFooter className="mt-4 flex justify-between">
            <Button variant="outline" onClick={() => setOpenCrop(false)}>
              Cancel
            </Button>
            <SubmitButton
              type="button"
              isSubmitting={loading}
              onClick={handleSaveCrop}
              className="text-white md:w-fit w-full"
            >
              Save
            </SubmitButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
