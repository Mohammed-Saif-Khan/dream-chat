export type handleDeleteType = {
  isDeleted: boolean;
  messageId: string;
  receiverId: string;
  senderId: string;
};

export type handleDeleteFinalType = {
  deletedAt: string;
  messageId: string;
  receiverId: string;
  senderId: string;
  lastMessage: string;
};
