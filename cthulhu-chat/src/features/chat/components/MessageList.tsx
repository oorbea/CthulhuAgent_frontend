import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../../domain/chat/types";
import { MessageBubble } from "./MessageBubble";
import { LoadingIndicator } from "./LoadingIndicator";

interface MessageListProps {
  messages: ChatMessage[];
  isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check if last message is assistant with empty content (loading state)
  const lastMessage = messages[messages.length - 1];
  const showLoading = isStreaming && lastMessage?.role === "assistant" && lastMessage.content === "";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col gap-2 sm:gap-3"
    >
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-panel-light rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center max-w-md mx-auto">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔮</div>
            <p className="text-bio-300 text-sm sm:text-base font-medium">
              Los susurros del vacío aguardan tu mensaje...
            </p>
            <p className="text-bio-500/60 text-xs sm:text-sm mt-2">
              Escribe algo para invocar una respuesta del abismo.
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((m, idx) => {
            // Skip rendering empty assistant message if we're showing loading
            if (showLoading && idx === messages.length - 1 && m.role === "assistant") {
              return <LoadingIndicator key={m.id} />;
            }
            return <MessageBubble key={m.id} message={m} />;
          })}
        </>
      )}
    </div>
  );
}
