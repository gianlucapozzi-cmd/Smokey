import { NextResponse } from "next/server";
import { sendToN8n } from "@/lib/n8n";
import { sendToGoogleSheet } from "@/lib/sheet";
import { parsePayload } from "@/lib/validation";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Richiesta non valida." },
      { status: 400 },
    );
  }

  const parsed = parsePayload(json);
  if ("error" in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const n8nUrl = process.env.N8N_WEBHOOK_URL;

  if (!sheetsUrl && !n8nUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[register] nessuna destinazione configurata — accettato in demo",
      );
      return NextResponse.json({ ok: true, demo: true });
    }
    return NextResponse.json(
      { ok: false, error: "Servizio non configurato." },
      { status: 503 },
    );
  }

  try {
    await Promise.all([
      sheetsUrl ? sendToGoogleSheet(parsed) : Promise.resolve(),
      n8nUrl ? sendToN8n(parsed) : Promise.resolve(),
    ]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[register] forward error", error);
    return NextResponse.json(
      { ok: false, error: "Invio non riuscito." },
      { status: 502 },
    );
  }
}
