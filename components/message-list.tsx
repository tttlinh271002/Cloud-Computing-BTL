"use client";

import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm transition-all ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-card text-foreground border border-border rounded-bl-none"
            }`}
          >
            {/* Bọc ReactMarkdown trong một thẻ div để thêm class */}
            <div className="text-sm leading-relaxed">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>

            <p
              className={`text-xs mt-1 ${
                message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
              suppressHydrationWarning
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}