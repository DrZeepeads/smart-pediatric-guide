
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

const MessageBubble = ({ message, className }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg",
        message.role === "assistant" 
          ? "bg-secondary/50"
          : "bg-accent/30",
        className
      )}
    >
      <div className="shrink-0 mt-0.5">
        {message.role === "assistant" ? (
          <Bot className="h-6 w-6 text-primary" />
        ) : (
          <User className="h-6 w-6 text-accent-foreground" />
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="mb-1 flex items-center">
          <span className="font-medium">
            {message.role === "assistant" ? "Nelson AI" : "You"}
          </span>
          <span className="ml-2 text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
