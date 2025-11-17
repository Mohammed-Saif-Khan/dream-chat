import Chat from "./chat-area";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";

export default function ChatLayout() {
  return (
    <div className="flex flex-col h-svh w-full">
      <ChatHeader />
      <Chat />
      <ChatInput />
    </div>
  );
}
