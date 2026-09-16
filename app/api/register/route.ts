import { NextResponse } from "next/server";
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

  const webhook = process.env.N8N_WEBHOOK_URL;
  const token = process.env.N8N_WEBHOOK_TOKEN;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[register] N8N_WEBHOOK_URL mancante — accettato in demo");
      return NextResponse.json({ ok: true, demo: true });
    }
    return NextResponse.json(
      { ok: false, error: "Servizio non configurato." },
      { status: 503 },
    );
  }

  try {
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
      body: JSON.stringify(parsed),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[register] webhook", response.status, detail);
      return NextResponse.json(
        { ok: false, error: "Invio non riuscito." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[register] webhook error", error);
    return NextResponse.json(
      { ok: false, error: "Invio non riuscito." },
      { status: 502 },
    );
  }
}
