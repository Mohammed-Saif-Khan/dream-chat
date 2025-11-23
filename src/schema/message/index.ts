import z from "zod";

export const messageSchema = z.object({
  message: z.string().min(1, "Message is required"),
  receiverId: z.string().min(1, "Receiver id is required"),
});

export type messageTyep = z.infer<typeof messageSchema>;
