import type { CommunityPayload } from "./types";

export async function sendToN8n(payload: CommunityPayload): Promise<void> {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) return;

  const token = process.env.N8N_WEBHOOK_TOKEN;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = token.startsWith("Token ")
      ? token
      : `Token ${token}`;
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`n8n ${response.status} ${detail}`);
  }
}
