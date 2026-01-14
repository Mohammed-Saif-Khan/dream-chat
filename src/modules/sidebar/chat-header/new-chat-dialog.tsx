import AvatarDP from "@/components/avatar";
import SubmitButton from "@/components/button/submit-button";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { useChatlistStore } from "@/store/chat-list";
import { useMessageStore } from "@/store/messages";
import { fetchInstance } from "@/utils/fetch-instance";
import { getTime } from "@/utils/getTime";
import { TabsList } from "@radix-ui/react-tabs";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type NewChatDialogProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  title?: string;
  buttonTitle?: string;
  messageId?: string;
  receiverId?: string;
};

const NewChatDialog = ({
  open,
  onClose,
  title = "New Chat",
  buttonTitle = "Start Chat",
  messageId,
  receiverId,
}: NewChatDialogProps) => {
  const { getChatlist, chatlist } = useChatlistStore();
  const { getMessages } = useMessageStore();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onForward = async (data: any) => {
    const time = getTime();
    const finalData = {
      ...data,
      time: time,
      messageIds: !Array.isArray(messageId) ? [messageId] : messageId,
    };
    try {
      const response = await fetchInstance("api/v1/message/forward-message", {
        method: "POST",
        body: JSON.stringify(finalData),
      });
      const result = await response.json();
      if (response?.status === 200) {
        if (receiverId) {
          getMessages(receiverId);
          getChatlist();
          onClose(false);
        }
      } else {
        toast.error(result?.message || "Failed to forward message");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col dialog-full-width">
        <DialogHeader>
          <DialogTitle className="text-start">{title}</DialogTitle>
          <DialogDescription
            asChild
            className="mt-5 w-full grow overflow-y-auto"
          >
            <div className="w-full">
              <ButtonGroup className="w-full mb-4">
                <Input placeholder="Search..." className="text-foreground" />
                <Button variant="outline" aria-label="Search">
                  <SearchIcon />
                </Button>
              </ButtonGroup>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onForward)}>
          <div>
            <Tabs defaultValue="contact" className="gap-4">
              <TabsList className="bg-background rounded-none border-b p-0">
                <TabsTrigger
                  value="contact"
                  className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
                >
                  Contact
                </TabsTrigger>
                <TabsTrigger
                  value="near_me"
                  className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none"
                >
                  Near Me
                </TabsTrigger>
              </TabsList>
              <TabsContent value="contact">
                <ScrollArea className="pr-2 md:h-90 sm:h-[calc(100dvh-250px)] h-[calc(100dvh-300px)]">
                  {chatlist?.map((item, index) => (
                    <Controller
                      key={index}
                      control={control}
                      name="receiverIds"
                      render={({ field }) => (
                        <Label
                          key={`NEW-CHAT-${index}`}
                          className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-md p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950 my-4"
                        >
                          <div className="flex items-center gap-2 font-normal">
                            <AvatarDP
                              src={item?.participants?.avatar}
                              alt="recent-chat"
                              fallback="recent-chat"
                              avatarSize="w-12 h-12"
                            />
                            <div>
                              <p className="text-base font-semibold text-accent-foreground">
                                {item?.participants?.firstName}{" "}
                                {item?.participants?.lastName}
                              </p>
                            </div>
                          </div>
                          <Checkbox
                            id="toggle-2"
                            checked={field.value?.includes(
                              item.participants._id
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setValue("receiverIds", [
                                  ...(field.value || []),
                                  item.participants._id,
                                ]);
                              } else {
                                setValue(
                                  "receiverIds",
                                  field.value.filter(
                                    (id: string) => id !== item.participants._id
                                  )
                                );
                              }
                            }}
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                          />
                        </Label>
                      )}
                    />
                  ))}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="near_me">
                <ScrollArea className="pr-2 md:h-90 sm:h-[calc(100dvh-250px)] h-[calc(100dvh-300px)]">
                  asdf
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter className="flex flex-wrap w-full">
            <DialogClose asChild>
              <Button size="lg" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton
              isSubmitting={isSubmitting}
              size="lg"
              type="submit"
              className="text-white rounded-sm w-full"
            >
              {buttonTitle}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(NewChatDialog);
