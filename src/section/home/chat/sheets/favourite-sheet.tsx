import AvatarDP from "@/components/avatar";
import SheetSlide from "@/components/sheet-slide";
import { FavouriteSkeleton } from "@/components/skeleton/favourite-skeleton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/profile";
import { favouriteType } from "@/types/favourite";
import { fetchInstance } from "@/utils/fetch-instance";
import { formatDateDDMMYYYY } from "@/utils/formatDate";
import {
  Check,
  CheckCheck,
  ChevronRight,
  MessageSquareHeart,
} from "lucide-react";
import React, { SetStateAction } from "react";
import toast from "react-hot-toast";

type FavouriteSheetType = {
  chatId: string | undefined;
  favSheet: boolean;
  setFavSheet: React.Dispatch<SetStateAction<boolean>>;
};

export default function FavouriteSheet({
  chatId,
  favSheet,
  setFavSheet,
}: FavouriteSheetType) {
  const { profile } = useProfileStore();
  const [favourite, setFavourite] = React.useState<favouriteType[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const getFavourite = async () => {
    try {
      setLoading(true);
      const response = await fetchInstance(`api/v1/favourite/${chatId}`);
      if (!response?.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch favourites messages: ${response?.status} ${errorText}`
        );
      }
      const result = await response.json();
      if (response?.status === 200) {
        setFavourite(result?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Failed to load favourite message",
        (error as Error)?.message
      );
      toast.error((error as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!favSheet || !chatId) return;
    setFavourite([]);
    getFavourite();
  }, [favSheet, chatId]);

  return (
    <SheetSlide
      open={favSheet}
      onOpenChange={setFavSheet}
      back={true}
      title="Favourites"
    >
      <div>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <FavouriteSkeleton key={i} />
          ))}

        {!isLoading && favourite?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <MessageSquareHeart className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              No favourites yet
            </h3>

            <p className="text-sm text-muted-foreground max-w-xs">
              Messages you mark as favourite will appear here for quick access.
              Start a conversation and save your important messages!
            </p>
          </div>
        )}

        {!isLoading &&
          favourite?.length > 0 &&
          favourite.map((item) => {
            const sender = item?.message?.senderId;
            const receiver = item?.message?.receiverId;

            const loggedInUserId = profile?._id;
            const getUserId = (user?: any) => user?._id;

            const isSenderMe = getUserId(sender) === loggedInUserId;
            const isReceiverMe = getUserId(receiver) === loggedInUserId;

            return (
              <div
                key={item._id}
                className="cursor-pointer pt-4 px-6 hover:bg-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-foreground space-x-1">
                    <AvatarDP
                      src={sender?.profile?.avatar}
                      alt={sender?.firstName}
                      fallback={sender?.firstName?.[0] ?? "U"}
                      avatarSize="w-8 h-8 mr-1"
                    />
                    <p className="truncate max-w-[120px]">
                      {isSenderMe
                        ? "You"
                        : `${sender?.firstName} ${sender?.lastName}`}
                    </p>
                    <ChevronRight size={14} />
                    <p className="truncate max-w-[120px]">
                      {isReceiverMe
                        ? "You"
                        : `${receiver?.firstName} ${receiver?.lastName}`}
                    </p>
                    {item?.message?.status === "sent" && (
                      <Check size={14} className="ml-1 text-foreground" />
                    )}
                    {item?.message?.status === "delivered" && (
                      <CheckCheck size={14} className="ml-1" />
                    )}
                    {item?.message?.status === "read" && (
                      <CheckCheck size={14} className="ml-1 text-online" />
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <p>{formatDateDDMMYYYY(item?.message?.createdAt)}</p>
                    <ChevronRight size={14} />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex items-center gap-1 select-none">
                    <div
                      className={cn(
                        "mt-1 p-3 bg-primary text-white rounded-t-xl rounded-r-xl text-sm max-w-2xs",
                        isSenderMe
                          ? "bg-primary"
                          : "dark:bg-background bg-gray-300"
                      )}
                    >
                      {item?.message?.message}
                    </div>
                  </div>
                </div>
                <Separator className="mt-4" />
              </div>
            );
          })}
      </div>
    </SheetSlide>
  );
}
