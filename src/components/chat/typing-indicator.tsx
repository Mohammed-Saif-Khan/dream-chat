export default function TypingIndicator() {
  return (
    <div className="p-3.5 dark:bg-muted bg-gray-300 w-fit rounded-xl rounded-bl-none">
      <span className="flex space-x-1">
        <span className="chat-dot"></span>
        <span className="chat-dot"></span>
        <span className="chat-dot"></span>
      </span>
    </div>
  );
}
