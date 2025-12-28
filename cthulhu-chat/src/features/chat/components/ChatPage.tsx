import { useChat } from "../hooks/useChat";
import { MessageList } from "./MessageList";
import { ChatComposer } from "./ChatComposer";
import { LOADING_MESSAGES } from "../constants/errorMessages";

export function ChatPage() {
  const { messages, isStreaming, sendMessage, stopStreaming, resetChat } = useChat();

  return (
    <div className="h-screen flex flex-col ocean-bg bg-ocean-depth text-white font-sans overflow-hidden">
      {/* Animated background layer */}
      <div className="fixed inset-0 bg-gradient-to-b from-abyss-950 via-abyss-800 to-abyss-700 -z-10" />

      {/* Header - compact on mobile */}
      <header className="flex-shrink-0 glass-panel mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-xl sm:rounded-2xl 
                         px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between relative z-10">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-2xl font-display font-semibold tracking-tight text-eldritch text-glow-subtle truncate">
            Cthulhu Assistant
          </h1>
          <p className="text-xs sm:text-sm text-bio-400/80 hidden sm:block">
            Streaming chat · AG-UI over SSE
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Status indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isStreaming ? "bg-eldritch animate-pulse shadow-glow" : "bg-bio-600"}`} />
            <span className="text-[10px] sm:text-xs text-bio-300 hidden xs:inline">
              {isStreaming ? LOADING_MESSAGES.STREAMING : "Conectado"}
            </span>
          </div>
          <button
            type="button"
            onClick={resetChat}
            className="btn-bubble rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 
                       text-[10px] sm:text-xs text-bio-100 hover:text-white transition-colors"
          >
            Reiniciar
          </button>
        </div>
      </header>

      {/* Main chat area - fills available space */}
      <main className="flex-1 flex flex-col min-h-0 mx-2 sm:mx-4 my-2 sm:my-4 
                       glass-panel rounded-xl sm:rounded-2xl shadow-abyss overflow-hidden relative z-10">
        <MessageList messages={messages} isStreaming={isStreaming} />
      </main>

      {/* Fixed input at bottom */}
      <div className="flex-shrink-0 relative z-10">
        <ChatComposer isStreaming={isStreaming} onSend={sendMessage} onStop={stopStreaming} />
      </div>
    </div>
  );
}
