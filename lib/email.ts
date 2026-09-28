import { SHEET_HEADERS, payloadToSheetRow } from "./sheet";
import type { CommunityPayload } from "./types";

const TO = "info@sosmoke.it";
const SITE_URL = "https://community.sosmoke.it";

function needsActivation(message: unknown) {
  return (
    typeof message === "string" && message.toLowerCase().includes("activation")
  );
}

export async function sendNotificationEmail(
  payload: CommunityPayload,
): Promise<void> {
  const to = process.env.NOTIFY_EMAIL?.trim() || TO;
  const siteUrl = process.env.SITE_URL?.trim() || SITE_URL;
  const values = payloadToSheetRow(payload);
  const fields: Record<string, string> = {};
  SHEET_HEADERS.forEach((label, index) => {
    fields[label] = values[index]?.trim() || "—";
  });

  const name = `${payload.contact.firstName} ${payload.contact.lastName}`.trim();
  const body: Record<string, string> = {
    ...fields,
    _subject: `Nuova iscrizione community — ${name}`,
    _template: "table",
    _captcha: "false",
    _url: siteUrl,
  };
  if (payload.contact.email) {
    body._replyto = payload.contact.email;
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteUrl,
        Referer: `${siteUrl}/`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20000),
    },
  );

  const result = (await response.json().catch(() => ({}))) as {
    success?: boolean | string;
    message?: string;
  };

  if (needsActivation(result.message)) {
    console.warn("[register] FormSubmit in attesa di attivazione su", to);
    return;
  }

  if (
    !response.ok ||
    result.success === false ||
    result.success === "false"
  ) {
    throw new Error(result.message || `FormSubmit ${response.status}`);
  }
}
