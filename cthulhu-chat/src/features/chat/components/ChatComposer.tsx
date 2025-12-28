import { useRef, useState, useEffect } from "react";

export function ChatComposer({
  isStreaming,
  onSend,
  onStop,
}: {
  isStreaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
}) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [text]);

  const handleSubmit = () => {
    if (text.trim() && !isStreaming) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="p-3 sm:p-4 bg-gradient-to-t from-abyss-900/90 to-transparent backdrop-blur-md">
      <div className="max-w-3xl mx-auto">
        {/* Modern pill-shaped input container */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-1.5 sm:p-2">
          <form
            className="flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Auto-resizing textarea */}
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Susurra al vacío..."
              className="flex-1 resize-none bg-transparent px-3 sm:px-4 py-2.5 sm:py-3 
                         text-sm sm:text-base text-white placeholder:text-bio-500/60
                         outline-none min-h-[44px] max-h-[150px] leading-relaxed"
              rows={1}
            />

            {/* Action button - icon style */}
            {isStreaming ? (
              <button
                type="button"
                onClick={onStop}
                className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl
                           bg-gradient-to-br from-red-500/30 to-red-700/20 
                           border border-red-500/40 flex items-center justify-center
                           hover:from-red-500/40 hover:to-red-700/30 
                           transition-all duration-200 group"
                aria-label="Detener"
              >
                {/* Stop icon */}
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:text-red-300 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!text.trim()}
                className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl
                           btn-eldritch flex items-center justify-center
                           disabled:opacity-40 disabled:cursor-not-allowed
                           disabled:hover:transform-none disabled:hover:shadow-none
                           transition-all duration-200 group"
                aria-label="Enviar"
              >
                {/* Send arrow icon */}
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-abyss-950 group-hover:translate-x-0.5 
                             group-hover:-translate-y-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            )}
          </form>
        </div>

        {/* Hint text - hidden on very small screens */}
        <p className="hidden sm:block text-center text-xs text-bio-600/50 mt-2">
          Enter para enviar · Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
