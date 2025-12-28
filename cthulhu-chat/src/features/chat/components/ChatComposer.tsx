import { useRef, useState, useCallback } from "react";

export function ChatComposer({
  isStreaming,
  onSend,
  onStop,
}: {
  isStreaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
}) {
  const [isEmpty, setIsEmpty] = useState(true);
  const inputRef = useRef<HTMLDivElement>(null);

  const getText = useCallback(() => {
    return inputRef.current?.innerText || "";
  }, []);

  const handleSubmit = useCallback(() => {
    const text = getText().trim();
    if (text && !isStreaming) {
      onSend(text);
      if (inputRef.current) {
        inputRef.current.innerText = "";
        setIsEmpty(true);
      }
    }
  }, [getText, isStreaming, onSend]);

  const handleInput = useCallback(() => {
    const text = getText();
    setIsEmpty(!text.trim());
  }, [getText]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  return (
    <div className="p-3 sm:p-4 bg-gradient-to-t from-abyss-900/90 to-transparent backdrop-blur-md">
      <div className="w-full">
        {/* Modern pill-shaped input container */}
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-1.5 sm:p-2">
          <form
            className="flex items-end gap-2 sm:gap-3"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '8px' }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* WhatsApp-style dynamic input */}
            <div className="flex-1 relative min-w-0" style={{ flex: '1 1 auto', minWidth: 0 }}>
              {isEmpty && (
                <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-bio-400/40 pointer-events-none text-sm sm:text-base z-10">
                  Susurra al vacío...
                </div>
              )}
              <div
                ref={inputRef}
                contentEditable
                role="textbox"
                aria-label="Mensaje"
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                className="input-eldritch px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base text-white
                           outline-none min-h-[48px] max-h-[150px] overflow-y-auto
                           leading-relaxed break-words whitespace-pre-wrap
                           rounded-xl sm:rounded-2xl"
                style={{ wordBreak: 'break-word' }}
              />
            </div>

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
                disabled={isEmpty}
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

