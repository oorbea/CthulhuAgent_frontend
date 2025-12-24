import type { ChatMessage } from "../../../domain/chat/types";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="h-[62vh] overflow-y-auto p-4 flex flex-col gap-3">
      {messages.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-400">
          Type a message to begin.
        </div>
      ) : (
        messages.map((m) => <MessageBubble key={m.id} message={m} />)
      )}
    </div>
  );
}
