import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { SetStateAction } from "react";
import { ScrollArea } from "../ui/scroll-area";

type SheetSlideType = {
  open: boolean;
  title: string;
  onOpenChange: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  back?: boolean;
};

export default function SheetSlide({
  open,
  back = false,
  title,
  children,
  onOpenChange,
}: SheetSlideType) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        close={!back}
        className="bg-muted flex flex-col md:w-full w-full"
      >
        <SheetHeader className="bg-muted w-full">
          <SheetTitle
            onClick={() => back && onOpenChange(false)}
            className={cn(
              "text-xl font-bold text-foreground flex items-center gap-1.5",
              back && "cursor-pointer"
            )}
          >
            {back && (
              <Icon
                icon="mingcute:left-fill"
                width="24"
                height="24"
                className="cursor-pointer"
                style={{ color: "#fff" }}
              />
            )}
            {title}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-64px)] chat-scrollarea">
          <SheetDescription asChild className="chat-scrollarea">
            {children}
          </SheetDescription>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
