"use client";
import SubmitButton from "@/components/button/submit-button";
import DatePickerBox from "@/components/forms/date-picker-box";
import SelectBox from "@/components/forms/select-box";
import TextArea from "@/components/forms/text-area";
import TextBox from "@/components/forms/text-box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Map, Plus, Save, User } from "lucide-react";
import React from "react";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";

type CroppedArea = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export default function PersonalInfo() {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [avatarImage, setAvatarImage] = React.useState<string>();
  const [imageSrc, setImageSrc] = React.useState<string>("");
  const [openCrop, setOpenCrop] = React.useState<boolean>(false);
  const [crop, setCrop] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    React.useState<CroppedArea | null>(null);

  const { control } = useForm();

  const handleAvatarClick = () => inputRef?.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
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
    croppedAreaPixels: CroppedArea
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
      size
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  const handleCropComplete = (
    _croppedArea: CroppedArea,
    croppedPixels: CroppedArea
  ) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (croppedImg) setAvatarImage(croppedImg);
    setOpenCrop(false);
  };

  return (
    <div>
      <form>
        <div className="flex items-center justify-center mb-4">
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
                "bg-white absolute end-0 bottom-0 flex items-center justify-center size-5 rounded-full border-2 border-white"
              )}
            >
              <Button
                size="icon-sm"
                className="bg-primary rounded-full size-3 flex items-center justify-center p-1 [&_svg]:!size-3"
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
          </div>
        </div>
        <TextBox
          name="firstName"
          placeholder="First Name"
          endAddon={<User />}
        />
        <TextBox name="lastName" placeholder="Last Name" endAddon={<User />} />
        <SelectBox
          name="gender"
          placeholder="Gender"
          selectLabel="Select Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <DatePickerBox
          control={control}
          name="dob"
          placeholder="Date of Birth"
        />
        <TextBox name="country" placeholder="Country" endAddon={<Map />} />
        <TextArea name="about" placeholder="About" rows={32} />
        <SubmitButton startIcon={<Save />} className="mt-3 w-full rounded">
          Save Changes
        </SubmitButton>
      </form>

      {/* Crop Dialog */}
      <Dialog open={openCrop} onOpenChange={setOpenCrop}>
        <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-[400px] h-[400px] flex flex-col">
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
            <Button onClick={handleSaveCrop} className="text-white">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
