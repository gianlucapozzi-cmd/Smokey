# Community landing — SOSmoke

Filo diretto tra SOSmoke e i clienti dei negozi di Ascoli Piceno e San Benedetto del Tronto. Pagina singola, mobile-first, pensata per il QR in store.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion

## Avvio locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

Senza `N8N_WEBHOOK_URL` l'invio del form viene accettato in modalità demo (solo in development).

## Variabili d'ambiente

Copia `.env.example` in `.env.local`:

| Variabile | Uso |
| --- | --- |
| `N8N_WEBHOOK_URL` | Endpoint webhook n8n (`automations.wolfoncloud.com`) |
| `N8N_WEBHOOK_TOKEN` | Chiave Relatia/n8n. Viene inviata come `Authorization: Token …` |

Non hardcodare URL o token nel codice.

## Form → n8n → Relatia

Il body completo viene costruito in `/api/register` (niente mapping fragile lato client). In n8n:

- workflow **Active** (altrimenti 404 “webhook not registered”)
- Authorization impostata a mano
- mapping campi verso contatto/pipeline Relatia in un **Code node**

Vengono salvati timestamp + testo dei consensi privacy e marketing al momento dell'invio.

## Deploy

Pronto per Vercel. Impostare le env vars nel progetto Vercel prima di andare online.
