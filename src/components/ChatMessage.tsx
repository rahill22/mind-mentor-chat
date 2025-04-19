
import { cn } from "@/lib/utils";
import { Message } from "@/pages/Index";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === "bot";

  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-fade-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary text-lg">👨‍⚕️</span>
        </div>
      )}
      
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%] shadow-sm",
          isBot
            ? "bg-accent text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <div className="space-y-1">
          <div className={cn("font-medium text-xs mb-1",
            isBot ? "text-primary" : "text-primary-foreground/90"
          )}>
            {isBot ? "Dr. MindMentor" : "You"}
          </div>
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          <div className={cn("text-xs opacity-70 text-right",
            isBot ? "text-foreground/70" : "text-primary-foreground/70"
          )}>
            {format(message.timestamp, "h:mm a")}
          </div>
        </div>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground text-sm font-bold">You</span>
        </div>
      )}
    </div>
  );
};
