import { SHEET_HEADERS, payloadToSheetRow } from "./sheet";
import type { CommunityPayload } from "./types";

export const NOTIFY_EMAIL = "info@sosmoke.it";
export const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`;

export function buildFormSubmitBody(
  payload: CommunityPayload,
): Record<string, string> {
  const values = payloadToSheetRow(payload);
  const fields: Record<string, string> = {};
  SHEET_HEADERS.forEach((label, index) => {
    fields[label] = values[index]?.trim() || "—";
  });

  const name = `${payload.contact.firstName} ${payload.contact.lastName}`.trim();
  const body: Record<string, string> = {
    ...fields,
    email: payload.contact.email || NOTIFY_EMAIL,
    _subject: `Nuova iscrizione community — ${name}`,
    _template: "table",
    _captcha: "false",
  };
  if (payload.contact.email) {
    body._replyto = payload.contact.email;
  }
  return body;
}
