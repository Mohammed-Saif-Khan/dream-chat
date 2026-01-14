import z from "zod";

const stringOrArrayToArray = z.preprocess((val) => {
  if (typeof val === "string") {
    return [val];
  }
  return val;
}, z.array(z.string().min(1)).min(1));

export const messageSchema = z.object({
  message: z.string().min(1, "Message is required"),
  receiverId: z.string().min(1, "Receiver id is required"),
});

export type messageTyep = z.infer<typeof messageSchema>;

export const forwardMessageSchema = z.object({
  messageIds: stringOrArrayToArray,

  receiverIds: stringOrArrayToArray,

  time: z.string().min(1, "Time is required"),
});
export type forwardMessageType = z.infer<typeof forwardMessageSchema>;
