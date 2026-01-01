import { formatDateDDMMYYYY } from "@/utils/formatDate";
import { Separator } from "../ui/separator";

type ChatDividerProps = {
  date: string | undefined;
};

export default function ChatDivider({ date }: ChatDividerProps) {
  return (
    // <div className="relative inline-flex items-center justify-center w-full">
    //   <hr className="h-0.5 my-4 bg-gray-200 border-0 rounded-sm dark:bg-gray-700 w-full" />
    //   <div className="absolute px-4 -translate-x-1/2 bg-gray-200 left-1/2 dark:bg-gray-900 rounded-full text-sm font-semibold">
    //     {formatDateDDMMYYYY(date)}
    //   </div>

    // </div>
    <div className="relative my-4 flex items-center justify-center overflow-hidden">
      {/* <Separator /> */}
      <div className="py-1 px-2 border rounded-full text-center bg-muted text-xs mx-1">
        {formatDateDDMMYYYY(date)}
      </div>
      {/* <Separator /> */}
    </div>
  );
}
