import { ProfileType } from "@/types/profile";
import { formatDateDDMMYYYY } from "@/utils/formatDate";
import { v4 as uuidv4 } from "uuid";

export const getArrangeData = (
  data: any,
  profile: ProfileType,
  senderId: any,
  receiverId: string,
  time: string,
  reply: any,
  isGroup?: boolean,
  excludeIds?: string[],
) => {
  return {
    message: data?.message,
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    ...(isGroup ? { chatId: receiverId } : { receiverId }),
    ...(isGroup && excludeIds?.length ? { excludedFor: excludeIds } : {}),
    senderId: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      _id: senderId,
    },
    ...(reply && {
      replyTo: {
        message: reply.message,
        senderId: reply.senderId,
        messageId: reply._id,
      },
    }),
    time,
    status: "pending",
    _id: uuidv4(),
  };
};
