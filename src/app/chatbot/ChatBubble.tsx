interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export default function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
          isUser
            ? "bg-black text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        }`}
        style={{ wordWrap: "break-word", wordBreak: "break-word" }}
      >
        {message}
      </div>
    </div>
  );
}
