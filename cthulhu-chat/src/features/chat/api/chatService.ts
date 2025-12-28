import type { ChatMessage } from "../../../domain/chat/types";
import type { AGUIRunInput } from "../../../infrastructure/agui/aguiTypes";
import { createAgUiClient } from "../../../infrastructure/agui/aguiClient";

const client = createAgUiClient();
const uid = () => crypto.randomUUID();

export function buildRunInput(threadId: string, messages: ChatMessage[]): AGUIRunInput {
  return {
    threadId,
    runId: uid(),
    state: {},
    messages: messages.map((m) => ({ id: m.id, role: m.role, content: m.content })),
    tools: [],
    context: [],
    forwardedProps: {},
  };
}

export async function streamAssistantReply(
  threadId: string,
  history: ChatMessage[],
  onDelta: (delta: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const input = buildRunInput(threadId, history);
  await client.runStream(input, { onTextDelta: onDelta }, signal);
}
