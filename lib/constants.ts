export const PRIVACY_POLICY_URL = "https://www.sosmoke.net/it/vendor/privacy/";

export const PRIVACY_CONSENT_TEXT =
  "Ho letto e accetto l'informativa sulla privacy di SOSmoke e autorizzo il trattamento dei dati per la gestione della community e delle richieste che invio.";

export const MARKETING_CONSENT_TEXT =
  "Acconsento a ricevere da SOSmoke promozioni, novità e comunicazioni personalizzate via email e/o WhatsApp. Posso revocare il consenso in qualsiasi momento.";

export const STORES = [
  { id: "ascoli-piceno", label: "Ascoli Piceno" },
  { id: "san-benedetto", label: "San Benedetto del Tronto (AP)" },
  { id: "spinetoli", label: "Spinetoli (AP)" },
  { id: "porto-san-giorgio", label: "Porto San Giorgio (FM)" },
] as const;

export const PRODUCT_INTERESTS = [
  { id: "sigarette-elettroniche", label: "Sigarette elettroniche" },
  { id: "resistenze", label: "Resistenze di ricambio" },
  { id: "atomizzatori", label: "Atomizzatori / rigenerabili" },
  { id: "box-pod", label: "Box / pod mod" },
  { id: "liquidi", label: "Liquidi / aromi" },
] as const;

export const STORE_DETAILS = [
  {
    id: "ascoli-piceno",
    city: "Ascoli Piceno",
    address: "Via Siena, 12",
    cap: "63100",
  },
  {
    id: "san-benedetto",
    city: "San Benedetto del Tronto (AP)",
    address: "Via Ugo Bassi, 12",
    cap: "63074",
  },
  {
    id: "spinetoli",
    city: "Spinetoli (AP)",
    address: "Via Salaria 57/a, Pagliare del Tronto",
    cap: "63078",
  },
  {
    id: "porto-san-giorgio",
    city: "Porto San Giorgio (FM)",
    address: "Via Giuseppe Mazzini, 79",
    cap: "63822",
  },
] as const;

export type StoreId = (typeof STORES)[number]["id"];
export type ProductInterestId = (typeof PRODUCT_INTERESTS)[number]["id"];
