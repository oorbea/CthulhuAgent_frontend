import { useMemo, useRef, useState } from "react";
import type { ChatMessage } from "../../../domain/chat/types";
import { streamAssistantReply } from "../api/chatService";
import { getThemedErrorMessage } from "../constants/errorMessages";

const uid = () => crypto.randomUUID();

export function useChat() {
  const threadId = useMemo(() => uid(), []);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function sendMessage(text: string): Promise<void> {
    const content = text.trim();
    if (!content || isStreaming) return;

    const userMessage: ChatMessage = { id: uid(), role: "user", content };
    const assistantMessage: ChatMessage = { id: uid(), role: "assistant", content: "" };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = [...messages, userMessage];
      await streamAssistantReply(
        threadId,
        history,
        (delta) => {
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (!last || last.role !== "assistant") return copy;
            copy[copy.length - 1] = { ...last, content: last.content + delta };
            return copy;
          });
        },
        controller.signal
      );
    } catch (error) {
      // Skip abort errors (user cancelled)
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant" && last.content.length === 0) {
          copy[copy.length - 1] = {
            ...last,
            content: getThemedErrorMessage(error),
          };
        }
        return copy;
      });
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }

  function stopStreaming(): void {
    abortRef.current?.abort();
  }

  function resetChat(): void {
    stopStreaming();
    setMessages([]);
  }

  return { messages, isStreaming, sendMessage, stopStreaming, resetChat };
}
