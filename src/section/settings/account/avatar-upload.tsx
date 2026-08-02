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
import { Plus } from "lucide-react";
import React from "react";
import Cropper from "react-easy-crop";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";
import toast from "react-hot-toast";

type CroppedArea = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type AvatarUploadPropType<T extends FieldValues> = {
  name: keyof T;
  bind: string;
  errors: FieldErrors<T> | undefined;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; //max 5mb

export default function AvatarUpload<T extends FieldValues>({
  name,
  bind,
  errors,
  setError,
  clearErrors,
}: AvatarUploadPropType<T>) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [avatarImage, setAvatarImage] = React.useState<string>(bind);
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
    const validImageFiles =
      file && typeof file.type === "string" && file.type.startsWith("image/");
    const overSize = file && file?.size > MAX_FILE_SIZE;

    if (!validImageFiles) {
      setError(name as Path<T>, {
        type: "manual",
        message: "Please upload only image files",
      });
    } else if (overSize) {
      setError(name as Path<T>, {
        type: "manual",
        message: "Image must be less than 5MB",
      });
    } else {
      clearErrors(name as Path<T>);
    }

    console.log(file, "lkasfjee");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setOpenCrop(true); // open crop modal
      };
      reader.readAsDataURL(file);
    }
  };

  // Create image helper
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

  // Function to crop image using canvas
  const getCroppedImg = async (
    imageSrc: string,
    croppedAreaPixels: CroppedArea,
  ): Promise<string | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const size = Math.min(croppedAreaPixels.width, croppedAreaPixels.height);
    canvas.width = size;
    canvas.height = size;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      size,
      size,
      0,
      0,
      size,
      size,
    );

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

    const avatarFile = new File([blob], "avatar.jpg");
    if (croppedImg) setAvatarImage(croppedImg);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const response = await fetchInstance("api/v1/avatar", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response?.status === 200) {
        setOpenCrop(false);
        setLoading(false);
      } else {
        toast.error(result?.message || "Faild to set Profile");
      }
    } catch (error) {
      console.error("Error While Uploading Profile", error);
      toast.error("Something Went Wrong");
    }
  };

  React.useEffect(() => {
    setAvatarImage(bind);
  }, [bind]);

  return (
    <div className="relative border-3 border-dashed border-primary rounded-full p-1 cursor-pointer">
      <Avatar onClick={handleAvatarClick} className="size-18">
        <AvatarImage
          src={avatarImage || "/noimage.avif"}
          className="object-cover"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span
        className={cn(
          "bg-white absolute end-0 bottom-0 flex items-center justify-center size-5 rounded-full border-2 border-white",
        )}
      >
        <Button
          size="icon-sm"
          className="bg-primary rounded-full size-3 flex items-center justify-center p-1 [&_svg]:size-3!"
        >
          <Plus className="text-white font-bold" />
        </Button>
      </span>
      <input
        type="file"
        name="avatar"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />
      {errors?.[name] && (
        <p className="text-xs text-red-500">
          {String(errors?.[name]?.message)}
        </p>
      )}
      {/* Crop Dialog */}
      <Dialog open={openCrop} onOpenChange={setOpenCrop}>
        <DialogContent className="sm:max-w-100 h-100 flex flex-col">
          <DialogTitle></DialogTitle>
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
