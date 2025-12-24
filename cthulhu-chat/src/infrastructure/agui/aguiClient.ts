import { env } from "../../config/env";
import type { AGUIRunInput } from "./aguiTypes";

type StreamHandlers = {
  onTextDelta: (delta: string) => void;
  onAgUiEvent?: (type: string, payload: unknown) => void;
  onDone?: () => void;
  onError?: (err: unknown) => void;
};

function splitSseFrames(buffer: string): { frames: string[]; rest: string } {
  const parts = buffer.split("\n\n");
  return { frames: parts.slice(0, -1), rest: parts.at(-1) ?? "" };
}

function parseSseFrame(frame: string): string {
  let data = "";
  for (const line of frame.split("\n")) {
    if (line.startsWith("data:")) data += line.slice(5).trim();
  }
  return data;
}

function parseAgUiPayload(data: string): { type: string; delta: string; payload: unknown } | null {
  if (!data) return null;
  try {
    const payload = JSON.parse(data);
    const type = String((payload as any)?.type ?? "");
    const delta =
      type === "TEXT_MESSAGE_CONTENT" && typeof (payload as any)?.delta === "string"
        ? String((payload as any).delta)
        : "";
    return { type, delta, payload };
  } catch {
    return null;
  }
}

export function createAgUiClient() {
  async function runStream(
    input: AGUIRunInput,
    handlers: StreamHandlers,
    signal?: AbortSignal
  ): Promise<void> {
    const res = await fetch(`${env.apiBaseUrl}/query/ag-ui`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(input),
      signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Request failed: ${res.status} ${text}`);
    }

    if (!res.body) throw new Error("Streaming response body is not available.");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const { frames, rest } = splitSseFrames(buffer);
        buffer = rest;

        for (const frame of frames) {
          const rawData = parseSseFrame(frame);
          const parsed = parseAgUiPayload(rawData);
          if (!parsed) continue;

          handlers.onAgUiEvent?.(parsed.type, parsed.payload);
          if (parsed.delta) handlers.onTextDelta(parsed.delta);
        }
      }

      handlers.onDone?.();
    } catch (err) {
      handlers.onError?.(err);
      throw err;
    }
  }

  return { runStream };
}
