
interface ChatMessageProps {
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

const ChatMessage = ({ sender, content, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex ${sender === "me" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          sender === "me"
            ? "bg-food-primary text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        <p>{content}</p>
        <div
          className={`text-xs mt-1 ${
            sender === "me" ? "text-white/80" : "text-gray-500"
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
