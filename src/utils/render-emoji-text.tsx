import { cn } from "@/lib/utils";
import emojiRegex from "emoji-regex";

const regex = emojiRegex();

const isOnlyEmoji = (text: string) => {
  const matches = [...text.matchAll(regex)];
  if (!matches.length) return false;

  const textWithoutEmoji = text.replace(regex, "").trim();
  return textWithoutEmoji.length === 0;
};

export const renderEmojiText = (text: string) => {
  const onlyEmoji = isOnlyEmoji(text);
  const elements: React.ReactNode[] = [];

  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;

    // Add normal text before emoji
    if (index > lastIndex) {
      elements.push(
        <span key={`text-${index}`}>{text.slice(lastIndex, index)}</span>,
      );
    }

    // Add emoji
    elements.push(
      <span
        key={`emoji-${index}`}
        className={cn(
          "inline-block leading-none",
          onlyEmoji ? "text-3xl" : "text-2xl",
        )}
      >
        {match[0]}
      </span>,
    );

    lastIndex = index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(<span key="last-text">{text.slice(lastIndex)}</span>);
  }

  return elements;
};
