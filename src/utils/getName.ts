export default function getName(
  sender: { firstName: string; lastName: string; _id: string },
  loggedInUserId: string
) {
  if (!sender) return "";

  const id = sender._id || sender;
  if (id === loggedInUserId) return "You";

  const f = sender.firstName?.trim() || "";
  const l = sender.lastName?.trim() || "";

  return `${f} ${l}`.trim();
}
