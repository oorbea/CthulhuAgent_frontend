import { useChat } from "../hooks/useChat";
import { MessageList } from "./MessageList";
import { ChatComposer } from "./ChatComposer";

export function ChatPage() {
  const { messages, isStreaming, sendMessage, stopStreaming, resetChat } = useChat();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-10 flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Cthulhu Assistant</h1>
            <p className="text-sm text-zinc-400">Streaming chat (AG-UI over SSE)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">{isStreaming ? "Generating..." : "Ready"}</span>
            <button
              type="button"
              onClick={resetChat}
              className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs hover:bg-zinc-900"
            >
              Reset
            </button>
          </div>
        </header>

        <main className="rounded-2xl border border-zinc-800 bg-zinc-950/60 shadow-xl overflow-hidden">
          <MessageList messages={messages} />
          <ChatComposer isStreaming={isStreaming} onSend={sendMessage} onStop={stopStreaming} />
        </main>

        <footer className="text-xs text-zinc-500">
          Tip: Press Enter to send. Use Shift+Enter for a new line.
        </footer>
      </div>
    </div>
  );
}
