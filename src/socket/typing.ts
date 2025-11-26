import { SetStateAction, Dispatch } from "react";

export const typingHandler =
  (receiverId: string, setTyping: Dispatch<SetStateAction<boolean>>) =>
  ({ senderId }: { senderId: string }) => {
    if (senderId === receiverId) setTyping(true);
  };

export const stopTypingHandler =
  (receiverId: string, setTyping: Dispatch<SetStateAction<boolean>>) =>
  ({ senderId }: { senderId: string }) => {
    if (senderId === receiverId) setTyping(false);
  };
