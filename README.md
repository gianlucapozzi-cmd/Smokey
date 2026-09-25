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

Senza destinazioni configurate l'invio del form viene accettato in modalità demo (solo in development).

## Variabili d'ambiente

Copia `.env.example` in `.env.local`:

| Variabile | Uso |
| --- | --- |
| `GOOGLE_SHEETS_WEBHOOK_URL` | URL dell'app web Apps Script collegata al foglio |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | Stesso valore della proprietà `WEBHOOK_SECRET` nello script |
| `N8N_WEBHOOK_URL` | (opzionale) Endpoint webhook n8n → Relatia |
| `N8N_WEBHOOK_TOKEN` | (opzionale) Chiave Relatia/n8n, inviata come `Authorization: Token …` |

Non hardcodare URL o token nel codice. In produzione serve almeno il foglio Google **oppure** n8n.

## Form → Foglio Google

Ogni invio del form aggiunge una riga al foglio. Setup una tantum:

1. Crea un Google Sheet (es. `SOSmoke Community`).
2. **Estensioni → Apps Script**, cancella il codice di default e incolla `google-apps-script/Code.gs`.
3. Salva. Poi **Impostazioni progetto → Proprietà script** e aggiungi `WEBHOOK_SECRET` (una stringa a caso, lunga).
4. **Distribuisci → Nuova distribuzione → Tipo: App web**
   - Esegui come: **Io**
   - Chi ha accesso: **Chiunque**
5. Copia l'URL (`…/exec`) in `GOOGLE_SHEETS_WEBHOOK_URL` su Vercel, e lo stesso secret in `GOOGLE_SHEETS_WEBHOOK_SECRET`.
6. Dopo ogni modifica allo script: **Distribuisci → Gestisci le distribuzioni → icona matita → Nuova versione**.

La scheda **Iscrizioni** (intestazioni incluse) viene creata al primo invio.

n8n/Relatia resta opzionale: se `N8N_WEBHOOK_URL` è impostato, lo stesso payload parte anche lì.

## Deploy

Pronto per Vercel. Impostare le env vars nel progetto Vercel prima di andare online.
