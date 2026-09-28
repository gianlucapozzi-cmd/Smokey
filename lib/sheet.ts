import { PRODUCT_INTERESTS, STORE_DETAILS } from "./constants";
import type { CommunityPayload } from "./types";

export const SHEET_HEADERS = [
  "Nome",
  "Cognome",
  "Telefono",
  "Email",
  "Data di nascita",
  "Negozio di riferimento",
  "Prodotti di interesse",
  "Altro",
  "Servizio",
  "Accoglienza",
  "Competenza",
  "Cosa possiamo migliorare?",
  "Quale prodotto o brand vorresti che portassimo?",
  "Data invio",
] as const;

function formatRome(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function payloadToSheetRow(payload: CommunityPayload): string[] {
  const store = STORE_DETAILS.find((item) => item.id === payload.contact.store);
  const interests = payload.interests
    .map(
      (id) => PRODUCT_INTERESTS.find((item) => item.id === id)?.label ?? id,
    )
    .join(", ");

  const shop = store?.city ?? payload.contact.store;

  return [
    payload.contact.firstName,
    payload.contact.lastName,
    payload.contact.phone,
    payload.contact.email,
    payload.contact.birthDate,
    shop,
    interests,
    payload.interestNote,
    payload.feedback.service?.toString() ?? "",
    payload.feedback.welcome?.toString() ?? "",
    payload.feedback.expertise?.toString() ?? "",
    payload.feedback.improvement,
    payload.feedback.productRequest,
    formatRome(payload.submittedAt),
  ];
}

async function postJson(url: string, body: unknown): Promise<void> {
  const payload = JSON.stringify(body);
  const first = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: payload,
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
  });

  const location = first.headers.get("location");
  const response =
    location && first.status >= 300 && first.status < 400
      ? await fetch(new URL(location, url), {
          method: "GET",
          signal: AbortSignal.timeout(20000),
        })
      : first;

  const text = await response.text();
  let parsed: { ok?: boolean; error?: string } = {};
  try {
    parsed = JSON.parse(text) as { ok?: boolean; error?: string };
  } catch {
    throw new Error(`Google Sheets ${response.status} ${text.slice(0, 180)}`);
  }

  if (!response.ok || parsed.ok === false) {
    throw new Error(parsed.error || `Google Sheets ${response.status}`);
  }
}

export async function sendToGoogleSheet(
  payload: CommunityPayload,
): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;

  await postJson(url, {
    secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
    headers: SHEET_HEADERS,
    values: payloadToSheetRow(payload),
  });
}
