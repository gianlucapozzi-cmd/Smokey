# Brief Landing Page — SOSmoke Community

> Da incollare in Cursor. Stack: **Next.js (App Router) + TypeScript + Tailwind CSS**, mobile-first, single page.

---

## 1. Concept

**Non è un sito né una pagina informativa.** È il *filo diretto* tra SOSmoke e i clienti che vengono in negozio: uno spazio di scambio a due vie.

- **Il cliente**: lascia un feedback sull'esperienza in negozio (servizio, accoglienza, competenza), suggerisce brand/prodotti che vorrebbe trovare, si registra per ricevere promozioni.
- **SOSmoke**: raccoglie il database clienti, offre consigli personalizzati, reperisce prodotti non presenti a scaffale.

**Accesso solo per clienti fisici** → distribuzione tramite **QR code in negozio** (bancone, scontrino, tessera). La pagina è pensata per essere scansionata da smartphone: **il mobile è il layout primario**, il desktop è secondario.

Concept guida in una frase: *"Tu ci consigli, noi ti consigliamo."*

---

## 2. Stack tecnico

- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion per micro-animazioni leggere (fade/slide all'ingresso sezioni, feedback sugli stati del form)
- Single page, nessun routing multiplo
- Deploy su Vercel
- Endpoint e chiavi via **env vars** (mai hardcodati)

---

## 3. Identità visiva

- **[PLACEHOLDER]** recuperare da sosmoke.net: logo (preferibilmente SVG), palette esatta, font.
- Direzione: tono **caldo e umano, "da negozio di fiducia"**, non corporate/e-commerce. La competenza dello staff è il cuore del brand (Marco, titolare, è vaper): il copy deve trasmettere fiducia e vicinanza, non vendita aggressiva.
- Impaginazione a **card**, molto respiro, gerarchia tipografica chiara, CTA ben visibili su mobile.
- Niente claim su salute/nicotina in nessun testo.

---

## 4. Struttura della pagina (sezioni, in ordine)

### Sezione 1 — Hero
- Headline che comunica *community/circolo*, non vendita. Es: **"Entra nel giro SOSmoke"** oppure **"Il tuo filo diretto con noi"**.
- Sottotitolo: dedicato a chi viene a trovarci in negozio (Ascoli Piceno · San Benedetto del Tronto).
- Micro-copy rassicurante: niente spam, solo vantaggi veri.
- CTA scroll verso il form ("Registrati" / "Dicci la tua").

### Sezione 2 — Cosa ottieni (valore per il cliente)
Griglia di card (mobile: stack verticale):
- **Consigli su misura** dallo staff — competenza reale, non un catalogo.
- **Promozioni ed esclusive** riservate agli iscritti.
- **Assortimento + magazzino sempre rifornito**: se non c'è, lo troviamo per te.
- **Avvisi novità/uscite** sui tuoi brand preferiti.

### Sezione 3 — "Tu ci consigli, noi ti consigliamo" (cuore a due vie)
Due colonne affiancate (mobile: stack):
- **Lato cliente** — "Dicci la tua": com'è andata in negozio, cosa cerchi, quale prodotto/brand vorresti trovare.
- **Lato SOSmoke** — "Noi ti rispondiamo": consiglio personalizzato, reperimento prodotti fuori assortimento, aggiornamenti su misura.

### Sezione 4 — Form di registrazione (il database)
Campi:
- **Nome** *(obbligatorio)*
- **Cognome** *(obbligatorio)*
- **Email** e/o **Cellulare** — almeno uno obbligatorio (consigliato entrambi per email + WhatsApp/Spoki)
- **Data di nascita** *(obbligatorio)* → **gate 18+**: se < 18, blocco invio con messaggio dedicato
- **Negozio di riferimento** *(obbligatorio, select)*: Ascoli Piceno / San Benedetto del Tronto
- **Prodotti di interesse** *(multi-select opzionale, per segmentazione promo)*: sigarette elettroniche · resistenze di ricambio · atomizzatori/rigenerabili · box/pod mod · liquidi/aromi
- **Consenso privacy** *(checkbox obbligatorio + link a privacy policy)* — **[PLACEHOLDER link]**
- **Consenso marketing** *(checkbox separato e opzionale, GDPR)*

Validazione client-side, stati di errore chiari e inline, bottone disabilitato finché i campi obbligatori non sono validi.

### Sezione 5 — Feedback + richiesta prodotti
(Può stare nello stesso flow o come sezione successiva.)
- Valutazione **privata** dell'esperienza su tre voci: **servizio · accoglienza · competenza** (icone o scala 1–5, **non stelle pubbliche**: è raccolta interna, non una recensione).
- Campo libero: *"Cosa possiamo migliorare?"*
- Campo libero: *"Quale prodotto o brand vorresti che portassimo?"*
- Copy che chiarisce: il feedback arriva **solo a SOSmoke**, non viene pubblicato.

### Sezione 6 — Conferma / Thank you
- Stato di successo dopo l'invio (no redirect necessario, transizione in-page).
- Messaggio caldo + indicazione di come riceveranno le promo (email / WhatsApp).

---

## 5. Note tecniche & integrazioni **[PLACEHOLDER]**

- **Submit form → webhook n8n** (`automations.wolfoncloud.com`) → **Relatia CRM**.
  - Mappare i campi sul contatto/pipeline Relatia.
  - Promemoria integrazione: `Authorization: Token [key]` impostato manualmente; costruire il body completo in un **Code node** (evitare `{{ $json.xxx }}` inline nel JSON); assicurarsi che il workflow sia **Active** (altrimenti 404 "webhook not registered").
- **Doppio consenso GDPR**: salvare timestamp + testo del consenso al momento dell'invio.
- **WhatsApp opt-in** → Spoki/Yourang **[PLACEHOLDER]**.
- **Tracking**: essendo la pagina riservata ai clienti fisici (nessuna acquisizione pubblicitaria), meglio **evitare pixel pubblicitari** e usare solo analytics di base (Vercel Analytics o GA4) **[PLACEHOLDER]**. ⚠️ Verificare le restrizioni sulla pubblicità e-cig prima di inserire eventuali pixel Meta/Google.
- **Age gate**: data di nascita < 18 → blocco invio.

---

## 6. Copy & tono
Italiano, informale-professionale, "da negozio". Focus su **servizio, community, consiglio**. Nessun claim su salute o nicotina; nessun linguaggio da promozione aggressiva di prodotto.
