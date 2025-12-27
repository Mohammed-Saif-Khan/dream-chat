import SheetSlide from "@/components/sheet-slide";
import React, { SetStateAction } from "react";

type FavouriteSheetType = {
  favSheet: boolean;
  setFavSheet: React.Dispatch<SetStateAction<boolean>>;
};

export default function FavouriteSheet({
  favSheet,
  setFavSheet,
}: FavouriteSheetType) {
  return (
    <SheetSlide
      open={favSheet}
      onOpenChange={setFavSheet}
      back={true}
      title="Favourites"
    >
      FavouriteSheet
    </SheetSlide>
  );
}
