import { useState } from "react";

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

  return (
    <div className="border-t border-zinc-800 p-3 bg-zinc-950/80">
      <form
        className="flex gap-2 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          onSend(text);
          setText("");
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!isStreaming) {
                onSend(text);
                setText("");
              }
            }
          }}
          placeholder="Write a message..."
          className="flex-1 resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          rows={2}
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="rounded-xl px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
          >
            Stop
          </button>
        ) : (
          <button type="submit" className="rounded-xl px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white">
            Send
          </button>
        )}
      </form>
      <div className="mt-2 text-xs text-zinc-500">Enter to send - Shift+Enter for a new line</div>
    </div>
  );
}
