import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "@/hooks/use-navigate";
import { fetchInstance } from "@/utils/fetch-instance";
import { nextCookies } from "@/utils/next-cookies";
import toast from "react-hot-toast";

type logoutProps = {
  open: boolean;
  onClose: (open: boolean) => void;
};

export default function LogoutDialog({ open, onClose }: logoutProps) {
  const { replace } = useNavigate();

  const logout = async () => {
    try {
      const response = await fetchInstance("api/v1/logout", {
        method: "POST",
      });
      const result = await response?.json();
      if (response?.status === 200) {
        await nextCookies("token", undefined, "delete");
        toast.success(result?.message || "Logout Successfully");
        replace("/auth/sign-in");
      } else {
        toast.error(result?.message || "Failed to logout");
      }
    } catch (error) {
      console.error("Error while logout", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? You’ll need to sign in again to
            access your account. Any unsaved changes might be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => logout()}
            className="cursor-pointer text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
