"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@/hooks/use-navigate";
import { fetchInstance } from "@/utils/fetch-instance";
import revalidate from "@/utils/revalidate";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface ActionType {
  label: string;
  url?: string;
  status?: boolean;
  isDownload?: boolean;
  onClick?: () => void;
}

interface DataTableRowActionProps {
  id: string | number;
  deleteUrl?: string;
  pathRevalidate: string;
  actions?: ActionType[];
  isDelete?: boolean;
  component?: React.ReactNode[];
}

export default function DataTableRowAction({
  id,
  deleteUrl,
  pathRevalidate,
  actions,
  isDelete = true,
  component,
}: DataTableRowActionProps) {
  const router = useNavigate();
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      const response = await fetchInstance(`${deleteUrl}/${id}`, {
        method: "DELETE",
      });
      if (response?.status === 200) {
        await revalidate(pathRevalidate, "page");
        toast.success("Delete Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error While Deleting the Product", error);
      toast.error("Something went wrong");
    }
  };

  if (component?.length) {
    return <div className="flex items-center gap-2">{component}</div>;
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted cursor-pointer"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[220px]">
          {actions &&
            actions?.length > 0 &&
            actions?.map((item, index) => (
              <DropdownMenuItem
                disabled={item?.status}
                key={index}
                onClick={() => {
                  if (item?.onClick) {
                    item.onClick();
                  } else if (item?.isDownload) {
                    window.open(item?.url, "_blank");
                  } else if (item?.url) {
                    router.push(item?.url);
                  }
                }}
                className="font-medium cursor-pointer"
              >
                {item?.label}
              </DropdownMenuItem>
            ))}
          {isDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="text-red-500 font-medium focus:text-red-500 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete this item and cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)} variant="outline">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete()} variant="destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
