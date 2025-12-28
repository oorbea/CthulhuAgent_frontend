import { useChat } from "../hooks/useChat";
import { useHealthCheck } from "../hooks/useHealthCheck";
import { MessageList } from "./MessageList";
import { ChatComposer } from "./ChatComposer";
import { LOADING_MESSAGES } from "../constants/errorMessages";

export function ChatPage() {
  const { messages, isStreaming, sendMessage, stopStreaming, resetChat } = useChat();
  const { status: connectionStatus } = useHealthCheck();

  // Determine display status
  const getStatusDisplay = () => {
    if (isStreaming) {
      return { text: LOADING_MESSAGES.STREAMING, color: "bg-eldritch animate-pulse shadow-glow" };
    }
    switch (connectionStatus) {
      case "connected":
        return { text: "Conectado", color: "bg-eldritch" };
      case "disconnected":
        return { text: "Desconectado", color: "bg-red-500" };
      case "checking":
      default:
        return { text: "Verificando...", color: "bg-yellow-500 animate-pulse" };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="h-[100dvh] flex flex-col ocean-bg bg-ocean-depth text-white font-sans overflow-hidden">
      {/* Animated background layer */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#020617] via-[#0c1829] to-[#0f2133]" />

      {/* Full width container */}
      <div className="flex-1 flex flex-col w-full px-4 sm:px-8 lg:px-16 min-h-0">
        {/* Header - compact on mobile */}
        <header className="flex-shrink-0 glass-panel mt-2 sm:mt-4 rounded-xl sm:rounded-2xl 
                           px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-between relative z-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-display font-semibold tracking-tight text-eldritch text-glow-subtle truncate">
              Cthulhu Assistant
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Status indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusDisplay.color}`} />
              <span className="text-[10px] sm:text-xs text-bio-300 hidden xs:inline">
                {statusDisplay.text}
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

        {/* Main chat area - fills available space with increased vertical margins */}
        <main className="flex-1 flex flex-col min-h-0 my-4 sm:my-6 
                         glass-panel rounded-xl sm:rounded-2xl shadow-abyss overflow-hidden relative z-10">
          <MessageList messages={messages} isStreaming={isStreaming} />
        </main>

        {/* Fixed input at bottom */}
        <div className="flex-shrink-0 relative z-10 pb-2 sm:pb-4">
          <ChatComposer isStreaming={isStreaming} onSend={sendMessage} onStop={stopStreaming} />
        </div>
      </div>
    </div>
  );
}
