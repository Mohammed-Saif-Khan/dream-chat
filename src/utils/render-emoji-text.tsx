import { cn } from "@/lib/utils";

const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u;

const isOnlyEmoji = (text: string) =>
  /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+$/u.test(text);

export const renderEmojiText = (text: string) => {
  const onlyEmoji = isOnlyEmoji(text);

  return text.split(emojiRegex).map((part, index) => {
    if (emojiRegex.test(part)) {
      return (
        <span
          key={index}
          className={cn(
            "inline-block leading-none",
            onlyEmoji ? "text-3xl" : "text-2xl",
          )}
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
