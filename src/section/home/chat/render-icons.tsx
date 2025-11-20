/* eslint-disable jsx-a11y/alt-text */
import { Icon } from "@iconify/react";
import { Image, Trash2, VolumeOff } from "lucide-react";

export const renderIcon = (name: string) => {
  switch (name) {
    case "image":
      return <Image size={14} className="text-muted-foreground" />;
    case "volume-off":
      return <VolumeOff size={14} className="text-yellow-500" />;
    case "user-off":
      return (
        <Icon
          icon="tabler:user-off"
          width="16"
          height="16"
          className="text-blue-500"
        />
      );
    case "trash":
      return <Trash2 size={14} className="text-red-500" />;
    default:
      return null;
  }
};
