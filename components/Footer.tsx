import { PRIVACY_POLICY_URL, STORE_DETAILS } from "@/lib/constants";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-sand sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Logo variant="light" />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-sand/70">
          Pagina riservata a chi viene in negozio. Se hai scansionato il QR,
          sei nel posto giusto.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {STORE_DETAILS.map((store) => (
            <div key={store.id}>
              <p className="font-serif text-lg text-cream">{store.city}</p>
              <p className="mt-1 text-sm text-sand/70">
                {store.cap} · {store.address}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-sand/50 sm:flex-row sm:items-center sm:justify-between">
          <p>SOSmoke · Smokap srls · P.IVA 02551040443</p>
          <a
            href={PRIVACY_POLICY_URL}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/20 underline-offset-2 hover:text-sand"
          >
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}
