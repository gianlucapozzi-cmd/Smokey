import {
  PRODUCT_INTERESTS,
  STORES,
  type ProductInterestId,
  type StoreId,
} from "./constants";
import type { CommunityPayload, RatingValue } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ageFromIsoDate(iso: string, now = new Date()): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  const todayY = now.getFullYear();
  const todayM = now.getMonth() + 1;
  const todayD = now.getDate();
  let age = todayY - year;
  if (todayM < month || (todayM === month && todayD < day)) age -= 1;
  return age;
}

export function isUnder18(iso: string): boolean {
  const age = ageFromIsoDate(iso);
  return age !== null && age < 18;
}

export function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isNonEmptyName(value: string): boolean {
  return value.trim().length >= 2;
}

export type FormDraft = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  store: StoreId | "";
  interests: ProductInterestId[];
  interestNote: string;
  privacy: boolean;
  marketing: boolean;
  service: RatingValue | null;
  welcome: RatingValue | null;
  expertise: RatingValue | null;
  improvement: string;
  productRequest: string;
};

export type FieldErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "birthDate"
    | "store"
    | "interests"
    | "privacy",
    string
  >
>;

export function validateDraft(draft: FormDraft): FieldErrors {
  const errors: FieldErrors = {};

  if (!isNonEmptyName(draft.firstName)) {
    errors.firstName = "Inserisci il nome.";
  }
  if (!isNonEmptyName(draft.lastName)) {
    errors.lastName = "Inserisci il cognome.";
  }

  const email = draft.email.trim();
  const phone = draft.phone.trim();

  if (!phone) {
    errors.phone = "Inserisci il cellulare.";
  } else if (!isValidPhone(phone)) {
    errors.phone = "Controlla il numero di cellulare.";
  }

  if (email && !isValidEmail(email)) {
    errors.email = "Controlla l'indirizzo email.";
  }

  if (draft.birthDate) {
    if (ageFromIsoDate(draft.birthDate) === null) {
      errors.birthDate = "La data non sembra corretta.";
    } else if (isUnder18(draft.birthDate)) {
      errors.birthDate =
        "Questa community è riservata ai maggiorenni. Se hai meno di 18 anni non possiamo registrarti.";
    }
  }

  if (!draft.store) {
    errors.store = "Scegli il negozio di riferimento.";
  }

  if (draft.interests.length === 0) {
    errors.interests = "Scegli almeno un prodotto di interesse.";
  }

  if (!draft.privacy) {
    errors.privacy = "Per iscriverti serve il consenso privacy.";
  }

  return errors;
}

export function isDraftValid(draft: FormDraft): boolean {
  return Object.keys(validateDraft(draft)).length === 0;
}

const STORE_IDS = new Set<string>(STORES.map((store) => store.id));
const INTEREST_IDS = new Set<string>(
  PRODUCT_INTERESTS.map((item) => item.id),
);

function isStoreId(value: unknown): value is StoreId {
  return typeof value === "string" && STORE_IDS.has(value);
}

function isInterestId(value: unknown): value is ProductInterestId {
  return typeof value === "string" && INTEREST_IDS.has(value);
}

function isRating(value: unknown): value is RatingValue {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

export function parsePayload(input: unknown): CommunityPayload | { error: string } {
  if (!input || typeof input !== "object") {
    return { error: "Richiesta non valida." };
  }

  const body = input as Partial<CommunityPayload> & {
    contact?: Partial<CommunityPayload["contact"]>;
    consents?: {
      privacy?: Partial<CommunityPayload["consents"]["privacy"]>;
      marketing?: Partial<CommunityPayload["consents"]["marketing"]>;
    };
    feedback?: Partial<CommunityPayload["feedback"]>;
    interests?: unknown;
    interestNote?: unknown;
  };

  const contact = body.contact;
  const firstName = String(contact?.firstName ?? "").trim();
  const lastName = String(contact?.lastName ?? "").trim();
  const email = String(contact?.email ?? "").trim();
  const phone = String(contact?.phone ?? "").trim();
  const birthDate = String(contact?.birthDate ?? "").trim();
  const store = contact?.store;

  if (!isNonEmptyName(firstName) || !isNonEmptyName(lastName)) {
    return { error: "Nome e cognome sono obbligatori." };
  }
  if (!phone || !isValidPhone(phone)) {
    return { error: "Il cellulare è obbligatorio." };
  }
  if (email && !isValidEmail(email)) {
    return { error: "Email non valida." };
  }
  if (birthDate) {
    if (ageFromIsoDate(birthDate) === null) {
      return { error: "La data di nascita non è valida." };
    }
    if (isUnder18(birthDate)) {
      return { error: "Registrazione consentita solo ai maggiorenni." };
    }
  }
  if (!isStoreId(store)) {
    return { error: "Seleziona un negozio di riferimento." };
  }
  if (!body.consents?.privacy?.accepted) {
    return { error: "Il consenso privacy è obbligatorio." };
  }

  const interests = Array.isArray(body.interests)
    ? body.interests.filter(isInterestId)
    : [];
  if (interests.length === 0) {
    return { error: "Seleziona almeno un prodotto di interesse." };
  }

  const interestNote = String(body.interestNote ?? "").trim().slice(0, 500);

  const now = new Date().toISOString();

  return {
    source: "sosmoke-community-landing",
    submittedAt: now,
    contact: {
      firstName,
      lastName,
      email,
      phone: normalizePhone(phone),
      birthDate,
      store,
    },
    interests,
    interestNote,
    consents: {
      privacy: {
        accepted: true,
        timestamp: now,
        text: String(body.consents.privacy.text ?? ""),
      },
      marketing: {
        accepted: Boolean(body.consents.marketing?.accepted),
        timestamp: now,
        text: String(body.consents.marketing?.text ?? ""),
      },
    },
    feedback: {
      service: isRating(body.feedback?.service) ? body.feedback.service : null,
      welcome: isRating(body.feedback?.welcome) ? body.feedback.welcome : null,
      expertise: isRating(body.feedback?.expertise)
        ? body.feedback.expertise
        : null,
      improvement: String(body.feedback?.improvement ?? "").trim().slice(0, 1000),
      productRequest: String(body.feedback?.productRequest ?? "")
        .trim()
        .slice(0, 1000),
    },
  };
}
