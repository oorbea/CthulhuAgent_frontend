import type { ChatMessage } from "../../../domain/chat/types";
import { MarkdownRenderer } from "./MarkdownRenderer";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all duration-300",
          isUser
            ? "bg-gradient-to-br from-void-500/40 to-void-700/30 border border-void-400/40 text-white shadow-glow-void"
            : "glass-panel text-bio-50 shadow-glow-bio/20",
        ].join(" ")}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : message.content ? (
          <MarkdownRenderer content={message.content} />
        ) : (
          <div className="text-bio-400">...</div>
        )}
      </div>
    </div>
  );
}
