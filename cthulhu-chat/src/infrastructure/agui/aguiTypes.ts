export type AGUIMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type AGUIRunInput = {
  threadId: string;
  runId: string;
  state: Record<string, unknown>;
  messages: AGUIMessage[];
  tools: unknown[];
  context: unknown[];
  forwardedProps: Record<string, unknown>;
};
