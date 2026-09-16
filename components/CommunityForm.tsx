"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  MARKETING_CONSENT_TEXT,
  PRIVACY_CONSENT_TEXT,
  PRIVACY_POLICY_URL,
  PRODUCT_INTERESTS,
  STORES,
  type ProductInterestId,
} from "@/lib/constants";
import type { CommunityPayload, RatingValue } from "@/lib/types";
import {
  isDraftValid,
  isUnder18,
  type FormDraft,
  validateDraft,
} from "@/lib/validation";
import { FadeIn } from "./FadeIn";
import { RatingScale } from "./RatingScale";

const INITIAL: FormDraft = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  store: "",
  interests: [],
  privacy: false,
  marketing: false,
  service: null,
  welcome: null,
  expertise: null,
  improvement: "",
  productRequest: "",
};

export function CommunityForm() {
  const [draft, setDraft] = useState<FormDraft>(INITIAL);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const errors = useMemo(() => validateDraft(draft), [draft]);
  const valid = isDraftValid(draft);
  const underage = draft.birthDate !== "" && isUnder18(draft.birthDate);

  useEffect(() => {
    if (!done) return;
    document.getElementById("form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [done]);
  function show(key: keyof typeof errors): string | undefined {
    const hasValue =
      key === "contact" || key === "privacy"
        ? touched
        : Boolean(draft[key as keyof FormDraft]);
    if (!(touched || hasValue)) return undefined;
    return errors[key];
  }

  function update<K extends keyof FormDraft>(key: K, value: FormDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setSubmitError(null);
  }

  function toggleInterest(id: ProductInterestId) {
    setDraft((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((item) => item !== id)
        : [...prev.interests, id],
    }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (!valid) return;

    const now = new Date().toISOString();
    const payload: CommunityPayload = {
      source: "sosmoke-community-landing",
      submittedAt: now,
      contact: {
        firstName: draft.firstName.trim(),
        lastName: draft.lastName.trim(),
        email: draft.email.trim(),
        phone: draft.phone.trim(),
        birthDate: draft.birthDate,
        store: draft.store as CommunityPayload["contact"]["store"],
      },
      interests: draft.interests,
      consents: {
        privacy: {
          accepted: true,
          timestamp: now,
          text: PRIVACY_CONSENT_TEXT,
        },
        marketing: {
          accepted: draft.marketing,
          timestamp: now,
          text: MARKETING_CONSENT_TEXT,
        },
      },
      feedback: {
        service: draft.service,
        welcome: draft.welcome,
        expertise: draft.expertise,
        improvement: draft.improvement.trim(),
        productRequest: draft.productRequest.trim(),
      },
    };

    setSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Invio non riuscito.");
      }
      setDone(true);
    } catch {
      setSubmitError(
        "Qualcosa non è andato. Riprova tra un attimo, o passa dal bancone: ti registriamo noi.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="form"
      className="scroll-mt-24 bg-cream px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {done ? (
            <ThankYou key="thanks" draft={draft} />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <FadeIn>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ember">
                  Entra nel giro
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                  Registrati e dicci la tua
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                  I campi con * sono obbligatori. Il feedback resta{" "}
                  <strong className="font-medium text-ink">solo tra noi</strong>
                  : non viene pubblicato da nessuna parte.
                </p>
              </FadeIn>

              <form
                onSubmit={onSubmit}
                noValidate
                className="card-soft mt-8 p-5 sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Nome *"
                    autoComplete="given-name"
                    value={draft.firstName}
                    error={show("firstName")}
                    onChange={(value) => update("firstName", value)}
                  />
                  <Field
                    label="Cognome *"
                    autoComplete="family-name"
                    value={draft.lastName}
                    error={show("lastName")}
                    onChange={(value) => update("lastName", value)}
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={draft.email}
                    error={show("email")}
                    onChange={(value) => update("email", value)}
                  />
                  <Field
                    label="Cellulare"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={draft.phone}
                    error={show("phone")}
                    onChange={(value) => update("phone", value)}
                  />
                </div>
                {errors.contact && touched ? (
                  <p className="mt-2 text-sm text-ember">{errors.contact}</p>
                ) : (
                  <p className="mt-2 text-sm text-ink/50">
                    Almeno uno dei due è obbligatorio. Con entrambi ti
                    raggiungiamo via email e WhatsApp.
                  </p>
                )}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Data di nascita *"
                    type="date"
                    autoComplete="bday"
                    value={draft.birthDate}
                    error={underage ? undefined : show("birthDate")}
                    onChange={(value) => update("birthDate", value)}
                  />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">
                      Negozio di riferimento *
                    </span>
                    <select
                      className="field"
                      value={draft.store}
                      aria-invalid={Boolean(show("store"))}
                      onChange={(event) =>
                        update(
                          "store",
                          event.target.value as FormDraft["store"],
                        )
                      }
                    >
                      <option value="">Seleziona il negozio</option>
                      {STORES.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.label}
                        </option>
                      ))}
                    </select>
                    {show("store") ? (
                      <p className="mt-1.5 text-sm text-ember">{errors.store}</p>
                    ) : null}
                  </label>
                </div>

                {underage ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-2xl border border-ember/30 bg-ember/8 px-4 py-3 text-sm leading-relaxed text-ink"
                    role="alert"
                  >
                    Questa community è riservata ai maggiorenni. Se hai meno di
                    18 anni non possiamo registrarti. Passa in negozio con un
                    adulto se ti serve una mano.
                  </motion.div>
                ) : null}

                <fieldset className="mt-6">
                  <legend className="text-sm font-medium text-ink">
                    Prodotti di interesse{" "}
                    <span className="font-normal text-ink/45">(opzionale)</span>
                  </legend>
                  <p className="mt-1 text-sm text-ink/50">
                    Così sappiamo cosa farti arrivare per primo.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {PRODUCT_INTERESTS.map((item) => {
                      const selected = draft.interests.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleInterest(item.id)}
                          className={`rounded-full border px-3.5 py-2 text-sm transition ${
                            selected
                              ? "border-brand bg-brand text-white"
                              : "border-ink/12 bg-white text-ink/80 hover:border-brand/40"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-8 border-t border-ink/8 pt-8">
                  <h3 className="font-serif text-2xl text-ink">
                    Com’è andata in negozio?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    Valutazione privata, scala da 1 a 5. Arriva solo a SOSmoke,
                    non è una recensione pubblica.
                  </p>

                  <div className="mt-5 grid gap-5">
                    <RatingScale
                      legend="Servizio"
                      value={draft.service}
                      onChange={(value) =>
                        update("service", value as RatingValue | null)
                      }
                    />
                    <RatingScale
                      legend="Accoglienza"
                      value={draft.welcome}
                      onChange={(value) =>
                        update("welcome", value as RatingValue | null)
                      }
                    />
                    <RatingScale
                      legend="Competenza"
                      value={draft.expertise}
                      onChange={(value) =>
                        update("expertise", value as RatingValue | null)
                      }
                    />
                  </div>

                  <label className="mt-5 block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">
                      Cosa possiamo migliorare?
                    </span>
                    <textarea
                      className="field min-h-[5.5rem] resize-y"
                      maxLength={1000}
                      value={draft.improvement}
                      onChange={(event) =>
                        update("improvement", event.target.value)
                      }
                    />
                  </label>

                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">
                      Quale prodotto o brand vorresti che portassimo?
                    </span>
                    <textarea
                      className="field min-h-[5.5rem] resize-y"
                      maxLength={1000}
                      value={draft.productRequest}
                      onChange={(event) =>
                        update("productRequest", event.target.value)
                      }
                    />
                  </label>
                </div>

                <div className="mt-8 space-y-3 border-t border-ink/8 pt-6">
                  <label className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
                      checked={draft.privacy}
                      onChange={(event) =>
                        update("privacy", event.target.checked)
                      }
                    />
                    <span>
                      {PRIVACY_CONSENT_TEXT}{" "}
                      <a
                        href={PRIVACY_POLICY_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-brand/60 underline-offset-2"
                      >
                        Leggi l’informativa
                      </a>
                      . *
                    </span>
                  </label>
                  {show("privacy") ? (
                    <p className="pl-8 text-sm text-ember">{errors.privacy}</p>
                  ) : null}

                  <label className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
                      checked={draft.marketing}
                      onChange={(event) =>
                        update("marketing", event.target.checked)
                      }
                    />
                    <span>{MARKETING_CONSENT_TEXT}</span>
                  </label>
                </div>

                {submitError ? (
                  <p className="mt-4 text-sm text-ember" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!valid || submitting}
                  className="btn-ember mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Un attimo…" : "Entra nel giro"}
                </button>
                <p className="mt-3 text-center text-xs text-ink/45">
                  Il bottone si attiva quando i campi obbligatori sono a posto.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        className="field"
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <p className="mt-1.5 text-sm text-ember">{error}</p> : null}
    </label>
  );
}

function ThankYou({ draft }: { draft: FormDraft }) {
  const channels = [
    draft.email.trim() ? "email" : null,
    draft.phone.trim() ? "WhatsApp" : null,
  ].filter(Boolean);

  const how =
    channels.length === 2
      ? "email e WhatsApp"
      : channels[0] === "WhatsApp"
        ? "WhatsApp"
        : "email";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-soft px-6 py-12 text-center sm:px-10 sm:py-16"
    >
      <p className="font-serif text-3xl italic text-brand sm:text-4xl">Grazie.</p>
      <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
        Sei nel giro.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink/70">
        Da qui in poi ti scriviamo solo per cose che valgono: promo, consigli,
        prodotti che hai chiesto. Controlla {how}.
      </p>
      <p className="mt-6 text-sm text-ink/50">
        La prossima volta che passi in negozio, siamo già un po’ più in
        sintonia.
      </p>
    </motion.div>
  );
}
