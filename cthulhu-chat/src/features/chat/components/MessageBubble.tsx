import type { ChatMessage } from "../../../domain/chat/types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-indigo-600 text-white shadow" : "bg-zinc-900 border border-zinc-800 text-zinc-100",
        ].join(" ")}
      >
        <div className="whitespace-pre-wrap">{message.content || (isUser ? "" : "...")}</div>
      </div>
    </div>
  );
}
