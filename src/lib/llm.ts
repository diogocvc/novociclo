const LLM_API_KEY = process.env.LLM_API_KEY ?? "";

const DEFAULT_BASE_URL = "https://api.groq.com/openai/v1";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LLMConfig {
  baseUrl?: string;
  model?: string;
  temperature?: number;
}

export async function callLLM<T>(
  messages: LLMMessage[],
  config?: LLMConfig
): Promise<{
  content: T;
  tokens: { prompt: number; completion: number; total: number };
}> {
  const baseUrl = config?.baseUrl ?? DEFAULT_BASE_URL;
  const model = config?.model ?? DEFAULT_MODEL;

  if (!LLM_API_KEY) {
    throw new Error(
      "LLM_API_KEY não configurada. Defina a variável de ambiente LLM_API_KEY."
    );
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      response_format: { type: "json_object" },
      temperature: config?.temperature ?? 0.3,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LLM request failed (${response.status}): ${text}`);
  }

  const json = await response.json();
  const content = JSON.parse(json.choices[0].message.content);

  return {
    content: content as T,
    tokens: {
      prompt: json.usage?.prompt_tokens ?? 0,
      completion: json.usage?.completion_tokens ?? 0,
      total: json.usage?.total_tokens ?? 0,
    },
  };
}
